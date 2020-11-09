parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"VQ8w":[function(require,module,exports) {

},{}],"ytxR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodes=exports.reparentNodes=exports.isCEPolyfill=void 0;const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback;exports.isCEPolyfill=e;const o=(e,o,l=null,s=null)=>{for(;o!==l;){const l=o.nextSibling;e.insertBefore(o,s),o=l}};exports.reparentNodes=o;const l=(e,o,l=null)=>{for(;o!==l;){const l=o.nextSibling;e.removeChild(o),o=l}};exports.removeNodes=l;
},{}],"Av0K":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.lastAttributeNameRegex=exports.createMarker=exports.isTemplatePartActive=exports.Template=exports.boundAttributeSuffix=exports.markerRegex=exports.nodeMarker=exports.marker=void 0;const e=`{{lit-${String(Math.random()).slice(2)}}}`;exports.marker=e;const t=`\x3c!--${e}--\x3e`;exports.nodeMarker=t;const r=new RegExp(`${e}|${t}`);exports.markerRegex=r;const s="$lit$";exports.boundAttributeSuffix=s;class o{constructor(t,o){this.parts=[],this.element=o;const i=[],l=[],p=document.createTreeWalker(o.content,133,null,!1);let c=0,d=-1,u=0;const{strings:f,values:{length:h}}=t;for(;u<h;){const t=p.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:o}=e;let i=0;for(let t=0;t<o;t++)n(e[t].name,s)&&i++;for(;i-- >0;){const e=f[u],o=x.exec(e)[2],n=o.toLowerCase()+s,i=t.getAttribute(n);t.removeAttribute(n);const a=i.split(r);this.parts.push({type:"attribute",index:d,name:o,strings:a}),u+=a.length-1}}"TEMPLATE"===t.tagName&&(l.push(t),p.currentNode=t.content)}else if(3===t.nodeType){const o=t.data;if(o.indexOf(e)>=0){const e=t.parentNode,l=o.split(r),p=l.length-1;for(let r=0;r<p;r++){let o,i=l[r];if(""===i)o=a();else{const e=x.exec(i);null!==e&&n(e[2],s)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-s.length)+e[3]),o=document.createTextNode(i)}e.insertBefore(o,t),this.parts.push({type:"node",index:++d})}""===l[p]?(e.insertBefore(a(),t),i.push(t)):t.data=l[p],u+=p}}else if(8===t.nodeType)if(t.data===e){const e=t.parentNode;null!==t.previousSibling&&d!==c||(d++,e.insertBefore(a(),t)),c=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(i.push(t),d--),u++}else{let r=-1;for(;-1!==(r=t.data.indexOf(e,r+1));)this.parts.push({type:"node",index:-1}),u++}}else p.currentNode=l.pop()}for(const e of i)e.parentNode.removeChild(e)}}exports.Template=o;const n=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},i=e=>-1!==e.index;exports.isTemplatePartActive=i;const a=()=>document.createComment("");exports.createMarker=a;const x=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;exports.lastAttributeNameRegex=x;
},{}],"NXoq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeNodesFromTemplate=n,exports.insertNodeIntoTemplate=l;var e=require("./template.js");const t=133;function n(e,n){const{element:{content:r},parts:l}=e,u=document.createTreeWalker(r,t,null,!1);let c=o(l),d=l[c],s=-1,i=0;const a=[];let p=null;for(;u.nextNode();){s++;const e=u.currentNode;for(e.previousSibling===p&&(p=null),n.has(e)&&(a.push(e),null===p&&(p=e)),null!==p&&i++;void 0!==d&&d.index===s;)d.index=null!==p?-1:d.index-i,d=l[c=o(l,c)]}a.forEach(e=>e.parentNode.removeChild(e))}const r=e=>{let n=11===e.nodeType?0:1;const r=document.createTreeWalker(e,t,null,!1);for(;r.nextNode();)n++;return n},o=(t,n=-1)=>{for(let r=n+1;r<t.length;r++){const n=t[r];if((0,e.isTemplatePartActive)(n))return r}return-1};function l(e,n,l=null){const{element:{content:u},parts:c}=e;if(null==l)return void u.appendChild(n);const d=document.createTreeWalker(u,t,null,!1);let s=o(c),i=0,a=-1;for(;d.nextNode();){for(a++,d.currentNode===l&&(i=r(n),l.parentNode.insertBefore(n,l));-1!==s&&c[s].index===a;){if(i>0){for(;-1!==s;)c[s].index+=i,s=o(c,s);return}s=o(c,s)}}}
},{"./template.js":"Av0K"}],"uWh2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.isDirective=exports.directive=void 0;const e=new WeakMap,t=t=>(...s)=>{const i=t(...s);return e.set(i,!0),i};exports.directive=t;const s=t=>"function"==typeof t&&e.has(t);exports.isDirective=s;
},{}],"pnLb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.nothing=exports.noChange=void 0;const e={};exports.noChange=e;const o={};exports.nothing=o;
},{}],"bn5t":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.TemplateInstance=void 0;var e=require("./dom.js"),t=require("./template.js");class s{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const s of this.__parts)void 0!==s&&s.commit()}_clone(){const s=e.isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),o=[],r=this.template.parts,n=document.createTreeWalker(s,133,null,!1);let i,p=0,l=0,a=n.nextNode();for(;p<r.length;)if(i=r[p],(0,t.isTemplatePartActive)(i)){for(;l<i.index;)l++,"TEMPLATE"===a.nodeName&&(o.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=o.pop(),a=n.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,i.name,i.strings,this.options));p++}else this.__parts.push(void 0),p++;return e.isCEPolyfill&&(document.adoptNode(s),customElements.upgrade(s)),s}}exports.TemplateInstance=s;
},{"./dom.js":"ytxR","./template.js":"Av0K"}],"cVNN":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SVGTemplateResult=exports.TemplateResult=void 0;var e=require("./dom.js"),t=require("./template.js");const s=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),r=` ${t.marker} `;class l{constructor(e,t,s,r){this.strings=e,this.values=t,this.type=s,this.processor=r}getHTML(){const e=this.strings.length-1;let s="",l=!1;for(let n=0;n<e;n++){const e=this.strings[n],i=e.lastIndexOf("\x3c!--");l=(i>-1||l)&&-1===e.indexOf("--\x3e",i+1);const o=t.lastAttributeNameRegex.exec(e);s+=null===o?e+(l?r:t.nodeMarker):e.substr(0,o.index)+o[1]+o[2]+t.boundAttributeSuffix+o[3]+t.marker}return s+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==s&&(t=s.createHTML(t)),e.innerHTML=t,e}}exports.TemplateResult=l;class n extends l{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),s=t.content,r=s.firstChild;return s.removeChild(r),(0,e.reparentNodes)(s,r.firstChild),t}}exports.SVGTemplateResult=n;
},{"./dom.js":"ytxR","./template.js":"Av0K"}],"atl2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.EventPart=exports.PropertyPart=exports.PropertyCommitter=exports.BooleanAttributePart=exports.NodePart=exports.AttributePart=exports.AttributeCommitter=exports.isIterable=exports.isPrimitive=void 0;var t=require("./directive.js"),e=require("./dom.js"),i=require("./part.js"),s=require("./template-instance.js"),n=require("./template-result.js"),r=require("./template.js");const o=t=>null===t||!("object"==typeof t||"function"==typeof t);exports.isPrimitive=o;const a=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);exports.isIterable=a;class h{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let s=0;s<i.length-1;s++)this.parts[s]=this._createPart()}_createPart(){return new l(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!a(t))return t}let s="";for(let n=0;n<e;n++){s+=t[n];const e=i[n];if(void 0!==e){const t=e.value;if(o(t)||!a(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}exports.AttributeCommitter=h;class l{constructor(t){this.value=void 0,this.committer=t}setValue(e){e===i.noChange||o(e)&&e===this.value||(this.value=e,(0,t.isDirective)(e)||(this.committer.dirty=!0))}commit(){for(;(0,t.isDirective)(this.value);){const t=this.value;this.value=i.noChange,t(this)}this.value!==i.noChange&&this.committer.commit()}}exports.AttributePart=l;class u{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild((0,r.createMarker)()),this.endNode=t.appendChild((0,r.createMarker)())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=(0,r.createMarker)()),t.__insert(this.endNode=(0,r.createMarker)())}insertAfterPart(t){t.__insert(this.startNode=(0,r.createMarker)()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}const e=this.__pendingValue;e!==i.noChange&&(o(e)?e!==this.value&&this.__commitText(e):e instanceof n.TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):a(e)?this.__commitIterable(e):e===i.nothing?(this.value=i.nothing,this.clear()):this.__commitText(e))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof s.TemplateInstance&&this.value.template===e)this.value.update(t.values);else{const i=new s.TemplateInstance(e,t.processor,this.options),n=i._clone();i.update(t.values),this.__commitNode(n),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const n of t)void 0===(i=e[s])&&(i=new u(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(n),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){(0,e.removeNodes)(this.startNode.parentNode,t.nextSibling,this.endNode)}}exports.NodePart=u;class d{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=i.noChange}}exports.BooleanAttributePart=d;class c extends h{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new p(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}exports.PropertyCommitter=c;class p extends l{}exports.PropertyPart=p;let _=!1;(()=>{try{const e={get capture(){return _=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(t){}})();class m{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;(0,t.isDirective)(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=i.noChange,t(this)}if(this.__pendingValue===i.noChange)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),r=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),r&&(this.__options=v(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=i.noChange}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}exports.EventPart=m;const v=t=>t&&(_?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);
},{"./directive.js":"uWh2","./dom.js":"ytxR","./part.js":"pnLb","./template-instance.js":"bn5t","./template-result.js":"cVNN","./template.js":"Av0K"}],"gbKZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.templateFactory=t,exports.templateCaches=void 0;var e=require("./template.js");function t(t){let s=r.get(t.type);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},r.set(t.type,s));let n=s.stringsArray.get(t.strings);if(void 0!==n)return n;const a=t.strings.join(e.marker);return void 0===(n=s.keyString.get(a))&&(n=new e.Template(t,t.getTemplateElement()),s.keyString.set(a,n)),s.stringsArray.set(t.strings,n),n}const r=new Map;exports.templateCaches=r;
},{"./template.js":"Av0K"}],"Fhpq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.render=exports.parts=void 0;var e=require("./dom.js"),t=require("./parts.js"),r=require("./template-factory.js");const s=new WeakMap;exports.parts=s;const o=(o,a,p)=>{let d=s.get(a);void 0===d&&((0,e.removeNodes)(a,a.firstChild),s.set(a,d=new t.NodePart(Object.assign({templateFactory:r.templateFactory},p))),d.appendInto(a)),d.setValue(o),d.commit()};exports.render=o;
},{"./dom.js":"ytxR","./parts.js":"atl2","./template-factory.js":"gbKZ"}],"LBiL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.defaultTemplateProcessor=exports.DefaultTemplateProcessor=void 0;var e=require("./parts.js");class t{handleAttributeExpressions(t,r,s,o){const a=r[0];if("."===a){return new e.PropertyCommitter(t,r.slice(1),s).parts}return"@"===a?[new e.EventPart(t,r.slice(1),o.eventContext)]:"?"===a?[new e.BooleanAttributePart(t,r.slice(1),s)]:new e.AttributeCommitter(t,r,s).parts}handleTextExpression(t){return new e.NodePart(t)}}exports.DefaultTemplateProcessor=t;const r=new t;exports.defaultTemplateProcessor=r;
},{"./parts.js":"atl2"}],"SPDu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"DefaultTemplateProcessor",{enumerable:!0,get:function(){return e.DefaultTemplateProcessor}}),Object.defineProperty(exports,"defaultTemplateProcessor",{enumerable:!0,get:function(){return e.defaultTemplateProcessor}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return t.SVGTemplateResult}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return t.TemplateResult}}),Object.defineProperty(exports,"directive",{enumerable:!0,get:function(){return r.directive}}),Object.defineProperty(exports,"isDirective",{enumerable:!0,get:function(){return r.isDirective}}),Object.defineProperty(exports,"removeNodes",{enumerable:!0,get:function(){return n.removeNodes}}),Object.defineProperty(exports,"reparentNodes",{enumerable:!0,get:function(){return n.reparentNodes}}),Object.defineProperty(exports,"noChange",{enumerable:!0,get:function(){return o.noChange}}),Object.defineProperty(exports,"nothing",{enumerable:!0,get:function(){return o.nothing}}),Object.defineProperty(exports,"AttributeCommitter",{enumerable:!0,get:function(){return i.AttributeCommitter}}),Object.defineProperty(exports,"AttributePart",{enumerable:!0,get:function(){return i.AttributePart}}),Object.defineProperty(exports,"BooleanAttributePart",{enumerable:!0,get:function(){return i.BooleanAttributePart}}),Object.defineProperty(exports,"EventPart",{enumerable:!0,get:function(){return i.EventPart}}),Object.defineProperty(exports,"isIterable",{enumerable:!0,get:function(){return i.isIterable}}),Object.defineProperty(exports,"isPrimitive",{enumerable:!0,get:function(){return i.isPrimitive}}),Object.defineProperty(exports,"NodePart",{enumerable:!0,get:function(){return i.NodePart}}),Object.defineProperty(exports,"PropertyCommitter",{enumerable:!0,get:function(){return i.PropertyCommitter}}),Object.defineProperty(exports,"PropertyPart",{enumerable:!0,get:function(){return i.PropertyPart}}),Object.defineProperty(exports,"parts",{enumerable:!0,get:function(){return u.parts}}),Object.defineProperty(exports,"render",{enumerable:!0,get:function(){return u.render}}),Object.defineProperty(exports,"templateCaches",{enumerable:!0,get:function(){return p.templateCaches}}),Object.defineProperty(exports,"templateFactory",{enumerable:!0,get:function(){return p.templateFactory}}),Object.defineProperty(exports,"TemplateInstance",{enumerable:!0,get:function(){return a.TemplateInstance}}),Object.defineProperty(exports,"createMarker",{enumerable:!0,get:function(){return s.createMarker}}),Object.defineProperty(exports,"isTemplatePartActive",{enumerable:!0,get:function(){return s.isTemplatePartActive}}),Object.defineProperty(exports,"Template",{enumerable:!0,get:function(){return s.Template}}),exports.svg=exports.html=void 0;var e=require("./lib/default-template-processor.js"),t=require("./lib/template-result.js"),r=require("./lib/directive.js"),n=require("./lib/dom.js"),o=require("./lib/part.js"),i=require("./lib/parts.js"),u=require("./lib/render.js"),p=require("./lib/template-factory.js"),a=require("./lib/template-instance.js"),s=require("./lib/template.js");"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const l=(r,...n)=>new t.TemplateResult(r,n,"html",e.defaultTemplateProcessor);exports.html=l;const c=(r,...n)=>new t.SVGTemplateResult(r,n,"svg",e.defaultTemplateProcessor);exports.svg=c;
},{"./lib/default-template-processor.js":"LBiL","./lib/template-result.js":"cVNN","./lib/directive.js":"uWh2","./lib/dom.js":"ytxR","./lib/part.js":"pnLb","./lib/parts.js":"atl2","./lib/render.js":"Fhpq","./lib/template-factory.js":"gbKZ","./lib/template-instance.js":"bn5t","./lib/template.js":"Av0K"}],"eBH8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return a.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return a.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return a.TemplateResult}}),exports.render=exports.shadyTemplateFactory=void 0;var e=require("./dom.js"),t=require("./modify-template.js"),r=require("./render.js"),o=require("./template-factory.js"),n=require("./template-instance.js"),s=require("./template.js"),a=require("../lit-html.js");const l=(e,t)=>`${e}--${t}`;let i=!0;void 0===window.ShadyCSS?i=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),i=!1);const d=e=>t=>{const r=l(t.type,e);let n=o.templateCaches.get(r);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},o.templateCaches.set(r,n));let a=n.stringsArray.get(t.strings);if(void 0!==a)return a;const d=t.strings.join(s.marker);if(void 0===(a=n.keyString.get(d))){const r=t.getTemplateElement();i&&window.ShadyCSS.prepareTemplateDom(r,e),a=new s.Template(t,r),n.keyString.set(d,a)}return n.stringsArray.set(t.strings,a),a};exports.shadyTemplateFactory=d;const p=["html","svg"],c=e=>{p.forEach(r=>{const n=o.templateCaches.get(l(r,e));void 0!==n&&n.keyString.forEach(e=>{const{element:{content:r}}=e,o=new Set;Array.from(r.querySelectorAll("style")).forEach(e=>{o.add(e)}),(0,t.removeNodesFromTemplate)(e,o)})})},m=new Set,y=(e,r,o)=>{m.add(e);const n=o?o.element:document.createElement("template"),s=r.querySelectorAll("style"),{length:a}=s;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(n,e);const l=document.createElement("style");for(let t=0;t<a;t++){const e=s[t];e.parentNode.removeChild(e),l.textContent+=e.textContent}c(e);const i=n.content;o?(0,t.insertNodeIntoTemplate)(o,l,i.firstChild):i.insertBefore(l,i.firstChild),window.ShadyCSS.prepareTemplateStyles(n,e);const d=i.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)r.insertBefore(d.cloneNode(!0),r.firstChild);else if(o){i.insertBefore(l,i.firstChild);const e=new Set;e.add(l),(0,t.removeNodesFromTemplate)(o,e)}},S=(t,o,s)=>{if(!s||"object"!=typeof s||!s.scopeName)throw new Error("The `scopeName` option is required.");const a=s.scopeName,l=r.parts.has(o),p=i&&11===o.nodeType&&!!o.host,c=p&&!m.has(a),S=c?document.createDocumentFragment():o;if((0,r.render)(t,S,Object.assign({templateFactory:d(a)},s)),c){const t=r.parts.get(S);r.parts.delete(S);const s=t.value instanceof n.TemplateInstance?t.value.template:void 0;y(a,S,s),(0,e.removeNodes)(o,o.firstChild),o.appendChild(S),r.parts.set(o,t)}!l&&p&&window.ShadyCSS.styleElement(o.host)};exports.render=S;
},{"./dom.js":"ytxR","./modify-template.js":"NXoq","./render.js":"Fhpq","./template-factory.js":"gbKZ","./template-instance.js":"bn5t","./template.js":"Av0K","../lit-html.js":"SPDu"}],"fKvB":[function(require,module,exports) {
"use strict";var t;Object.defineProperty(exports,"__esModule",{value:!0}),exports.UpdatingElement=exports.notEqual=exports.defaultConverter=void 0,window.JSCompiler_renameProperty=((t,e)=>t);const e={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}};exports.defaultConverter=e;const r=(t,e)=>e!==t&&(e==e||t==t);exports.notEqual=r;const s={attribute:!0,type:String,converter:e,reflect:!1,hasChanged:r},i=1,a=4,o=8,p=16,n="finalized";class h extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,r)=>{const s=this._attributeNameForProperty(r,e);void 0!==s&&(this._attributeToPropertyMap.set(s,r),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=s){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const r="symbol"==typeof t?Symbol():`__${t}`,i=this.getPropertyDescriptor(t,r,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(s){const i=this[t];this[e]=s,this.requestUpdateInternal(t,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||s}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty(n)||t.finalize(),this[n]=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const r of e)this.createProperty(r,t[r])}}static _attributeNameForProperty(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,s=r){return s(t,e)}static _propertyValueFromAttribute(t,r){const s=r.type,i=r.converter||e,a="function"==typeof i?i:i.fromAttribute;return a?a(t,s):t}static _propertyValueToAttribute(t,r){if(void 0===r.reflect)return;const s=r.type,i=r.converter;return(i&&i.toAttribute||e.toAttribute)(t,s)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,r){e!==r&&this._attributeToProperty(t,r)}_propertyToAttribute(t,e,r=s){const i=this.constructor,a=i._attributeNameForProperty(t,r);if(void 0!==a){const t=i._propertyValueToAttribute(e,r);if(void 0===t)return;this._updateState=this._updateState|o,null==t?this.removeAttribute(a):this.setAttribute(a,t),this._updateState=this._updateState&~o}}_attributeToProperty(t,e){if(this._updateState&o)return;const r=this.constructor,s=r._attributeToPropertyMap.get(t);if(void 0!==s){const t=r.getPropertyOptions(s);this._updateState=this._updateState|p,this[s]=r._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~p}}requestUpdateInternal(t,e,r){let s=!0;if(void 0!==t){const i=this.constructor;r=r||i.getPropertyOptions(t),i._valueHasChanged(this[t],e,r.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==r.reflect||this._updateState&p||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,r))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=this._updateState|a;try{await this._updatePromise}catch(e){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return this._updateState&a}get hasUpdated(){return this._updateState&i}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))?this.update(e):this._markUpdated()}catch(r){throw t=!1,this._markUpdated(),r}t&&(this._updateState&i||(this._updateState=this._updateState|i,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~a}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}exports.UpdatingElement=h,h[t=n]=!0;
},{}],"FzpZ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.property=i,exports.internalProperty=s,exports.query=c,exports.queryAsync=u,exports.queryAll=l,exports.eventOptions=f,exports.queryAssignedNodes=b,exports.customElement=void 0;const e=(e,t)=>(window.customElements.define(e,t),t),t=(e,t)=>{const{kind:r,elements:n}=t;return{kind:r,elements:n,finisher(t){window.customElements.define(e,t)}}},r=r=>n=>"function"==typeof n?e(r,n):t(r,n);exports.customElement=r;const n=(e,t)=>"method"!==t.kind||!t.descriptor||"value"in t.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}}:Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}),o=(e,t,r)=>{t.constructor.createProperty(r,e)};function i(e){return(t,r)=>void 0!==r?o(e,t,r):n(e,t)}function s(e){return i({attribute:!1,hasChanged:null==e?void 0:e.hasChanged})}function c(e,t){return(r,n)=>{const o={get(){return this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof n?Symbol():`__${n}`;o.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(e)),this[t]}}return void 0!==n?a(o,r,n):d(o,r)}}function u(e){return(t,r)=>{const n={async get(){return await this.updateComplete,this.renderRoot.querySelector(e)},enumerable:!0,configurable:!0};return void 0!==r?a(n,t,r):d(n,t)}}function l(e){return(t,r)=>{const n={get(){return this.renderRoot.querySelectorAll(e)},enumerable:!0,configurable:!0};return void 0!==r?a(n,t,r):d(n,t)}}const a=(e,t,r)=>{Object.defineProperty(t,r,e)},d=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),p=(e,t)=>Object.assign(Object.assign({},t),{finisher(r){Object.assign(r.prototype[t.key],e)}}),y=(e,t,r)=>{Object.assign(t[r],e)};function f(e){return(t,r)=>void 0!==r?y(e,t,r):p(e,t)}const m=Element.prototype,h=m.msMatchesSelector||m.webkitMatchesSelector;function b(e="",t=!1,r=""){return(n,o)=>{const i={get(){const n=`slot${e?`[name=${e}]`:":not([name])"}`,o=this.renderRoot.querySelector(n);let i=o&&o.assignedNodes({flatten:t});return i&&r&&(i=i.filter(e=>e.nodeType===Node.ELEMENT_NODE&&e.matches?e.matches(r):h.call(e,r))),i},enumerable:!0,configurable:!0};return void 0!==o?a(i,n,o):d(i,n)}}
},{}],"ZFCR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.css=exports.unsafeCSS=exports.CSSResult=exports.supportsAdoptingStyleSheets=void 0;const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype;exports.supportsAdoptingStyleSheets=e;const t=Symbol();class s{constructor(e,s){if(s!==t)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(e?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}exports.CSSResult=s;const o=e=>new s(String(e),t);exports.unsafeCSS=o;const r=e=>{if(e instanceof s)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)},n=(e,...o)=>{const n=o.reduce((t,s,o)=>t+r(s)+e[o+1],e[0]);return new s(n,t)};exports.css=n;
},{}],"bhxD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={LitElement:!0,html:!0,svg:!0,TemplateResult:!0,SVGTemplateResult:!0};Object.defineProperty(exports,"html",{enumerable:!0,get:function(){return n.html}}),Object.defineProperty(exports,"svg",{enumerable:!0,get:function(){return n.svg}}),Object.defineProperty(exports,"TemplateResult",{enumerable:!0,get:function(){return n.TemplateResult}}),Object.defineProperty(exports,"SVGTemplateResult",{enumerable:!0,get:function(){return n.SVGTemplateResult}}),exports.LitElement=void 0;var t=require("lit-html/lib/shady-render.js"),s=require("./lib/updating-element.js");Object.keys(s).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||t in exports&&exports[t]===s[t]||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return s[t]}}))});var r=require("./lib/decorators.js");Object.keys(r).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||t in exports&&exports[t]===r[t]||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return r[t]}}))});var n=require("lit-html/lit-html.js"),o=require("./lib/css-tag.js");Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(e,t)||t in exports&&exports[t]===o[t]||Object.defineProperty(exports,t,{enumerable:!0,get:function(){return o[t]}}))}),(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const i={};class l extends s.UpdatingElement{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e),s),s=t(e,new Set),r=[];s.forEach(e=>r.unshift(e)),this._styles=r}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map(e=>{if(e instanceof CSSStyleSheet&&!o.supportsAdoptingStyleSheets){const t=Array.prototype.slice.call(e.cssRules).reduce((e,t)=>e+t.cssText,"");return(0,o.unsafeCSS)(t)}return e})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?o.supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=e.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map(e=>e.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==i&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)}))}render(){return i}}exports.LitElement=l,l.finalized=!0,l.render=t.render;
},{"lit-html/lib/shady-render.js":"eBH8","./lib/updating-element.js":"fKvB","./lib/decorators.js":"FzpZ","lit-html/lit-html.js":"SPDu","./lib/css-tag.js":"ZFCR"}],"mwEU":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SevenSegmentElement=void 0;var s=require("lit-element"),e=function(s,e,t,n){var i,o=arguments.length,a=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,t):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(s,e,t,n);else for(var g=s.length-1;g>=0;g--)(i=s[g])&&(a=(o<3?i(a):o>3?i(e,t,a):i(e,t))||a);return o>3&&a&&Object.defineProperty(e,t,a),a};let t=class extends s.LitElement{constructor(){super(...arguments),this.color="red",this.offColor="#444",this.background="black",this.digits=1,this.colon=!1,this.colonValue=!1,this.pins="top",this.values=[0,0,0,0,0,0,0,0]}get pinInfo(){const s=s=>{const{startX:e,cols:t,bottomY:n}=this.pinPositions,i=(s-1)%t,o=1-Math.floor((s-1)/t);return{number:s,x:3.78*(e+1.27+2.54*(o?i:t-i-1)),y:3.78*("top"===this.pins?o?n+1:1:o?n+2:0)}};switch(this.digits){case 4:return[Object.assign(Object.assign({name:"A"},s(13)),{signals:[],description:"Segment A"}),Object.assign(Object.assign({name:"B"},s(9)),{signals:[],description:"Segment B"}),Object.assign(Object.assign({name:"C"},s(4)),{signals:[],description:"Segment C"}),Object.assign(Object.assign({name:"D"},s(2)),{signals:[],description:"Segment D"}),Object.assign(Object.assign({name:"E"},s(1)),{signals:[],description:"Segment E"}),Object.assign(Object.assign({name:"F"},s(12)),{signals:[],description:"Segment F"}),Object.assign(Object.assign({name:"G"},s(5)),{signals:[],description:"Segment G"}),Object.assign(Object.assign({name:"DP"},s(3)),{signals:[],description:"Decimal Point"}),Object.assign(Object.assign({name:"DIG1"},s(14)),{signals:[],description:"Digit 1 Common"}),Object.assign(Object.assign({name:"DIG2"},s(11)),{signals:[],description:"Digit 2 Common"}),Object.assign(Object.assign({name:"DIG3"},s(10)),{signals:[],description:"Digit 3 Common"}),Object.assign(Object.assign({name:"DIG4"},s(6)),{signals:[],description:"Digit 4 Common"}),Object.assign(Object.assign({name:"COM"},s(7)),{signals:[],description:"Common pin"}),Object.assign(Object.assign({name:"CLN"},s(8)),{signals:[],description:"Colon"})];case 2:return[Object.assign(Object.assign({name:"DIG1"},s(8)),{signals:[],description:"Digit 1 Common"}),Object.assign(Object.assign({name:"DIG2"},s(7)),{signals:[],description:"Digit 2 Common"}),Object.assign(Object.assign({name:"A"},s(10)),{signals:[],description:"Segment A"}),Object.assign(Object.assign({name:"B"},s(9)),{signals:[],description:"Segment B"}),Object.assign(Object.assign({name:"C"},s(1)),{signals:[],description:"Segment C"}),Object.assign(Object.assign({name:"D"},s(4)),{signals:[],description:"Segment D"}),Object.assign(Object.assign({name:"E"},s(3)),{signals:[],description:"Segment E"}),Object.assign(Object.assign({name:"F"},s(6)),{signals:[],description:"Segment F"}),Object.assign(Object.assign({name:"G"},s(5)),{signals:[],description:"Segment G"}),Object.assign(Object.assign({name:"DP"},s(2)),{signals:[],description:"Decimal Point"})];case 1:default:return[Object.assign(Object.assign({name:"COM.1"},s(3)),{signals:[],description:"Common"}),Object.assign(Object.assign({name:"COM.2"},s(8)),{signals:[],description:"Common"}),Object.assign(Object.assign({name:"A"},s(7)),{signals:[],description:"Segment A"}),Object.assign(Object.assign({name:"B"},s(6)),{signals:[],description:"Segment B"}),Object.assign(Object.assign({name:"C"},s(4)),{signals:[],description:"Segment C"}),Object.assign(Object.assign({name:"D"},s(2)),{signals:[],description:"Segment D"}),Object.assign(Object.assign({name:"E"},s(1)),{signals:[],description:"Segment E"}),Object.assign(Object.assign({name:"F"},s(9)),{signals:[],description:"Segment F"}),Object.assign(Object.assign({name:"G"},s(10)),{signals:[],description:"Segment G"}),Object.assign(Object.assign({name:"DP"},s(5)),{signals:[],description:"Decimal Point"})]}}static get styles(){return s.css`
      polygon {
        transform: scale(0.9);
        transform-origin: 50% 50%;
        transform-box: fill-box;
      }
    `}get pinPositions(){const{digits:s}=this,e=4===s?14:10,t=Math.ceil(e/2);return{startX:(12.55*s-2.54*t)/2,bottomY:"extend"===this.pins?21:17,cols:t}}get yOffset(){return"extend"===this.pins?2:0}renderDigit(e,t){const n=s=>this.values[t+s]?this.color:this.offColor;return s.svg`
      <g transform="skewX(-8) translate(${e}, ${this.yOffset+2.4}) scale(0.81)">
        <polygon points="2 0 8 0 9 1 8 2 2 2 1 1" fill="${n(0)}" />
        <polygon points="10 2 10 8 9 9 8 8 8 2 9 1" fill="${n(1)}" />
        <polygon points="10 10 10 16 9 17 8 16 8 10 9 9" fill="${n(2)}" />
        <polygon points="8 18 2 18 1 17 2 16 8 16 9 17" fill="${n(3)}" />
        <polygon points="0 16 0 10 1 9 2 10 2 16 1 17" fill="${n(4)}" />
        <polygon points="0 8 0 2 1 1 2 2 2 8 1 9" fill=${n(5)} />
        <polygon points="2 8 8 8 9 9 8 10 2 10 1 9" fill=${n(6)} />
      </g>
      <circle cx="${e+7.4}" cy="${this.yOffset+16}" r="0.89" fill="${n(7)}" />
    `}renderColon(){const{yOffset:e}=this,t=1.5+12.7*Math.round(this.digits/2),n=this.colonValue?this.color:this.offColor;return s.svg`
      <g transform="skewX(-8)"  fill="${n}">
        <circle cx="${t}" cy="${e+5.75}" r="0.89" />
        <circle cx="${t}" cy="${e+13.25}" r="0.89" />
      </g>
    `}renderPins(){const{cols:e,bottomY:t,startX:n}=this.pinPositions;return s.svg`
      <g fill="url(#pin-pattern)" transform="translate(${n}, 0)">
        <rect height="2" width=${2.54*e} />
        <rect height="2" width=${2.54*e} transform="translate(0, ${t})" />
      </g>
    `}render(){const{digits:e,colon:t,pins:n,yOffset:i}=this,o=12.55*e,a="extend"===n?23:19,g=[];for(let s=0;s<e;s++)g.push(this.renderDigit(3.5+12.7*s,8*s));return s.html`
      <svg
        width="${o}mm"
        height="${a}mm"
        version="1.1"
        viewBox="0 0 ${o} ${a}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="pin-pattern" height="2" width="2.54" patternUnits="userSpaceOnUse">
            ${"extend"===n?s.svg`<rect x="1.02" y="0" height="2" width="0.5" fill="#aaa" />`:s.svg`<circle cx="1.27" cy="1" r=0.5 fill="#aaa" />`}
          </pattern>
        </defs>
        <rect x="0" y="${i}" width="${o}" height="19" />
        ${g}<!-- -->
        ${t?this.renderColon():null}<!-- -->
        ${"none"!==n?this.renderPins():null}
      </svg>
    `}};exports.SevenSegmentElement=t,e([(0,s.property)()],t.prototype,"color",void 0),e([(0,s.property)()],t.prototype,"offColor",void 0),e([(0,s.property)()],t.prototype,"background",void 0),e([(0,s.property)({type:Number})],t.prototype,"digits",void 0),e([(0,s.property)({type:Boolean})],t.prototype,"colon",void 0),e([(0,s.property)({type:Boolean})],t.prototype,"colonValue",void 0),e([(0,s.property)()],t.prototype,"pins",void 0),e([(0,s.property)({type:Array})],t.prototype,"values",void 0),exports.SevenSegmentElement=t=e([(0,s.customElement)("wokwi-7segment")],t);
},{"lit-element":"bhxD"}],"ksYL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pinsFemalePattern=void 0;var t=require("lit-element");const e=t.svg`
  <pattern id="pins-female" width="2.54" height="2.54" patternUnits="userSpaceOnUse">
    <rect x="0" y="0" width="2.54" height="2.54" fill="#333"></rect>
    <rect x="1.079" y="0.896" width="0.762" height="0.762" style="fill: #191919"></rect>
    <path
      transform="translate(1.079, 1.658) rotate(180 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.25"
    ></path>
    <path
      transform="translate(1.841, 1.658) rotate(90 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.3; fill: #fff"
    ></path>
    <path
      transform="translate(1.841, 0.896)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.15; fill: #fff"
    ></path>
    <path
      transform="translate(1.079, 0.896) rotate(270 0 0)"
      d="m 0 0 v 0.762 l 0.433,0.433 c 0.046,-0.046 0.074,-0.109 0.074,-0.179 v -1.27 c 0,-0.070 -0.028,-0.133 -0.074,-0.179 z"
      style="opacity: 0.35"
    ></path>
  </pattern>
