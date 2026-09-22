import { Board } from './board'
import { Recorder, Trace } from './probe'

/**
 * <avr-chart signals="TCNT0, OCR0A, OC0A" window="2ms" mode="roll|scope"
 *            trigger="TOV0" speed="0.001"></avr-chart>
 *
 * Plots the recorded signals with LiaScript's <lia-chart> (ECharts). In roll
 * mode the chart shows the last window of simulation time, in scope mode it
 * shows the window after each trigger event as a still picture.
 */

// the slow motion factor of every chart, the slowest one wins
const speeds = new WeakMap<Board, Map<Element, number>>()

const LANE = 26 // px per digital lane
const PLOT = 150 // px per analog grid
const GAP = 36

/** "2ms", "500us", "1s" → seconds */
function duration(value: string | null, fallback: number) {
  const m = (value || '').trim().match(/^([\d.]+)\s*(us|µs|ms|s)?$/i)
  if (!m) return fallback
  const scale: { [unit: string]: number } = { us: 1e-6, 'µs': 1e-6, ms: 1e-3, s: 1 }
  return parseFloat(m[1]) * scale[(m[2] || 's').toLowerCase()]
}

const RANGES: { [group: string]: { min?: number; max?: number } } = {
  V: { min: 0, max: 5 },
  '%': { min: 0, max: 100 },
  count: { min: 0 },
}

let warned = false

