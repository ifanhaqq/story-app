import{C as v}from"./config-DVE-v8Dl.js";try{self["workbox:core:7.2.0"]&&_()}catch{}const M=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},A=M;class l extends Error{constructor(e,t){const s=A(e,t);super(s),this.name=e,this.details=t}}const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},k=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),I=a=>{for(const e of Object.keys(f))a(e)},L={updateDetails:a=>{I(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||k(f.googleAnalytics),getPrecacheName:a=>a||k(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||k(f.runtime),getSuffix:()=>f.suffix};function K(a,e){const t=e();return a.waitUntil(t),t}try{self["workbox:precaching:7.2.0"]&&_()}catch{}const W="__WB_REVISION__";function S(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const n=new URL(a,location.href);return{cacheKey:n.href,url:n.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const n=new URL(t,location.href);return{cacheKey:n.href,url:n.href}}const s=new URL(t,location.href),r=new URL(t,location.href);return s.searchParams.set(W,e),{cacheKey:s.href,url:r.href}}class j{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const r=t.originalRequest.url;s?this.notUpdatedURLs.push(r):this.updatedURLs.push(r)}return s}}}class D{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const r=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return r?new Request(r,{headers:t.headers}):t},this._precacheController=e}}let w;function F(){if(w===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),w=!0}catch{w=!1}w=!1}return w}async function H(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=F()?s.body:await s.blob();return new Response(i,n)}const q=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function N(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function B(a,e,t,s){const r=N(e.url,t);if(e.url===r)return a.match(e,s);const n=Object.assign(Object.assign({},s),{ignoreSearch:!0}),i=await a.keys(e,n);for(const c of i){const o=N(c.url,t);if(r===o)return a.match(c,s)}}class ${constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}const G=new Set;async function V(){for(const a of G)await a()}function Q(a){return new Promise(e=>setTimeout(e,a))}try{self["workbox:strategies:7.2.0"]&&_()}catch{}function R(a){return typeof a=="string"?new Request(a):a}class z{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new $,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=R(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const i=await t.preloadResponse;if(i)return i}const r=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const i of this.iterateCallbacks("requestWillFetch"))s=await i({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const n=s.clone();try{let i;i=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))i=await c({event:t,request:n,response:i});return i}catch(i){throw r&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:r.clone(),request:n.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=R(e);let s;const{cacheName:r,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},n),{cacheName:r});s=await caches.match(i,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:r,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,t){const s=R(e);await Q(0);const r=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:q(r.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),g=h?await B(o,r.clone(),["__WB_REVISION__"],c):null;try{await o.put(r,h?n.clone():n)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await V(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:i,oldResponse:g,newResponse:n.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let r=e;for(const n of this.iterateCallbacks("cacheKeyWillBeUsed"))r=R(await n({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield n=>{const i=Object.assign(Object.assign({},n),{state:s});return t[e](i)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const r of this.iterateCallbacks("cacheWillUpdate"))if(t=await r({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class b{constructor(e={}){this.cacheName=L.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,r="params"in e?e.params:void 0,n=new z(this,{event:t,request:s,params:r}),i=this._getResponse(n,s,t),c=this._awaitComplete(i,n,s,t);return[i,c]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let r;try{if(r=await this._handle(t,e),!r||r.type==="error")throw new l("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(const i of e.iterateCallbacks("handlerDidError"))if(r=await i({error:n,event:s,request:t}),r)break}if(!r)throw n}for(const n of e.iterateCallbacks("handlerWillRespond"))r=await n({event:s,request:t,response:r});return r}async _awaitComplete(e,t,s,r){let n,i;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:n}),await t.doneWaiting()}catch(c){c instanceof Error&&(i=c)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:n,error:i}),t.destroy(),i)throw i}}class d extends b{constructor(e={}){e.cacheName=L.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const r=t.params||{};if(this._fallbackToNetwork){const n=r.integrity,i=e.integrity,c=!i||i===n;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?i||n:void 0})),n&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,r]of this.plugins.entries())r!==d.copyRedirectedCacheableResponsesPlugin&&(r===d.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await H(a):a}};class J{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:L.getPrecacheName(e),plugins:[...t,new D({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:r,url:n}=S(s),i=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==r)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:r});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(r)&&this._cacheKeysToIntegrities.get(r)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(r,s.integrity)}if(this._urlsToCacheKeys.set(n,r),this._urlsToCacheModes.set(n,i),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return K(e,async()=>{const t=new j;this.strategy.plugins.push(t);for(const[n,i]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(i),o=this._urlsToCacheModes.get(n),h=new Request(n,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=t;return{updatedURLs:s,notUpdatedURLs:r}})}activate(e){return K(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),r=new Set(this._urlsToCacheKeys.values()),n=[];for(const i of s)r.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let P;const x=()=>(P||(P=new J),P);try{self["workbox:routing:7.2.0"]&&_()}catch{}const E="GET",C=a=>a&&typeof a=="object"?a:{handle:a};class m{constructor(e,t,s=E){this.handler=C(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=C(e)}}class X extends m{constructor(e,t,s){const r=({url:n})=>{const i=e.exec(n.href);if(i&&!(n.origin!==location.origin&&i.index!==0))return i.slice(1)};super(r,t,s)}}class Y{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(r=>{typeof r=="string"&&(r=[r]);const n=new Request(...r);return this.handleRequest({request:n,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const r=s.origin===location.origin,{params:n,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let c=i&&i.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let h;try{h=c.handle({url:s,request:e,event:t,params:n})}catch(u){h=Promise.reject(u)}const g=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||g)&&(h=h.catch(async u=>{if(g)try{return await g.handle({url:s,request:e,event:t,params:n})}catch(T){T instanceof Error&&(u=T)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const n=this._routes.get(s.method)||[];for(const i of n){let c;const o=i.match({url:e,sameOrigin:t,request:s,event:r});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:i,params:c}}return{}}setDefaultHandler(e,t=E){this._defaultHandlerMap.set(t,C(e))}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let y;const Z=()=>(y||(y=new Y,y.addFetchListener(),y.addCacheListener()),y);function p(a,e,t){let s;if(typeof a=="string"){const n=new URL(a,location.href),i=({url:c})=>c.href===n.href;s=new m(i,e,t)}else if(a instanceof RegExp)s=new X(a,e,t);else if(typeof a=="function")s=new m(a,e,t);else if(a instanceof m)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return Z().registerRoute(s),s}function ee(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*te(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:r}={}){const n=new URL(a,location.href);n.hash="",yield n.href;const i=ee(n,e);if(yield i.href,t&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=t,yield c.href}if(s){const c=new URL(i.href);c.pathname+=".html",yield c.href}if(r){const c=r({url:n});for(const o of c)yield o.href}}class se extends m{constructor(e,t){const s=({request:r})=>{const n=e.getURLsToCacheKeys();for(const i of te(r.url,t)){const c=n.get(i);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(s,e.strategy)}}function ae(a){const e=x(),t=new se(e,a);p(t)}function re(a){x().precache(a)}function ne(a,e){re(a),ae(e)}try{self["workbox:cacheable-response:7.2.0"]&&_()}catch{}class ie{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some(s=>e.headers.get(s)===this._headers[s])),t}}class ce{constructor(e){this.cacheWillUpdate=async({response:t})=>this._cacheableResponse.isResponseCacheable(t)?t:null,this._cacheableResponse=new ie(e)}}class U extends b{async _handle(e,t){let s=await t.cacheMatch(e),r;if(!s)try{s=await t.fetchAndCachePut(e)}catch(n){n instanceof Error&&(r=n)}if(!s)throw new l("no-response",{url:e.url,error:r});return s}}const O={cacheWillUpdate:async({response:a})=>a.status===200||a.status===0?a:null};class oe extends b{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(O),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const s=[],r=[];let n;if(this._networkTimeoutSeconds){const{id:o,promise:h}=this._getTimeoutPromise({request:e,logs:s,handler:t});n=o,r.push(h)}const i=this._getNetworkPromise({timeoutId:n,request:e,logs:s,handler:t});r.push(i);const c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(r))||await i)());if(!c)throw new l("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let r;return{promise:new Promise(i=>{r=setTimeout(async()=>{i(await s.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:r}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:r}){let n,i;try{i=await r.fetchAndCachePut(t)}catch(c){c instanceof Error&&(n=c)}return e&&clearTimeout(e),(n||!i)&&(i=await r.cacheMatch(t)),i}}class le extends b{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(O)}async _handle(e,t){const s=t.fetchAndCachePut(e).catch(()=>{});t.waitUntil(s);let r=await t.cacheMatch(e),n;if(!r)try{r=await s}catch(i){i instanceof Error&&(n=i)}if(!r)throw new l("no-response",{url:e.url,error:n});return r}}const he=()=>{try{let a=self.__WB_MANIFEST;if(a||(a=[]),!Array.isArray(a))throw new Error(`Expected manifest to be array, got ${typeof a}`);ne(a)}catch{}};he();p(({url:a})=>a.origin==="https://fonts.googleapis.com"||a.origin==="https://fonts.gstatic.com",new U({cacheName:"google-fonts"}));p(({url:a})=>a.origin==="https://cdnjs.cloudflare.com"||a.origin.includes("fontawesome"),new U({cacheName:"fontawesome"}));p(({url:a})=>a.origin==="https://ui-avatars.com",new U({cacheName:"avatars-api",plugins:[new ce({statuses:[0,200]})]}));p(({request:a,url:e})=>new URL(v.BASE_URL).origin===e.origin&&a.destination!=="image",new oe({cacheName:"story-api"}));p(({request:a,url:e})=>new URL(v.BASE_URL).origin===e.origin&&a.destination==="image",new le({cacheName:"story-api-images"}));p(({url:a})=>a.origin.includes("maptiler"),new U({cacheName:"maptiler-api"}));self.addEventListener("push",a=>{async function e(){const t=await a.data.json();await self.registration.showNotification(t.title,{body:t.options.body})}a.waitUntil(e())});