`;exports.pinsFemalePattern=e;
},{"lit-element":"bhxD"}],"xoL4":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.usart=exports.spi=exports.i2c=exports.analog=void 0;const s=s=>({type:"analog",channel:s});exports.analog=s;const t=(s,t=0)=>({type:"i2c",signal:s,bus:t});exports.i2c=t;const e=(s,t=0)=>({type:"spi",signal:s,bus:t});exports.spi=e;const o=(s,t=0)=>({type:"usart",signal:s,bus:t});exports.usart=o;
},{}],"AJVk":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ArduinoUnoElement=void 0;var t=require("lit-element"),e=require("./patterns/pins-female"),l=require("./pin"),a=function(t,e,l,a){var s,n=arguments.length,i=n<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,l):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,l,a);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(i=(n<3?s(i):n>3?s(e,l,i):s(e,l))||i);return n>3&&i&&Object.defineProperty(e,l,i),i};let s=class extends t.LitElement{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.pinInfo=[{name:"A5.2",x:87,y:9,signals:[(0,l.analog)(5),(0,l.i2c)("SCL")]},{name:"A4.2",x:97,y:9,signals:[(0,l.analog)(4),(0,l.i2c)("SDA")]},{name:"AREF",x:106,y:9,signals:[]},{name:"GND.1",x:115.5,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:125,y:9,signals:[(0,l.spi)("SCK")]},{name:"12",x:134.5,y:9,signals:[(0,l.spi)("MISO")]},{name:"11",x:144,y:9,signals:[(0,l.spi)("MOSI"),{type:"pwm"}]},{name:"10",x:153.5,y:9,signals:[(0,l.spi)("SS"),{type:"pwm"}]},{name:"9",x:163,y:9,signals:[{type:"pwm"}]},{name:"8",x:173,y:9,signals:[]},{name:"7",x:189,y:9,signals:[]},{name:"6",x:198.5,y:9,signals:[{type:"pwm"}]},{name:"5",x:208,y:9,signals:[{type:"pwm"}]},{name:"4",x:217.5,y:9,signals:[]},{name:"3",x:227,y:9,signals:[{type:"pwm"}]},{name:"2",x:236.5,y:9,signals:[]},{name:"1",x:246,y:9,signals:[(0,l.usart)("TX")]},{name:"0",x:255.5,y:9,signals:[(0,l.usart)("RX")]},{name:"IOREF",x:131,y:191.5,signals:[]},{name:"RESET",x:140.5,y:191.5,signals:[]},{name:"3.3V",x:150,y:191.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:160,y:191.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:169.5,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:179,y:191.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:188.5,y:191.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208,y:191.5,signals:[(0,l.analog)(0)]},{name:"A1",x:217.5,y:191.5,signals:[(0,l.analog)(1)]},{name:"A2",x:227,y:191.5,signals:[(0,l.analog)(2)]},{name:"A3",x:236.5,y:191.5,signals:[(0,l.analog)(3)]},{name:"A4",x:246,y:191.5,signals:[(0,l.analog)(4),(0,l.i2c)("SCL")]},{name:"A5",x:255.5,y:191.5,signals:[(0,l.analog)(5),(0,l.i2c)("SDA")]}]}render(){const{ledPower:l,led13:a,ledRX:s,ledTX:n}=this;return t.html`
      <svg
        width="72.58mm"
        height="53.34mm"
        version="1.1"
        viewBox="-4 0 72.58 53.34"
        style="font-size: 2px; font-family: monospace"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <g id="led-body" fill="#eee">
            <rect x="0" y="0" height="1.2" width="2.6" fill="#c6c6c6" />
            <rect x="0.6" y="-0.1" width="1.35" height="1.4" stroke="#aaa" stroke-width="0.05" />
          </g>
        </defs>

        <filter id="ledFilter" x="-0.8" y="-0.8" height="2.2" width="2.8">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        ${e.pinsFemalePattern}

        <pattern id="pin-male" width="2.54" height="4.80" patternUnits="userSpaceOnUse">
          <rect ry="0.3" rx="0.3" width="2.12" height="4.80" fill="#565656" />
          <ellipse cx="1" cy="1.13" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
          <ellipse cx="1" cy="3.67" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
        </pattern>

        <pattern id="mcu-leads" width="2.54" height="0.508" patternUnits="userSpaceOnUse">
          <path
            d="M 0.254,0 C 0.114,0 0,0.114 0,0.254 v 0 c 0,0.139 0,0.253 0,0.253 h 1.523 c 0,0 0,-0.114 0,-0.253 v 0 C 1.523,0.114 1.409,0 1.269,0 Z"
            fill="#ddd"
          />
        </pattern>

        <!-- PCB -->
        <path
          d="m0.999 0a1 1 0 0 0-0.999 0.999v51.34a1 1 0 0 0 0.999 0.999h64.04a1 1 0 0 0 0.999-0.999v-1.54l2.539-2.539v-32.766l-2.539-2.539v-11.43l-1.524-1.523zm14.078 0.835h0.325l0.212 0.041h0l0.105 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.180 0.270 0.017 0.042 0.097 0.234 0.01 0.023 0.050 0.252 0.013 0.066v0.325l-0.063 0.318-0.040 0.097-0.083 0.202-0 0.001-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.020-0.212 0.042h-0.325l-0.212-0.042-0.106-0.020-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0 -0.001-0.083-0.202-0.040-0.097-0.063-0.318v-0.325l0.013-0.066 0.050-0.252 0.01-0.023 0.097-0.234 0.017-0.042 0.180-0.270 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021zm50.799 15.239h0.325l0.212 0.042 0.105 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.180 0.270 0.014 0.035 0.110 0.264 0.01 0.051 0.053 0.267v0.325l-0.03 0.152-0.033 0.166-0.037 0.089-0.079 0.191-0 0.020-0.180 0.270-0.229 0.229-0.270 0.180-0.071 0.029-0.228 0.094-0.106 0.021-0.212 0.042h-0.325l-0.212-0.042-0.106-0.021-0.228-0.094-0.071-0.029-0.270-0.180-0.229-0.229-0.180-0.270-0 -0.020-0.079-0.191-0.036-0.089-0.033-0.166-0.030-0.152v-0.325l0.053-0.267 0.010-0.051 0.109-0.264 0.014-0.035 0.180-0.270 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021zm0 27.94h0.325l0.180 0.036 0.138 0.027 0.212 0.087 0.058 0.024 0.029 0.012 0.270 0.180 0.229 0.229 0.180 0.270 0.124 0.300 0.063 0.319v0.325l-0.063 0.318-0.124 0.300-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.021-0.212 0.042h-0.325l-0.212-0.042-0.105-0.021-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0.124-0.300-0.063-0.318v-0.325l0.063-0.319 0.124-0.300 0.180-0.270 0.229-0.229 0.270-0.180 0.029-0.012 0.058-0.024 0.212-0.087 0.137-0.027zm-52.07 5.080h0.325l0.212 0.041 0.106 0.021 0.300 0.124 0.270 0.180 0.229 0.229 0.121 0.182 0.058 0.087h0l0.114 0.275 0.01 0.023 0.063 0.318v0.325l-0.035 0.179-0.027 0.139-0.01 0.023-0.114 0.275h-0l-0.180 0.270-0.229 0.229-0.270 0.180-0.300 0.124-0.106 0.020-0.212 0.042h-0.325l-0.212-0.042-0.105-0.020-0.300-0.124-0.270-0.180-0.229-0.229-0.180-0.270-0.114-0.275-0.01-0.023-0.027-0.139-0.036-0.179v-0.325l0.063-0.318 0.01-0.023 0.114-0.275 0.058-0.087 0.121-0.182 0.229-0.229 0.270-0.180 0.300-0.124 0.105-0.021z"
          fill="#2b6b99"
        />

        <!-- USB Connector -->
        <g style="fill:#b3b2b2;stroke:#b3b2b2;stroke-width:0.010">
          <ellipse cx="3.84" cy="9.56" rx="1.12" ry="1.03" />
          <ellipse cx="3.84" cy="21.04" rx="1.12" ry="1.03" />
          <g fill="#000">
            <rect width="11" height="11.93" x="-0.05" y="9.72" rx="0.2" ry="0.2" opacity="0.24" />
          </g>
          <rect x="-4" y="9.37" height="11.85" width="14.46" />
          <rect x="-4" y="9.61" height="11.37" width="14.05" fill="#706f6f" />
          <rect x="-4" y="9.71" height="11.17" width="13.95" fill="#9d9d9c" />
        </g>

        <!-- Power jack -->
        <g stroke-width=".254" fill="black">
          <path
            d="m-2.58 48.53v2.289c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-2.289z"
            fill="#252728"
            opacity=".3"
          />
          <path
            d="m11.334 42.946c0-0.558-0.509-1.016-1.132-1.016h-10.043v9.652h10.043c0.622 0 1.132-0.457 1.132-1.016z"
            opacity=".3"
          />
          <path
            d="m-2.072 40.914c-0.279 0-0.507 0.204-0.507 0.454v8.435c0 0.279 0.228 0.507 0.507 0.507h1.722c0.279 0 0.507-0.228 0.507-0.507v-8.435c0-0.249-0.228-0.454-0.507-0.454z"
          />
          <path
            d="m-2.58 48.784v1.019c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-1.019z"
            opacity=".3"
          />
          <path
            d="m11.334 43.327c0.139 0 0.254 0.114 0.254 0.254v4.064c0 0.139-0.114 0.254-0.254 0.254"
          />
          <path
            d="m11.334 42.438c0-0.558-0.457-1.016-1.016-1.016h-10.16v8.382h10.16c0.558 0 1.016-0.457 1.016-1.016z"
          />
          <path
            d="m10.064 49.804h-9.906v-8.382h1.880c-1.107 0-1.363 1.825-1.363 3.826 0 1.765 1.147 3.496 3.014 3.496h6.374z"
            opacity=".3"
          />
          <rect x="10.064" y="41.422" width=".254" height="8.382" fill="#ffffff" opacity=".2" />
          <path
            d="m10.318 48.744v1.059c0.558 0 1.016-0.457 1.016-1.016v-0.364c0 0.313-1.016 0.320-1.016 0.320z"
            opacity=".3"
          />
        </g>

        <!-- Pin Headers -->
        <g transform="translate(17.497 1.27)">
          <rect width="${.38+25.4}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(44.421 1.27)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(26.641 49.53)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(49.501 49.53)">
          <rect width="${.38+15.24}" height="2.54" fill="url(#pins-female)"></rect>
        </g>

        <!-- MCU -->
        <g>
          <path
            d="m64.932 41.627h-36.72c-0.209 0-0.379-0.170-0.379-0.379v-8.545c0-0.209 0.170-0.379 0.379-0.379h36.72c0.209 0 0.379 0.170 0.379 0.379v8.545c0 0.209-0.169 0.379-0.379 0.379z"
            fill="#292c2d"
          />
          <path
            d="m65.019 40.397c0 0.279-0.228 0.508-0.508 0.508h-35.879c-0.279 0-0.507 0.025-0.507-0.254v-6.338c0-0.279 0.228-0.508 0.507-0.508h35.879c0.279 0 0.508 0.228 0.508 0.508z"
            opacity=".3"
          />
          <path
            d="m65.019 40.016c0 0.279-0.228 0.508-0.508 0.508h-35.879c-0.279 0-0.507 0.448-0.507-0.508v-6.084c0-0.279 0.228-0.508 0.507-0.508h35.879c0.279 0 0.508 0.228 0.508 0.508z"
            fill="#3c4042"
          />
          <rect
            transform="translate(29.205, 32.778)"
            fill="url(#mcu-leads)"
            height="0.508"
            width="35.56"
          ></rect>
          <rect
            transform="translate(29.205, 41.159) scale(1 -1)"
            fill="url(#mcu-leads)"
            height="0.508"
            width="35.56"
          ></rect>
          <circle cx="33.269" cy="36.847" r="1.016" fill="#252728" />
          <circle cx="59.939" cy="36.847" r="1.016" fill="#252728" />
        </g>

        <!-- Programming Headers -->
        <g transform="translate(14.1 4.4)">
          <rect width="7" height="4.80" fill="url(#pin-male)" />
        </g>

        <g transform="translate(63 27.2) rotate(270 0 0)">
          <rect width="7" height="4.80" fill="url(#pin-male)" />
        </g>

        <!-- LEDs -->
        <g transform="translate(57.3, 16.21)">
          <use xlink:href="#led-body" />
          ${l&&t.svg`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="60.88" y="17.5">ON</tspan>
        </text>

        <g transform="translate(26.87,11.69)">
          <use xlink:href="#led-body" />
          ${a&&t.svg`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 16.2)">
          <use xlink:href="#led-body" />
          ${n&&t.svg`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26.9, 18.5)">
          <use xlink:href="#led-body" />
          ${s&&t.svg`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff" style="text-anchor: end">
          <tspan x="26.5" y="13">L</tspan>
          <tspan x="26.5" y="17.5">TX</tspan>
          <tspan x="26.5" y="19.8">RX</tspan>
          <tspan x="26.5" y="20">&nbsp;</tspan>
        </text>

        <!-- Pin Labels -->
        <rect x="28.27" y="10.34" width="36.5" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="40.84" y="9.48">DIGITAL (PWM ~)</tspan>
        </text>
        <text
          transform="translate(22.6 4) rotate(270 0 0)"
          fill="#fff"
          style="font-size: 2px; text-anchor: end; font-family: monospace"
        >
          <tspan x="0" dy="2.54">AREF</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">13</tspan>
          <tspan x="0" dy="2.54">12</tspan>
          <tspan x="0" dy="2.54">~11</tspan>
          <tspan x="0" dy="2.54">~10</tspan>
          <tspan x="0" dy="2.54">~9</tspan>
          <tspan x="0" dy="2.54">8</tspan>
          <tspan x="0" dy="4.08">~7</tspan>
          <tspan x="0" dy="2.54">~6</tspan>
          <tspan x="0" dy="2.54">~5</tspan>
          <tspan x="0" dy="2.54">4</tspan>
          <tspan x="0" dy="2.54">~3</tspan>
          <tspan x="0" dy="2.54">2</tspan>
          <tspan x="0" dy="2.54">TX→1</tspan>
          <tspan x="0" dy="2.54">RX←0</tspan>
          <tspan x="0" dy="2.54">&nbsp;</tspan>
        </text>

        <rect x="33.90" y="42.76" width="12.84" height="0.16" fill="#fff"></rect>
        <rect x="49.48" y="42.76" width="14.37" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="41" y="44.96">POWER</tspan>
          <tspan x="53.5" y="44.96">ANALOG IN</tspan>
        </text>
        <text transform="translate(29.19 49) rotate(270 0 0)" fill="#fff" style="font-weight: 700">
          <tspan x="0" dy="2.54">IOREF</tspan>
          <tspan x="0" dy="2.54">RESET</tspan>
          <tspan x="0" dy="2.54">3.3V</tspan>
          <tspan x="0" dy="2.54">5V</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">Vin</tspan>
          <tspan x="0" dy="4.54">A0</tspan>
          <tspan x="0" dy="2.54">A1</tspan>
          <tspan x="0" dy="2.54">A2</tspan>
          <tspan x="0" dy="2.54">A3</tspan>
          <tspan x="0" dy="2.54">A4</tspan>
          <tspan x="0" dy="2.54">A5</tspan>
          <tspan x="0" dy="2.54">&nbsp;</tspan>
        </text>

        <!-- Logo -->
        <path
          style="fill:none;stroke:#fff;stroke-width:1.03"
          d="m 34.21393,12.01079 c -1.66494,-0.13263 -3.06393,1.83547 -2.37559,3.36182 0.66469,1.65332 3.16984,2.10396 4.36378,0.77797 1.15382,-1.13053 1.59956,-2.86476 3.00399,-3.75901 1.43669,-0.9801 3.75169,-0.0547 4.02384,1.68886 0.27358,1.66961 -1.52477,3.29596 -3.15725,2.80101 -1.20337,-0.27199 -2.06928,-1.29866 -2.56193,-2.37788 -0.6046,-1.0328 -1.39499,-2.13327 -2.62797,-2.42367 -0.2191,-0.0497 -0.44434,-0.0693 -0.66887,-0.0691 z"
        />
        <path
          style="fill:none;stroke:#fff;stroke-width:0.56"
          d="m 39.67829,14.37519 h 1.75141 m -0.89321,-0.8757 v 1.7514 m -7.30334,-0.8757 h 2.10166"
        />
        <text x="31" y="20.2" style="font-size:2.8px;font-weight:bold;line-height:1.25;fill:#fff">
          ARDUINO
        </text>

        <rect
          style="fill:none;stroke:#fff;stroke-width:0.1;stroke-dasharray:0.1, 0.1"
          width="11"
          height="5.45"
          x="45.19"
          y="11.83"
          rx="1"
          ry="1"
        />

        <text x="46.5" y="16" style="font-size:5px; line-height:1.25" fill="#fff">
          UNO
        </text>
      </svg>
    `}};exports.ArduinoUnoElement=s,a([(0,t.property)()],s.prototype,"led13",void 0),a([(0,t.property)()],s.prototype,"ledRX",void 0),a([(0,t.property)()],s.prototype,"ledTX",void 0),a([(0,t.property)()],s.prototype,"ledPower",void 0),exports.ArduinoUnoElement=s=a([(0,t.customElement)("wokwi-arduino-uno")],s);
},{"lit-element":"bhxD","./patterns/pins-female":"ksYL","./pin":"xoL4"}],"n2M3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fontA00=void 0;const e=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,4,0,10,10,10,0,0,0,0,0,10,10,31,10,31,10,10,0,4,30,5,14,20,15,4,0,3,19,8,4,2,25,24,0,6,9,5,2,21,9,22,0,6,4,2,0,0,0,0,0,8,4,2,2,2,4,8,0,2,4,8,8,8,4,2,0,0,4,21,14,21,4,0,0,0,4,4,31,4,4,0,0,0,0,0,0,6,4,2,0,0,0,0,31,0,0,0,0,0,0,0,0,0,6,6,0,0,16,8,4,2,1,0,0,14,17,25,21,19,17,14,0,4,6,4,4,4,4,14,0,14,17,16,8,4,2,31,0,31,8,4,8,16,17,14,0,8,12,10,9,31,8,8,0,31,1,15,16,16,17,14,0,12,2,1,15,17,17,14,0,31,17,16,8,4,4,4,0,14,17,17,14,17,17,14,0,14,17,17,30,16,8,6,0,0,6,6,0,6,6,0,0,0,6,6,0,6,4,2,0,8,4,2,1,2,4,8,0,0,0,31,0,31,0,0,0,2,4,8,16,8,4,2,0,14,17,16,8,4,0,4,0,14,17,16,22,21,21,14,0,14,17,17,17,31,17,17,0,15,17,17,15,17,17,15,0,14,17,1,1,1,17,14,0,7,9,17,17,17,9,7,0,31,1,1,15,1,1,31,0,31,1,1,15,1,1,1,0,14,17,1,29,17,17,30,0,17,17,17,31,17,17,17,0,14,4,4,4,4,4,14,0,28,8,8,8,8,9,6,0,17,9,5,3,5,9,17,0,1,1,1,1,1,1,31,0,17,27,21,21,17,17,17,0,17,17,19,21,25,17,17,0,14,17,17,17,17,17,14,0,15,17,17,15,1,1,1,0,14,17,17,17,21,9,22,0,15,17,17,15,5,9,17,0,30,1,1,14,16,16,15,0,31,4,4,4,4,4,4,0,17,17,17,17,17,17,14,0,17,17,17,17,17,10,4,0,17,17,17,21,21,21,10,0,17,17,10,4,10,17,17,0,17,17,17,10,4,4,4,0,31,16,8,4,2,1,31,0,7,1,1,1,1,1,7,0,17,10,31,4,31,4,4,0,14,8,8,8,8,8,14,0,4,10,17,0,0,0,0,0,0,0,0,0,0,0,31,0,2,4,8,0,0,0,0,0,0,0,14,16,30,17,30,0,1,1,13,19,17,17,15,0,0,0,14,1,1,17,14,0,16,16,22,25,17,17,30,0,0,0,14,17,31,1,14,0,12,18,2,7,2,2,2,0,0,30,17,17,30,16,14,0,1,1,13,19,17,17,17,0,4,0,6,4,4,4,14,0,8,0,12,8,8,9,6,0,1,1,9,5,3,5,9,0,6,4,4,4,4,4,14,0,0,0,11,21,21,17,17,0,0,0,13,19,17,17,17,0,0,0,14,17,17,17,14,0,0,0,15,17,15,1,1,0,0,0,22,25,30,16,16,0,0,0,13,19,1,1,1,0,0,0,14,1,14,16,15,0,2,2,7,2,2,18,12,0,0,0,17,17,17,25,22,0,0,0,17,17,17,10,4,0,0,0,17,21,21,21,10,0,0,0,17,10,4,10,17,0,0,0,17,17,30,16,14,0,0,0,31,8,4,2,31,0,8,4,4,2,4,4,8,0,4,4,4,4,4,4,4,0,2,4,4,8,4,4,2,0,0,4,8,31,8,4,0,0,0,4,2,31,2,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,5,7,0,28,4,4,4,0,0,0,0,0,0,0,4,4,4,7,0,0,0,0,0,1,2,4,0,0,0,0,6,6,0,0,0,0,31,16,31,16,8,4,0,0,0,31,16,12,4,2,0,0,0,8,4,6,5,4,0,0,0,4,31,17,16,12,0,0,0,31,4,4,4,31,0,0,0,8,31,12,10,9,0,0,0,2,31,18,10,2,0,0,0,0,14,8,8,31,0,0,0,15,8,15,8,15,0,0,0,0,21,21,16,12,0,0,0,0,31,0,0,0,0,31,16,20,12,4,4,2,0,16,8,4,6,5,4,4,0,4,31,17,17,16,8,4,0,0,31,4,4,4,4,31,0,8,31,8,12,10,9,8,0,2,31,18,18,18,18,9,0,4,31,4,31,4,4,4,0,0,30,18,17,16,8,6,0,2,30,9,8,8,8,4,0,0,31,16,16,16,16,31,0,10,31,10,10,8,4,2,0,0,3,16,19,16,8,7,0,0,31,16,8,4,10,17,0,2,31,18,10,2,2,28,0,0,17,17,18,16,8,6,0,0,30,18,21,24,8,6,0,8,7,4,31,4,4,2,0,0,21,21,21,16,8,4,0,14,0,31,4,4,4,2,0,2,2,2,6,10,2,2,0,4,4,31,4,4,2,1,0,0,14,0,0,0,0,31,0,0,31,16,10,4,10,1,0,4,31,8,4,14,21,4,0,8,8,8,8,8,4,2,0,0,4,8,17,17,17,17,0,1,1,31,1,1,1,30,0,0,31,16,16,16,8,6,0,0,2,5,8,16,16,0,0,4,31,4,4,21,21,4,0,0,31,16,16,10,4,8,0,0,14,0,14,0,14,16,0,0,4,2,1,17,31,16,0,0,16,16,10,4,10,1,0,0,31,2,31,2,2,28,0,2,2,31,18,10,2,2,0,0,14,8,8,8,8,31,0,0,31,16,31,16,16,31,0,14,0,31,16,16,8,4,0,9,9,9,9,8,4,2,0,0,4,5,5,21,21,13,0,0,1,1,17,9,5,3,0,0,31,17,17,17,17,31,0,0,31,17,17,16,8,4,0,0,3,0,16,16,8,7,0,4,9,2,0,0,0,0,0,7,5,7,0,0,0,0,0,0,0,18,21,9,9,22,0,10,0,14,16,30,17,30,0,0,0,14,17,15,17,15,1,0,0,14,1,6,17,14,0,0,0,17,17,17,25,23,1,0,0,30,5,9,17,14,0,0,0,12,18,17,17,15,1,0,0,30,17,17,17,30,16,0,0,28,4,4,5,2,0,0,8,11,8,0,0,0,0,8,0,12,8,8,8,8,8,0,5,2,5,0,0,0,0,0,4,14,5,21,14,4,0,2,2,7,2,7,2,30,0,14,0,13,19,17,17,17,0,10,0,14,17,17,17,14,0,0,0,13,19,17,17,15,1,0,0,22,25,17,17,30,16,0,14,17,31,17,17,14,0,0,0,0,26,21,11,0,0,0,0,14,17,17,10,27,0,10,0,17,17,17,17,25,22,31,1,2,4,2,1,31,0,0,0,31,10,10,10,25,0,31,0,17,10,4,10,17,0,0,0,17,17,17,17,30,16,0,16,15,4,31,4,4,0,0,0,31,2,30,18,17,0,0,0,31,21,31,17,17,0,0,4,0,31,0,4,0,0,0,0,0,0,0,0,0,0,31,31,31,31,31,31,31,31]);exports.fontA00=e;
},{}],"VbbO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LCD1602Element=void 0;var t=require("lit-element"),e=require("./lcd1602-font-a00"),r=require("./pin"),i=function(t,e,r,i){var n,s=arguments.length,l=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,r,i);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(l=(s<3?n(l):s>3?n(e,r,l):n(e,r))||l);return s>3&&l&&Object.defineProperty(e,r,l),l};const n=2,s=16,l=3.55,o=5.95,h={green:"#6cb201",blue:"#000eff"};let a=class extends t.LitElement{constructor(){super(...arguments),this.color="black",this.background="green",this.characters=new Uint8Array(32),this.font=e.fontA00,this.cursor=!1,this.blink=!1,this.cursorX=0,this.cursorY=0,this.backlight=!0,this.pins="full"}static get styles(){return t.css`
      .cursor-blink {
        animation: cursor-blink;
      }

      @keyframes cursor-blink {
        from {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        75% {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }
    `}get pinInfo(){switch(this.pins){case"i2c":return[{name:"GND",x:4,y:32,number:1,signals:[{type:"power",signal:"GND"}]},{name:"VCC",x:4,y:41.5,number:2,signals:[{type:"power",signal:"VCC"}]},{name:"SDA",x:4,y:51,number:3,signals:[(0,r.i2c)("SDA")]},{name:"SCL",x:4,y:60.5,number:4,signals:[(0,r.i2c)("SCL")]}];case"full":default:return[{name:"VSS",x:32,y:131,number:1,signals:[{type:"power",signal:"GND"}]},{name:"VDD",x:41.5,y:131,number:2,signals:[{type:"power",signal:"VCC"}]},{name:"V0",x:51.5,y:131,number:3,signals:[]},{name:"RS",x:60.5,y:131,number:4,signals:[]},{name:"RW",x:70.5,y:131,number:5,signals:[]},{name:"E",x:80,y:131,number:6,signals:[]},{name:"D0",x:89.5,y:131,number:7,signals:[]},{name:"D1",x:99.5,y:131,number:8,signals:[]},{name:"D2",x:109,y:131,number:9,signals:[]},{name:"D3",x:118.5,y:131,number:10,signals:[]},{name:"D4",x:128,y:131,number:11,signals:[]},{name:"D5",x:137.5,y:131,number:12,signals:[]},{name:"D6",x:147,y:131,number:13,signals:[]},{name:"D7",x:156.5,y:131,number:14,signals:[]},{name:"A",x:166.5,y:131,number:15,signals:[]},{name:"K",x:176,y:131,number:16,signals:[]}]}}path(t){const e=[];for(let r=0;r<t.length;r++){const i=r%16*3.55,n=5.95*Math.floor(r/16);for(let s=0;s<8;s++){const l=this.font[8*t[r]+s];for(let t=0;t<5;t++)if(l&1<<t){const r=(i+.6*t).toFixed(2),l=(n+.7*s).toFixed(2);e.push(`M ${r} ${l}h0.55v0.65h-0.55Z`)}}}return e.join(" ")}renderCursor(){const e=12.45+3.55*this.cursorX,r=12.55+5.95*this.cursorY;if(this.cursorX<0||this.cursorX>=16||this.cursorY<0||this.cursorY>=2)return null;const i=[];if(this.blink&&i.push(t.svg`
        <rect x="${e}" y="${r}" width="2.95" height="5.55" fill="${this.color}">
          <animate
            attributeName="opacity"
            values="0;0;0;0;1;1;0;0;0;0"
            dur="1s"
            fill="freeze"
            repeatCount="indefinite"
          />
        </rect>
      `),this.cursor){const n=r+.7*7;i.push(t.svg`<rect x="${e}" y="${n}" width="2.95" height="0.65" fill="${this.color}" />`)}return i}renderI2CPins(){return t.svg`
      <rect x="7.55" y="-2.5" height="2.5" width="10.16" fill="url(#pins)" transform="rotate(90)" />
      <text y="6.8" x="0.7" fill="white">1</text>
      <text y="8.9" x="2.3" fill="white">GND</text>
      <text y="11.4" x="2.3" fill="white">VCC</text>
      <text y="14" x="2.3" fill="white">SDA</text>
      <text y="16.6" x="2.3" fill="white">SCL</text>
    `}renderPins(){return t.svg`
      <rect x="7.55" y="33.5" height="2.5" width="40.64" fill="url(#pins)" />
      <text x="6" y="35.3" fill="white">1</text>
      <text x="7.2" y="33.3" fill="white">VSS</text>
      <text x="9.9" y="33.3" fill="white">VDD</text>
      <text x="12.7" y="33.3" fill="white">V0</text>
      <text x="15.2" y="33.3" fill="white">RS</text>
      <text x="17.8" y="33.3" fill="white">RW</text>
      <text x="20.8" y="33.3" fill="white">E</text>
      <text x="22.7" y="33.3" fill="white">D0</text>
      <text x="25.3" y="33.3" fill="white">D1</text>
      <text x="27.9" y="33.3" fill="white">D2</text>
      <text x="30.4" y="33.3" fill="white">D3</text>
      <text x="33" y="33.3" fill="white">D4</text>
      <text x="35.6" y="33.3" fill="white">D5</text>
      <text x="38.2" y="33.3" fill="white">D6</text>
      <text x="40.8" y="33.3" fill="white">D7</text>
      <text x="43.6" y="33.3" fill="white">A</text>
      <text x="46.2" y="33.3" fill="white">K</text>
      <text x="48" y="35.3" fill="white">16</text>
    `}render(){const{color:e,characters:r,background:i}=this,n=this.backlight?0:.5,s=i in h?h[i]:h;return t.html`
      <svg
        width="80mm"
        height="36mm"
        version="1.1"
        viewBox="0 0 80 36"
        style="font-size: 1.5px; font-family: monospace"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="characters"
            width="3.55"
            height="5.95"
            patternUnits="userSpaceOnUse"
            x="12.45"
            y="12.55"
          >
            <rect width="2.95" height="5.55" fill-opacity="0.05" />
          </pattern>
          <pattern id="pins" width="2.54" height="3.255" patternUnits="userSpaceOnUse" y="1.1">
            <path
              fill="#92926d"
              d="M0,0.55c0,0 0.21,-0.52 0.87,-0.52 0.67,0 0.81,0.51 0.81,0.51v1.81h-1.869z"
            />
            <circle r="0.45" cx="0.827" cy="0.9" color="black" />
          </pattern>
        </defs>
        <rect width="80" height="36" fill="#087f45" />
        <rect x="4.95" y="5.7" width="71.2" height="25.2" />
        <rect x="7.55" y="10.3" width="66" height="16" rx="1.5" ry="1.5" fill="${s}" />
        <rect x="7.55" y="10.3" width="66" height="16" rx="1.5" ry="1.5" opacity="${n}" />
        ${"i2c"===this.pins?this.renderI2CPins():null}
        ${"full"===this.pins?this.renderPins():null}
        <rect x="12.45" y="12.55" width="56.2" height="11.5" fill="url(#characters)" />
        <path d="${this.path(r)}" transform="translate(12.45, 12.55)" fill="${e}" />
        ${this.renderCursor()}
      </svg>
    `}};exports.LCD1602Element=a,i([(0,t.property)()],a.prototype,"color",void 0),i([(0,t.property)()],a.prototype,"background",void 0),i([(0,t.property)({type:Array})],a.prototype,"characters",void 0),i([(0,t.property)()],a.prototype,"font",void 0),i([(0,t.property)()],a.prototype,"cursor",void 0),i([(0,t.property)()],a.prototype,"blink",void 0),i([(0,t.property)()],a.prototype,"cursorX",void 0),i([(0,t.property)()],a.prototype,"cursorY",void 0),i([(0,t.property)()],a.prototype,"backlight",void 0),i([(0,t.property)()],a.prototype,"pins",void 0),exports.LCD1602Element=a=i([(0,t.customElement)("wokwi-lcd1602")],a);
},{"lit-element":"bhxD","./lcd1602-font-a00":"n2M3","./pin":"xoL4"}],"TcZY":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fontA02=void 0;const e=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,6,14,30,14,6,2,0,8,12,14,15,14,12,8,0,18,9,27,0,0,0,0,0,27,18,9,0,0,0,0,0,4,14,31,0,4,14,31,0,31,14,4,0,31,14,4,0,0,14,31,31,31,14,0,0,16,16,20,18,31,2,4,0,4,14,21,4,4,4,4,0,4,4,4,4,21,14,4,0,0,4,8,31,8,4,0,0,0,4,2,31,2,4,0,0,8,4,2,4,8,0,31,0,2,4,8,4,2,0,31,0,0,4,4,14,14,31,0,0,0,31,14,14,4,4,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,4,0,10,10,10,0,0,0,0,0,10,10,31,10,31,10,10,0,4,30,5,14,20,15,4,0,3,19,8,4,2,25,24,0,6,9,5,2,21,9,22,0,6,4,2,0,0,0,0,0,8,4,2,2,2,4,8,0,2,4,8,8,8,4,2,0,0,4,21,14,21,4,0,0,0,4,4,31,4,4,0,0,0,0,0,0,6,4,2,0,0,0,0,31,0,0,0,0,0,0,0,0,0,6,6,0,0,16,8,4,2,1,0,0,14,17,25,21,19,17,14,0,4,6,4,4,4,4,14,0,14,17,16,8,4,2,31,0,31,8,4,8,16,17,14,0,8,12,10,9,31,8,8,0,31,1,15,16,16,17,14,0,12,2,1,15,17,17,14,0,31,17,16,8,4,4,4,0,14,17,17,14,17,17,14,0,14,17,17,30,16,8,6,0,0,6,6,0,6,6,0,0,0,6,6,0,6,4,2,0,8,4,2,1,2,4,8,0,0,0,31,0,31,0,0,0,2,4,8,16,8,4,2,0,14,17,16,8,4,0,4,0,14,17,16,22,21,21,14,0,4,10,17,17,31,17,17,0,15,17,17,15,17,17,15,0,14,17,1,1,1,17,14,0,7,9,17,17,17,9,7,0,31,1,1,15,1,1,31,0,31,1,1,15,1,1,1,0,14,17,1,29,17,17,30,0,17,17,17,31,17,17,17,0,14,4,4,4,4,4,14,0,28,8,8,8,8,9,6,0,17,9,5,3,5,9,17,0,1,1,1,1,1,1,31,0,17,27,21,21,17,17,17,0,17,17,19,21,25,17,17,0,14,17,17,17,17,17,14,0,15,17,17,15,1,1,1,0,14,17,17,17,21,9,22,0,15,17,17,15,5,9,17,0,14,17,1,14,16,17,14,0,31,4,4,4,4,4,4,0,17,17,17,17,17,17,14,0,17,17,17,17,17,10,4,0,17,17,17,21,21,21,10,0,17,17,10,4,10,17,17,0,17,17,17,10,4,4,4,0,31,16,8,4,2,1,31,0,14,2,2,2,2,2,14,0,0,1,2,4,8,16,0,0,14,8,8,8,8,8,14,0,4,10,17,0,0,0,0,0,0,0,0,0,0,0,31,0,2,4,8,0,0,0,0,0,0,0,14,16,30,17,30,0,1,1,13,19,17,17,15,0,0,0,14,1,1,17,14,0,16,16,22,25,17,17,30,0,0,0,14,17,31,1,14,0,12,18,2,7,2,2,2,0,0,0,30,17,30,16,14,0,1,1,13,19,17,17,17,0,4,0,4,6,4,4,14,0,8,0,12,8,8,9,6,0,1,1,9,5,3,5,9,0,6,4,4,4,4,4,14,0,0,0,11,21,21,21,21,0,0,0,13,19,17,17,17,0,0,0,14,17,17,17,14,0,0,0,15,17,15,1,1,0,0,0,22,25,30,16,16,0,0,0,13,19,1,1,1,0,0,0,14,1,14,16,15,0,2,2,7,2,2,18,12,0,0,0,17,17,17,25,22,0,0,0,17,17,17,10,4,0,0,0,17,17,21,21,10,0,0,0,17,10,4,10,17,0,0,0,17,17,30,16,14,0,0,0,31,8,4,2,31,0,8,4,4,2,4,4,8,0,4,4,4,4,4,4,4,0,2,4,4,8,4,4,2,0,0,0,0,22,9,0,0,0,4,10,17,17,17,31,0,0,31,17,1,15,17,17,15,30,20,20,18,17,31,17,17,0,21,21,21,14,21,21,21,0,15,16,16,12,16,16,15,0,17,17,25,21,19,17,17,10,4,17,17,25,21,19,17,0,30,20,20,20,20,21,18,0,31,17,17,17,17,17,17,0,17,17,17,10,4,2,1,0,17,17,17,17,17,31,16,0,17,17,17,30,16,16,16,0,0,21,21,21,21,21,31,0,21,21,21,21,21,31,16,0,3,2,2,14,18,18,14,0,17,17,17,19,21,21,19,0,14,17,20,26,16,17,14,0,0,0,18,21,9,9,22,0,4,12,20,20,4,7,7,0,31,17,1,1,1,1,1,0,0,0,31,10,10,10,25,0,31,1,2,4,2,1,31,0,0,0,30,9,9,9,6,12,20,28,20,20,23,27,24,0,0,16,14,5,4,4,8,0,4,14,14,14,31,4,0,0,14,17,17,31,17,17,14,0,0,14,17,17,17,10,27,0,12,18,4,10,17,17,14,0,0,0,26,21,11,0,0,0,0,10,31,31,31,14,4,0,0,0,14,1,6,17,14,0,14,17,17,17,17,17,17,0,27,27,27,27,27,27,27,0,4,0,0,4,4,4,4,0,4,14,5,5,21,14,4,0,12,2,2,7,2,18,13,0,0,17,14,10,14,17,0,0,17,10,31,4,31,4,4,0,4,4,4,0,4,4,4,0,12,18,4,10,4,9,6,0,8,20,4,31,4,5,2,0,31,17,21,29,21,17,31,0,14,16,30,17,30,0,31,0,0,20,10,5,10,20,0,0,9,21,21,23,21,21,9,0,30,17,17,30,20,18,17,0,31,17,21,17,25,21,31,0,4,2,6,0,0,0,0,6,9,9,9,6,0,0,0,0,4,4,31,4,4,0,31,6,9,4,2,15,0,0,0,7,8,6,8,7,0,0,0,7,9,7,1,9,29,9,24,0,17,17,17,25,23,1,1,0,30,25,25,30,24,24,24,0,0,0,0,6,6,0,0,0,0,0,10,17,21,21,10,2,3,2,2,7,0,0,0,0,14,17,17,17,14,0,31,0,0,5,10,20,10,5,0,17,9,5,10,13,10,30,8,17,9,5,10,21,16,8,28,3,2,3,18,27,20,28,16,0,4,0,4,2,1,17,14,2,4,4,10,17,31,17,17,8,4,4,10,17,31,17,17,4,10,0,14,17,31,17,17,22,9,0,14,17,31,17,17,10,0,4,10,17,31,17,17,4,10,4,14,17,31,17,17,0,28,6,5,29,7,5,29,14,17,1,1,17,14,8,12,2,4,0,31,1,15,1,31,8,4,0,31,1,15,1,31,4,10,0,31,1,15,1,31,0,10,0,31,1,15,1,31,2,4,0,14,4,4,4,14,8,4,0,14,4,4,4,14,4,10,0,14,4,4,4,14,0,10,0,14,4,4,4,14,0,14,18,18,23,18,18,14,22,9,0,17,19,21,25,17,2,4,14,17,17,17,17,14,8,4,14,17,17,17,17,14,4,10,0,14,17,17,17,14,22,9,0,14,17,17,17,14,10,0,14,17,17,17,17,14,0,0,17,10,4,10,17,0,0,14,4,14,21,14,4,14,2,4,17,17,17,17,17,14,8,4,17,17,17,17,17,14,4,10,0,17,17,17,17,14,10,0,17,17,17,17,17,14,8,4,17,10,4,4,4,4,3,2,14,18,18,14,2,7,0,12,18,18,14,18,18,13,2,4,0,14,16,30,17,30,8,4,0,14,16,30,17,30,4,10,0,14,16,30,17,30,22,9,0,14,16,30,17,30,0,10,0,14,16,30,17,30,4,10,4,14,16,30,17,30,0,0,11,20,30,5,21,10,0,0,14,1,17,14,4,6,2,4,0,14,17,31,1,14,8,4,0,14,17,31,1,14,4,10,0,14,17,31,1,14,0,10,0,14,17,31,1,14,2,4,0,4,6,4,4,14,8,4,0,4,6,4,4,14,4,10,0,4,6,4,4,14,0,10,0,4,6,4,4,14,0,5,2,5,8,30,17,14,22,9,0,13,19,17,17,17,2,4,0,14,17,17,17,14,8,4,0,14,17,17,17,14,0,4,10,0,14,17,17,14,0,22,9,0,14,17,17,14,0,10,0,14,17,17,17,14,0,0,4,0,31,0,4,0,0,8,4,14,21,14,4,2,2,4,0,17,17,17,25,22,8,4,0,17,17,17,25,22,4,10,0,17,17,17,25,22,0,10,0,17,17,17,25,22,0,8,4,17,17,30,16,14,0,6,4,12,20,12,4,14,0,10,0,17,17,30,16,14]);exports.fontA02=e;
},{}],"xWrt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.LEDElement=void 0;var e=require("lit-element"),t=function(e,t,l,i){var o,r=arguments.length,c=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,l,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(c=(r<3?o(c):r>3?o(t,l,c):o(t,l))||c);return r>3&&c&&Object.defineProperty(t,l,c),c};const l={red:"#ff8080",green:"#80ff80",blue:"#8080ff",yellow:"#ffff80",orange:"#ffcf80",white:"#ffffff"};let i=class extends e.LitElement{constructor(){super(...arguments),this.value=!1,this.brightness=1,this.color="red",this.lightColor=null,this.label="",this.pinInfo=[{name:"A",x:24,y:42,signals:[],description:"Anode"},{name:"C",x:16,y:42,signals:[],description:"Cathode"}]}static get styles(){return e.css`
      :host {
        display: inline-block;
      }

      .led-container {
        display: flex;
        flex-direction: column;
        width: 40px;
      }

      .led-label {
        font-size: 10px;
        text-align: center;
        color: gray;
        position: relative;
        line-height: 1;
        top: -8px;
      }
    `}render(){const{color:t,lightColor:i}=this,o=i||l[t]||"#ff8080",r=this.brightness?.3+.7*this.brightness:0,c=this.value&&this.brightness>Number.EPSILON;return e.html`
      <div class="led-container">
        <svg
          width="40"
          height="50"
          version="1.2"
          viewBox="-10 -5 35.456 39.618"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="light1" x="-0.8" y="-0.8" height="2.2" width="2.8">
            <feGaussianBlur stdDeviation="2" />
          </filter>
          <filter id="light2" x="-0.8" y="-0.8" height="2.2" width="2.8">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <rect x="3.451" y="19.379" width="2.1514" height="9.8273" fill="#8c8c8c" />
          <path
            d="m12.608 29.618c0-1.1736-0.86844-2.5132-1.8916-3.4024-0.41616-0.3672-1.1995-1.0015-1.1995-1.4249v-5.4706h-2.1614v5.7802c0 1.0584 0.94752 1.8785 1.9462 2.7482 0.44424 0.37584 1.3486 1.2496 1.3486 1.7694"
            fill="#8c8c8c"
          />
          <path
            d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
            opacity=".3"
          />
          <path
            d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
            fill="#e6e6e6"
            opacity=".5"
          />
          <path
            d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v4.6296c1.4738 1.6517 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586l-4e-5 -1.5235c-7e-4 -1.1419-0.4744-2.2032-1.283-3.1054z"
            fill="#d1d1d1"
            opacity=".9"
          />
          <g>
            <path
              d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v4.6296c1.4738 1.6517 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586l-4e-5 -1.5235c-7e-4 -1.1419-0.4744-2.2032-1.283-3.1054z"
              opacity=".7"
            />
            <path
              d="m14.173 13.001v3.1054c0 2.7389-3.1658 4.9651-7.0855 4.9651-3.9125 2e-5 -7.0877-2.219-7.0877-4.9651v3.1054c1.4738 1.6502 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8586-7.4e-4 -1.1412-0.47444-2.2025-1.283-3.1047z"
              opacity=".25"
            />
            <ellipse cx="7.0877" cy="16.106" rx="7.087" ry="4.9608" opacity=".25" />
          </g>
          <polygon
            points="2.2032 16.107 3.1961 16.107 3.1961 13.095 6.0156 13.095 10.012 8.8049 3.407 8.8049 2.2032 9.648"
            fill="#666666"
          />
          <polygon
            points="11.215 9.0338 7.4117 13.095 11.06 13.095 11.06 16.107 11.974 16.107 11.974 8.5241 10.778 8.5241"
            fill="#666666"
          />
          <path
            d="m14.173 13.001v-5.9126c0-3.9132-3.168-7.0884-7.0855-7.0884-3.9125 0-7.0877 3.1694-7.0877 7.0884v13.649c1.4738 1.651 4.0968 2.7526 7.0877 2.7526 4.6195 0 8.3686-2.6179 8.3686-5.8594v-1.5235c-7.4e-4 -1.1426-0.47444-2.2039-1.283-3.1061z"
            fill="${t}"
            opacity=".65"
          />
          <g fill="#ffffff">
            <path
              d="m10.388 3.7541 1.4364-0.2736c-0.84168-1.1318-2.0822-1.9577-3.5417-2.2385l0.25416 1.0807c0.76388 0.27072 1.4068 0.78048 1.8511 1.4314z"
              opacity=".5"
            />
            <path
              d="m0.76824 19.926v1.5199c0.64872 0.5292 1.4335 0.97632 2.3076 1.3169v-1.525c-0.8784-0.33624-1.6567-0.78194-2.3076-1.3118z"
              opacity=".5"
            />
            <path
              d="m11.073 20.21c-0.2556 0.1224-0.52992 0.22968-0.80568 0.32976-0.05832 0.01944-0.11736 0.04032-0.17784 0.05832-0.56376 0.17928-1.1614 0.31896-1.795 0.39456-0.07488 0.0094-0.1512 0.01872-0.22464 0.01944-0.3204 0.03024-0.64368 0.05832-0.97056 0.05832-0.14832 0-0.30744-0.01512-0.4716-0.02376-1.2002-0.05688-2.3306-0.31464-3.2976-0.73944l-2e-5 -8.3895v-4.8254c0-1.471 0.84816-2.7295 2.0736-3.3494l-0.02232-0.05328-1.2478-1.512c-1.6697 1.003-2.79 2.8224-2.79 4.9118v11.905c-0.04968-0.04968-0.30816-0.30888-0.48024-0.52992l-0.30744 0.6876c1.4011 1.4818 3.8088 2.4617 6.5426 2.4617 1.6798 0 3.2371-0.37368 4.5115-1.0022l-0.52704-0.40896-0.01006 0.0072z"
              opacity=".5"
            />
          </g>
          <g class="light" style="display: ${c?"":"none"}">
            <ellipse
              cx="8"
              cy="10"
              rx="10"
              ry="10"
              fill="${o}"
              filter="url(#light2)"
              style="opacity: ${r}"
            ></ellipse>
            <ellipse cx="8" cy="10" rx="2" ry="2" fill="white" filter="url(#light1)"></ellipse>
            <ellipse
              cx="8"
              cy="10"
              rx="3"
              ry="3"
              fill="white"
              filter="url(#light1)"
              style="opacity: ${r}"
            ></ellipse>
          </g>
        </svg>
        <span class="led-label">${this.label}</span>
      </div>
    `}};exports.LEDElement=i,t([(0,e.property)()],i.prototype,"value",void 0),t([(0,e.property)()],i.prototype,"brightness",void 0),t([(0,e.property)()],i.prototype,"color",void 0),t([(0,e.property)()],i.prototype,"lightColor",void 0),t([(0,e.property)()],i.prototype,"label",void 0),exports.LEDElement=i=t([(0,e.customElement)("wokwi-led")],i);
},{"lit-element":"bhxD"}],"x1K8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NeoPixelElement=void 0;var e=require("lit-element"),t=function(e,t,l,i){var r,h=arguments.length,c=h<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,l):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,l,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(c=(h<3?r(c):h>3?r(t,l,c):r(t,l))||c);return h>3&&c&&Object.defineProperty(t,l,c),c};let l=class extends e.LitElement{constructor(){super(...arguments),this.r=0,this.g=0,this.b=0}render(){const{r:t,g:l,b:i}=this,r=e=>e>.001?.7+.3*e:0,h=Math.max(t,l,i),c=Math.min(t,l,i),o=h-c,a=Math.max(1,2-20*o),s=.1+Math.max(2*h-5*o,0),p=e=>h?Math.floor(255*Math.min((e=>e>.005?.1+.9*e:0)(e/h)*a,1)):255,f=`rgb(${p(t)}, ${p(l)}, ${p(i)})`,d=242-(h>.1&&o<.2?Math.floor(50*h*(1-o/.2)):0),n=`rgb(${d}, ${d}, ${d})`;return e.html`
      <svg
        width="5.6631mm"
        height="5mm"
        version="1.1"
        viewBox="0 0 5.6631 5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="light1" x="-0.8" y="-0.8" height="2.8" width="2.8">
          <feGaussianBlur stdDeviation="${Math.max(.1,h)}" />
        </filter>
        <filter id="light2" x="-0.8" y="-0.8" height="2.2" width="2.8">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
        <rect x=".33308" y="0" width="5" height="5" fill="${n}" />
        <rect x=".016709" y=".4279" width=".35114" height=".9" fill="#eaeaea" />
        <rect x="0" y="3.6518" width=".35114" height=".9" fill="#eaeaea" />
        <rect x="5.312" y="3.6351" width=".35114" height=".9" fill="#eaeaea" />
        <rect x="5.312" y=".3945" width=".35114" height=".9" fill="#eaeaea" />
        <circle cx="2.8331" cy="2.5" r="2.1" fill="#ddd" />
        <circle cx="2.8331" cy="2.5" r="1.7325" fill="#e6e6e6" />
        <g fill="#bfbfbf">
          <path
            d="m4.3488 3.3308s-0.0889-0.087-0.0889-0.1341c0-0.047-6e-3 -1.1533-6e-3 -1.1533s-0.0591-0.1772-0.2008-0.1772c-0.14174 0-0.81501 0.012-0.81501 0.012s-0.24805 0.024-0.23624 0.3071c0.0118 0.2835 0.032 2.0345 0.032 2.0345 0.54707-0.046 1.0487-0.3494 1.3146-0.8888z"
          />
          <path
            d="m4.34 1.6405h-1.0805s-0.24325 0.019-0.26204-0.2423l6e-3 -0.6241c0.57782 0.075 1.0332 0.3696 1.3366 0.8706z"
          />
          <path
            d="m2.7778 2.6103-0.17127 0.124-0.8091-0.012c-0.17122-0.019-0.17062-0.2078-0.17062-0.2078-1e-3 -0.3746 1e-3 -0.2831-9e-3 -0.8122l-0.31248-0.018s0.43453-0.9216 1.4786-0.9174c-1.1e-4 0.6144-4e-3 1.2289-6e-3 1.8434z"
          />
          <path
            d="m2.7808 3.0828-0.0915-0.095h-0.96857l-0.0915 0.1447-3e-3 0.1127c0 0.065-0.12108 0.08-0.12108 0.08h-0.20909c0.55906 0.9376 1.4867 0.9155 1.4867 0.9155 1e-3 -0.3845-2e-3 -0.7692-2e-3 -1.1537z"
          />
        </g>
        <path
          d="m4.053 1.8619c-0.14174 0-0.81494 0.013-0.81494 0.013s-0.24797 0.024-0.23616 0.3084c3e-3 0.077 5e-3 0.3235 9e-3 0.5514h1.247c-2e-3 -0.33-4e-3 -0.6942-4e-3 -0.6942s-0.0593-0.1781-0.20102-0.1781z"
          fill="#666"
        />
        <ellipse
          cx="2.5"
          cy="2.3"
          rx="0.3"
          ry="0.3"
          fill="red"
          opacity=${r(t)}
          filter="url(#light1)"
        ></ellipse>
        <ellipse
          cx="3.5"
          cy="3.2"
          rx="0.3"
          ry="0.3"
          fill="green"
          opacity=${r(l)}
          filter="url(#light1)"
        ></ellipse>
        <ellipse
          cx="3.3"
          cy="1.45"
          rx="0.3"
          ry="0.3"
          fill="blue"
          opacity=${r(i)}
          filter="url(#light1)"
        ></ellipse>
        <ellipse
          cx="3"
          cy="2.5"
          rx="2.2"
          ry="2.2"
          opacity="${(e=>e>.005?s+e*(1-s):0)(h)}"
          fill="${f}"
          filter="url(#light2)"
        ></ellipse>
      </svg>
    `}};exports.NeoPixelElement=l,t([(0,e.property)()],l.prototype,"r",void 0),t([(0,e.property)()],l.prototype,"g",void 0),t([(0,e.property)()],l.prototype,"b",void 0),exports.NeoPixelElement=l=t([(0,e.customElement)("wokwi-neopixel")],l);
},{"lit-element":"bhxD"}],"VHTx":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SPACE_KEYS=void 0;const e=[" ","Spacebar"];exports.SPACE_KEYS=e;
},{}],"C6Pt":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PushbuttonElement=void 0;var e=require("lit-element"),t=require("./utils/keys"),r=function(e,t,r,o){var s,n=arguments.length,c=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,r,o);else for(var i=e.length-1;i>=0;i--)(s=e[i])&&(c=(n<3?s(c):n>3?s(t,r,c):s(t,r))||c);return n>3&&c&&Object.defineProperty(t,r,c),c};let o=class extends e.LitElement{constructor(){super(...arguments),this.color="red",this.pressed=!1,this.pinInfo=[{name:"1.l",x:2,y:9,signals:[]},{name:"2.l",x:2,y:36,signals:[]},{name:"1.r",x:65,y:9,signals:[]},{name:"2.r",x:65,y:36,signals:[]}]}static get styles(){return e.css`
      button {
        border: none;
        background: none;
        padding: 0;
        margin: 0;
        text-decoration: none;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      button:active .button-circle {
        fill: url(#grad-down);
      }

      .clickable-element {
        cursor: pointer;
      }
    `}render(){const{color:r}=this;return e.html`
      <button
        aria-label="${r} pushbutton"
        @mousedown=${this.down}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchend=${this.up}
        @keydown=${e=>t.SPACE_KEYS.includes(e.key)&&this.down()}
        @keyup=${e=>t.SPACE_KEYS.includes(e.key)&&this.up()}
      >
        <svg
          width="18mm"
          height="12mm"
          version="1.1"
          viewBox="-3 0 18 12"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <linearGradient id="grad-up" x1="0" x2="1" y1="0" y2="1">
              <stop stop-color="#ffffff" offset="0" />
              <stop stop-color="${r}" offset="0.3" />
              <stop stop-color="${r}" offset="0.5" />
              <stop offset="1" />
            </linearGradient>
            <linearGradient
              id="grad-down"
              xlink:href="#grad-up"
              gradientTransform="rotate(180,0.5,0.5)"
            ></linearGradient>
          </defs>
          <rect x="0" y="0" width="12" height="12" rx=".44" ry=".44" fill="#464646" />
          <rect x=".75" y=".75" width="10.5" height="10.5" rx=".211" ry=".211" fill="#eaeaea" />
          <g fill="#1b1b1">
            <circle cx="1.767" cy="1.7916" r=".37" />
            <circle cx="10.161" cy="1.7916" r=".37" />
            <circle cx="10.161" cy="10.197" r=".37" />
            <circle cx="1.767" cy="10.197" r=".37" />
          </g>
          <g fill="#eaeaea">
            <path
              d="m-0.3538 1.4672c-0.058299 0-0.10523 0.0469-0.10523 0.10522v0.38698h-2.1504c-0.1166 0-0.21045 0.0938-0.21045 0.21045v0.50721c0 0.1166 0.093855 0.21045 0.21045 0.21045h2.1504v0.40101c0 0.0583 0.046928 0.10528 0.10523 0.10528h0.35723v-1.9266z"
            />
            <path
              d="m-0.35376 8.6067c-0.058299 0-0.10523 0.0469-0.10523 0.10523v0.38697h-2.1504c-0.1166 0-0.21045 0.0939-0.21045 0.21045v0.50721c0 0.1166 0.093855 0.21046 0.21045 0.21046h2.1504v0.401c0 0.0583 0.046928 0.10528 0.10523 0.10528h0.35723v-1.9266z"
            />
            <path
              d="m12.354 1.4672c0.0583 0 0.10522 0.0469 0.10523 0.10522v0.38698h2.1504c0.1166 0 0.21045 0.0938 0.21045 0.21045v0.50721c0 0.1166-0.09385 0.21045-0.21045 0.21045h-2.1504v0.40101c0 0.0583-0.04693 0.10528-0.10523 0.10528h-0.35723v-1.9266z"
            />
            <path
              d="m12.354 8.6067c0.0583 0 0.10523 0.0469 0.10523 0.10522v0.38698h2.1504c0.1166 0 0.21045 0.0938 0.21045 0.21045v0.50721c0 0.1166-0.09386 0.21045-0.21045 0.21045h-2.1504v0.40101c0 0.0583-0.04693 0.10528-0.10523 0.10528h-0.35723v-1.9266z"
            />
          </g>
          <g class="clickable-element">
            <circle class="button-circle" cx="6" cy="6" r="3.822" fill="url(#grad-up)" />
            <circle
              cx="6"
              cy="6"
              r="2.9"
              fill="${r}"
              stroke="#2f2f2f"
              stroke-opacity=".47"
              stroke-width=".08"
            />
          </g>
        </svg>
      </button>
    `}down(){this.pressed||(this.pressed=!0,this.dispatchEvent(new Event("button-press")))}up(){this.pressed&&(this.pressed=!1,this.dispatchEvent(new Event("button-release")))}};exports.PushbuttonElement=o,r([(0,e.property)()],o.prototype,"color",void 0),r([(0,e.property)()],o.prototype,"pressed",void 0),exports.PushbuttonElement=o=r([(0,e.customElement)("wokwi-pushbutton")],o);
},{"lit-element":"bhxD","./utils/keys":"VHTx"}],"XKDm":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ResistorElement=void 0;var e=require("lit-element"),t=function(e,t,r,o){var l,s=arguments.length,i=s<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var a=e.length-1;a>=0;a--)(l=e[a])&&(i=(s<3?l(i):s>3?l(t,r,i):l(t,r))||i);return s>3&&i&&Object.defineProperty(t,r,i),i};const r={[-2]:"silver",[-1]:"#c4a000",0:"black",1:"brown",2:"red",3:"orange",4:"yellow",5:"green",6:"blue",7:"violet",8:"gray",9:"white"};let o=class extends e.LitElement{constructor(){super(...arguments),this.value="1000",this.pinInfo=[{name:"1",x:0,y:9,signals:[]},{name:"2",x:59,y:9,signals:[]}]}breakValue(e){const t=e>=1e10?9:e>=1e9?8:e>=1e8?7:e>=1e7?6:e>=1e6?5:e>=1e5?4:e>=1e4?3:e>=1e3?2:e>=100?1:e>=10?0:e>=1?-1:-2,r=Math.round(e/10**t);return 0===e?[0,0]:t<0&&r%10==0?[r/10,t+1]:[Math.round(r%100),t]}render(){const{value:t}=this,o=parseFloat(t),[l,s]=this.breakValue(o),i=r[Math.floor(l/10)],a=r[l%10],n=r[s];return e.html`
      <svg
        width="15.645mm"
        height="3mm"
        version="1.1"
        viewBox="0 0 15.645 3"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient
            id="a"
            x2="0"
            y1="22.332"
            y2="38.348"
            gradientTransform="matrix(.14479 0 0 .14479 -23.155 -4.0573)"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop stop-color="#323232" offset="0" />
            <stop stop-color="#fff" stop-opacity=".42268" offset="1" />
          </linearGradient>
        </defs>
        <rect y="1.1759" width="15.645" height=".63826" fill="#eaeaea" />
        <g stroke-width=".14479">
          <path
            d="m4.6918 0c-1.0586 0-1.9185 0.67468-1.9185 1.5022 0 0.82756 0.85995 1.4978 1.9185 1.4978 0.4241 0 0.81356-0.11167 1.1312-0.29411h4.0949c0.31802 0.18313 0.71075 0.29411 1.1357 0.29411 1.0586 0 1.9185-0.67015 1.9185-1.4978 0-0.8276-0.85995-1.5022-1.9185-1.5022-0.42499 0-0.81773 0.11098-1.1357 0.29411h-4.0949c-0.31765-0.18244-0.7071-0.29411-1.1312-0.29411z"
            fill="#d5b597"
          />
          <path
            d="m4.6918 0c-1.0586 0-1.9185 0.67468-1.9185 1.5022 0 0.82756 0.85995 1.4978 1.9185 1.4978 0.4241 0 0.81356-0.11167 1.1312-0.29411h4.0949c0.31802 0.18313 0.71075 0.29411 1.1357 0.29411 1.0586 0 1.9185-0.67015 1.9185-1.4978 0-0.8276-0.85995-1.5022-1.9185-1.5022-0.42499 0-0.81773 0.11098-1.1357 0.29411h-4.0949c-0.31765-0.18244-0.7071-0.29411-1.1312-0.29411z"
            fill="url(#a)"
            opacity=".44886"
          />
          <path
            d="m4.6917 0c-0.10922 0-0.21558 0.00884-0.31985 0.022624v2.955c0.10426 0.013705 0.21063 0.02234 0.31985 0.02234 0.15603 0 0.3074-0.015363 0.4522-0.043551v-2.9129c-0.1448-0.028193-0.29617-0.043551-0.4522-0.043552z"
            fill="${i}"
          />
          <path d="m6.4482 0.29411v2.4117h0.77205v-2.4117z" fill="${a}" />
          <path d="m8.5245 0.29411v2.4117h0.77205v-2.4117z" fill="${n}" />
          <path
            d="m11.054 0c-0.15608 0-0.30749 0.015253-0.45277 0.043268v2.9134c0.14527 0.028012 0.29669 0.043268 0.45277 0.043268 0.10912 0 0.21539-0.00867 0.31957-0.02234v-2.955c-0.10418-0.013767-0.21044-0.022624-0.31957-0.022624z"
            fill="#c4a000"
          />
        </g>
      </svg>
    `}};exports.ResistorElement=o,t([(0,e.property)()],o.prototype,"value",void 0),exports.ResistorElement=o=t([(0,e.customElement)("wokwi-resistor")],o);
},{"lit-element":"bhxD"}],"V64C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MembraneKeypadElement=void 0;var e=require("lit-element"),t=require("./patterns/pins-female"),s=require("./utils/keys"),r=function(e,t,s,r){var i,n=arguments.length,o=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,s,r);else for(var d=e.length-1;d>=0;d--)(i=e[d])&&(o=(n<3?i(o):n>3?i(t,s,o):i(t,s))||o);return n>3&&o&&Object.defineProperty(t,s,o),o};const i=[10.7,25,39.3,53.6],n=[7,22,37,52];function o(e){return!isNaN(parseFloat(e))}let d=class extends e.LitElement{constructor(){super(...arguments),this.columns="4",this.connector=!1,this.keys=["1","2","3","A","4","5","6","B","7","8","9","C","*","0","#","D"],this.pressedKeys=new Set}get pinInfo(){switch(this.columns){case"3":return[{name:"R1",x:76.5,y:338,signals:[]},{name:"R2",x:86,y:338,signals:[]},{name:"R3",x:95.75,y:338,signals:[]},{name:"R4",x:105.25,y:338,signals:[]},{name:"C1",x:115,y:338,signals:[]},{name:"C2",x:124.5,y:338,signals:[]},{name:"C3",x:134,y:338,signals:[]}];default:return[{name:"R1",x:100,y:338,signals:[]},{name:"R2",x:110,y:338,signals:[]},{name:"R3",x:119.5,y:338,signals:[]},{name:"R4",x:129,y:338,signals:[]},{name:"C1",x:138.5,y:338,signals:[]},{name:"C2",x:148,y:338,signals:[]},{name:"C3",x:157.75,y:338,signals:[]},{name:"C4",x:167.5,y:338,signals:[]}]}}renderKey(t,r){var d;const l=null!==(d=this.keys[4*t+r])&&void 0!==d?d:"",a=o(l)?"blue-key":"red-key",h=l.toUpperCase();return e.svg`<g
      transform="translate(${n[r]} ${i[t]})"
      tabindex="0"
      class=${a}
      data-key-name=${h}
      @blur=${e=>{this.up(l,e.currentTarget)}}
      @mousedown=${()=>this.down(l)}
      @mouseup=${()=>this.up(l)}
      @touchstart=${()=>this.down(l)}
      @touchend=${()=>this.up(l)}
      @keydown=${e=>s.SPACE_KEYS.includes(e.key)&&this.down(l,e.currentTarget)}
      @keyup=${e=>s.SPACE_KEYS.includes(e.key)&&this.up(l,e.currentTarget)}
    >
      <use xlink:href="#key" />
      <text x="5.6" y="8.1">${l}</text>
    </g>`}render(){const{connector:s}=this,r="4"===this.columns,i=r?70.336:55.336,n=r?20.32:17.78,o=76+(s?15:0);return e.html`
      <style>
        text {
          fill: #dfe2e5;
          user-select: none;
        }

        g[tabindex] {
          cursor: pointer;
        }

        g[tabindex]:focus,
        g[tabindex]:active {
          stroke: white;
          outline: none;
        }

        .blue-key:focus,
        .red-key:focus {
          filter: url(#shadow);
        }

        .blue-key:active,
        .blue-key.pressed {
          fill: #4e50d7;
        }

        .red-key:active,
        .red-key.pressed {
          fill: #ab040b;
        }

        g[tabindex]:focus text {
          stroke: none;
        }

        g[tabindex]:active text,
        .blue-key.pressed text,
        .red-key.pressed text {
          fill: white;
          stroke: none;
        }
      </style>

      <svg
        width="${i}mm"
        height="${o}mm"
        version="1.1"
        viewBox="0 0 ${i} ${o}"
        font-family="sans-serif"
        font-size="8.2px"
        text-anchor="middle"
        xmlns="http://www.w3.org/2000/svg"
        @keydown=${e=>this.keyStrokeDown(e.key)}
        @keyup=${e=>this.keyStrokeUp(e.key)}
      >
        <defs>
          <rect
            id="key"
            width="11.2"
            height="11"
            rx="1.4"
            ry="1.4"
            stroke="#b1b5b9"
            stroke-width=".75"
          />
          <pattern id="wires" width="2.54" height="8" patternUnits="userSpaceOnUse">
            <rect width="2.54" height="8" fill="#eee" />
            <rect x="0.77" width="1" height="6" fill="#d9d5bc" />
            <circle cx="1.27" cy="6" r="0.75" fill="#d9d5bc" />
            <rect x="0.52" y="6" width="1.5" height="2" fill="#d9d5bc" />
          </pattern>
          <pattern id="wires-marks" width="2.54" height="8" patternUnits="userSpaceOnUse">
            <rect x="0.52" y="6" width="1.5" height="2" fill="#746d41" />
          </pattern>
          ${t.pinsFemalePattern}
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="0.5" flood-color="#ffff99" />
          </filter>
        </defs>

        <!-- Keypad outline -->
        <rect x="0" y="0" width="${i}" height="76" rx="5" ry="5" fill="#454449" />
        <rect
          x="2.78"
          y="3.25"
          width="${r?65:50}"
          height="68.6"
          rx="3.5"
          ry="3.5"
          fill="none"
          stroke="#b1b5b9"
          stroke-width="1"
        />

        <!-- Connector -->
        ${s?e.svg`
            <g transform="translate(${(i-n)/2}, 76)">
              <rect width="${n}" height="8" fill="url(#wires)" />
              <rect width="10.16" height="8" fill="url(#wires-marks)" />
              <rect y="8" width="${n}" height="7" fill="#333" />
              <rect transform="translate(0, 12)" width="${n}" height="2.54" fill="url(#pins-female)" />
            </g>
          `:null}

        <!-- Blue keys -->
        <g fill="#4e90d7">
          <g>${this.renderKey(0,0)}</g>
          <g>${this.renderKey(0,1)}</g>
          <g>${this.renderKey(0,2)}</g>
          <g>${this.renderKey(1,0)}</g>
          <g>${this.renderKey(1,1)}</g>
          <g>${this.renderKey(1,2)}</g>
          <g>${this.renderKey(2,0)}</g>
          <g>${this.renderKey(2,1)}</g>
          <g>${this.renderKey(2,2)}</g>
          <g>${this.renderKey(3,1)}</g>
        </g>

        <!-- Red keys -->
        <g fill="#e94541">
          <g>${this.renderKey(3,0)}</g>
          <g>${this.renderKey(3,2)}</g>
          ${r&&e.svg`
              <g>${this.renderKey(0,3)}</g>
              <g>${this.renderKey(1,3)}</g>
              <g>${this.renderKey(2,3)}</g>
              <g>${this.renderKey(3,3)}</g>
          `}
        </g>
      </svg>
    `}keyIndex(e){const t=this.keys.indexOf(e);return{row:Math.floor(t/4),column:t%4}}down(e,t){this.pressedKeys.has(e)||(t&&t.classList.add("pressed"),this.pressedKeys.add(e),this.dispatchEvent(new CustomEvent("button-press",{detail:Object.assign({key:e},this.keyIndex(e))})))}up(e,t){this.pressedKeys.has(e)&&(t&&t.classList.remove("pressed"),this.pressedKeys.delete(e),this.dispatchEvent(new CustomEvent("button-release",{detail:Object.assign({key:e},this.keyIndex(e))})))}keyStrokeDown(e){var t;const s=e.toUpperCase(),r=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(`[data-key-name="${s}"]`);r&&this.down(s,r)}keyStrokeUp(e){var t,s;const r=e.toUpperCase(),i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(`[data-key-name="${r}"]`),n=null===(s=this.shadowRoot)||void 0===s?void 0:s.querySelectorAll(".pressed");"Shift"===e&&(null==n||n.forEach(e=>{const t=e.dataset.keyName;t&&this.up(t,e)})),i&&this.up(r,i)}};exports.MembraneKeypadElement=d,r([(0,e.property)()],d.prototype,"columns",void 0),r([(0,e.property)()],d.prototype,"connector",void 0),r([(0,e.property)({type:Array})],d.prototype,"keys",void 0),exports.MembraneKeypadElement=d=r([(0,e.customElement)("wokwi-membrane-keypad")],d);
},{"lit-element":"bhxD","./patterns/pins-female":"ksYL","./utils/keys":"VHTx"}],"QXwr":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.styleMap=void 0;var e=require("../lit-html.js");const t=new WeakMap,r=(0,e.directive)(r=>s=>{if(!(s instanceof e.AttributePart)||s instanceof e.PropertyPart||"style"!==s.committer.name||s.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=s,{style:n}=i.element;let o=t.get(s);void 0===o&&(n.cssText=i.strings.join(" "),t.set(s,o=new Set)),o.forEach(e=>{e in r||(o.delete(e),-1===e.indexOf("-")?n[e]=null:n.removeProperty(e))});for(const e in r)o.add(e),-1===e.indexOf("-")?n[e]=r[e]:n.setProperty(e,r[e])});exports.styleMap=r;
},{"../lit-html.js":"SPDu"}],"jniu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PotentiometerElement=void 0;var t=require("lit-element"),e=require("lit-html/directives/style-map"),i=require("./pin"),r=function(t,e,i,r){var o,s=arguments.length,n=s<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let o=class extends t.LitElement{constructor(){super(...arguments),this.min=0,this.max=100,this.value=0,this.step=1,this.startDegree=-135,this.endDegree=135,this.center={x:0,y:0},this.pressed=!1,this.pinInfo=[{name:"GND",x:29,y:68.5,number:1,signals:[{type:"power",signal:"GND"}]},{name:"SIG",x:37,y:68.5,number:2,signals:[(0,i.analog)(0)]},{name:"VCC",x:44.75,y:68.5,number:3,signals:[{type:"power",signal:"VCC"}]}]}static get styles(){return t.css`
      #rotating {
        transform-origin: 10px 8px;
        transform: rotate(var(--knob-angle, 0deg));
      }

      svg text {
        font-size: 1px;
        line-height: 1.25;
        letter-spacing: 0px;
        word-spacing: 0px;
        fill: #ffffff;
      }
      .hide-input {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
      }
      input:focus + svg #knob {
        stroke: #ccdae3;
        filter: url(#outline);
      }
    `}clamp(t,e,i){return Math.min(Math.max(i,t),e)}mapToMinMax(t,e,i){return t*(i-e)+e}percentFromMinMax(t,e,i){return(t-e)/(i-e)}render(){const i=this.clamp(0,1,this.percentFromMinMax(this.value,this.min,this.max)),r=(this.endDegree-this.startDegree)*i+this.startDegree;return t.html`
      <input
        tabindex="0"
        type="range"
        class="hide-input"
        max="${this.max}"
        min="${this.min}"
        value="${this.value}"
        step="${this.step}"
        aria-valuemin="${this.min}"
        aria-valuenow="${this.value}"
        @input="${this.onValueChange}"
      />
      <svg
        role="slider"
        width="20mm"
        height="20mm"
        version="1.1"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        @click="${this.focusInput}"
        @mousedown=${this.down}
        @mousemove=${this.move}
        @mouseup=${this.up}
        @touchstart=${this.down}
        @touchmove=${this.move}
        @touchend=${this.up}
        style=${(0,e.styleMap)({"--knob-angle":r+"deg"})}
      >
        <defs>
          <filter id="outline">
            <feDropShadow id="glow" dx="0" dy="0" stdDeviation="0.5" flood-color="cyan" />
          </filter>
        </defs>
        <rect
          x=".15"
          y=".15"
          width="19.5"
          height="19.5"
          ry="1.23"
          fill="#045881"
          stroke="#045881"
          stroke-width=".30"
        />
        <rect x="5.4" y=".70" width="9.1" height="1.9" fill="#ccdae3" stroke-width=".15" />
        <ellipse
          id="knob"
          cx="9.91"
          cy="8.18"
          rx="7.27"
          ry="7.43"
          fill="#e4e8eb"
          stroke-width=".15"
        />
        <rect
          x="6.6"
          y="17"
          width="6.5"
          height="2"
          fill-opacity="0"
          stroke="#fff"
          stroke-width=".30"
        />
        <g stroke-width=".15">
          <text x="6.21" y="16.6">GND</text>
          <text x="8.75" y="16.63">SIG</text>
          <text x="11.25" y="16.59">VCC</text>
        </g>
        <g fill="#fff" stroke-width=".15">
          <ellipse cx="1.68" cy="1.81" rx=".99" ry=".96" />
          <ellipse cx="1.48" cy="18.37" rx=".99" ry=".96" />
          <ellipse cx="17.97" cy="18.47" rx=".99" ry=".96" />
          <ellipse cx="18.07" cy="1.91" rx=".99" ry=".96" />
        </g>
        <g fill="#b3b1b0" stroke-width=".15">
          <ellipse cx="7.68" cy="18" rx=".61" ry=".63" />
          <ellipse cx="9.75" cy="18" rx=".61" ry=".63" />
          <ellipse cx="11.87" cy="18" rx=".61" ry=".63" />
        </g>
        <ellipse cx="9.95" cy="8.06" rx="6.60" ry="6.58" fill="#c3c2c3" stroke-width=".15" />
        <rect id="rotating" x="10" y="2" width=".42" height="3.1" stroke-width=".15" />
      </svg>
    `}focusInput(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".hide-input");null==e||e.focus()}onValueChange(t){const e=t.target;this.updateValue(parseFloat(e.value))}down(t){(0===t.button||window.navigator.maxTouchPoints)&&(this.pressed=!0,this.updatePotentiometerPosition(t))}move(t){const{pressed:e}=this;e&&this.rotateHandler(t)}up(){this.pressed=!1}updatePotentiometerPosition(t){var e,i;t.stopPropagation(),t.preventDefault();const r=null===(i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("#knob"))||void 0===i?void 0:i.getBoundingClientRect();r&&(this.center={x:window.scrollX+r.left+r.width/2,y:window.scrollY+r.top+r.height/2})}rotateHandler(t){t.stopPropagation(),t.preventDefault();const e="touchmove"===t.type,i=e?t.touches[0].pageX:t.pageX,r=e?t.touches[0].pageY:t.pageY,o=this.center.x-i,s=this.center.y-r;let n=Math.round(180*Math.atan2(s,o)/Math.PI);n<0&&(n+=360),n-=90,o>0&&s<=0&&(n-=360),n=this.clamp(this.startDegree,this.endDegree,n);const a=this.percentFromMinMax(n,this.startDegree,this.endDegree),l=this.mapToMinMax(a,this.min,this.max);this.updateValue(l)}updateValue(t){const e=this.clamp(this.min,this.max,t),i=Math.round(e/this.step)*this.step;this.value=Math.round(100*i)/100,this.dispatchEvent(new InputEvent("input",{detail:this.value}))}};exports.PotentiometerElement=o,r([(0,t.property)()],o.prototype,"min",void 0),r([(0,t.property)()],o.prototype,"max",void 0),r([(0,t.property)()],o.prototype,"value",void 0),r([(0,t.property)()],o.prototype,"step",void 0),r([(0,t.property)()],o.prototype,"startDegree",void 0),r([(0,t.property)()],o.prototype,"endDegree",void 0),exports.PotentiometerElement=o=r([(0,t.customElement)("wokwi-potentiometer")],o);
},{"lit-element":"bhxD","lit-html/directives/style-map":"QXwr","./pin":"xoL4"}],"k8Z7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NeopixelMatrixElement=void 0;var e=require("lit-element"),t=function(e,t,i,l){var r,s=arguments.length,o=s<3?t:null===l?l=Object.getOwnPropertyDescriptor(t,i):l;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,l);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(s<3?r(o):s>3?r(t,i,o):r(t,i))||o);return s>3&&o&&Object.defineProperty(t,i,o),o};const i=5.66,l=5;let r=class extends e.LitElement{constructor(){super(...arguments),this.rows=8,this.cols=8,this.colSpacing=1,this.blurLight=!1,this.animation=!1,this.rowSpacing=1,this.pixelElements=null,this.animationFrame=null,this.animateStep=(()=>{const e=(new Date).getTime(),{rows:t,cols:i}=this,l=e=>e%2e3>1e3?1-e%1e3/1e3:e%1e3/1e3;for(let r=0;r<t;r++)for(let s=0;s<i;s++){const o=Math.sqrt((r-t/2+.5)**2+(s-i/2+.5)**2);this.setPixel(r,s,{r:l(100*o+e),g:l(100*o+e+200),b:l(100*o+e+400)})}this.animationFrame=requestAnimationFrame(this.animateStep)})}static get styles(){return e.css`
      :host {
        display: flex;
      }
    `}getPixelElements(){return this.shadowRoot?(this.pixelElements||(this.pixelElements=Array.from(this.shadowRoot.querySelectorAll("g.pixel")).map(e=>Array.from(e.querySelectorAll("ellipse")))),this.pixelElements):null}reset(){const e=this.getPixelElements();if(e)for(const[t,i,l,r]of e)t.style.opacity="0",i.style.opacity="0",l.style.opacity="0",r.style.opacity="0"}setPixel(e,t,i){const l=this.getPixelElements();if(e<0||t<0||e>=this.rows||t>=this.cols||!l)return null;const{r:r,g:s,b:o}=i,a=e=>e>.001?.7+.3*e:0,n=Math.max(r,s,o),c=Math.min(r,s,o),p=n-c,h=Math.max(1,2-20*p),m=.1+Math.max(2*n-5*p,0),y=e=>n?Math.floor(255*Math.min((e=>e>.005?.1+.9*e:0)(e/n)*h,1)):255,x=`rgb(${y(r)}, ${y(s)}, ${y(o)})`,f=l[e*this.cols+t],[g,d,u,w]=f;g.style.opacity=a(r).toFixed(2),d.style.opacity=a(s).toFixed(2),u.style.opacity=a(o).toFixed(2),w.style.opacity=(e=>e>.005?m+e*(1-m):0)(n).toFixed(2),w.style.fill=x}updated(){this.animation&&!this.animationFrame?this.animationFrame=requestAnimationFrame(this.animateStep):!this.animation&&this.animationFrame&&(cancelAnimationFrame(this.animationFrame),this.animationFrame=null)}renderPixels(){const t=[],{cols:i,rows:l,colSpacing:r,rowSpacing:s}=this,o=5.66+r,a=5+s;for(let n=0;n<l;n++)for(let l=0;l<i;l++)t.push(e.svg`
        <g transform="translate(${o*l}, ${a*n})" class="pixel">
          <ellipse cx="2.5" cy="2.3" rx="0.3" ry="0.3" fill="red" opacity="0" />
          <ellipse cx="3.5" cy="3.2" rx="0.3" ry="0.3" fill="green" opacity="0" />
          <ellipse cx="3.3" cy="1.45" rx="0.3" ry="0.3" fill="blue" opacity="0" />
          <ellipse cx="3" cy="2.5" rx="2.2" ry="2.2" opacity="0" />
        </g>`);return this.pixelElements=null,t}render(){const{cols:t,rows:i,rowSpacing:l,colSpacing:r,blurLight:s}=this,o=5.66+r,a=5+l,n=5.66*t+r*(t-1),c=5*i+l*(i-1);return e.html`
      <svg
        width="${n}mm"
        height="${c}mm"
        version="1.1"
        viewBox="0 0 ${n} ${c}"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="blurLight" x="-0.8" y="-0.8" height="2.8" width="2.8">
          <feGaussianBlur stdDeviation="0.3" />
        </filter>

        <pattern id="pixel" width="${o}" height="${a}" patternUnits="userSpaceOnUse">
          <rect x=".33308" y="0" width="5" height="5" fill="#fff" />
          <rect x=".016709" y=".4279" width=".35114" height=".9" fill="#eaeaea" />
          <rect x="0" y="3.6518" width=".35114" height=".9" fill="#eaeaea" />
          <rect x="5.312" y="3.6351" width=".35114" height=".9" fill="#eaeaea" />
          <rect x="5.312" y=".3945" width=".35114" height=".9" fill="#eaeaea" />
          <circle cx="2.8331" cy="2.5" r="2.1" fill="#ddd" />
          <circle cx="2.8331" cy="2.5" r="1.7325" fill="#e6e6e6" />
          <g fill="#bfbfbf">
            <path
              d="m4.3488 3.3308s-0.0889-0.087-0.0889-0.1341c0-0.047-6e-3 -1.1533-6e-3 -1.1533s-0.0591-0.1772-0.2008-0.1772c-0.14174 0-0.81501 0.012-0.81501 0.012s-0.24805 0.024-0.23624 0.3071c0.0118 0.2835 0.032 2.0345 0.032 2.0345 0.54707-0.046 1.0487-0.3494 1.3146-0.8888z"
            />
            <path
              d="m4.34 1.6405h-1.0805s-0.24325 0.019-0.26204-0.2423l6e-3 -0.6241c0.57782 0.075 1.0332 0.3696 1.3366 0.8706z"
            />
            <path
              d="m2.7778 2.6103-0.17127 0.124-0.8091-0.012c-0.17122-0.019-0.17062-0.2078-0.17062-0.2078-1e-3 -0.3746 1e-3 -0.2831-9e-3 -0.8122l-0.31248-0.018s0.43453-0.9216 1.4786-0.9174c-1.1e-4 0.6144-4e-3 1.2289-6e-3 1.8434z"
            />
            <path
              d="m2.7808 3.0828-0.0915-0.095h-0.96857l-0.0915 0.1447-3e-3 0.1127c0 0.065-0.12108 0.08-0.12108 0.08h-0.20909c0.55906 0.9376 1.4867 0.9155 1.4867 0.9155 1e-3 -0.3845-2e-3 -0.7692-2e-3 -1.1537z"
            />
          </g>
          <path
            d="m4.053 1.8619c-0.14174 0-0.81494 0.013-0.81494 0.013s-0.24797 0.024-0.23616 0.3084c3e-3 0.077 5e-3 0.3235 9e-3 0.5514h1.247c-2e-3 -0.33-4e-3 -0.6942-4e-3 -0.6942s-0.0593-0.1781-0.20102-0.1781z"
            fill="#666"
          />
        </pattern>
        <rect width="${n}" height="${c}" fill="url(#pixel)"></rect>
        <g style="${s?"filter: url(#blurLight)":""}">
          ${this.renderPixels()}
        </g>
      </svg>
    `}};exports.NeopixelMatrixElement=r,t([(0,e.property)()],r.prototype,"rows",void 0),t([(0,e.property)()],r.prototype,"cols",void 0),t([(0,e.property)({attribute:"colspacing"})],r.prototype,"colSpacing",void 0),t([(0,e.property)()],r.prototype,"blurLight",void 0),t([(0,e.property)()],r.prototype,"animation",void 0),t([(0,e.property)({attribute:"rowspacing"})],r.prototype,"rowSpacing",void 0),exports.NeopixelMatrixElement=r=t([(0,e.customElement)("wokwi-neopixel-matrix")],r);
},{"lit-element":"bhxD"}],"Uq31":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SSD1306Element=void 0;var t=require("lit-element"),e=require("./pin"),i=function(t,e,i,r){var s,a=arguments.length,c=a<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,i,r);else for(var n=t.length-1;n>=0;n--)(s=t[n])&&(c=(a<3?s(c):a>3?s(e,i,c):s(e,i))||c);return a>3&&c&&Object.defineProperty(e,i,c),c};let r=class extends t.LitElement{constructor(){super(),this.width=150,this.height=116,this.screenWidth=128,this.screenHeight=64,this.canvas=void 0,this.ctx=null,this.pinInfo=[{name:"DATA",x:36.5,y:12.5,signals:[(0,e.i2c)("SDA")]},{name:"CLK",x:45.5,y:12.5,signals:[(0,e.i2c)("SCL")]},{name:"DC",x:54.5,y:12.5,signals:[]},{name:"RST",x:64.5,y:12.5,signals:[]},{name:"CS",x:74.5,y:12.5,signals:[]},{name:"3V3",x:83.5,y:12.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"VIN",x:93.5,y:12.5,signals:[{type:"power",signal:"VCC"}]},{name:"GND",x:103.5,y:12,signals:[{type:"power",signal:"GND"}]}],this.imageData=new ImageData(this.screenWidth,this.screenHeight)}static get styles(){return t.css`
      .pixelated {
        image-rendering: crisp-edges; /* firefox */
        image-rendering: pixelated; /* chrome/webkit */
      }
    `}redraw(){var t;null===(t=this.ctx)||void 0===t||t.putImageData(this.imageData,0,0)}initContext(){var t,e;this.canvas=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("canvas"),this.ctx=null===(e=this.canvas)||void 0===e?void 0:e.getContext("2d")}firstUpdated(){var t;this.initContext(),null===(t=this.ctx)||void 0===t||t.putImageData(this.imageData,0,0)}updated(){this.imageData&&this.redraw()}render(){const{width:e,height:i,screenWidth:r,screenHeight:s,imageData:a}=this,c=a?"visible":"hidden";return t.html`<svg width="${e}" height="${i}" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect stroke="#BE9B72" fill="#025CAF" x=".5" y=".5" width="148" height="114" rx="13" />

        <g transform="translate(6 6)" fill="#59340A" stroke="#BE9B72" stroke-width="0.6px">
          <circle cx="130" cy="6" r="5.5" />
          <circle cx="6" cy="6" r="5.5" />
          <circle cx="130" cy="96" r="5.5" />
          <circle cx="6" cy="96" r="5.5" />
        </g>

        <g transform="translate(11.4 26)">
          <!-- 128 x 64 screen -->
          <rect fill="#1A1A1A" width="${r}" height="${s}" />
          <!-- image holder -->
          <foreignObject
            ?visibility="${c}"
            width="${r}"
            height="${s}"
          >
            <canvas width="${r}" height="${s}" class="pixelated"></canvas>
          </foreignObject>
        </g>

        <!-- All texts -->
        <g
          fill="#FFF"
          text-anchor="middle"
          font-size="5"
          font-weight="300"
          font-family="MarkerFelt-Wide, Marker Felt, monospace"
        >
          <g transform="translate(37 3)">
            <text x="0" y="5">Data</text>
            <text x="19" y="5">SA0</text>
            <text x="41" y="5">CS</text>
            <text x="60" y="5">Vin</text>
          </g>

          <g transform="translate(41 17)">
            <text x="0" y="6">C1k</text>
            <text x="12" y="6">DC</text>
            <text x="23" y="6">Rst</text>
            <text x="39" y="6">3v3</text>
            <text x="58" y="6">Gnd</text>
          </g>
          <!-- Star -->
          <path
            d="M115.5 10.06l-1.59 2.974-3.453.464 2.495 2.245-.6 3.229 3.148-1.528 3.148 1.528-.6-3.23 2.495-2.244-3.453-.464-1.59-2.974z"
            stroke="#FFF"
          />
        </g>

        <!-- PINS -->
        <g transform="translate(33 9)" fill="#9D9D9A" stroke-width="0.4">
          <circle stroke="#262626" cx="70.5" cy="3.5" r="3.5" />
          <circle stroke="#007ADB" cx="60.5" cy="3.5" r="3.5" />
          <circle stroke="#9D5B96" cx="50.5" cy="3.5" r="3.5" />
          <circle stroke="#009E9B" cx="41.5" cy="3.5" r="3.5" />
          <circle stroke="#E8D977" cx="31.5" cy="3.5" r="3.5" />
          <circle stroke="#C08540" cx="21.5" cy="3.5" r="3.5" />
          <circle stroke="#B4AEAB" cx="12.5" cy="3.5" r="3.5" />
          <circle stroke="#E7DBDB" cx="3.5" cy="3.5" r="3.5" />
        </g>
      </g>
    </svg> `}};exports.SSD1306Element=r,i([(0,t.property)()],r.prototype,"imageData",void 0),exports.SSD1306Element=r=i([(0,t.customElement)("wokwi-ssd1306")],r);
},{"lit-element":"bhxD","./pin":"xoL4"}],"M94H":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.BuzzerElement=void 0;var e=require("lit-element"),t=function(e,t,i,n){var o,s=arguments.length,r=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,n);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(r=(s<3?o(r):s>3?o(t,i,r):o(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r};let i=class extends e.LitElement{constructor(){super(...arguments),this.hasSignal=!1,this.pinInfo=[{name:"1",x:30,y:82,signals:[]},{name:"2",x:34,y:82,signals:[]}]}static get styles(){return e.css`
      :host {
        display: inline-block;
      }

      .buzzer-container {
        display: flex;
        flex-direction: column;
        width: 75px;
      }

      .music-note {
        position: relative;
        left: 40px;
        animation-duration: 1.5s;
        animation-name: animate-note;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        transform: scale(1.5);
        fill: blue;
        offset-path: path(
          'm0 0c-0.9-0.92-1.8-1.8-2.4-2.8-0.56-0.92-0.78-1.8-0.58-2.8 0.2-0.92 0.82-1.8 1.6-2.8 0.81-0.92 1.8-1.8 2.6-2.8 0.81-0.92 1.4-1.8 1.6-2.8 0.2-0.92-0.02-1.8-0.58-2.8-0.56-0.92-1.5-1.8-2.4-2.8'
        );
        offset-rotate: 0deg;
      }

      @keyframes animate-note {
        0% {
          offset-distance: 0%;
          opacity: 0;
        }
        10% {
          offset-distance: 10%;
          opacity: 1;
        }
        75% {
          offset-distance: 75%;
          opacity: 1;
        }
        100% {
          offset-distance: 100%;
          opacity: 0;
        }
      }
    `}render(){const t=this.hasSignal;return e.html`
      <div class="buzzer-container">
        <svg
          class="music-note"
          style="visibility: ${t?"":"hidden"}"
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="8"
          viewBox="0 0 8 8"
        >
          <path
            d="M8 0c-5 0-6 1-6 1v4.09c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-3.97c.73-.23 1.99-.44 4-.5v2.06c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-5.5z"
          />
        </svg>

        <svg
          width="17mm"
          height="20mm"
          version="1.1"
          viewBox="0 0 17 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m8 16.5v3.5" fill="none" stroke="#000" stroke-width=".5" />
          <path d="m9 16.5v3.5" fill="#f00" stroke="#f00" stroke-width=".5" />
          <g stroke="#000">
            <g>
              <ellipse cx="8.5" cy="8.5" rx="8.15" ry="8.15" fill="#1a1a1a" stroke-width=".7" />
              <circle
                cx="8.5"
                cy="8.5"
                r="6.3472"
                fill="none"
                stroke-width=".3"
                style="paint-order:normal"
              />
              <circle
                cx="8.5"
                cy="8.5"
                r="4.3488"
                fill="none"
                stroke-width=".3"
                style="paint-order:normal"
              />
            </g>
            <circle cx="8.5" cy="8.5" r="1.3744" fill="#ccc" stroke-width=".25" />
          </g>
        </svg>
      </div>
    `}};exports.BuzzerElement=i,t([(0,e.property)()],i.prototype,"hasSignal",void 0),exports.BuzzerElement=i=t([(0,e.customElement)("wokwi-buzzer")],i);
},{"lit-element":"bhxD"}],"U8nX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.classMap=void 0;var t=require("../lit-html.js");class e{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const s of e)this.classes.add(s)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}}const s=new WeakMap,i=(0,t.directive)(i=>a=>{if(!(a instanceof t.AttributePart)||a instanceof t.PropertyPart||"class"!==a.committer.name||a.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:c}=a,{element:r}=c;let o=s.get(a);void 0===o&&(r.setAttribute("class",c.strings.join(" ")),s.set(a,o=new Set));const n=r.classList||new e(r);o.forEach(t=>{t in i||(n.remove(t),o.delete(t))});for(const t in i){const e=i[t];e!=o.has(t)&&(e?(n.add(t),o.add(t)):(n.remove(t),o.delete(t)))}"function"==typeof n.commit&&n.commit()});exports.classMap=i;
},{"../lit-html.js":"SPDu"}],"Dc62":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RotaryDialerElement=void 0;var t=require("lit-element"),e=require("lit-html/directives/style-map"),i=require("lit-html/directives/class-map"),s=function(t,e,i,s){var a,r=arguments.length,l=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(l=(r<3?a(l):r>3?a(e,i,l):a(e,i))||l);return r>3&&l&&Object.defineProperty(e,i,l),l};let a=class extends t.LitElement{constructor(){super(...arguments),this.digit="",this.stylesMapping={},this.classes={"rotate-path":!0},this.degrees=[320,56,87,115,143,173,204,232,260,290]}static get styles(){return t.css`
      .text {
        cursor: grab;
        user-select: none;
      }
      input:focus + svg #container {
        stroke: #4e50d7;
        stroke-width: 3;
      }
      .hide-input {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
      }
      .rotate-path {
        transform-origin: center;
        transition: transform 1000ms ease-in;
      }
      .dialer-anim {
        transform: rotate(var(--angle));
      }
    `}removeDialerAnim(){this.classes=Object.assign(Object.assign({},this.classes),{"dialer-anim":!1}),this.stylesMapping={"--angle":0},this.requestUpdate()}dial(t){this.digit=t,this.addDialerAnim(t)}onValueChange(t){const e=t.target;this.digit=parseInt(e.value),this.dial(this.digit),e.value=""}addDialerAnim(t){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("dial-start",{detail:{digit:this.digit}})),this.classes=Object.assign(Object.assign({},this.classes),{"dialer-anim":!0});const e=this.degrees[t];this.stylesMapping={"--angle":e+"deg"},this.requestUpdate()})}focusInput(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".hide-input");null==e||e.focus()}render(){return t.html`
      <input
        tabindex="0"
        type="number"
        class="hide-input"
        value="${this.digit}"
        @input="${this.onValueChange}"
      />
      <svg width="266" height="266" @click="${this.focusInput}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(1 1)">
          <circle stroke="#979797" stroke-width="3" fill="#1F1F1F" cx="133" cy="133" r="131" />
          <circle stroke="#fff" stroke-width="2" fill="#D8D8D8" cx="133" cy="133" r="72" />
          <path
            class=${(0,i.classMap)(this.classes)}
            @transitionstart="${()=>{this.classes["dialer-anim"]||this.dispatchEvent(new CustomEvent("dial",{detail:{digit:this.digit}}))}}"
            @transitionend="${()=>{this.classes["dialer-anim"]||this.dispatchEvent(new CustomEvent("dial-end",{detail:{digit:this.digit}})),this.removeDialerAnim()}}"
            d="M133.5,210 C146.478692,210 157,220.521308 157,233.5 C157,246.478692 146.478692,257 133.5,257 C120.521308,257 110,246.478692 110,233.5 C110,220.521308 120.521308,210 133.5,210 Z M83.5,197 C96.4786916,197 107,207.521308 107,220.5 C107,233.478692 96.4786916,244 83.5,244 C70.5213084,244 60,233.478692 60,220.5 C60,207.521308 70.5213084,197 83.5,197 Z M45.5,163 C58.4786916,163 69,173.521308 69,186.5 C69,199.478692 58.4786916,210 45.5,210 C32.5213084,210 22,199.478692 22,186.5 C22,173.521308 32.5213084,163 45.5,163 Z M32.5,114 C45.4786916,114 56,124.521308 56,137.5 C56,150.478692 45.4786916,161 32.5,161 C19.5213084,161 9,150.478692 9,137.5 C9,124.521308 19.5213084,114 32.5,114 Z M234.5,93 C247.478692,93 258,103.521308 258,116.5 C258,129.478692 247.478692,140 234.5,140 C221.521308,140 211,129.478692 211,116.5 C211,103.521308 221.521308,93 234.5,93 Z M41.5,64 C54.4786916,64 65,74.5213084 65,87.5 C65,100.478692 54.4786916,111 41.5,111 C28.5213084,111 18,100.478692 18,87.5 C18,74.5213084 28.5213084,64 41.5,64 Z M214.5,46 C227.478692,46 238,56.5213084 238,69.5 C238,82.4786916 227.478692,93 214.5,93 C201.521308,93 191,82.4786916 191,69.5 C191,56.5213084 201.521308,46 214.5,46 Z M76.5,26 C89.4786916,26 100,36.5213084 100,49.5 C100,62.4786916 89.4786916,73 76.5,73 C63.5213084,73 53,62.4786916 53,49.5 C53,36.5213084 63.5213084,26 76.5,26 Z M173.5,15 C186.478692,15 197,25.5213084 197,38.5 C197,51.4786916 186.478692,62 173.5,62 C160.521308,62 150,51.4786916 150,38.5 C150,25.5213084 160.521308,15 173.5,15 Z M123.5,7 C136.478692,7 147,17.5213084 147,30.5 C147,43.4786916 136.478692,54 123.5,54 C110.521308,54 100,43.4786916 100,30.5 C100,17.5213084 110.521308,7 123.5,7 Z"
            id="slots"
            stroke="#fff"
            fill-opacity="0.5"
            fill="#D8D8D8"
            style=${(0,e.styleMap)(this.stylesMapping)}
          ></path>
        </g>
        <circle id="container" fill-opacity=".5" fill="#070707" cx="132.5" cy="132.5" r="132.5" />
        <g class="text" font-family="Marker Felt, monospace" font-size="21" fill="#FFF">
          <text @mouseup=${()=>this.dial(0)} x="129" y="243">0</text>
          <text @mouseup=${()=>this.dial(9)} x="78" y="230">9</text>
          <text @mouseup=${()=>this.dial(8)} x="40" y="194">8</text>
          <text @mouseup=${()=>this.dial(7)} x="28" y="145">7</text>
          <text @mouseup=${()=>this.dial(6)} x="35" y="97">6</text>
          <text @mouseup=${()=>this.dial(5)} x="72" y="58">5</text>
          <text @mouseup=${()=>this.dial(4)} x="117" y="41">4</text>
          <text @mouseup=${()=>this.dial(3)} x="168" y="47">3</text>
          <text @mouseup=${()=>this.dial(2)} x="210" y="79">2</text>
          <text @mouseup=${()=>this.dial(1)} x="230" y="126">1</text>
        </g>
        <path
          d="M182.738529,211.096297 L177.320119,238.659185 L174.670528,252.137377 L188.487742,252.137377 L182.738529,211.096297 Z"
          stroke="#979797"
          fill="#D8D8D8"
          transform="translate(181.562666, 230.360231) rotate(-22.000000) translate(-181.562666, -230.360231)"
        ></path>
      </svg>
    `}};exports.RotaryDialerElement=a,exports.RotaryDialerElement=a=s([(0,t.customElement)("wokwi-rotary-dialer")],a);
},{"lit-element":"bhxD","lit-html/directives/style-map":"QXwr","lit-html/directives/class-map":"U8nX"}],"xPnD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ServoElement=void 0;var e=require("lit-element"),t=function(e,t,a,r){var l,i=arguments.length,o=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var h=e.length-1;h>=0;h--)(l=e[h])&&(o=(i<3?l(o):i>3?l(t,a,o):l(t,a))||o);return i>3&&o&&Object.defineProperty(t,a,o),o};let a=class extends e.LitElement{constructor(){super(...arguments),this.angle=0,this.horn="single",this.hornColor="#ccc",this.pinInfo=[{name:"GND",x:0,y:50,signals:[{type:"power",signal:"GND"}]},{name:"V+",x:0,y:59.5,signals:[{type:"power",signal:"VCC"}]},{name:"PWM",x:0,y:69,signals:[{type:"pwm"}]}]}hornPath(){switch(this.horn){case"cross":return"m119.54 50.354h-18.653v-18.653a8.4427 8.4427 0 0 0-8.4427-8.4427h-1.9537a8.4427 8.4427 0 0 0-8.4427 8.4427v18.653h-18.653a8.4427 8.4427 0 0 0-8.4427 8.4427v1.9537a8.4427 8.4427 0 0 0 8.4427 8.4427h18.653v18.653a8.4427 8.4427 0 0 0 8.4427 8.4427h1.9537a8.4427 8.4427 0 0 0 8.4427-8.4427v-18.653h18.653a8.4427 8.4427 0 0 0 8.4426-8.4427v-1.9537a8.4427 8.4427 0 0 0-8.4426-8.4427zm-57.447 12.136a2.7165 2.7165 0 1 1 2.7119-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165zm8.7543 0a2.7165 2.7165 0 1 1 2.7119-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165zm20.621-34.813a2.7165 2.7165 0 1 1-2.7165 2.7165 2.7165 2.7165 0 0 1 2.7165-2.7165zm0 8.7543a2.7165 2.7165 0 1 1-2.7165 2.7165 2.7165 2.7165 0 0 1 2.7165-2.7165zm0 55.438a2.7165 2.7165 0 1 1 2.7165-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165zm0-8.7543a2.7165 2.7165 0 1 1 2.7165-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165zm5.9215-17.42a8.3729 8.3729 0 1 1 0-11.843 8.3729 8.3729 0 0 1 0 11.843zm14.704-3.205a2.7165 2.7165 0 1 1 2.7165-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165zm8.7543 0a2.7165 2.7165 0 1 1 2.7165-2.7165 2.7165 2.7165 0 0 1-2.7165 2.7165z";case"double":return"m101.63 57.808c-0.0768-0.48377-0.16978-0.8838-0.23258-1.1629l-4.112-51.454c0-2.8654-2.6026-5.1912-5.8145-5.1912s-5.8145 2.3258-5.8145 5.1912l-4.1004 51.447c-0.07443 0.28607-0.16746 0.69774-0.24421 1.1629a12.473 12.473 0 0 0 0 3.9306c0.07675 0.48377 0.16978 0.8838 0.24421 1.1629l4.1004 51.461c0 2.8654 2.6026 5.1912 5.8145 5.1912s5.8145-2.3258 5.8145-5.1912l4.1004-51.447c0.0744-0.28607 0.16746-0.69774 0.23258-1.1629a12.473 12.473 0 0 0 0.0116-3.9376zm-4.2376 7.8868a8.3426 8.3426 0 0 1-3.5375 2.1072c-0.25816 0.07443-0.52098 0.13955-0.7838 0.19072a8.7217 8.7217 0 0 1-1.1978 0.1442c-0.26747 0.01163-0.53726 0.01163-0.80473 0a8.7217 8.7217 0 0 1-1.1978-0.1442c-0.26282-0.05117-0.52563-0.11629-0.78379-0.19072a8.3729 8.3729 0 0 1 0-16.048c0.25816-0.07675 0.52098-0.13955 0.78379-0.19072a8.7217 8.7217 0 0 1 1.1978-0.1442c0.26747-0.01163 0.53726-0.01163 0.80473 0a8.7217 8.7217 0 0 1 1.1978 0.1442c0.26282 0.05117 0.52563 0.11396 0.7838 0.19072a8.3729 8.3729 0 0 1 3.5375 13.955zm-5.9215-54.996a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.6055a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.3729a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.6055a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 72.565a2.791 2.791 0 1 1 2.791-2.791 2.791 2.791 0 0 1-2.791 2.791zm0-8.6055a2.791 2.791 0 1 1 2.791-2.791 2.791 2.791 0 0 1-2.791 2.791zm0-8.3729a2.791 2.791 0 1 1 2.791-2.791 2.791 2.791 0 0 1-2.791 2.791zm0-8.6055a2.791 2.791 0 1 1 2.791-2.791 2.791 2.791 0 0 1-2.791 2.791z";case"single":default:return"m101.6 59.589-4.3167-54.166c0-2.8654-2.6026-5.1912-5.8145-5.1912s-5.8145 2.3258-5.8145 5.1912l-4.3167 54.166a8.3264 8.3264 0 0 0-0.10234 1.2792c0 5.047 4.5818 9.1381 10.234 9.1381s10.234-4.0911 10.234-9.1381a8.3264 8.3264 0 0 0-0.10233-1.2792zm-10.131-48.658a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.6055a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.3729a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm0 8.6055a2.791 2.791 0 1 1-2.791 2.791 2.791 2.791 0 0 1 2.791-2.791zm5.9215 29.412a8.3729 8.3729 0 1 1 0-11.843 8.3729 8.3729 0 0 1 0 11.843z"}}render(){var t;return e.html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="45mm"
        height="31.63mm"
        version="1.1"
        viewBox="0 0 170.08 119.55"
      >
        <defs>
          <g id="pin">
            <rect x="0" y="-1.91" width="3.72" height="3.71" />
            <path d="m2.026 -1.91h13.532l-13.425 0.51865z" />
            <path d="m2.026 1.80h13.532l-13.425-0.50702z" />
            <rect fill="#ccc" x="0.33" y="-1.23" width="3.04" height="2.46" rx=".15" />
          </g>
        </defs>
        <g stroke-width="2.7" fill="none">
          <path
            stroke="#b44200"
            d="m 83.32,56.6 c0,0 -32.99,0.96 -43.32,0 -6.20,-0.58 -10.60,-6.20 -14.87,-6.31"
          />
          <path stroke="#ff2300" d="m83.326 59.6h-62.971" />
          <path
            stroke="#f47b00"
            d="m 83.32,62.6 c0,0 -32.60,-0.61 -43.33,-0.15 -6.87,0.29 -12.01,6.82 -14.77,6.73"
          />
        </g>
        <rect fill="#666" y="45.5" width="25.71" height="28" rx="1.14" />
        <use xlink:href="#pin" x="4.7" y="50.06" />
        <use xlink:href="#pin" x="4.7" y="59.66" />
        <use xlink:href="#pin" x="4.7" y="69.26" />
        <path
          fill="#4d4d4d"
          d="m163.92 66.867a7.09 7.09 0 1 1 5.8145-11.136 0.18 0.18 0 0 0 0.33-0.10234v-14.346h-17.664v36.98h17.676v-14.346a0.18 0.18 0 0 0-0.333-0.107 7.08 7.08 0 0 1-5.83 3.06z"
        />
        <path
          fill="#4d4d4d"
          d="m55.068 66.75a7.09 7.09 0 1 0-5.8261-11.136 0.18 0.18 0 0 1-0.33-0.10234v-14.346h17.676v36.98h-17.676v-14.346a0.18 0.18 0 0 1 0.333-0.107 7.08 7.08 0 0 0 5.83 3.06z"
        />
        <rect fill="#666" x="64.255" y="37.911" width="90.241" height="43.725" rx="5.3331" />
        <path fill="gray" d="m110.07 50.005h-14.42v19.537h14.42a9.7684 9.7684 0 0 0 0-19.537z" />
        <circle fill="#999" cx="91.467" cy="59.773" r="18.606" />
        <path
          fill=${this.hornColor}
          transform="translate(91.467 59.773) rotate(${null!==(t=this.angle)&&void 0!==t?t:0}) translate(-91.467 -59.773)"
          d="${this.hornPath()}"
        />
        <circle fill="gray" cx="91.467" cy="59.773" r="8.3729" />
        <circle fill="#ccc" cx="91.467" cy="59.773" r="6.2494" />
        <path
          fill="#666"
          d="m94.911 62.543-2.3839-2.4165a0.42562 0.42562 0 0 1 0-0.60471l2.4281-2.3863a0.64657 0.64657 0 0 0 0.06512-0.8652 0.62797 0.62797 0 0 0-0.93032-0.05117l-2.4351 2.4049a0.4326 0.4326 0 0 1-0.60703 0l-2.3863-2.4165a0.6489 0.6489 0 0 0-0.8652-0.06512 0.63262 0.63262 0 0 0-0.05117 0.93032l2.4049 2.4328a0.42795 0.42795 0 0 1 0 0.60703l-2.4142 2.3863a0.65122 0.65122 0 0 0-0.06745 0.8652 0.63029 0.63029 0 0 0 0.93032 0.05117l2.4351-2.4049a0.42562 0.42562 0 0 1 0.60471 0l2.3863 2.4398a0.63262 0.63262 0 0 0 0.93032-0.04186 0.64657 0.64657 0 0 0-0.04419-0.8652z"
        />
      </svg>
    `}};exports.ServoElement=a,t([(0,e.property)()],a.prototype,"angle",void 0),t([(0,e.property)()],a.prototype,"horn",void 0),t([(0,e.property)()],a.prototype,"hornColor",void 0),exports.ServoElement=a=t([(0,e.customElement)("wokwi-servo")],a);
},{"lit-element":"bhxD"}],"HyOI":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DHT22Element=void 0;var a=require("lit-element"),e=function(a,e,t,h){var r,v=arguments.length,n=v<3?e:null===h?h=Object.getOwnPropertyDescriptor(e,t):h;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(a,e,t,h);else for(var m=a.length-1;m>=0;m--)(r=a[m])&&(n=(v<3?r(n):v>3?r(e,t,n):r(e,t))||n);return v>3&&n&&Object.defineProperty(e,t,n),n};let t=class extends a.LitElement{constructor(){super(...arguments),this.pinInfo=[{name:"VCC",x:10,y:114.9,signals:[{type:"power",signal:"VCC"}],number:1},{name:"SDA",x:22.4,y:114.9,signals:[],number:2},{name:"NC",x:35.3,y:114.9,signals:[],number:3},{name:"GND",x:48,y:114.9,signals:[{type:"power",signal:"GND"}],number:4}]}render(){return a.html`
      <svg
        width="15.1mm"
        height="30.885mm"
        version="1.1"
        viewBox="0 0 15.1 30.885"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="#ccc" stroke-linecap="round" stroke-width=".21">
          <rect x="2.27" y="23.885" width=".75" height="7" rx=".2" />
          <rect x="5.55" y="23.885" width=".75" height="7" rx=".2" />
          <rect x="8.96" y="23.885" width=".75" height="7" rx=".2" />
          <rect x="12.32" y="23.885" width=".75" height="7" rx=".2" />
        </g>
        <path
          d="M15.05 23.995V5.033m0 0c0-.107-1.069-4.962-2.662-4.96L2.803.09C1.193.09.05 4.926.05 5.033v18.962c0 .107.086.192.192.192h14.616a.192.192 0 00.192-.192M7.615.948h.004c1.08 0 1.956.847 1.956 1.892s-.876 1.892-1.956 1.892-1.956-.847-1.956-1.892c0-1.044.873-1.89 1.952-1.892zM4.967 8.66H5.9a.21.21 0 01.211.21v.935a.21.21 0 01-.21.21h-.934a.21.21 0 01-.212-.21V8.87a.21.21 0 01.212-.211zm2.168 0h.934a.21.21 0 01.21.21v.935a.21.21 0 01-.21.21h-.934a.21.21 0 01-.21-.21V8.87a.21.21 0 01.21-.211zm2.152 0h.935a.21.21 0 01.21.21v.935a.21.21 0 01-.21.21h-.935a.21.21 0 01-.21-.21V8.87a.21.21 0 01.21-.211zm5.757 0v1.356m0 0h-3.217a.553.553 0 01-.554-.554v-.249a.55.55 0 01.554-.553h3.217M.05 8.66h3.282c.307 0 .554.247.554.553v.25a.552.552 0 01-.554.553H.05m0 1.054h3.282c.307 0 .554.247.554.554v.249a.552.552 0 01-.554.554H.05m4.917-1.357H5.9a.21.21 0 01.211.211v.934a.21.21 0 01-.21.211h-.934a.21.21 0 01-.212-.21v-.935a.21.21 0 01.212-.21zm2.168 0h.934a.21.21 0 01.211.211v.934a.21.21 0 01-.211.211h-.934a.21.21 0 01-.21-.21v-.935a.21.21 0 01.21-.21zm2.153 0h.934a.21.21 0 01.21.211v.934a.21.21 0 01-.21.211h-.934a.21.21 0 01-.211-.21v-.935a.21.21 0 01.21-.21zm2.539 0h3.217v1.356h-3.217a.552.552 0 01-.554-.553v-.25c0-.306.247-.553.554-.553zM.05 13.547h3.282c.307 0 .553.247.553.554v.249a.552.552 0 01-.553.553H.05m4.916-1.356H5.9a.21.21 0 01.211.211v.934a.21.21 0 01-.21.211h-.935a.21.21 0 01-.21-.21v-.935a.21.21 0 01.21-.21zm2.169 0h.933a.21.21 0 01.212.211v.934a.21.21 0 01-.212.211h-.933a.21.21 0 01-.211-.21v-.935a.21.21 0 01.21-.21zm2.152 0h.934a.21.21 0 01.211.211v.934a.21.21 0 01-.21.211h-.935a.21.21 0 01-.21-.21v-.935a.21.21 0 01.21-.21zm5.757 1.356h-3.217a.552.552 0 01-.554-.553v-.25c0-.306.247-.553.554-.553h3.217m0 3.791h-3.218a.553.553 0 01-.553-.554v-.249c0-.306.247-.553.553-.553h3.218m-14.994 0h3.282c.307 0 .553.247.553.553v.25a.552.552 0 01-.553.553H.05m4.916-1.356H5.9a.21.21 0 01.211.211v.934a.21.21 0 01-.21.21h-.935a.21.21 0 01-.21-.21v-.934a.21.21 0 01.21-.21zm2.169 0h.934a.21.21 0 01.21.211v.934a.21.21 0 01-.21.21h-.934a.21.21 0 01-.211-.21v-.934a.21.21 0 01.211-.21zm2.152 0h.934a.21.21 0 01.211.211v.934a.21.21 0 01-.21.21h-.935a.21.21 0 01-.21-.21v-.934a.21.21 0 01.21-.21zM.05 18.362h3.282c.307 0 .553.247.553.554v.25a.552.552 0 01-.553.552H.05m4.916-1.355H5.9a.21.21 0 01.211.21v.934a.21.21 0 01-.21.211h-.935a.21.21 0 01-.21-.21v-.934a.21.21 0 01.21-.211zm2.169 0h.933a.21.21 0 01.212.21v.934a.21.21 0 01-.212.211h-.933a.21.21 0 01-.211-.21v-.934a.21.21 0 01.21-.211zm2.152 0h.934a.21.21 0 01.211.21v.934a.21.21 0 01-.21.211h-.935a.21.21 0 01-.21-.21v-.934a.21.21 0 01.21-.211zm5.757 1.355h-3.218a.552.552 0 01-.553-.553v-.25c0-.306.247-.552.553-.552h3.218M10.49 5.056V7.31a.192.192 0 01-.193.193h-.85a.192.192 0 01-.193-.193V5.056H8.23v2.286a.192.192 0 01-.192.192h-.851a.192.192 0 01-.193-.192V5.056H5.94v2.286a.192.192 0 01-.193.192h-.85a.192.192 0 01-.193-.192V5.056C.033 5.025.05 5.033.05 5.033m15 0l-4.56.023v0"
          fill="#f2f2f2"
          stroke="#000"
          stroke-linecap="round"
          stroke-width=".1"
        />
        <text
          x="3.7415893"
          y="22.863354"
          fill="#000000"
          font-family="sans-serif"
          font-size="2.2px"
          stroke-width=".05"
          style="line-height:1.25"
        >
          DHT22
        </text>
      </svg>
    `}};exports.DHT22Element=t,exports.DHT22Element=t=e([(0,a.customElement)("wokwi-dht22")],t);
},{"lit-element":"bhxD"}],"teN6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ArduinoMegaElement=void 0;var a=require("lit-element"),t=require("./patterns/pins-female"),e=require("./pin"),n=function(a,t,e,n){var s,l=arguments.length,i=l<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,e):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(a,t,e,n);else for(var p=a.length-1;p>=0;p--)(s=a[p])&&(i=(l<3?s(i):l>3?s(t,e,i):s(t,e))||i);return l>3&&i&&Object.defineProperty(t,e,i),i};let s=class extends a.LitElement{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.pinInfo=[{name:"SCL",x:90,y:9,signals:[(0,e.i2c)("SCL")]},{name:"SDA",x:100,y:9,signals:[(0,e.i2c)("SDA")]},{name:"AREF",x:109,y:9,signals:[]},{name:"GND.1",x:119,y:9,signals:[{type:"power",signal:"GND"}]},{name:"13",x:129,y:9,signals:[{type:"pwm"}]},{name:"12",x:138,y:9,signals:[{type:"pwm"}]},{name:"11",x:148,y:9,signals:[{type:"pwm"}]},{name:"10",x:157.5,y:9,signals:[{type:"pwm"}]},{name:"9",x:167.5,y:9,signals:[{type:"pwm"}]},{name:"8",x:177,y:9,signals:[{type:"pwm"}]},{name:"7",x:190,y:9,signals:[{type:"pwm"}]},{name:"6",x:200,y:9,signals:[{type:"pwm"}]},{name:"5",x:209.5,y:9,signals:[{type:"pwm"}]},{name:"4",x:219,y:9,signals:[{type:"pwm"}]},{name:"3",x:228.5,y:9,signals:[{type:"pwm"}]},{name:"2",x:238,y:9,signals:[{type:"pwm"}]},{name:"1",x:247.5,y:9,signals:[(0,e.usart)("TX")]},{name:"0",x:257.5,y:9,signals:[(0,e.usart)("RX")]},{name:"14",x:270.5,y:9,signals:[(0,e.usart)("TX",3)]},{name:"15",x:280,y:9,signals:[(0,e.usart)("RX",3)]},{name:"16",x:289.5,y:9,signals:[(0,e.usart)("TX",2)]},{name:"17",x:299,y:9,signals:[(0,e.usart)("RX",2)]},{name:"18",x:308.5,y:9,signals:[(0,e.usart)("TX",1)]},{name:"19",x:318.5,y:9,signals:[(0,e.usart)("RX",1)]},{name:"20",x:328,y:9,signals:[(0,e.i2c)("SDA")]},{name:"21",x:337.5,y:9,signals:[(0,e.i2c)("SCL")]},{name:"5V.1",x:361,y:8,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"5V.2",x:371,y:8,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"22",x:361,y:17.5,signals:[]},{name:"23",x:371,y:17.5,signals:[]},{name:"24",x:361,y:27.25,signals:[]},{name:"25",x:371,y:27.25,signals:[]},{name:"26",x:361,y:36.75,signals:[]},{name:"27",x:371,y:36.75,signals:[]},{name:"28",x:361,y:46.25,signals:[]},{name:"29",x:371,y:46.25,signals:[]},{name:"30",x:361,y:56,signals:[]},{name:"31",x:371,y:56,signals:[]},{name:"32",x:361,y:65.5,signals:[]},{name:"33",x:371,y:65.5,signals:[]},{name:"34",x:361,y:75,signals:[]},{name:"35",x:371,y:75,signals:[]},{name:"36",x:361,y:84.5,signals:[]},{name:"37",x:371,y:84.5,signals:[]},{name:"38",x:361,y:94.25,signals:[]},{name:"39",x:371,y:94.25,signals:[]},{name:"40",x:361,y:103.75,signals:[]},{name:"41",x:371,y:103.75,signals:[]},{name:"42",x:361,y:113.5,signals:[]},{name:"43",x:371,y:113.5,signals:[]},{name:"44",x:361,y:123,signals:[{type:"pwm"}]},{name:"45",x:371,y:123,signals:[{type:"pwm"}]},{name:"46",x:361,y:132.75,signals:[{type:"pwm"}]},{name:"47",x:371,y:132.75,signals:[]},{name:"48",x:361,y:142.25,signals:[]},{name:"49",x:371,y:142.25,signals:[]},{name:"50",x:361,y:152,signals:[(0,e.spi)("MISO")]},{name:"51",x:371,y:152,signals:[(0,e.spi)("MOSI")]},{name:"52",x:361,y:161.5,signals:[(0,e.spi)("SCK")]},{name:"53",x:371,y:161.5,signals:[(0,e.spi)("SS")]},{name:"GND.4",x:361,y:171.25,signals:[{type:"power",signal:"GND"}]},{name:"GND.5",x:371,y:171.25,signals:[{type:"power",signal:"GND"}]},{name:"IOREF",x:136,y:184.5,signals:[]},{name:"RESET",x:145.5,y:184.5,signals:[]},{name:"3.3V",x:155,y:184.5,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"5V",x:164.5,y:184.5,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"GND.2",x:174.25,y:184.5,signals:[{type:"power",signal:"GND"}]},{name:"GND.3",x:183.75,y:184.5,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:193.5,y:184.5,signals:[{type:"power",signal:"VCC"}]},{name:"A0",x:208.5,y:184.5,signals:[(0,e.analog)(0)]},{name:"A1",x:218,y:184.5,signals:[(0,e.analog)(1)]},{name:"A2",x:227.5,y:184.5,signals:[(0,e.analog)(2)]},{name:"A3",x:237.25,y:184.5,signals:[(0,e.analog)(3)]},{name:"A4",x:246.75,y:184.5,signals:[(0,e.analog)(4)]},{name:"A5",x:256.25,y:184.5,signals:[(0,e.analog)(5)]},{name:"A6",x:266,y:184.5,signals:[(0,e.analog)(6)]},{name:"A7",x:275.5,y:184.5,signals:[(0,e.analog)(7)]},{name:"A8",x:290.25,y:184.5,signals:[(0,e.analog)(8)]},{name:"A9",x:300,y:184.5,signals:[(0,e.analog)(9)]},{name:"A10",x:309.5,y:184.5,signals:[(0,e.analog)(10)]},{name:"A11",x:319.25,y:184.5,signals:[(0,e.analog)(11)]},{name:"A12",x:328.75,y:184.5,signals:[(0,e.analog)(12)]},{name:"A13",x:338.5,y:184.5,signals:[(0,e.analog)(13)]},{name:"A14",x:348,y:184.5,signals:[(0,e.analog)(14)]},{name:"A15",x:357.75,y:184.5,signals:[(0,e.analog)(15)]}]}render(){const{ledPower:e,led13:n,ledRX:s,ledTX:l}=this;return a.html`
      <svg
        width="102.66mm"
        height="50.80mm"
        version="1.1"
        viewBox="-4 0 102.66 50.80"
        style="font-size: 2px; font-family: monospace"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <g id="led-body" fill="#eee">
            <rect x="0" y="0" height="1.2" width="2.6" fill="#c6c6c6" />
            <rect x="0.6" y="-0.1" width="1.35" height="1.4" stroke="#aaa" stroke-width="0.05" />
          </g>
        </defs>

        <filter id="ledFilter" x="-0.8" y="-0.8" height="2.2" width="2.8">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>

        ${t.pinsFemalePattern}

        <pattern id="pin-male" width="2.54" height="4.80" patternUnits="userSpaceOnUse">
          <rect ry="0.3" rx="0.3" width="2.12" height="4.80" fill="#565656" />
          <ellipse cx="1" cy="1.13" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
          <ellipse cx="1" cy="3.67" rx="0.5" ry="0.5" fill="#aaa"></ellipse>
        </pattern>

        <!-- PCB -->
        <path
          d="M2.105.075v50.653h94.068v-1.206l2.412-2.412V14.548l-2.412-2.413V2.487L93.785.075zm14.443.907a1.505 1.505 0 01.03 0 1.505 1.505 0 011.504 1.505 1.505 1.505 0 01-1.504 1.506 1.505 1.505 0 01-1.506-1.506A1.505 1.505 0 0116.548.982zm71.154 0a1.505 1.505 0 01.03 0 1.505 1.505 0 011.505 1.505 1.505 1.505 0 01-1.505 1.506 1.505 1.505 0 01-1.506-1.506A1.505 1.505 0 0187.702.982zM64.818 15.454a1.505 1.505 0 011.504 1.506 1.505 1.505 0 01-1.504 1.505 1.505 1.505 0 01-1.506-1.505 1.505 1.505 0 011.506-1.506zm0 26.532a1.505 1.505 0 011.504 1.506 1.505 1.505 0 01-1.504 1.505 1.505 1.505 0 01-1.506-1.505 1.505 1.505 0 011.506-1.506zm-49.476 4.825a1.505 1.505 0 01.03 0 1.505 1.505 0 011.505 1.504 1.505 1.505 0 01-1.506 1.506 1.505 1.505 0 01-1.505-1.506 1.505 1.505 0 011.476-1.504zm78.39 0a1.505 1.505 0 01.03 0 1.505 1.505 0 011.504 1.504 1.505 1.505 0 01-1.504 1.506 1.505 1.505 0 01-1.506-1.506 1.505 1.505 0 011.476-1.504z"
          fill="#2b6b99"
        />

        <!-- USB Connector -->
        <g style="fill:#b3b2b2;stroke:#b3b2b2;stroke-width:0.010">
          <ellipse cx="3.84" cy="9.56" rx="1.12" ry="1.03" />
          <ellipse cx="3.84" cy="21.04" rx="1.12" ry="1.03" />
          <g fill="#000">
            <rect width="11" height="11.93" x="-0.05" y="9.72" rx="0.2" ry="0.2" opacity="0.24" />
          </g>
          <rect x="-4" y="9.37" height="11.85" width="14.46" />
          <rect x="-4" y="9.61" height="11.37" width="14.05" fill="#706f6f" />
          <rect x="-4" y="9.71" height="11.17" width="13.95" fill="#9d9d9c" />
        </g>

        <!-- Power jack -->
        <g stroke-width=".254" fill="black" transform="translate(0 -4)">
          <path
            d="m-2.58 48.53v2.289c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-2.289z"
            fill="#252728"
            opacity=".3"
          />
          <path
            d="m11.334 42.946c0-0.558-0.509-1.016-1.132-1.016h-10.043v9.652h10.043c0.622 0 1.132-0.457 1.132-1.016z"
            opacity=".3"
          />
          <path
            d="m-2.072 40.914c-0.279 0-0.507 0.204-0.507 0.454v8.435c0 0.279 0.228 0.507 0.507 0.507h1.722c0.279 0 0.507-0.228 0.507-0.507v-8.435c0-0.249-0.228-0.454-0.507-0.454z"
          />
          <path
            d="m-2.58 48.784v1.019c0 0.279 0.228 0.508 0.508 0.508h1.722c0.279 0 0.508-0.228 0.508-0.508v-1.019z"
            opacity=".3"
          />
          <path
            d="m11.334 43.327c0.139 0 0.254 0.114 0.254 0.254v4.064c0 0.139-0.114 0.254-0.254 0.254"
          />
          <path
            d="m11.334 42.438c0-0.558-0.457-1.016-1.016-1.016h-10.16v8.382h10.16c0.558 0 1.016-0.457 1.016-1.016z"
          />
          <path
            d="m10.064 49.804h-9.906v-8.382h1.880c-1.107 0-1.363 1.825-1.363 3.826 0 1.765 1.147 3.496 3.014 3.496h6.374z"
            opacity=".3"
          />
          <rect x="10.064" y="41.422" width=".254" height="8.382" fill="#ffffff" opacity=".2" />
          <path
            d="m10.318 48.744v1.059c0.558 0 1.016-0.457 1.016-1.016v-0.364c0 0.313-1.016 0.320-1.016 0.320z"
            opacity=".3"
          />
        </g>

        <!-- Pin Headers -->
        <g transform="translate(18.4 1.07)">
          <rect width="${.38+25.4}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(44.81 1.07)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(66 1.07)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(27.93 47.5)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(49.63 47.5)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(71.34 47.5)">
          <rect width="${20.7}" height="2.54" fill="url(#pins-female)"></rect>
        </g>
        <g transform="translate(90.1 0.8)">
          <rect width="${5.46}" height="${45.72}" fill="url(#pins-female)"></rect>
        </g>

        <!-- MCU -->
        <rect x="43" y="17.55" fill="#000" width="13.5" height="13.5" rx="0.5" />

        <!-- Programming Headers -->
        <g transform="translate(61.5 21.09)">
          <rect width="4.80" height="7" fill="url(#pin-male)" />
        </g>

        <!-- LEDs -->
        <g transform="translate(72.20 15.58)">
          <use xlink:href="#led-body" />
          ${e&&a.svg`<circle cx="1.3" cy="0.55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="68" y="16.75">PWR</tspan>
        </text>

        <g transform="translate(26 13.86)">
          <use xlink:href="#led-body" />
          ${n&&a.svg`<circle cx="1.3" cy="0.55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26 18.52)">
          <use xlink:href="#led-body" />
          ${l&&a.svg`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <g transform="translate(26 20.75)">
          <use xlink:href="#led-body" />
          ${s&&a.svg`<circle cx="0.975" cy="0.55" r="1.3" fill="yellow" filter="url(#ledFilter)" />`}
        </g>

        <text fill="#fff">
          <tspan x="29.4" y="15">L</tspan>
          <tspan x="29.4" y="19.8">TX</tspan>
          <tspan x="29.4" y="22">RX</tspan>
          <tspan x="26.5" y="20">&nbsp;</tspan>
        </text>

        <!-- Pin Labels -->
        <rect x="28.27" y="7.6" width="31.5" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="40.84" y="9.8">PWM</tspan>
        </text>

        <rect x="60.5" y="11.8" width="25.4" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="65" y="14.2">COMMUNICATION</tspan>
        </text>

        <text
          transform="translate(22.6 3.4) rotate(270 0 0)"
          fill="#fff"
          style="font-size: 2px; text-anchor: end; font-family: monospace"
        >
          <tspan x="0" dy="2.54">AREF</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">13</tspan>
          <tspan x="0" dy="2.54">12</tspan>
          <tspan x="0" dy="2.54">11</tspan>
          <tspan x="0" dy="2.54">10</tspan>
          <tspan x="0" dy="2.54">9</tspan>
          <tspan x="0" dy="2.54">8</tspan>
          <tspan x="0" dy="4.08">7</tspan>
          <tspan x="0" dy="2.54">6</tspan>
          <tspan x="0" dy="2.54">5</tspan>
          <tspan x="0" dy="2.54">2</tspan>
          <tspan x="0" dy="2.54">3</tspan>
          <tspan x="0" dy="2.54">2</tspan>
          <tspan x="0" dy="2.54">TX→ 1</tspan>
          <tspan x="0" dy="2.54">RX← 0</tspan>
          <tspan x="0" dy="3.34">TX3 14</tspan>
          <tspan x="0" dy="2.54">RX3 15</tspan>
          <tspan x="0" dy="2.54">TX2 16</tspan>
          <tspan x="0" dy="2.54">RX2 17</tspan>
          <tspan x="0" dy="2.54">TX1 18</tspan>
          <tspan x="0" dy="2.54">RX1 19</tspan>
          <tspan x="0" dy="2.54">SCL 20</tspan>
          <tspan x="0" dy="2.54">SDA 21</tspan>
          <tspan x="0" dy="2.54">&nbsp;</tspan>
        </text>

        <rect x="36" y="41.46" width="12.44" height="0.16" fill="#fff"></rect>
        <rect x="50" y="41.46" width="39" height="0.16" fill="#fff"></rect>
        <text fill="#fff" style="font-weight: 900">
          <tspan x="39" y="40.96">POWER</tspan>
          <tspan x="65" y="40.96">ANALOG IN</tspan>
        </text>
        <text transform="translate(30.19 47) rotate(270 0 0)" fill="#fff" style="font-weight: 700">
          <tspan x="0" dy="2.54">IOREF</tspan>
          <tspan x="0" dy="2.54">RESET</tspan>
          <tspan x="0" dy="2.54">3.3V</tspan>
          <tspan x="0" dy="2.54">5V</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">GND</tspan>
          <tspan x="0" dy="2.54">Vin</tspan>
          <tspan x="0" dy="3.74">A0</tspan>
          <tspan x="0" dy="2.54">A1</tspan>
          <tspan x="0" dy="2.54">A2</tspan>
          <tspan x="0" dy="2.54">A3</tspan>
          <tspan x="0" dy="2.54">A4</tspan>
          <tspan x="0" dy="2.54">A5</tspan>
          <tspan x="0" dy="2.54">A6</tspan>
          <tspan x="0" dy="2.54">A7</tspan>
          <tspan x="0" dy="3.74">A8</tspan>
          <tspan x="0" dy="2.54">A9</tspan>
          <tspan x="0" dy="2.54">A10</tspan>
          <tspan x="0" dy="2.54">A11</tspan>
          <tspan x="0" dy="2.54">A12</tspan>
          <tspan x="0" dy="2.54">A13</tspan>
          <tspan x="0" dy="1.84">A14</tspan>
          <tspan x="0" dy="1.84">A15</tspan>
          <tspan x="0" dy="2.54">&nbsp;</tspan>
        </text>

        <!-- Logo -->
        <text x="51.85" y="36" style="font-size:4px;font-weight:bold;line-height:1.25;fill:#fff">
          Arduino MEGA
        </text>
      </svg>
    `}};exports.ArduinoMegaElement=s,n([(0,a.property)()],s.prototype,"led13",void 0),n([(0,a.property)()],s.prototype,"ledRX",void 0),n([(0,a.property)()],s.prototype,"ledTX",void 0),n([(0,a.property)()],s.prototype,"ledPower",void 0),exports.ArduinoMegaElement=s=n([(0,a.customElement)("wokwi-arduino-mega")],s);
},{"lit-element":"bhxD","./patterns/pins-female":"ksYL","./pin":"xoL4"}],"lLXh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ArduinoNanoElement=void 0;var e=require("lit-element"),t=require("./pin"),i=require("./utils/keys"),r=function(e,t,i,r){var s,l=arguments.length,n=l<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var x=e.length-1;x>=0;x--)(s=e[x])&&(n=(l<3?s(n):l>3?s(t,i,n):s(t,i))||n);return l>3&&n&&Object.defineProperty(t,i,n),n};let s=class extends e.LitElement{constructor(){super(...arguments),this.led13=!1,this.ledRX=!1,this.ledTX=!1,this.ledPower=!1,this.resetPressed=!1,this.pinInfo=[{name:"12",x:19.7,y:4.8,signals:[(0,t.spi)("MISO")]},{name:"11",x:29.3,y:4.8,signals:[(0,t.spi)("MOSI"),{type:"pwm"}]},{name:"10",x:38.9,y:4.8,signals:[(0,t.spi)("SS"),{type:"pwm"}]},{name:"9",x:48.5,y:4.8,signals:[{type:"pwm"}]},{name:"8",x:58.1,y:4.8,signals:[]},{name:"7",x:67.7,y:4.8,signals:[]},{name:"6",x:77.3,y:4.8,signals:[{type:"pwm"}]},{name:"5",x:86.9,y:4.8,signals:[{type:"pwm"}]},{name:"4",x:96.5,y:4.8,signals:[]},{name:"3",x:106.1,y:4.8,signals:[{type:"pwm"}]},{name:"2",x:115.7,y:4.8,signals:[]},{name:"GND.2",x:125.3,y:4.8,signals:[{type:"power",signal:"GND"}]},{name:"RESET.2",x:134.9,y:4.8,signals:[]},{name:"1",x:144.5,y:4.8,signals:[(0,t.usart)("TX")]},{name:"0",x:154.1,y:4.8,signals:[(0,t.usart)("RX")]},{name:"13",x:19.7,y:62.4,signals:[(0,t.spi)("SCK")]},{name:"3.3V",x:29.3,y:62.4,signals:[{type:"power",signal:"VCC",voltage:3.3}]},{name:"AREF",x:38.9,y:62.4,signals:[]},{name:"A0",x:48.5,y:62.4,signals:[(0,t.analog)(0)]},{name:"A1",x:58.1,y:62.4,signals:[(0,t.analog)(1)]},{name:"A2",x:67.7,y:62.4,signals:[(0,t.analog)(2)]},{name:"A3",x:77.3,y:62.4,signals:[(0,t.analog)(3)]},{name:"A4",x:86.9,y:62.4,signals:[(0,t.analog)(4),(0,t.i2c)("SCL")]},{name:"A5",x:96.5,y:62.4,signals:[(0,t.analog)(5),(0,t.i2c)("SDA")]},{name:"A6",x:106.1,y:62.4,signals:[(0,t.analog)(6)]},{name:"A7",x:115.7,y:62.4,signals:[(0,t.analog)(7)]},{name:"5V",x:125.3,y:62.4,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"RESET",x:134.9,y:62.4,signals:[]},{name:"GND.1",x:144.5,y:62.4,signals:[{type:"power",signal:"GND"}]},{name:"VIN",x:154.1,y:62.4,signals:[{type:"power",signal:"VCC"}]},{name:"12.2",x:163.7,y:43.2,signals:[(0,t.spi)("MISO")]},{name:"5V.2",x:154.1,y:43.2,signals:[{type:"power",signal:"VCC",voltage:5}]},{name:"13.2",x:163.7,y:33.6,signals:[(0,t.spi)("SCK")]},{name:"11.2",x:154.1,y:33.6,signals:[(0,t.spi)("MOSI"),{type:"pwm"}]},{name:"RESET.3",x:163.7,y:24,signals:[]},{name:"GND.3",x:154.1,y:24,signals:[{type:"power",signal:"GND"}]}]}render(){const{ledPower:t,led13:r,ledRX:s,ledTX:l}=this;return e.html`
      <style>
        text {
          user-select: none;
        }
        circle[tabindex]:hover,
        circle[tabindex]:focus {
          stroke: white;
          outline: none;
        }
      </style>

      <svg
        width="44.9mm"
        height="17.8mm"
        viewBox="-1.4 0 44.9 17.8"
        font-size="1px"
        font-family="DejaVu Mono, Cascadia Mono, monospace"
        font-weight="bold"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <filter id="solderPlate" style="color-interpolation-filters:sRGB;">
            <feTurbulence result="r0" type="fractalNoise" baseFrequency="1" numOctaves="1" />
            <feComposite
              result="r1"
              in="r0"
              in2="SourceGraphic"
              operator="arithmetic"
              k1=".6"
              k2=".6"
              k3="1.2"
              k4=".25"
            />
            <feBlend result="r2" in="r1" in2="SourceGraphic" mode="luminosity" />
            <feComposite result="r3" in="r2" in2="SourceGraphic" operator="in" />
          </filter>
          <pattern id="pins-tqfp-0.5mm" width="1" height=".5" patternUnits="userSpaceOnUse">
            <rect fill="#333" width="1" height=".2" y=".17" />
          </pattern>
          <pattern id="pins-pth-0.75" width="2.54" height="2.54" patternUnits="userSpaceOnUse">
            <circle r=".75" cx="1.27" cy="1.27" fill="#333" filter="url(#solderPlate)" />
            <g stroke="#333" stroke-width=".05" paint-order="stroke fill">
              <circle r=".375" cx="1.27" cy="1.27" fill="#eee" />
            </g>
          </pattern>
          <pattern id="pins-pth-1.00" width="2.54" height="2.54" patternUnits="userSpaceOnUse">
            <circle r=".75" cx="1.27" cy="1.27" fill="#333" filter="url(#solderPlate)" />
            <g stroke="#333" stroke-width=".05" paint-order="stroke fill">
              <circle r=".5" cx="1.27" cy="1.27" fill="#eee" />
            </g>
          </pattern>
          <g id="led-body" fill="#eee">
            <rect x="0" y="0" height="1.2" width="2.6" fill="#333" filter="url(#solderPlate)" />
            <rect x=".6" y="-0.1" width="1.35" height="1.4" stroke="#aaa" stroke-width=".05" />
          </g>
          <filter id="ledFilter" x="-0.8" y="-0.8" height="2.2" width="2.8">
            <feGaussianBlur stdDeviation=".5" />
          </filter>
        </defs>

        <!-- PCB -->
        <g id="pcb" fill="#fff">
          <rect width="43.5" height="17.8" x="0" y="0" fill="#1b7e84" />
          <circle cx="1" cy="1" r=".889" />
          <circle cx="42.42" cy="1" r=".889" />
          <circle cx="42.42" cy="16.6" r=".889" />
          <circle cx="1" cy="16.6" r=".889" />
        </g>

        <!-- silkscreen -->
        <g id="silkscreen" fill="#eee" text-anchor="middle">
          <rect x="30.48" y="0" width="2.54" height="3.2" />
          <rect x="35.56" y="14.6" width="2.54" height="3.2" />
          <g fill="#1b7e84" transform="translate(1.27 1.27)">
            <circle r=".85" cx="30.48" />
            <circle r=".85" cx="35.56" cy="15.24" />
          </g>
          <g transform="translate(1.27 3)">
            <text x="2.54">D12</text>
            <text x="5.08">D11</text>
            <text x="7.62">D10</text>
            <text x="10.16">D9</text>
            <text x="12.7">D8</text>
            <text x="15.24">D7</text>
            <text x="17.78">D6</text>
            <text x="20.32">D5</text>
            <text x="22.86">D4</text>
            <text x="25.4">D3</text>
            <text x="27.94">D2</text>
            <text x="30.48" fill="#1b7e84">GND</text>
            <text x="33.02">RST</text>
            <text x="35.56" y=".65" font-size="200%">↓</text>
            <text x="35.56" y="1.5">RX0</text>
            <text x="38.1" y=".65" font-size="200%">↑</text>
            <text x="38.1" y="1.5">TX0</text>
          </g>
          <g transform="translate(1.27 15.5)">
            <text x="2.54">D13</text>
            <text x="5.08">3V3</text>
            <text x="7.62">AREF</text>
            <text x="10.16">A0</text>
            <text x="12.7">A1</text>
            <text x="15.24">A2</text>
            <text x="17.78">A3</text>
            <text x="20.32">A4</text>
            <text x="22.86">A5</text>
            <text x="25.4">A6</text>
            <text x="27.94">A7</text>
            <text x="30.48">5V</text>
            <text x="33.02">RST</text>
            <text x="35.56" fill="#1b7e84">GND</text>
            <text x="38.1">VIN</text>
          </g>
          <g transform="rotate(90)">
            <text x="8.7" y="-22.5">RESET</text>
            <text x="5.6" y="-32.2">TX</text>
            <text x="5.6" y="-30.7" font-size="200%">↓</text>
            <text x="7.6" y="-32.2">RX</text>
            <text x="7.6" y="-30.7" font-size="200%">↑</text>
            <text x="9.6" y="-30.7">ON</text>
            <text x="11.6" y="-30.7">L</text>
          </g>
        </g>

        <!-- MCU -->
        <g id="mcu" transform="rotate(45 -2.978 23.39)">
          <g fill="url(#pins-tqfp-0.5mm)" filter="url(#solderPlate)">
            <rect x="-2.65" y="-1.975" width="5.3" height="3.95" />
            <rect x="-2.65" y="-1.975" width="5.3" height="3.95" transform="rotate(90)" />
          </g>
          <rect x="-2.275" y="-2.275" width="4.55" height="4.55" fill="#444" />
          <circle transform="rotate(45)" cx=".012" cy="-2.5" r=".35" fill="#222" />
        </g>

        <!-- pins -->
        <g id="pins" fill="url(#pins-pth-0.75)">
          <g id="pins-pin1" fill="#333" filter="url(#solderPlate)">
            <rect x="${38.495}" y="${.395}" width="1.75" height="1.75" />
            <rect x="${38.495}" y="${16.51-.875}" width="1.75" height="1.75" />
          </g>
          <rect x="2.54" width="${38.1}" height="2.54" />
          <rect x="2.54" y="${15.24}" width="${38.1}" height="2.54" />
        </g>

        <!-- programming header -->
        <g id="pgm-header" fill="url(#pins-pth-1.00)" stroke="#eee" stroke-width=".1">
          <g id="pgm-pin1" stroke="none" fill="#333" filter="url(#solderPlate)">
            <rect x="${16.5*2.54-.875}" y="${10.555}" width="1.75" height="1.75" />
          </g>
          <rect x="${38.1}" y="${5.08}" width="${5.08}" height="${7.62}" />
        </g>

        <!-- USB mini type B -->
        <g id="usb-mini-b" stroke-width=".1" paint-order="stroke fill">
          <g fill="#333" filter="url(#solderPlate)">
            <rect x=".3" y="3.8" width="1.6" height="9.8" />
            <rect x="5.5" y="3.8" width="1.6" height="9.8" />
            <rect x="7.3" y="7.07" width="1.1" height=".48" />
            <rect x="7.3" y="7.82" width="1.1" height=".48" />
            <rect x="7.3" y="8.58" width="1.1" height=".48" />
            <rect x="7.3" y="9.36" width="1.1" height=".48" />
            <rect x="7.3" y="10.16" width="1.1" height=".48" />
          </g>
          <rect x="-1.4" y="4.8" width="8.9" height="7.8" fill="#999" stroke-width=".26" />
          <rect x="-1.25" y="5" width="8.6" height="7.4" fill="#ccc" stroke="#bbb" />
          <g fill="none" stroke="#333" stroke-width=".26" stroke-linecap="round">
            <path d="m2.6 5.9h-3.3v0.9h3.3m0 3.7h-3.3v0.9h3.3M-0.6 7.6l4.3 0.3v1.5l-4.3 0.3" />
            <path d="m3.3 7.9v1.5" stroke-width="1" stroke-linecap="butt" />
            <path d="m6 6.4v4.5" stroke-width=".35" />
          </g>
        </g>

        <!-- LEDs -->
        <g transform="translate(27.7 5)">
          <use xlink:href="#led-body" />
          ${l&&e.svg`<circle cx="1.3" cy=".55" r="1.3" fill="#ff8080" filter="url(#ledFilter)" />`}
        </g>
        <g transform="translate(27.7 7)">
          <use xlink:href="#led-body" />
          ${s&&e.svg`<circle cx="1.3" cy=".55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>
        <g transform="translate(27.7 9)">
          <use xlink:href="#led-body" />
          ${t&&e.svg`<circle cx="1.3" cy=".55" r="1.3" fill="#80ff80" filter="url(#ledFilter)" />`}
        </g>
        <g transform="translate(27.7 11)">
          <use xlink:href="#led-body" />
          ${r&&e.svg`<circle cx="1.3" cy=".55" r="1.3" fill="#ffff80" filter="url(#ledFilter)" />`}
        </g>

        <!-- reset button -->
        <g stroke-width=".1" paint-order="fill stroke">
          <rect x="24.3" y="6.3" width="1" height="4.8" filter="url(#solderPlate)" fill="#333" />
          <rect x="23.54" y="6.8" width="2.54" height="3.8" fill="#ccc" stroke="#888" />
          <circle
            id="reset-button"
            cx="24.8"
            cy="8.7"
            r="1"
            fill="#eeb"
            stroke="#777"
            tabindex="0"
            @mousedown=${()=>this.down()}
            @touchstart=${()=>this.down()}
            @mouseup=${()=>this.up()}
            @mouseleave=${()=>this.leave()}
            @touchend=${()=>this.leave()}
            @keydown=${e=>i.SPACE_KEYS.includes(e.key)&&this.down()}
            @keyup=${e=>i.SPACE_KEYS.includes(e.key)&&this.up()}
          />
        </g>
      </svg>
    `}down(){this.resetPressed||(this.resetPressed=!0,this.resetButton.style.stroke="#333",this.dispatchEvent(new CustomEvent("button-press",{detail:"reset"})))}up(){this.resetPressed&&(this.resetPressed=!1,this.resetButton.style.stroke="",this.dispatchEvent(new CustomEvent("button-release",{detail:"reset"})))}leave(){this.resetButton.blur(),this.up()}};exports.ArduinoNanoElement=s,r([(0,e.property)()],s.prototype,"led13",void 0),r([(0,e.property)()],s.prototype,"ledRX",void 0),r([(0,e.property)()],s.prototype,"ledTX",void 0),r([(0,e.property)()],s.prototype,"ledPower",void 0),r([(0,e.property)()],s.prototype,"resetPressed",void 0),r([(0,e.query)("#reset-button")],s.prototype,"resetButton",void 0),exports.ArduinoNanoElement=s=r([(0,e.customElement)("wokwi-arduino-nano")],s);
},{"lit-element":"bhxD","./pin":"xoL4","./utils/keys":"VHTx"}],"whKC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"SevenSegmentElement",{enumerable:!0,get:function(){return e.SevenSegmentElement}}),Object.defineProperty(exports,"ArduinoUnoElement",{enumerable:!0,get:function(){return t.ArduinoUnoElement}}),Object.defineProperty(exports,"LCD1602Element",{enumerable:!0,get:function(){return r.LCD1602Element}}),Object.defineProperty(exports,"fontA00",{enumerable:!0,get:function(){return n.fontA00}}),Object.defineProperty(exports,"fontA02",{enumerable:!0,get:function(){return o.fontA02}}),Object.defineProperty(exports,"LEDElement",{enumerable:!0,get:function(){return u.LEDElement}}),Object.defineProperty(exports,"NeoPixelElement",{enumerable:!0,get:function(){return i.NeoPixelElement}}),Object.defineProperty(exports,"PushbuttonElement",{enumerable:!0,get:function(){return l.PushbuttonElement}}),Object.defineProperty(exports,"ResistorElement",{enumerable:!0,get:function(){return m.ResistorElement}}),Object.defineProperty(exports,"MembraneKeypadElement",{enumerable:!0,get:function(){return p.MembraneKeypadElement}}),Object.defineProperty(exports,"PotentiometerElement",{enumerable:!0,get:function(){return a.PotentiometerElement}}),Object.defineProperty(exports,"NeopixelMatrixElement",{enumerable:!0,get:function(){return b.NeopixelMatrixElement}}),Object.defineProperty(exports,"SSD1306Element",{enumerable:!0,get:function(){return f.SSD1306Element}}),Object.defineProperty(exports,"BuzzerElement",{enumerable:!0,get:function(){return c.BuzzerElement}}),Object.defineProperty(exports,"RotaryDialerElement",{enumerable:!0,get:function(){return d.RotaryDialerElement}}),Object.defineProperty(exports,"ServoElement",{enumerable:!0,get:function(){return s.ServoElement}}),Object.defineProperty(exports,"Dht22Element",{enumerable:!0,get:function(){return E.DHT22Element}}),Object.defineProperty(exports,"ArduinoMegaElement",{enumerable:!0,get:function(){return x.ArduinoMegaElement}}),Object.defineProperty(exports,"ArduinoNanoElement",{enumerable:!0,get:function(){return y.ArduinoNanoElement}}),require("./react-types");var e=require("./7segment-element"),t=require("./arduino-uno-element"),r=require("./lcd1602-element"),n=require("./lcd1602-font-a00"),o=require("./lcd1602-font-a02"),u=require("./led-element"),i=require("./neopixel-element"),l=require("./pushbutton-element"),m=require("./resistor-element"),p=require("./membrane-keypad-element"),a=require("./potentiometer-element"),b=require("./neopixel-matrix-element"),f=require("./ssd1306-element"),c=require("./buzzer-element"),d=require("./rotary-dialer-element"),s=require("./servo-element"),E=require("./dht22-element"),x=require("./arduino-mega-element"),y=require("./arduino-nano-element");
},{"./react-types":"VQ8w","./7segment-element":"mwEU","./arduino-uno-element":"AJVk","./lcd1602-element":"VbbO","./lcd1602-font-a00":"n2M3","./lcd1602-font-a02":"TcZY","./led-element":"xWrt","./neopixel-element":"x1K8","./pushbutton-element":"C6Pt","./resistor-element":"XKDm","./membrane-keypad-element":"V64C","./potentiometer-element":"jniu","./neopixel-matrix-element":"k8Z7","./ssd1306-element":"Uq31","./buzzer-element":"M94H","./rotary-dialer-element":"Dc62","./servo-element":"xPnD","./dht22-element":"HyOI","./arduino-mega-element":"teN6","./arduino-nano-element":"lLXh"}],"XKeh":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.CPU=void 0;const t=256;class s{constructor(s,e=8192){this.progMem=s,this.sramBytes=e,this.data=new Uint8Array(this.sramBytes+t),this.data16=new Uint16Array(this.data.buffer),this.dataView=new DataView(this.data.buffer),this.progBytes=new Uint8Array(this.progMem.buffer),this.readHooks=[],this.writeHooks=[],this.pc22Bits=this.progBytes.length>131072,this.gpioTimerHooks=[],this.pc=0,this.cycles=0,this.reset()}reset(){this.data.fill(0),this.SP=this.data.length-1}readData(t){return t>=32&&this.readHooks[t]?this.readHooks[t](t):this.data[t]}writeData(t,s){const e=this.writeHooks[t];e&&e(s,this.data[t],t)||(this.data[t]=s)}get SP(){return this.dataView.getUint16(93,!0)}set SP(t){this.dataView.setUint16(93,t,!0)}get SREG(){return this.data[95]}get interruptsEnabled(){return!!(128&this.SREG)}}exports.CPU=s;
},{}],"Gmr7":[function(require,module,exports) {
"use strict";function a(a){return 36864==(65039&a)||37376==(65039&a)||37902==(65038&a)||37900==(65038&a)}function t(t){const e=t.progMem[t.pc];if(7168==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5],i=a+d+(1&t.data[95]),s=255&i;t.data[(496&e)>>4]=s;let c=192&t.data[95];c|=s?0:2,c|=128&s?4:0,c|=(s^d)&(a^s)&128?8:0,c|=c>>2&1^c>>3&1?16:0,c|=256&i?1:0,c|=1&(a&d|d&~s|~s&a)?32:0,t.data[95]=c}else if(3072==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5],i=a+d&255;t.data[(496&e)>>4]=i;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=(i^d)&(i^a)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=a+d&256?1:0,s|=1&(a&d|d&~i|~i&a)?32:0,t.data[95]=s}else if(38400==(65280&e)){const a=2*((48&e)>>4)+24,d=t.dataView.getUint16(a,!0),i=d+(15&e|(192&e)>>2)&65535;t.dataView.setUint16(a,i,!0);let s=224&t.data[95];s|=i?0:2,s|=32768&i?4:0,s|=~d&i&32768?8:0,s|=s>>2&1^s>>3&1?16:0,s|=~i&d&32768?1:0,t.data[95]=s,t.cycles++}else if(8192==(64512&e)){const a=t.data[(496&e)>>4]&t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=a;let d=225&t.data[95];d|=a?0:2,d|=128&a?4:0,d|=d>>2&1^d>>3&1?16:0,t.data[95]=d}else if(28672==(61440&e)){const a=t.data[16+((240&e)>>4)]&(15&e|(3840&e)>>4);t.data[16+((240&e)>>4)]=a;let d=225&t.data[95];d|=a?0:2,d|=128&a?4:0,d|=d>>2&1^d>>3&1?16:0,t.data[95]=d}else if(37893==(65039&e)){const a=t.data[(496&e)>>4],d=a>>>1|128&a;t.data[(496&e)>>4]=d;let i=224&t.data[95];i|=d?0:2,i|=128&d?4:0,i|=1&a,i|=i>>2&1^1&i?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(38024==(65423&e))t.data[95]&=~(1<<((112&e)>>4));else if(63488==(65032&e)){const a=7&e,d=(496&e)>>4;t.data[d]=~(1<<a)&t.data[d]|(t.data[95]>>6&1)<<a}else if(62464==(64512&e))t.data[95]&1<<(7&e)||(t.pc=t.pc+(((504&e)>>3)-(512&e?64:0)),t.cycles++);else if(61440==(64512&e))t.data[95]&1<<(7&e)&&(t.pc=t.pc+(((504&e)>>3)-(512&e?64:0)),t.cycles++);else if(37896==(65423&e))t.data[95]|=1<<((112&e)>>4);else if(64e3==(65032&e)){const a=t.data[(496&e)>>4],d=7&e;t.data[95]=191&t.data[95]|(a>>d&1?64:0)}else if(37902==(65038&e)){const a=t.progMem[t.pc+1]|(1&e)<<16|(496&e)<<13,d=t.pc+2,i=t.dataView.getUint16(93,!0),{pc22Bits:s}=t;t.data[i]=255&d,t.data[i-1]=d>>8&255,s&&(t.data[i-2]=d>>16&255),t.dataView.setUint16(93,i-(s?3:2),!0),t.pc=a-1,t.cycles+=s?4:3}else if(38912==(65280&e)){const a=248&e,d=7&e,i=t.readData(32+(a>>3));t.writeData(32+(a>>3),i&~(1<<d))}else if(37888==(65039&e)){const a=(496&e)>>4,d=255-t.data[a];t.data[a]=d;let i=225&t.data[95]|1;i|=d?0:2,i|=128&d?4:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(5120==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5],i=a-d;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=0!=((a^d)&(a^i)&128)?8:0,s|=s>>2&1^s>>3&1?16:0,s|=d>a?1:0,s|=1&(~a&d|d&i|i&~a)?32:0,t.data[95]=s}else if(1024==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5];let i=t.data[95];const s=a-d-(1&i);i=192&i|(!s&&i>>1&1?2:0)|(d+(1&i)>a?1:0),i|=128&s?4:0,i|=(a^d)&(a^s)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~a&d|d&s|s&~a)?32:0,t.data[95]=i}else if(12288==(61440&e)){const a=t.data[16+((240&e)>>4)],d=15&e|(3840&e)>>4,i=a-d;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=(a^d)&(a^i)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=d>a?1:0,s|=1&(~a&d|d&i|i&~a)?32:0,t.data[95]=s}else if(4096==(64512&e)){if(t.data[(496&e)>>4]===t.data[15&e|(512&e)>>5]){const e=a(t.progMem[t.pc+1])?2:1;t.pc+=e,t.cycles+=e}}else if(37898==(65039&e)){const a=t.data[(496&e)>>4],d=a-1;t.data[(496&e)>>4]=d;let i=225&t.data[95];i|=d?0:2,i|=128&d?4:0,i|=128===a?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(38169===e){const a=t.pc+1,e=t.dataView.getUint16(93,!0),d=t.data[92];t.data[e]=255&a,t.data[e-1]=a>>8&255,t.data[e-2]=a>>16&255,t.dataView.setUint16(93,e-3,!0),t.pc=(d<<16|t.dataView.getUint16(30,!0))-1,t.cycles+=3}else if(37913===e){const a=t.data[92];t.pc=(a<<16|t.dataView.getUint16(30,!0))-1,t.cycles++}else if(38360===e){const a=t.data[91];t.data[0]=t.progBytes[a<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if(36870==(65039&e)){const a=t.data[91];t.data[(496&e)>>4]=t.progBytes[a<<16|t.dataView.getUint16(30,!0)],t.cycles+=2}else if(36871==(65039&e)){const a=t.data[91],d=t.dataView.getUint16(30,!0);t.data[(496&e)>>4]=t.progBytes[a<<16|d],t.dataView.setUint16(30,d+1,!0),65535===d&&(t.data[91]=(a+1)%(t.progBytes.length>>16)),t.cycles+=2}else if(9216==(64512&e)){const a=t.data[(496&e)>>4]^t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=a;let d=225&t.data[95];d|=a?0:2,d|=128&a?4:0,d|=d>>2&1^d>>3&1?16:0,t.data[95]=d}else if(776==(65416&e)){const a=t.data[16+((112&e)>>4)],d=t.data[16+(7&e)],i=a*d<<1;t.dataView.setUint16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?0:2)|(a*d&32768?1:0),t.cycles++}else if(896==(65416&e)){const a=t.dataView.getInt8(16+((112&e)>>4)),d=t.dataView.getInt8(16+(7&e)),i=a*d<<1;t.dataView.setInt16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?0:2)|(a*d&32768?1:0),t.cycles++}else if(904==(65416&e)){const a=t.dataView.getInt8(16+((112&e)>>4)),d=t.data[16+(7&e)],i=a*d<<1;t.dataView.setInt16(0,i,!0),t.data[95]=252&t.data[95]|(65535&i?2:0)|(a*d&32768?1:0),t.cycles++}else if(38153===e){const a=t.pc+1,e=t.dataView.getUint16(93,!0),{pc22Bits:d}=t;t.data[e]=255&a,t.data[e-1]=a>>8&255,d&&(t.data[e-2]=a>>16&255),t.dataView.setUint16(93,e-(d?3:2),!0),t.pc=t.dataView.getUint16(30,!0)-1,t.cycles+=d?3:2}else if(37897===e)t.pc=t.dataView.getUint16(30,!0)-1,t.cycles++;else if(45056==(63488&e)){const a=t.readData(32+(15&e|(1536&e)>>5));t.data[(496&e)>>4]=a}else if(37891==(65039&e)){const a=t.data[(496&e)>>4],d=a+1&255;t.data[(496&e)>>4]=d;let i=225&t.data[95];i|=d?0:2,i|=128&d?4:0,i|=127===a?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(37900==(65038&e))t.pc=(t.progMem[t.pc+1]|(1&e)<<16|(496&e)<<13)-1,t.cycles+=2;else if(37382==(65039&e)){const a=(496&e)>>4,d=t.data[a],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i&255-d),t.data[a]=i}else if(37381==(65039&e)){const a=(496&e)>>4,d=t.data[a],i=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),i|d),t.data[a]=i}else if(37383==(65039&e)){const a=t.data[(496&e)>>4],d=t.readData(t.dataView.getUint16(30,!0));t.writeData(t.dataView.getUint16(30,!0),a^d),t.data[(496&e)>>4]=d}else if(57344==(61440&e))t.data[16+((240&e)>>4)]=15&e|(3840&e)>>4;else if(36864==(65039&e)){t.cycles++;const a=t.readData(t.progMem[t.pc+1]);t.data[(496&e)>>4]=a,t.pc++}else if(36876==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(26,!0));else if(36877==(65039&e)){const a=t.dataView.getUint16(26,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(a),t.dataView.setUint16(26,a+1,!0)}else if(36878==(65039&e)){const a=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,a,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(a)}else if(32776==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(28,!0));else if(36873==(65039&e)){const a=t.dataView.getUint16(28,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(a),t.dataView.setUint16(28,a+1,!0)}else if(36874==(65039&e)){const a=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,a,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(a)}else if(32776==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(28,!0)+(7&e|(3072&e)>>7|(8192&e)>>8));else if(32768==(65039&e))t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(30,!0));else if(36865==(65039&e)){const a=t.dataView.getUint16(30,!0);t.cycles++,t.data[(496&e)>>4]=t.readData(a),t.dataView.setUint16(30,a+1,!0)}else if(36866==(65039&e)){const a=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,a,!0),t.cycles++,t.data[(496&e)>>4]=t.readData(a)}else if(32768==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.cycles++,t.data[(496&e)>>4]=t.readData(t.dataView.getUint16(30,!0)+(7&e|(3072&e)>>7|(8192&e)>>8));else if(38344===e)t.data[0]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if(36868==(65039&e))t.data[(496&e)>>4]=t.progBytes[t.dataView.getUint16(30,!0)],t.cycles+=2;else if(36869==(65039&e)){const a=t.dataView.getUint16(30,!0);t.data[(496&e)>>4]=t.progBytes[a],t.dataView.setUint16(30,a+1,!0),t.cycles+=2}else if(37894==(65039&e)){const a=t.data[(496&e)>>4],d=a>>>1;t.data[(496&e)>>4]=d;let i=224&t.data[95];i|=d?0:2,i|=1&a,i|=i>>2&1^1&i?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(11264==(64512&e))t.data[(496&e)>>4]=t.data[15&e|(512&e)>>5];else if(256==(65280&e)){const a=2*(15&e),d=2*((240&e)>>4);t.data[d]=t.data[a],t.data[d+1]=t.data[a+1]}else if(39936==(64512&e)){const a=t.data[(496&e)>>4]*t.data[15&e|(512&e)>>5];t.dataView.setUint16(0,a,!0),t.data[95]=252&t.data[95]|(65535&a?0:2)|(32768&a?1:0),t.cycles++}else if(512==(65280&e)){const a=t.dataView.getInt8(16+((240&e)>>4))*t.dataView.getInt8(16+(15&e));t.dataView.setInt16(0,a,!0),t.data[95]=252&t.data[95]|(65535&a?0:2)|(32768&a?1:0),t.cycles++}else if(768==(65416&e)){const a=t.dataView.getInt8(16+((112&e)>>4))*t.data[16+(7&e)];t.dataView.setInt16(0,a,!0),t.data[95]=252&t.data[95]|(65535&a?0:2)|(32768&a?1:0),t.cycles++}else if(37889==(65039&e)){const a=(496&e)>>4,d=t.data[a],i=0-d;t.data[a]=i;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=128===i?8:0,s|=s>>2&1^s>>3&1?16:0,s|=i?1:0,s|=1&(i|d)?32:0,t.data[95]=s}else if(0===e);else if(10240==(64512&e)){const a=t.data[(496&e)>>4]|t.data[15&e|(512&e)>>5];t.data[(496&e)>>4]=a;let d=225&t.data[95];d|=a?0:2,d|=128&a?4:0,d|=d>>2&1^d>>3&1?16:0,t.data[95]=d}else if(24576==(61440&e)){const a=t.data[16+((240&e)>>4)]|15&e|(3840&e)>>4;t.data[16+((240&e)>>4)]=a;let d=225&t.data[95];d|=a?0:2,d|=128&a?4:0,d|=d>>2&1^d>>3&1?16:0,t.data[95]=d}else if(47104==(63488&e))t.writeData(32+(15&e|(1536&e)>>5),t.data[(496&e)>>4]);else if(36879==(65039&e)){const a=t.dataView.getUint16(93,!0)+1;t.dataView.setUint16(93,a,!0),t.data[(496&e)>>4]=t.data[a],t.cycles++}else if(37391==(65039&e)){const a=t.dataView.getUint16(93,!0);t.data[a]=t.data[(496&e)>>4],t.dataView.setUint16(93,a-1,!0),t.cycles++}else if(53248==(61440&e)){const a=(2047&e)-(2048&e?2048:0),d=t.pc+1,i=t.dataView.getUint16(93,!0),{pc22Bits:s}=t;t.data[i]=255&d,t.data[i-1]=d>>8&255,s&&(t.data[i-2]=d>>16&255),t.dataView.setUint16(93,i-(s?3:2),!0),t.pc+=a,t.cycles+=s?3:2}else if(38152===e){const{pc22Bits:a}=t,e=t.dataView.getUint16(93,!0)+(a?3:2);t.dataView.setUint16(93,e,!0),t.pc=(t.data[e-1]<<8)+t.data[e]-1,a&&(t.pc|=t.data[e-2]<<16),t.cycles+=a?4:3}else if(38168===e){const{pc22Bits:a}=t,e=t.dataView.getUint16(93,!0)+(a?3:2);t.dataView.setUint16(93,e,!0),t.pc=(t.data[e-1]<<8)+t.data[e]-1,a&&(t.pc|=t.data[e-2]<<16),t.cycles+=a?4:3,t.data[95]|=128}else if(49152==(61440&e))t.pc=t.pc+((2047&e)-(2048&e?2048:0)),t.cycles++;else if(37895==(65039&e)){const a=t.data[(496&e)>>4],d=a>>>1|(1&t.data[95])<<7;t.data[(496&e)>>4]=d;let i=224&t.data[95];i|=d?0:2,i|=128&d?4:0,i|=1&a?1:0,i|=i>>2&1^1&i?8:0,i|=i>>2&1^i>>3&1?16:0,t.data[95]=i}else if(2048==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5];let i=t.data[95];const s=a-d-(1&i);t.data[(496&e)>>4]=s,i=192&i|(!s&&i>>1&1?2:0)|(d+(1&i)>a?1:0),i|=128&s?4:0,i|=(a^d)&(a^s)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~a&d|d&s|s&~a)?32:0,t.data[95]=i}else if(16384==(61440&e)){const a=t.data[16+((240&e)>>4)],d=15&e|(3840&e)>>4;let i=t.data[95];const s=a-d-(1&i);t.data[16+((240&e)>>4)]=s,i=192&i|(!s&&i>>1&1?2:0)|(d+(1&i)>a?1:0),i|=128&s?4:0,i|=(a^d)&(a^s)&128?8:0,i|=i>>2&1^i>>3&1?16:0,i|=1&(~a&d|d&s|s&~a)?32:0,t.data[95]=i}else if(39424==(65280&e)){const a=32+((248&e)>>3);t.writeData(a,t.readData(a)|1<<(7&e)),t.cycles++}else if(39168==(65280&e)){if(!(t.readData(32+((248&e)>>3))&1<<(7&e))){const e=a(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(39680==(65280&e)){if(t.readData(32+((248&e)>>3))&1<<(7&e)){const e=a(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(38656==(65280&e)){const a=2*((48&e)>>4)+24,d=t.dataView.getUint16(a,!0),i=15&e|(192&e)>>2,s=d-i;t.dataView.setUint16(a,s,!0);let c=192&t.data[95];c|=s?0:2,c|=32768&s?4:0,c|=d&~s&32768?8:0,c|=c>>2&1^c>>3&1?16:0,c|=i>d?1:0,c|=1&(~d&i|i&s|s&~d)?32:0,t.data[95]=c,t.cycles++}else if(64512==(65032&e)){if(!(t.data[(496&e)>>4]&1<<(7&e))){const e=a(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(65024==(65032&e)){if(t.data[(496&e)>>4]&1<<(7&e)){const e=a(t.progMem[t.pc+1])?2:1;t.cycles+=e,t.pc+=e}}else if(38280===e);else if(38376===e);else if(38392===e);else if(37376==(65039&e)){const a=t.data[(496&e)>>4],d=t.progMem[t.pc+1];t.writeData(d,a),t.pc++,t.cycles++}else if(37388==(65039&e))t.writeData(t.dataView.getUint16(26,!0),t.data[(496&e)>>4]),t.cycles++;else if(37389==(65039&e)){const a=t.dataView.getUint16(26,!0);t.writeData(a,t.data[(496&e)>>4]),t.dataView.setUint16(26,a+1,!0),t.cycles++}else if(37390==(65039&e)){const a=t.data[(496&e)>>4],d=t.dataView.getUint16(26,!0)-1;t.dataView.setUint16(26,d,!0),t.writeData(d,a),t.cycles++}else if(33288==(65039&e))t.writeData(t.dataView.getUint16(28,!0),t.data[(496&e)>>4]),t.cycles++;else if(37385==(65039&e)){const a=t.data[(496&e)>>4],d=t.dataView.getUint16(28,!0);t.writeData(d,a),t.dataView.setUint16(28,d+1,!0),t.cycles++}else if(37386==(65039&e)){const a=t.data[(496&e)>>4],d=t.dataView.getUint16(28,!0)-1;t.dataView.setUint16(28,d,!0),t.writeData(d,a),t.cycles++}else if(33288==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.writeData(t.dataView.getUint16(28,!0)+(7&e|(3072&e)>>7|(8192&e)>>8),t.data[(496&e)>>4]),t.cycles++;else if(33280==(65039&e))t.writeData(t.dataView.getUint16(30,!0),t.data[(496&e)>>4]),t.cycles++;else if(37377==(65039&e)){const a=t.dataView.getUint16(30,!0);t.writeData(a,t.data[(496&e)>>4]),t.dataView.setUint16(30,a+1,!0),t.cycles++}else if(37378==(65039&e)){const a=t.data[(496&e)>>4],d=t.dataView.getUint16(30,!0)-1;t.dataView.setUint16(30,d,!0),t.writeData(d,a),t.cycles++}else if(33280==(53768&e)&&7&e|(3072&e)>>7|(8192&e)>>8)t.writeData(t.dataView.getUint16(30,!0)+(7&e|(3072&e)>>7|(8192&e)>>8),t.data[(496&e)>>4]),t.cycles++;else if(6144==(64512&e)){const a=t.data[(496&e)>>4],d=t.data[15&e|(512&e)>>5],i=a-d;t.data[(496&e)>>4]=i;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=(a^d)&(a^i)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=d>a?1:0,s|=1&(~a&d|d&i|i&~a)?32:0,t.data[95]=s}else if(20480==(61440&e)){const a=t.data[16+((240&e)>>4)],d=15&e|(3840&e)>>4,i=a-d;t.data[16+((240&e)>>4)]=i;let s=192&t.data[95];s|=i?0:2,s|=128&i?4:0,s|=(a^d)&(a^i)&128?8:0,s|=s>>2&1^s>>3&1?16:0,s|=d>a?1:0,s|=1&(~a&d|d&i|i&~a)?32:0,t.data[95]=s}else if(37890==(65039&e)){const a=(496&e)>>4,d=t.data[a];t.data[a]=(15&d)<<4|(240&d)>>>4}else if(38312===e);else if(37380==(65039&e)){const a=(496&e)>>4,d=t.data[a],i=t.data[t.dataView.getUint16(30,!0)];t.data[t.dataView.getUint16(30,!0)]=d,t.data[a]=i}t.pc=(t.pc+1)%t.progMem.length,t.cycles++}Object.defineProperty(exports,"__esModule",{value:!0}),exports.avrInstruction=t;
},{}],"R2M0":[function(require,module,exports) {
"use strict";function t(t,e){const a=t.dataView.getUint16(93,!0);t.data[a]=255&t.pc,t.data[a-1]=t.pc>>8&255,t.pc22Bits&&(t.data[a-2]=t.pc>>16&255),t.dataView.setUint16(93,a-(t.pc22Bits?3:2),!0),t.data[95]&=127,t.cycles+=2,t.pc=e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.avrInterrupt=t;
},{}],"Jm2c":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRIOPort=exports.PinOverrideMode=exports.PinState=exports.portLConfig=exports.portKConfig=exports.portJConfig=exports.portHConfig=exports.portGConfig=exports.portFConfig=exports.portEConfig=exports.portDConfig=exports.portCConfig=exports.portBConfig=exports.portAConfig=void 0;const t={PIN:32,DDR:33,PORT:34};exports.portAConfig=t;const o={PIN:35,DDR:36,PORT:37};exports.portBConfig=o;const e={PIN:38,DDR:39,PORT:40};exports.portCConfig=e;const i={PIN:41,DDR:42,PORT:43};exports.portDConfig=i;const s={PIN:44,DDR:45,PORT:46};exports.portEConfig=s;const r={PIN:47,DDR:48,PORT:49};exports.portFConfig=r;const n={PIN:50,DDR:51,PORT:52};exports.portGConfig=n;const p={PIN:256,DDR:257,PORT:258};exports.portHConfig=p;const a={PIN:259,DDR:260,PORT:261};exports.portJConfig=a;const P={PIN:262,DDR:263,PORT:264};exports.portKConfig=P;const h={PIN:265,DDR:266,PORT:267};var l,d;exports.portLConfig=h,exports.PinState=l,function(t){t[t.Low=0]="Low",t[t.High=1]="High",t[t.Input=2]="Input",t[t.InputPullUp=3]="InputPullUp"}(l||(exports.PinState=l={})),exports.PinOverrideMode=d,function(t){t[t.None=0]="None",t[t.Enable=1]="Enable",t[t.Set=2]="Set",t[t.Clear=3]="Clear",t[t.Toggle=4]="Toggle"}(d||(exports.PinOverrideMode=d={}));class R{constructor(t,o){this.cpu=t,this.portConfig=o,this.listeners=[],this.pinValue=0,this.overrideMask=255,this.lastValue=0,this.lastDdr=0,t.writeHooks[o.DDR]=(e=>{const i=t.data[o.PORT];return t.data[o.DDR]=e,this.updatePinRegister(i,e),this.writeGpio(i,e),!0}),t.writeHooks[o.PORT]=(e=>{const i=t.data[o.DDR];return t.data[o.PORT]=e,this.updatePinRegister(e,i),this.writeGpio(e,i),!0}),t.writeHooks[o.PIN]=(e=>{const i=t.data[o.PORT],s=t.data[o.DDR],r=i^e;return t.data[o.PORT]=r,t.data[o.PIN]=t.data[o.PIN]&~s|r&s,this.writeGpio(r,s),!0}),t.gpioTimerHooks[o.PORT]=((e,i)=>{const s=1<<e;if(i==d.None)this.overrideMask|=s;else switch(this.overrideMask&=~s,i){case d.Enable:this.overrideValue&=~s,this.overrideValue|=t.data[o.PORT]&s;break;case d.Set:this.overrideValue|=s;break;case d.Clear:this.overrideValue&=~s;break;case d.Toggle:this.overrideValue^=s}this.writeGpio(t.data[o.PORT],t.data[o.DDR])})}addListener(t){this.listeners.push(t)}removeListener(t){this.listeners=this.listeners.filter(o=>o!==t)}pinState(t){const o=this.cpu.data[this.portConfig.DDR],e=this.cpu.data[this.portConfig.PORT],i=1<<t;return o&i?this.lastValue&i?l.High:l.Low:e&i?l.InputPullUp:l.Input}setPin(t,o){const e=1<<t;this.pinValue&=~e,o&&(this.pinValue|=e),this.updatePinRegister(this.cpu.data[this.portConfig.PORT],this.cpu.data[this.portConfig.DDR])}updatePinRegister(t,o){this.cpu.data[this.portConfig.PIN]=this.pinValue&~o|t&o}writeGpio(t,o){const e=(t&this.overrideMask|this.overrideValue)&o|t&~o,i=this.lastValue;if(e!==i||o!==this.lastDdr){this.lastValue=e,this.lastDdr=o;for(const t of this.listeners)t(e,i)}}}exports.AVRIOPort=R;
},{}],"YN4y":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRTimer=exports.timer2Config=exports.timer1Config=exports.timer0Config=void 0;var t=require("../cpu/interrupt"),i=require("./gpio");const e={0:0,1:1,2:8,3:64,4:256,5:1024,6:0,7:0},o=1,s=2,r=4,c=1,p=2,h=4,n={bits:8,captureInterrupt:0,compAInterrupt:28,compBInterrupt:30,ovfInterrupt:32,TIFR:53,OCRA:71,OCRB:72,ICR:0,TCNT:70,TCCRA:68,TCCRB:69,TCCRC:0,TIMSK:110,dividers:e,compPortA:i.portDConfig.PORT,compPinA:6,compPortB:i.portDConfig.PORT,compPinB:5};exports.timer0Config=n;const a={bits:16,captureInterrupt:20,compAInterrupt:22,compBInterrupt:24,ovfInterrupt:26,TIFR:54,OCRA:136,OCRB:138,ICR:134,TCNT:132,TCCRA:128,TCCRB:129,TCCRC:130,TIMSK:111,dividers:e,compPortA:i.portBConfig.PORT,compPinA:1,compPortB:i.portBConfig.PORT,compPinB:2};exports.timer1Config=a;const C={bits:8,captureInterrupt:0,compAInterrupt:14,compBInterrupt:16,ovfInterrupt:18,TIFR:55,OCRA:179,OCRB:180,ICR:0,TCNT:178,TCCRA:176,TCCRB:177,TCCRC:0,TIMSK:112,dividers:{0:0,1:1,2:8,3:32,4:64,5:128,6:256,7:1024},compPortA:i.portBConfig.PORT,compPinA:3,compPortB:i.portDConfig.PORT,compPinB:3};var m,d,u;exports.timer2Config=C,function(t){t[t.Normal=0]="Normal",t[t.PWMPhaseCorrect=1]="PWMPhaseCorrect",t[t.CTC=2]="CTC",t[t.FastPWM=3]="FastPWM",t[t.PWMPhaseFrequencyCorrect=4]="PWMPhaseFrequencyCorrect",t[t.Reserved=5]="Reserved"}(m||(m={})),function(t){t[t.Max=0]="Max",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"}(d||(d={})),function(t){t[t.Immediate=0]="Immediate",t[t.Top=1]="Top",t[t.Bottom=2]="Bottom"}(u||(u={}));const T=1,P=2,B=[[m.Normal,255,u.Immediate,d.Max],[m.PWMPhaseCorrect,255,u.Top,d.Bottom],[m.CTC,T,u.Immediate,d.Max],[m.FastPWM,255,u.Bottom,d.Max],[m.Reserved,255,u.Immediate,d.Max],[m.PWMPhaseCorrect,T,u.Top,d.Bottom],[m.Reserved,255,u.Immediate,d.Max],[m.FastPWM,T,u.Bottom,d.Top]],M=[[m.Normal,65535,u.Immediate,d.Max],[m.PWMPhaseCorrect,255,u.Top,d.Bottom],[m.PWMPhaseCorrect,511,u.Top,d.Bottom],[m.PWMPhaseCorrect,1023,u.Top,d.Bottom],[m.CTC,T,u.Immediate,d.Max],[m.FastPWM,255,u.Bottom,d.Top],[m.FastPWM,511,u.Bottom,d.Top],[m.FastPWM,1023,u.Bottom,d.Top],[m.PWMPhaseFrequencyCorrect,P,u.Bottom,d.Bottom],[m.PWMPhaseFrequencyCorrect,T,u.Bottom,d.Bottom],[m.PWMPhaseCorrect,P,u.Top,d.Bottom],[m.PWMPhaseCorrect,T,u.Top,d.Bottom],[m.CTC,P,u.Immediate,d.Max],[m.Reserved,65535,u.Immediate,d.Max],[m.FastPWM,P,u.Bottom,d.Top],[m.FastPWM,T,u.Bottom,d.Top]];function R(t){switch(t){case 1:return i.PinOverrideMode.Toggle;case 2:return i.PinOverrideMode.Clear;case 3:return i.PinOverrideMode.Set;default:return i.PinOverrideMode.Enable}}class g{constructor(t,e){if(this.cpu=t,this.config=e,this.lastCycle=0,this.ocrA=0,this.ocrB=0,this.icr=0,this.tcnt=0,this.tcntUpdated=!1,this.countingUp=!0,this.divider=0,this.pendingInterrupt=!1,this.highByteTemp=0,this.updateWGMConfig(),this.cpu.readHooks[e.TCNT]=(t=>(this.tick(),16===this.config.bits&&(this.cpu.data[t+1]=this.tcnt>>8),this.cpu.data[t]=255&this.tcnt)),this.cpu.writeHooks[e.TCNT]=(t=>{this.tcnt=this.highByteTemp<<8|t,this.countingUp=!0,this.tcntUpdated=!0,this.timerUpdated()}),this.cpu.writeHooks[e.OCRA]=(t=>{this.ocrA=this.highByteTemp<<8|t}),this.cpu.writeHooks[e.OCRB]=(t=>{this.ocrB=this.highByteTemp<<8|t}),this.cpu.writeHooks[e.ICR]=(t=>{this.icr=this.highByteTemp<<8|t}),16===this.config.bits){const t=t=>{this.highByteTemp=t};this.cpu.writeHooks[e.TCNT+1]=t,this.cpu.writeHooks[e.OCRA+1]=t,this.cpu.writeHooks[e.OCRB+1]=t,this.cpu.writeHooks[e.ICR+1]=t}t.writeHooks[e.TCCRA]=(t=>(this.cpu.data[e.TCCRA]=t,this.compA=t>>6&3,this.updateCompA(this.compA?i.PinOverrideMode.Enable:i.PinOverrideMode.None),this.compB=t>>4&3,this.updateCompB(this.compB?i.PinOverrideMode.Enable:i.PinOverrideMode.None),this.updateWGMConfig(),!0)),t.writeHooks[e.TCCRB]=(t=>(this.cpu.data[e.TCCRB]=t,this.tcntUpdated=!0,this.divider=this.config.dividers[this.CS],this.updateWGMConfig(),!0))}reset(){this.divider=0,this.lastCycle=0,this.ocrA=0,this.ocrB=0}get TIFR(){return this.cpu.data[this.config.TIFR]}set TIFR(t){this.pendingInterrupt=t>0,this.cpu.data[this.config.TIFR]=t}get TCCRA(){return this.cpu.data[this.config.TCCRA]}get TCCRB(){return this.cpu.data[this.config.TCCRB]}get TIMSK(){return this.cpu.data[this.config.TIMSK]}get CS(){return 7&this.TCCRB}get WGM(){const t=16===this.config.bits?24:8;return(this.TCCRB&t)>>1|3&this.TCCRA}get TOP(){switch(this.topValue){case T:return this.ocrA;case P:return this.icr;default:return this.topValue}}updateWGMConfig(){const t=16===this.config.bits?M:B,[i,e]=t[this.WGM];this.timerMode=i,this.topValue=e}tick(){const{divider:i,lastCycle:e}=this,n=this.cpu.cycles-e;if(i&&n>=i){const t=Math.floor(n/i);this.lastCycle+=t*i;const e=this.tcnt,{timerMode:s}=this,r=s===m.PWMPhaseCorrect||s===m.PWMPhaseFrequencyCorrect?this.phasePwmCount(e,t):(e+t)%(this.TOP+1);this.tcntUpdated||(this.tcnt=r,this.timerUpdated()),(s===m.Normal||s===m.FastPWM)&&e>r&&(this.TIFR|=o)}if(this.tcntUpdated=!1,this.cpu.interruptsEnabled&&this.pendingInterrupt){const{TIFR:i,TIMSK:e}=this;i&o&&e&c&&((0,t.avrInterrupt)(this.cpu,this.config.ovfInterrupt),this.TIFR&=~o),i&s&&e&p&&((0,t.avrInterrupt)(this.cpu,this.config.compAInterrupt),this.TIFR&=~s),i&r&&e&h&&((0,t.avrInterrupt)(this.cpu,this.config.compBInterrupt),this.TIFR&=~r),this.pendingInterrupt=!1}}phasePwmCount(t,i){for(;i>0;)this.countingUp?++t!==this.TOP||this.tcntUpdated||(this.countingUp=!1):--t||this.tcntUpdated||(this.countingUp=!0,this.TIFR|=o),i--;return t}timerUpdated(){const t=this.tcnt;this.ocrA&&t===this.ocrA&&(this.TIFR|=s,this.timerMode===m.CTC&&(this.tcnt=0,this.TIFR|=o),this.compA&&this.updateCompPin(this.compA,"A")),this.ocrB&&t===this.ocrB&&(this.TIFR|=r,this.compB&&this.updateCompPin(this.compB,"B"))}updateCompPin(t,e){let o=i.PinOverrideMode.None;const s=3===t,r=this.countingUp===s;switch(this.timerMode){case m.Normal:case m.CTC:case m.FastPWM:o=R(t);break;case m.PWMPhaseCorrect:case m.PWMPhaseFrequencyCorrect:o=r?i.PinOverrideMode.Set:i.PinOverrideMode.Clear}o!==i.PinOverrideMode.None&&("A"===e?this.updateCompA(o):this.updateCompB(o))}updateCompA(t){const{compPortA:i,compPinA:e}=this.config,o=this.cpu.gpioTimerHooks[i];o&&o(e,t,i)}updateCompB(t){const{compPortB:i,compPinB:e}=this.config,o=this.cpu.gpioTimerHooks[i];o&&o(e,t,i)}}exports.AVRTimer=g;
},{"../cpu/interrupt":"R2M0","./gpio":"Jm2c"}],"zuq6":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRUSART=exports.usart0Config=void 0;var t=require("../cpu/interrupt");const i={rxCompleteInterrupt:36,dataRegisterEmptyInterrupt:38,txCompleteInterrupt:40,UCSRA:192,UCSRB:193,UCSRC:194,UBRRL:196,UBRRH:197,UDR:198};exports.usart0Config=i;const s=128,e=64,r=32,n=16,a=8,u=4,c=2,o=1,h=128,p=64,R=32,f=16,C=8,U=4,d=2,g=1,S=128,l=64,B=32,A=16,m=8,x=4,T=2,H=1;class I{constructor(t,i,s){this.cpu=t,this.config=i,this.freqMHz=s,this.onByteTransmit=null,this.onLineTransmit=null,this.lineBuffer="",this.cpu.writeHooks[i.UCSRA]=(t=>(this.cpu.data[i.UCSRA]=t|r|e,!0)),this.cpu.writeHooks[i.UCSRB]=((t,s)=>{t&C&&!(s&C)&&(this.cpu.data[i.UCSRA]|=r)}),this.cpu.writeHooks[i.UDR]=(t=>{if(this.onByteTransmit&&this.onByteTransmit(t),this.onLineTransmit){const i=String.fromCharCode(t);"\n"===i?(this.onLineTransmit(this.lineBuffer),this.lineBuffer=""):this.lineBuffer+=i}this.cpu.data[i.UCSRA]|=r|e})}tick(){if(this.cpu.interruptsEnabled){const i=this.cpu.data[this.config.UCSRA],s=this.cpu.data[this.config.UCSRB];i&r&&s&R&&((0,t.avrInterrupt)(this.cpu,this.config.dataRegisterEmptyInterrupt),this.cpu.data[this.config.UCSRA]&=~r),i&e&&s&p&&((0,t.avrInterrupt)(this.cpu,this.config.txCompleteInterrupt),this.cpu.data[this.config.UCSRA]&=~e)}}get baudRate(){const t=this.cpu.data[this.config.UBRRH]<<8|this.cpu.data[this.config.UBRRL],i=this.cpu.data[this.config.UCSRA]&c?8:16;return Math.floor(this.freqMHz/(i*(1+t)))}get bitsPerChar(){switch((this.cpu.data[this.config.UCSRC]&(x|T))>>1|this.cpu.data[this.config.UCSRB]&U){case 0:return 5;case 1:return 6;case 2:return 7;case 3:return 8;default:case 7:return 9}}}exports.AVRUSART=I;
},{"../cpu/interrupt":"R2M0"}],"nmBM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVREEPROM=exports.eepromConfig=exports.EEPROMMemoryBackend=void 0;var e=require("../cpu/interrupt");class t{constructor(e){this.memory=new Uint8Array(e),this.memory.fill(255)}readMemory(e){return this.memory[e]}writeMemory(e,t){this.memory[e]&=t}eraseMemory(e){this.memory[e]=255}}exports.EEPROMMemoryBackend=t;const s={eepromReadyInterrupt:44,EECR:63,EEDR:64,EEARL:65,EEARH:66,eraseCycles:28800,writeCycles:28800};exports.eepromConfig=s;const i=1,r=2,c=4,o=8,h=16,p=32;class l{constructor(e,t,o=s){this.cpu=e,this.backend=t,this.config=o,this.writeEnabledCycles=0,this.writeCompleteCycles=0,this.cpu.writeHooks[this.config.EECR]=(e=>{const{EEARH:t,EEARL:s,EECR:o,EEDR:l}=this.config,a=this.cpu.data[t]<<8|this.cpu.data[s];if(e&c&&(this.writeEnabledCycles=this.cpu.cycles+4),e&i)return this.cpu.data[l]=this.backend.readMemory(a),this.cpu.cycles+=4,!0;if(e&r){if(this.cpu.cycles>=this.writeEnabledCycles)return!0;if(this.cpu.cycles<this.writeCompleteCycles)return!0;const t=this.cpu.data[l];return this.writeCompleteCycles=this.cpu.cycles,e&p||(this.backend.eraseMemory(a),this.writeCompleteCycles+=this.config.eraseCycles),e&h||(this.backend.writeMemory(a,t),this.writeCompleteCycles+=this.config.writeCycles),this.cpu.data[o]|=r,this.cpu.cycles+=2,!0}return!1})}tick(){const{EECR:t,eepromReadyInterrupt:s}=this.config;this.writeEnabledCycles&&this.cpu.cycles>this.writeEnabledCycles&&(this.cpu.data[t]&=~c),this.writeCompleteCycles&&this.cpu.cycles>this.writeCompleteCycles&&(this.cpu.data[t]&=~r,this.cpu.interruptsEnabled&&this.cpu.data[t]&o&&(0,e.avrInterrupt)(this.cpu,s))}}exports.AVREEPROM=l;
},{"../cpu/interrupt":"R2M0"}],"ltZa":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRTWI=exports.NoopTWIEventHandler=exports.twiConfig=void 0;var t=require("../cpu/interrupt");const e=128,s=64,i=32,a=16,c=8,r=4,n=1,o=248,h=2,u=1,p=3,d=254,l=1,T=0,W=248,f=8,R=16,S=24,w=32,g=40,v=48,x=56,C=64,H=72,m=80,I=88,k={twiInterrupt:48,TWBR:184,TWSR:185,TWAR:186,TWDR:187,TWCR:188,TWAMR:189};exports.twiConfig=k;class y{constructor(t){this.twi=t}start(){this.twi.completeStart()}stop(){this.twi.completeStop()}connectToSlave(){this.twi.completeConnect(!1)}writeByte(){this.twi.completeWrite(!1)}readByte(){this.twi.completeRead(255)}}exports.NoopTWIEventHandler=y;class B{constructor(t,c,n){this.cpu=t,this.config=c,this.freqMHz=n,this.eventHandler=new y(this),this.nextTick=null,this.updateStatus(W),this.cpu.writeHooks[c.TWCR]=(t=>{const n=t&e;n&&(t&=~e);const{status:o}=this;if(n&&t&r){const e=this.cpu.data[this.config.TWDR];return this.nextTick=(()=>{if(t&i)this.eventHandler.start(o!==W);else if(t&a)this.eventHandler.stop();else if(o===f)this.eventHandler.connectToSlave(e>>1,!(1&e));else if(o===S||o===g)this.eventHandler.writeByte(e);else if(o===C||o===m){const e=!!(t&s);this.eventHandler.readByte(e)}}),this.cpu.data[c.TWCR]=t,!0}})}tick(){if(this.nextTick&&(this.nextTick(),this.nextTick=null),this.cpu.interruptsEnabled){const{TWCR:s,twiInterrupt:i}=this.config;this.cpu.data[s]&n&&this.cpu.data[s]&e&&((0,t.avrInterrupt)(this.cpu,i),this.cpu.data[s]&=~e)}}get prescaler(){switch(this.cpu.data[this.config.TWSR]&p){case 0:return 1;case 1:return 4;case 2:return 16;case 3:return 64}throw new Error("Invalid prescaler value!")}get sclFrequency(){return this.freqMHz/(16+2*this.cpu.data[this.config.TWBR]*this.prescaler)}completeStart(){this.updateStatus(this.status===W?f:R)}completeStop(){this.cpu.data[this.config.TWCR]&=~a,this.updateStatus(W)}completeConnect(t){1&this.cpu.data[this.config.TWDR]?this.updateStatus(t?C:H):this.updateStatus(t?S:w)}completeWrite(t){this.updateStatus(t?g:v)}completeRead(t){const e=!!(this.cpu.data[this.config.TWCR]&s);this.cpu.data[this.config.TWDR]=t,this.updateStatus(e?m:I)}get status(){return this.cpu.data[this.config.TWSR]&o}updateStatus(t){const{TWCR:s,TWSR:i}=this.config;this.cpu.data[i]=this.cpu.data[i]&~o|t,this.cpu.data[s]|=e}}exports.AVRTWI=B;
},{"../cpu/interrupt":"R2M0"}],"X8EC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRSPI=exports.spiConfig=void 0;var t=require("../cpu/interrupt");const s=128,i=64,e=32,r=16,c=8,n=4,a=2,o=1,h=3,u=128,p=64,d=1,l={spiInterrupt:34,SPCR:76,SPSR:77,SPDR:78};exports.spiConfig=l;const S=8;class C{constructor(t,s,e){this.cpu=t,this.config=s,this.freqMHz=e,this.onTransfer=null,this.transmissionCompleteCycles=0,this.receivedByte=0;const{SPCR:r,SPSR:c,SPDR:n}=s;t.writeHooks[n]=(s=>{var e,n;if(t.data[r]&i)return this.transmissionCompleteCycles>this.cpu.cycles?(t.data[c]|=p,!0):(t.data[c]&=~p&~u,this.receivedByte=null!==(n=null===(e=this.onTransfer)||void 0===e?void 0:e.call(this,s))&&void 0!==n?n:0,this.transmissionCompleteCycles=this.cpu.cycles+this.clockDivider*S,!0)})}tick(){if(this.transmissionCompleteCycles&&this.cpu.cycles>=this.transmissionCompleteCycles){const{SPSR:t,SPDR:s}=this.config;this.cpu.data[t]|=u,this.cpu.data[s]=this.receivedByte,this.transmissionCompleteCycles=0}if(this.cpu.interruptsEnabled){const{SPSR:i,SPCR:e,spiInterrupt:r}=this.config;this.cpu.data[e]&s&&this.cpu.data[i]&u&&((0,t.avrInterrupt)(this.cpu,r),this.cpu.data[i]&=~u)}}get isMaster(){return!!(this.cpu.data[this.config.SPCR]&r)}get dataOrder(){return this.cpu.data[this.config.SPCR]&e?"lsbFirst":"msbFirst"}get spiMode(){return(this.cpu.data[this.config.SPCR]&n?2:0)|(this.cpu.data[this.config.SPCR]&c?1:0)}get clockDivider(){const t=this.cpu.data[this.config.SPSR]&d?2:4;switch(this.cpu.data[this.config.SPCR]&h){case 0:return t;case 1:return 4*t;case 2:return 16*t;case 3:return 32*t}throw new Error("Invalid divider value!")}get spiFrequency(){return this.freqMHz/this.clockDivider}}exports.AVRSPI=C;
},{"../cpu/interrupt":"R2M0"}],"gd9n":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={CPU:!0,avrInstruction:!0,avrInterrupt:!0,AVRTimer:!0,timer0Config:!0,timer1Config:!0,timer2Config:!0,AVRIOPort:!0,portAConfig:!0,portBConfig:!0,portCConfig:!0,portDConfig:!0,portEConfig:!0,portFConfig:!0,portGConfig:!0,portHConfig:!0,portJConfig:!0,portKConfig:!0,portLConfig:!0,PinState:!0,AVRUSART:!0,usart0Config:!0,AVREEPROM:!0,EEPROMMemoryBackend:!0,eepromConfig:!0,spiConfig:!0,AVRSPI:!0};Object.defineProperty(exports,"CPU",{enumerable:!0,get:function(){return r.CPU}}),Object.defineProperty(exports,"avrInstruction",{enumerable:!0,get:function(){return t.avrInstruction}}),Object.defineProperty(exports,"avrInterrupt",{enumerable:!0,get:function(){return n.avrInterrupt}}),Object.defineProperty(exports,"AVRTimer",{enumerable:!0,get:function(){return o.AVRTimer}}),Object.defineProperty(exports,"timer0Config",{enumerable:!0,get:function(){return o.timer0Config}}),Object.defineProperty(exports,"timer1Config",{enumerable:!0,get:function(){return o.timer1Config}}),Object.defineProperty(exports,"timer2Config",{enumerable:!0,get:function(){return o.timer2Config}}),Object.defineProperty(exports,"AVRIOPort",{enumerable:!0,get:function(){return i.AVRIOPort}}),Object.defineProperty(exports,"portAConfig",{enumerable:!0,get:function(){return i.portAConfig}}),Object.defineProperty(exports,"portBConfig",{enumerable:!0,get:function(){return i.portBConfig}}),Object.defineProperty(exports,"portCConfig",{enumerable:!0,get:function(){return i.portCConfig}}),Object.defineProperty(exports,"portDConfig",{enumerable:!0,get:function(){return i.portDConfig}}),Object.defineProperty(exports,"portEConfig",{enumerable:!0,get:function(){return i.portEConfig}}),Object.defineProperty(exports,"portFConfig",{enumerable:!0,get:function(){return i.portFConfig}}),Object.defineProperty(exports,"portGConfig",{enumerable:!0,get:function(){return i.portGConfig}}),Object.defineProperty(exports,"portHConfig",{enumerable:!0,get:function(){return i.portHConfig}}),Object.defineProperty(exports,"portJConfig",{enumerable:!0,get:function(){return i.portJConfig}}),Object.defineProperty(exports,"portKConfig",{enumerable:!0,get:function(){return i.portKConfig}}),Object.defineProperty(exports,"portLConfig",{enumerable:!0,get:function(){return i.portLConfig}}),Object.defineProperty(exports,"PinState",{enumerable:!0,get:function(){return i.PinState}}),Object.defineProperty(exports,"AVRUSART",{enumerable:!0,get:function(){return p.AVRUSART}}),Object.defineProperty(exports,"usart0Config",{enumerable:!0,get:function(){return p.usart0Config}}),Object.defineProperty(exports,"AVREEPROM",{enumerable:!0,get:function(){return u.AVREEPROM}}),Object.defineProperty(exports,"EEPROMMemoryBackend",{enumerable:!0,get:function(){return u.EEPROMMemoryBackend}}),Object.defineProperty(exports,"eepromConfig",{enumerable:!0,get:function(){return u.eepromConfig}}),Object.defineProperty(exports,"spiConfig",{enumerable:!0,get:function(){return g.spiConfig}}),Object.defineProperty(exports,"AVRSPI",{enumerable:!0,get:function(){return g.AVRSPI}});var r=require("./cpu/cpu"),t=require("./cpu/instruction"),n=require("./cpu/interrupt"),o=require("./peripherals/timer"),i=require("./peripherals/gpio"),p=require("./peripherals/usart"),u=require("./peripherals/eeprom"),f=require("./peripherals/twi");Object.keys(f).forEach(function(r){"default"!==r&&"__esModule"!==r&&(Object.prototype.hasOwnProperty.call(e,r)||r in exports&&exports[r]===f[r]||Object.defineProperty(exports,r,{enumerable:!0,get:function(){return f[r]}}))});var g=require("./peripherals/spi");
},{"./cpu/cpu":"XKeh","./cpu/instruction":"Gmr7","./cpu/interrupt":"R2M0","./peripherals/timer":"YN4y","./peripherals/gpio":"Jm2c","./peripherals/usart":"zuq6","./peripherals/eeprom":"nmBM","./peripherals/twi":"ltZa","./peripherals/spi":"X8EC"}],"zLe3":[function(require,module,exports) {
"use strict";function r(r,s){for(var t=0,e=r.split("\n");t<e.length;t++){var a=e[t];if(":"===a[0]&&"00"===a.substr(7,2))for(var n=parseInt(a.substr(1,2),16),o=parseInt(a.substr(3,4),16),u=0;u<n;u++)s[o+u]=parseInt(a.substr(9+2*u,2),16)}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.loadHex=r;
},{}],"LMf0":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.AVRRunner=void 0;var t=require("avr8js"),e=require("./intelhex"),r=function(t,e,r,n){return new(r||(r=Promise))(function(o,i){function s(t){try{p(n.next(t))}catch(e){i(e)}}function u(t){try{p(n.throw(t))}catch(e){i(e)}}function p(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(s,u)}p((n=n.apply(t,e||[])).next())})},n=function(t,e){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(o=(o=s.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(u){i=[6,u],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},o=32768,i=function(){function i(r){this.program=new Uint16Array(o),this.port=new Map,this.MHZ=16e6,this.stopped=!1,(0,e.loadHex)(r,new Uint8Array(this.program.buffer)),this.cpu=new t.CPU(this.program),this.timer=new t.AVRTimer(this.cpu,t.timer0Config),this.port.set("B",new t.AVRIOPort(this.cpu,t.portBConfig)),this.port.set("C",new t.AVRIOPort(this.cpu,t.portCConfig)),this.port.set("D",new t.AVRIOPort(this.cpu,t.portDConfig)),this.port.set("E",new t.AVRIOPort(this.cpu,t.portEConfig)),this.port.set("F",new t.AVRIOPort(this.cpu,t.portFConfig)),this.port.set("G",new t.AVRIOPort(this.cpu,t.portGConfig)),this.port.set("H",new t.AVRIOPort(this.cpu,t.portHConfig)),this.port.set("J",new t.AVRIOPort(this.cpu,t.portJConfig)),this.port.set("K",new t.AVRIOPort(this.cpu,t.portKConfig)),this.port.set("L",new t.AVRIOPort(this.cpu,t.portLConfig)),this.usart=new t.AVRUSART(this.cpu,t.usart0Config,this.MHZ)}return i.prototype.execute=function(e){return r(this,void 0,void 0,function(){return n(this,function(r){switch(r.label){case 0:this.stopped=!1,r.label=1;case 1:return(0,t.avrInstruction)(this.cpu),this.timer.tick(),this.usart.tick(),this.cpu.cycles%5e5!=0?[3,3]:(e(this.cpu),[4,new Promise(function(t){return setTimeout(t,0)})]);case 2:if(r.sent(),this.stopped)return[3,4];r.label=3;case 3:return[3,1];case 4:return[2]}})})},i.prototype.stop=function(){this.stopped=!0},i}();exports.AVRRunner=i;
},{"avr8js":"gd9n","./intelhex":"zLe3"}],"fcge":[function(require,module,exports) {
"use strict";function r(r,t){for(var e=r.toString();e.length<t;)e="0"+e;return e}function t(t){var e=Math.floor(1e3*t)%1e3,o=Math.floor(t%60);return r(Math.floor(t/60),2)+":"+r(o,2)+"."+r(e,3)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatTime=t;
},{}],"QCba":[function(require,module,exports) {
"use strict";require("@wokwi/elements");var e=require("./execute"),t=require("./format-time"),n=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function u(e){try{a(r.next(e))}catch(t){i(t)}}function c(e){try{a(r.throw(e))}catch(t){i(t)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(u,c)}a((r=r.apply(e,t||[])).next())})},r=function(e,t){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(c){i=[6,c],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}};function o(e){var t=e.getAttribute("pin"),n=e.getAttribute("port");return[t?parseInt(t,10):null,n]}window.AVR8js={build:function(e,t){return void 0===t&&(t=[]),n(this,void 0,void 0,function(){return r(this,function(n){switch(n.label){case 0:return[4,fetch("https://hexi.wokwi.com/build",{method:"POST",mode:"cors",cache:"force-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify({sketch:e,files:t})})];case 1:return[4,n.sent().json()];case 2:return[2,n.sent()]}})})},execute:function(n,r,i,u){var c=document.getElementById(i)||document,a=c.querySelectorAll("wokwi-led"),l=c.querySelectorAll("wokwi-7segment"),s=c.querySelectorAll("wokwi-buzzer"),f=c.querySelectorAll("wokwi-pushbutton"),h=new e.AVRRunner(n);u=u||16e6;for(var d=function(e){var t=h.port.get(e);t&&(f.forEach(function(n){var r=o(n),i=r[0],u=r[1];i&&u===e&&(t.setPin(i,!0),n.addEventListener("button-press",function(){h&&t.setPin(i,!1)}),n.addEventListener("button-release",function(){h&&t.setPin(i,!0)}))}),t.addListener(function(t){a.forEach(function(n){var r=o(n),i=r[0],u=r[1];i&&u===e&&(n.value=!!(t&1<<i-8))}),s.forEach(function(n){var r=o(n),i=r[0],u=r[1];i&&u===e&&(n.hasSignal=!!(t&1<<i-8))}),l.forEach(function(n){var r=o(n),i=r[0],u=r[1];i&&u===e&&(n.values=[1&t,2&t,4&t,16&t,32&t,64&t,128&t,256&t])})}))},p=0,v=["B","C","D","E","F","G","H","J","K"];p<v.length;p++){d(v[p])}h.usart.onLineTransmit=function(e){r(e)};var w=c.querySelector("#simulation-time");return h.execute(function(e){var n=(0,t.formatTime)(e.cycles/u);w&&(w.textContent="Simulation time: "+n)}),h}};
},{"@wokwi/elements":"whKC","./execute":"LMf0","./format-time":"fcge"}]},{},["QCba"], null)