export function avrChart(el: any, board: Board) {
  const FREQ = board.runner.FREQ
  const seconds = duration(el.getAttribute('window'), 0.002)
  const windowCycles = Math.max(16, Math.round(seconds * FREQ))
  const samples = Math.min(5000, Math.max(10, board.num(el, 'samples', 400)))
  // a frame may run far past the window (500k cycles), keep enough history
  const recorder = new Recorder(
    board,
    Math.max(1, Math.round(windowCycles / samples)),
    2 * windowCycles + board.runner.workUnitCycles
  )
  const signals = (el.getAttribute('signals') || 'TCNT0').split(/[\s,;]+/).filter(Boolean)
  for (const signal of signals) {
    if (!recorder.add(signal)) console.warn(`avr-chart: unknown signal "${signal}"`)
  }

  const scope = el.getAttribute('mode') === 'scope'
  const trigger = scope && el.getAttribute('trigger')
  let triggered = -1
  let armed = 0 // wall time when the next trigger is accepted
  if (trigger) {
    const accepted = recorder.trigger(trigger, () => {
      if (triggered < 0 && performance.now() >= armed) triggered = board.cycles
    })
    if (!accepted) console.warn(`avr-chart: unknown trigger "${trigger}"`)
  }
  recorder.start()
  Object.defineProperty(el, 'traces', { get: () => recorder.traces, configurable: true })

  // the view lives in a shadow root, LiaScript does not touch it there
  const root: ShadowRoot = el.shadowRoot || el.attachShadow({ mode: 'open' })
  root.innerHTML = '<style>:host { display: block; }</style><div></div>'
  let chart: any = null
  if (customElements.get('lia-chart')) {
    chart = document.createElement('lia-chart')
    chart.setAttribute('renderer', 'canvas')
    const dark = () =>
      chart.setAttribute(
        'mode',
        document.documentElement.classList.contains('lia-variant-dark') ? 'dark' : ''
      )
    dark()
    const observer = new MutationObserver(dark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    board.signal.addEventListener('abort', () => observer.disconnect())
    root.lastElementChild!.append(chart)
  } else if (!warned) {
    warned = true
    console.warn('avr-chart: <lia-chart> is not defined, only recording')
  }

  const unit = seconds < 2e-3 ? ['µs', 1e6] : seconds < 2 ? ['ms', 1e3] : ['s', 1]
  const title = el.getAttribute('title') || ''
  let rendered = 0
  let height = 0

  const render = (ref: number, from: number, to: number) => {
    const x = (cycles: number) => +(((cycles - ref) / FREQ) * (unit[1] as number)).toPrecision(6)
    const traces = recorder.traces
    const groups = [...new Set(traces.map((t) => t.group).filter((g) => g !== 'logic'))]
    const lanes = traces.filter((t) => t.group === 'logic')
    const grids = groups.length + (lanes.length ? 1 : 0)

    const top = title ? 56 : 32
    const wanted = board.num(el, 'height', 0)
    const logicHeight = lanes.length * LANE
    const plot = wanted
      ? Math.max(60, (wanted - top - 40 - logicHeight - GAP * (grids - 1)) / Math.max(1, groups.length))
      : PLOT

    const grid: any[] = []
    const xAxis: any[] = []
    const yAxis: any[] = []
    let y = top
    const axis = (index: number) => ({
      type: 'value',
      gridIndex: index,
      min: x(from),
      max: x(to),
      axisLabel: { show: index === grids - 1 },
      name: index === grids - 1 ? unit[0] : '',
      nameGap: 22,
      nameLocation: 'end',
      splitLine: { show: index !== grids - 1 || !lanes.length },
    })
    groups.forEach((group, i) => {
      grid.push({ top: y, height: plot, left: 110, right: 30 })
      xAxis.push(axis(i))
      yAxis.push({ type: 'value', gridIndex: i, name: group, scale: !RANGES[group], ...RANGES[group] })
      y += plot + GAP
    })
    if (lanes.length) {
      const i = groups.length
      grid.push({ top: y, height: logicHeight, left: 110, right: 30 })
      xAxis.push(axis(i))
      yAxis.push({
        type: 'value',
        gridIndex: i,
        min: 0,
        max: lanes.length,
        interval: 1,
        axisLabel: {
          formatter: (v: number) => (lanes[lanes.length - 1 - v] || { name: '' }).name,
          verticalAlign: 'bottom',
          fontSize: 11,
        },
      })
      y += logicHeight
    }

    // the points inside the window, lines start at its left edge
    const clip = (t: Trace) => {
      const points: Array<[number, number]> = []
      let before: [number, number] | undefined
      for (const p of t.data) {
        if (p[0] < from) before = p
        else if (p[0] <= to) points.push(p)
      }
      if (before && (t.style === 'step' || t.style === 'line')) points.unshift([from, before[1]])
      if (t.style === 'step' && points.length) points.push([to, points[points.length - 1][1]])
      return points
    }

    const series: any[] = []
    for (const t of traces) {
      const points = clip(t)
      if (t.group === 'logic') {
        const lane = lanes.length - 1 - lanes.indexOf(t)
        const index = groups.length
        series.push(
          t.style === 'marks'
            ? {
                name: t.name, type: 'scatter', xAxisIndex: index, yAxisIndex: index,
                symbol: 'rect', symbolSize: [2, LANE * 0.6],
                data: points.map(([c]) => [x(c), lane + 0.4]),
              }
            : {
                name: t.name, type: 'line', step: 'end', showSymbol: false,
                xAxisIndex: index, yAxisIndex: index, lineStyle: { width: 1.5 },
                data: points.map(([c, v]) => [x(c), lane + 0.1 + 0.6 * v]),
              }
        )
      } else {
        const index = groups.indexOf(t.group)
        series.push(
          t.style === 'points'
            ? {
                name: t.name, type: 'scatter', xAxisIndex: index, yAxisIndex: index,
                symbolSize: 5, data: points.map(([c, v]) => [x(c), v]),
              }
            : {
                name: t.name, type: 'line', step: t.style === 'step' ? 'end' : false,
                showSymbol: false, xAxisIndex: index, yAxisIndex: index,
                data: points.map(([c, v]) => [x(c), v]),
              }
        )
      }
    }

    const total = y + 40
    if (chart && total !== height) chart.setAttribute('style', `height: ${(height = total)}px;`)
    if (chart)
      chart.option = {
        animation: false,
        backgroundColor: 'transparent',
        title: title ? { text: title, left: 'center', textStyle: { fontSize: 14 } } : undefined,
        legend: {
          top: title ? 26 : 0,
          data: traces.filter((t) => t.group !== 'logic').map((t) => t.name),
        },
        tooltip: { trigger: 'axis', axisPointer: { type: 'line' } },
        axisPointer: { link: [{ xAxisIndex: 'all' }] },
        grid,
        xAxis,
        yAxis,
        series,
      }
  }

  return () => {
    let charts = speeds.get(board)
    if (!charts) speeds.set(board, (charts = new Map()))
    charts.set(el, board.num(el, 'speed', 1))
    board.runner.speed = Math.min(...charts.values())

    const now = board.cycles
    if (trigger) {
      // a still picture of the window after the trigger
      if (triggered < 0 || now < triggered + windowCycles) return
      render(triggered, triggered - windowCycles / 10, triggered + windowCycles)
      triggered = -1
      armed = performance.now() + 300
    } else {
      if (performance.now() - rendered < 100) return
      rendered = performance.now()
      render(now, now - windowCycles, now)
    }
  }
}
