(function(p,Ie,be,j,se,h,U,B){"use strict";function we(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var K=we(U),Te=()=>cumcord.patcher.injectCSS(".ysink_zone_cuminside{font-size:1.2rem;padding-bottom:1rem;font-style:italic}.ysink_zone_ticker{margin-top:.2rem}.ysink_zone_ticker_fillscreen{position:fixed;left:0;top:1rem;width:100vw;height:100vh;opacity:.1;pointer-events:none}.ysink_zone_card{padding:1rem;border:1px solid var(--background-modifier-accent);border-radius:.25rem;display:flex;flex-direction:column;z-index:1;background-color:var(--deprecated-card-bg)}.ysink_zone_card .ysink_zone_title{font-size:1rem;padding-bottom:.25rem;display:inline;flex:1;margin:0}.ysink_zone_card .ysink_zone_button{display:inline;padding:0}.ysink_zone_card .ysink_zone_button>div{padding:2px 16px}.ysink_zone_card .ysink_zone_row{display:flex}.ysink_zone_card .ysink_zone_row>*{flex:1}.ysink_zone_card .ysink_zone_row>:last-child{flex:unset}.ysink_zone_card .ysink_zone_author_licence{font-style:italic}.ysink_zone_card .ysink_zone_desc{flex:1}.ysink_zone_modal .ysink_zone_row{display:flex}.ysink_zone_modal .ysink_zone_row>*{flex:1}.ysink_zone_modal .ysink_zone_row>:last-child{flex:unset;margin-left:1rem}.ysink_zone_divide{margin:0 0 1rem}.ysink_zone_modal .ysink_zone_divide{margin:.5rem 0}.ysink_zone_card .ysink_zone_divide{margin:.2rem 0}.ysink_zone_header{display:flex}.ysink_zone_header>*{flex:1}.ysink_zone_header>:last-child{flex:unset}.ysink_zone_splash{display:flex;justify-content:center;align-items:center;margin-top:10rem;flex-flow:column nowrap}.ysink_zone_splash .ysink_zone_button{margin-top:1rem}.ysink_zone_modal .ysink_zone_splash{margin-top:6rem}.ysink_zone_badge{display:inline;margin-left:.5rem}.ysink_zone_card_container{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.ysink_zone_card_container .ysink_zone_card button{margin-bottom:.2rem;width:6rem}.ysink_zone_searchbox{margin-bottom:1rem}");const Ae=[{url:"https://cumcordplugins.github.io/Condom/",name:"Condom",enabled:!0,official:!0}];var ne=t=>{t.repos=Ae};const Le=t=>new URL("plugins-large.json",t),Fe=(t,e)=>new URL(e,t);function re(t){let e=new XMLHttpRequest;e.open("GET",Le(t),!1),e.send(null);let s=[];try{s=JSON.parse(e.responseText)}catch{return[]}return Object.keys(s).map(n=>{let r=s[n];return r.url=n,r})}const ie=t=>{let e=t.map(s=>re(s.url).map(n=>(n.repo=s,n)));return e.length==0?[]:e.reduce((s,n)=>s.concat(n))};function x(t){return Array.isArray?Array.isArray(t):ae(t)==="[object Array]"}const Be=1/0;function $e(t){if(typeof t=="string")return t;let e=t+"";return e=="0"&&1/t==-Be?"-0":e}function De(t){return t==null?"":$e(t)}function M(t){return typeof t=="string"}function oe(t){return typeof t=="number"}function Oe(t){return t===!0||t===!1||Pe(t)&&ae(t)=="[object Boolean]"}function ce(t){return typeof t=="object"}function Pe(t){return ce(t)&&t!==null}function _(t){return t!=null}function W(t){return!t.trim().length}function ae(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const Xt="Extended search is not available",je="Incorrect 'index' type",Ue=t=>`Invalid value for key ${t}`,Ke=t=>`Pattern length exceeds max of ${t}.`,We=t=>`Missing ${t} property in key`,Ye=t=>`Property 'weight' in key '${t}' must be a positive integer`,le=Object.prototype.hasOwnProperty;class Ge{constructor(e){this._keys=[],this._keyMap={};let s=0;e.forEach(n=>{let r=ue(n);s+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,s+=r.weight}),this._keys.forEach(n=>{n.weight/=s})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ue(t){let e=null,s=null,n=null,r=1;if(M(t)||x(t))n=t,e=he(t),s=Y(t);else{if(!le.call(t,"name"))throw new Error(We("name"));const i=t.name;if(n=i,le.call(t,"weight")&&(r=t.weight,r<=0))throw new Error(Ye(i));e=he(i),s=Y(i)}return{path:e,id:s,weight:r,src:n}}function he(t){return x(t)?t:t.split(".")}function Y(t){return x(t)?t.join("."):t}function He(t,e){let s=[],n=!1;const r=(i,o,c)=>{if(!!_(i))if(!o[c])s.push(i);else{let a=o[c];const l=i[a];if(!_(l))return;if(c===o.length-1&&(M(l)||oe(l)||Oe(l)))s.push(De(l));else if(x(l)){n=!0;for(let u=0,f=l.length;u<f;u+=1)r(l[u],o,c+1)}else o.length&&r(l,o,c+1)}};return r(t,M(e)?e.split("."):e,0),n?s:s[0]}var d={...{isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},...{includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},...{location:0,threshold:.6,distance:100},...{useExtendedSearch:!1,getFn:He,ignoreLocation:!1,ignoreFieldNorm:!1}};const Ze=/[^ ]+/g;function Je(t=3){const e=new Map,s=Math.pow(10,t);return{get(n){const r=n.match(Ze).length;if(e.has(r))return e.get(r);const i=1/Math.sqrt(r),o=parseFloat(Math.round(i*s)/s);return e.set(r,o),o},clear(){e.clear()}}}class G{constructor({getFn:e=d.getFn}={}){this.norm=Je(3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((s,n)=>{this._keysMap[s.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,M(this.docs[0])?this.docs.forEach((e,s)=>{this._addString(e,s)}):this.docs.forEach((e,s)=>{this._addObject(e,s)}),this.norm.clear())}add(e){const s=this.size();M(e)?this._addString(e,s):this._addObject(e,s)}removeAt(e){this.records.splice(e,1);for(let s=e,n=this.size();s<n;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(e,s){return e[this._keysMap[s]]}size(){return this.records.length}_addString(e,s){if(!_(e)||W(e))return;let n={v:e,i:s,n:this.norm.get(e)};this.records.push(n)}_addObject(e,s){let n={i:s,$:{}};this.keys.forEach((r,i)=>{let o=this.getFn(e,r.path);if(!!_(o)){if(x(o)){let c=[];const a=[{nestedArrIndex:-1,value:o}];for(;a.length;){const{nestedArrIndex:l,value:u}=a.pop();if(!!_(u))if(M(u)&&!W(u)){let f={v:u,i:l,n:this.norm.get(u)};c.push(f)}else x(u)&&u.forEach((f,m)=>{a.push({nestedArrIndex:m,value:f})})}n.$[i]=c}else if(!W(o)){let c={v:o,n:this.norm.get(o)};n.$[i]=c}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function de(t,e,{getFn:s=d.getFn}={}){const n=new G({getFn:s});return n.setKeys(t.map(ue)),n.setSources(e),n.create(),n}function Qe(t,{getFn:e=d.getFn}={}){const{keys:s,records:n}=t,r=new G({getFn:e});return r.setKeys(s),r.setIndexRecords(n),r}function $(t,{errors:e=0,currentLocation:s=0,expectedLocation:n=0,distance:r=d.distance,ignoreLocation:i=d.ignoreLocation}={}){const o=e/t.length;if(i)return o;const c=Math.abs(n-s);return r?o+c/r:c?1:o}function Ve(t=[],e=d.minMatchCharLength){let s=[],n=-1,r=-1,i=0;for(let o=t.length;i<o;i+=1){let c=t[i];c&&n===-1?n=i:!c&&n!==-1&&(r=i-1,r-n+1>=e&&s.push([n,r]),n=-1)}return t[i-1]&&i-n>=e&&s.push([n,i-1]),s}const I=32;function Xe(t,e,s,{location:n=d.location,distance:r=d.distance,threshold:i=d.threshold,findAllMatches:o=d.findAllMatches,minMatchCharLength:c=d.minMatchCharLength,includeMatches:a=d.includeMatches,ignoreLocation:l=d.ignoreLocation}={}){if(e.length>I)throw new Error(Ke(I));const u=e.length,f=t.length,m=Math.max(0,Math.min(n,f));let y=i,g=m;const k=c>1||a,b=k?Array(f):[];let S;for(;(S=t.indexOf(e,g))>-1;){let R=$(e,{currentLocation:S,expectedLocation:m,distance:r,ignoreLocation:l});if(y=Math.min(R,y),g=S+u,k){let C=0;for(;C<u;)b[S+C]=1,C+=1}}g=-1;let A=[],w=1,O=u+f;const Vt=1<<u-1;for(let R=0;R<u;R+=1){let C=0,v=O;for(;C<v;)$(e,{errors:R,currentLocation:m+v,expectedLocation:m,distance:r,ignoreLocation:l})<=y?C=v:O=v,v=Math.floor((O-C)/2+C);O=v;let Ce=Math.max(1,m-v+1),te=o?f:Math.min(m+v,f)+u,L=Array(te+2);L[te+1]=(1<<R)-1;for(let z=te;z>=Ce;z-=1){let P=z-1,ve=s[t.charAt(P)];if(k&&(b[P]=+!!ve),L[z]=(L[z+1]<<1|1)&ve,R&&(L[z]|=(A[z+1]|A[z])<<1|1|A[z+1]),L[z]&Vt&&(w=$(e,{errors:R,currentLocation:P,expectedLocation:m,distance:r,ignoreLocation:l}),w<=y)){if(y=w,g=P,g<=m)break;Ce=Math.max(1,2*m-g)}}if($(e,{errors:R+1,currentLocation:m,expectedLocation:m,distance:r,ignoreLocation:l})>y)break;A=L}const ee={isMatch:g>=0,score:Math.max(.001,w)};if(k){const R=Ve(b,c);R.length?a&&(ee.indices=R):ee.isMatch=!1}return ee}function qe(t){let e={};for(let s=0,n=t.length;s<n;s+=1){const r=t.charAt(s);e[r]=(e[r]||0)|1<<n-s-1}return e}class fe{constructor(e,{location:s=d.location,threshold:n=d.threshold,distance:r=d.distance,includeMatches:i=d.includeMatches,findAllMatches:o=d.findAllMatches,minMatchCharLength:c=d.minMatchCharLength,isCaseSensitive:a=d.isCaseSensitive,ignoreLocation:l=d.ignoreLocation}={}){if(this.options={location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:l},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const u=(m,y)=>{this.chunks.push({pattern:m,alphabet:qe(m),startIndex:y})},f=this.pattern.length;if(f>I){let m=0;const y=f%I,g=f-y;for(;m<g;)u(this.pattern.substr(m,I),m),m+=I;if(y){const k=f-I;u(this.pattern.substr(k),k)}}else u(this.pattern,0)}searchIn(e){const{isCaseSensitive:s,includeMatches:n}=this.options;if(s||(e=e.toLowerCase()),this.pattern===e){let g={isMatch:!0,score:0};return n&&(g.indices=[[0,e.length-1]]),g}const{location:r,distance:i,threshold:o,findAllMatches:c,minMatchCharLength:a,ignoreLocation:l}=this.options;let u=[],f=0,m=!1;this.chunks.forEach(({pattern:g,alphabet:k,startIndex:b})=>{const{isMatch:S,score:A,indices:w}=Xe(e,g,k,{location:r+b,distance:i,threshold:o,findAllMatches:c,minMatchCharLength:a,includeMatches:n,ignoreLocation:l});S&&(m=!0),f+=A,S&&w&&(u=[...u,...w])});let y={isMatch:m,score:m?f/this.chunks.length:1};return m&&n&&(y.indices=u),y}}class N{constructor(e){this.pattern=e}static isMultiMatch(e){return me(e,this.multiRegex)}static isSingleMatch(e){return me(e,this.singleRegex)}search(){}}function me(t,e){const s=t.match(e);return s?s[1]:null}class et extends N{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const s=e===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class tt extends N{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const n=e.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}}class st extends N{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const s=e.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class nt extends N{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const s=!e.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class rt extends N{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const s=e.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[e.length-this.pattern.length,e.length-1]}}}class it extends N{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const s=!e.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class pe extends N{constructor(e,{location:s=d.location,threshold:n=d.threshold,distance:r=d.distance,includeMatches:i=d.includeMatches,findAllMatches:o=d.findAllMatches,minMatchCharLength:c=d.minMatchCharLength,isCaseSensitive:a=d.isCaseSensitive,ignoreLocation:l=d.ignoreLocation}={}){super(e);this._bitapSearch=new fe(e,{location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:l})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class ge extends N{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let s=0,n;const r=[],i=this.pattern.length;for(;(n=e.indexOf(this.pattern,s))>-1;)s=n+i,r.push([n,s-1]);const o=!!r.length;return{isMatch:o,score:o?0:1,indices:r}}}const H=[et,ge,st,nt,it,rt,tt,pe],ye=H.length,ot=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,ct="|";function at(t,e={}){return t.split(ct).map(s=>{let n=s.trim().split(ot).filter(i=>i&&!!i.trim()),r=[];for(let i=0,o=n.length;i<o;i+=1){const c=n[i];let a=!1,l=-1;for(;!a&&++l<ye;){const u=H[l];let f=u.isMultiMatch(c);f&&(r.push(new u(f,e)),a=!0)}if(!a)for(l=-1;++l<ye;){const u=H[l];let f=u.isSingleMatch(c);if(f){r.push(new u(f,e));break}}}return r})}const lt=new Set([pe.type,ge.type]);class ut{constructor(e,{isCaseSensitive:s=d.isCaseSensitive,includeMatches:n=d.includeMatches,minMatchCharLength:r=d.minMatchCharLength,ignoreLocation:i=d.ignoreLocation,findAllMatches:o=d.findAllMatches,location:c=d.location,threshold:a=d.threshold,distance:l=d.distance}={}){this.query=null,this.options={isCaseSensitive:s,includeMatches:n,minMatchCharLength:r,findAllMatches:o,ignoreLocation:i,location:c,threshold:a,distance:l},this.pattern=s?e:e.toLowerCase(),this.query=at(this.pattern,this.options)}static condition(e,s){return s.useExtendedSearch}searchIn(e){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let i=0,o=[],c=0;for(let a=0,l=s.length;a<l;a+=1){const u=s[a];o.length=0,i=0;for(let f=0,m=u.length;f<m;f+=1){const y=u[f],{isMatch:g,indices:k,score:b}=y.search(e);if(g){if(i+=1,c+=b,n){const S=y.constructor.type;lt.has(S)?o=[...o,...k]:o.push(k)}}else{c=0,i=0,o.length=0;break}}if(i){let f={isMatch:!0,score:c/i};return n&&(f.indices=o),f}}return{isMatch:!1,score:1}}}const Z=[];function ht(...t){Z.push(...t)}function J(t,e){for(let s=0,n=Z.length;s<n;s+=1){let r=Z[s];if(r.condition(t,e))return new r(t,e)}return new fe(t,e)}const F={AND:"$and",OR:"$or"},Q={PATH:"$path",PATTERN:"$val"},V=t=>!!(t[F.AND]||t[F.OR]),dt=t=>!!t[Q.PATH],ft=t=>!x(t)&&ce(t)&&!V(t),_e=t=>({[F.AND]:Object.keys(t).map(e=>({[e]:t[e]}))});function Ee(t,e,{auto:s=!0}={}){const n=r=>{let i=Object.keys(r);const o=dt(r);if(!o&&i.length>1&&!V(r))return n(_e(r));if(ft(r)){const a=o?r[Q.PATH]:i[0],l=o?r[Q.PATTERN]:r[a];if(!M(l))throw new Error(Ue(a));const u={keyId:Y(a),pattern:l};return s&&(u.searcher=J(l,e)),u}let c={children:[],operator:i[0]};return i.forEach(a=>{const l=r[a];x(l)&&l.forEach(u=>{c.children.push(n(u))})}),c};return V(t)||(t=_e(t)),n(t)}function mt(t,{ignoreFieldNorm:e=d.ignoreFieldNorm}){t.forEach(s=>{let n=1;s.matches.forEach(({key:r,norm:i,score:o})=>{const c=r?r.weight:null;n*=Math.pow(o===0&&c?Number.EPSILON:o,(c||1)*(e?1:i))}),s.score=n})}function pt(t,e){const s=t.matches;e.matches=[],!!_(s)&&s.forEach(n=>{if(!_(n.indices)||!n.indices.length)return;const{indices:r,value:i}=n;let o={indices:r,value:i};n.key&&(o.key=n.key.src),n.idx>-1&&(o.refIndex=n.idx),e.matches.push(o)})}function gt(t,e){e.score=t.score}function yt(t,e,{includeMatches:s=d.includeMatches,includeScore:n=d.includeScore}={}){const r=[];return s&&r.push(pt),n&&r.push(gt),t.map(i=>{const{idx:o}=i,c={item:e[o],refIndex:o};return r.length&&r.forEach(a=>{a(i,c)}),c})}class T{constructor(e,s={},n){this.options={...d,...s},this.options.useExtendedSearch,this._keyStore=new Ge(this.options.keys),this.setCollection(e,n)}setCollection(e,s){if(this._docs=e,s&&!(s instanceof G))throw new Error(je);this._myIndex=s||de(this.options.keys,this._docs,{getFn:this.options.getFn})}add(e){!_(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const s=[];for(let n=0,r=this._docs.length;n<r;n+=1){const i=this._docs[n];e(i,n)&&(this.removeAt(n),n-=1,r-=1,s.push(i))}return s}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:s=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:i,sortFn:o,ignoreFieldNorm:c}=this.options;let a=M(e)?M(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return mt(a,{ignoreFieldNorm:c}),i&&a.sort(o),oe(s)&&s>-1&&(a=a.slice(0,s)),yt(a,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(e){const s=J(e,this.options),{records:n}=this._myIndex,r=[];return n.forEach(({v:i,i:o,n:c})=>{if(!_(i))return;const{isMatch:a,score:l,indices:u}=s.searchIn(i);a&&r.push({item:i,idx:o,matches:[{score:l,value:i,norm:c,indices:u}]})}),r}_searchLogical(e){const s=Ee(e,this.options),n=(c,a,l)=>{if(!c.children){const{keyId:u,searcher:f}=c,m=this._findMatches({key:this._keyStore.get(u),value:this._myIndex.getValueForItemAtKeyId(a,u),searcher:f});return m&&m.length?[{idx:l,item:a,matches:m}]:[]}switch(c.operator){case F.AND:{const u=[];for(let f=0,m=c.children.length;f<m;f+=1){const y=c.children[f],g=n(y,a,l);if(g.length)u.push(...g);else return[]}return u}case F.OR:{const u=[];for(let f=0,m=c.children.length;f<m;f+=1){const y=c.children[f],g=n(y,a,l);if(g.length){u.push(...g);break}}return u}}},r=this._myIndex.records,i={},o=[];return r.forEach(({$:c,i:a})=>{if(_(c)){let l=n(s,c,a);l.length&&(i[a]||(i[a]={idx:a,item:c,matches:[]},o.push(i[a])),l.forEach(({matches:u})=>{i[a].matches.push(...u)}))}}),o}_searchObjectList(e){const s=J(e,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach(({$:o,i:c})=>{if(!_(o))return;let a=[];n.forEach((l,u)=>{a.push(...this._findMatches({key:l,value:o[u],searcher:s}))}),a.length&&i.push({idx:c,item:o,matches:a})}),i}_findMatches({key:e,value:s,searcher:n}){if(!_(s))return[];let r=[];if(x(s))s.forEach(({v:i,i:o,n:c})=>{if(!_(i))return;const{isMatch:a,score:l,indices:u}=n.searchIn(i);a&&r.push({score:l,key:e,value:i,idx:o,norm:c,indices:u})});else{const{v:i,n:o}=s,{isMatch:c,score:a,indices:l}=n.searchIn(i);c&&r.push({score:a,key:e,value:i,norm:o,indices:l})}return r}}T.version="6.4.6",T.createIndex=de,T.parseIndex=Qe,T.config=d,T.parseQuery=Ee,ht(ut);var _t=(t,e,s)=>!s||s==""?t:new T(t,{keys:e}).search(s).map(n=>n.item);const ke=p.findByDisplayName("FormText"),Re="Welcome to the cum zone - Only cum inside anime girls - Quivering clit, double jointed pussy - Fresh balls, elegant ejaculation - First the kiss, then the cum - My dick is in love with pain - Co-op cock torture - Stuff my dick into a furnace - Stitch my cock shut - Pressure cook my greasy balls - Cumblast me and make it snappy - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - What's all the cummotion? - My dad fell into a cum shaft - My dad glazed my face with cum - Fertilize a baby with hunk spunk - Cum spunk in my trunk - Cum craving toddler - Cum drippin' cunt - Cummy Rae Jepsen - Cum me maybe - Cummy bottom boy - Night of the living cum - Nefarious cum mastermind - Cum makes me fearless - Cum crammer, cock slammer - Cum slammed ya mum - Mail your mums pieces of my dick - Bazinga! - Chug the cum, fug ya mum - Fuck my asshole full of cum - Three little words - Get fucked, nerd - Cum stuffer, jenkem huffer - Fuck my cum puddle - Bottom stuffer, semen huffer - Would love a gator to fuck me - Undercooked baby pig penises - Help my dogs get a huge boner - Water bong full of cat cum - Accidentally fucked my own ass - I barely had any dicks inside me - Who ate all my cum? A mystery - Cum detective hot on the trail - Bees make honey, I make cummy";let ze=[];for(let t=0;t<40;t++)ze.push(0);var Et=({fillscreen:t})=>t?h.React.createElement(ke,{className:"ysink_zone_ticker_fillscreen"},ze.map(e=>h.React.createElement("marquee",{className:"ysink_zone_cuminside",scrolldelay:"65"},Re))):h.React.createElement(ke,{className:"ysink_zone_ticker"},h.React.createElement("marquee",{className:"ysink_zone_cuminside",scrolldelay:"65"},Re));const kt=p.findByDisplayName("FormTitle"),xe=p.findByDisplayName("FormText"),Rt=p.findByDisplayName("FormDivider"),E=p.findByProps("Sizes","Colors","Looks","DropdownSizes");var zt=({plugin:t})=>{let e=K.default.installed.ghost,s=Object.keys(e).map(r=>[r,e[r].enabled]).filter(r=>typeof r[1]=="boolean");function n(r,i){const o=(c,a)=>c.find(l=>l[0]==a||l[0]==a+"/");return o(s,r)==null?h.React.createElement(E,{className:"ysink_zone_button",color:E.Colors.BRAND,size:E.Sizes.TINY,look:E.Looks.OUTLINED,onClick:()=>{K.default.importPlugin(r).then(()=>B.showToast({title:"Installed plugin "+i,duration:5e3}))}},"Install"):o(s,r)[1]?h.React.createElement(E,{className:"ysink_zone_button",color:E.Colors.GREEN,size:E.Sizes.TINY,look:E.Looks.OUTLINED},"Running"):h.React.createElement(E,{className:"ysink_zone_button",color:E.Colors.GREY,size:E.Sizes.TINY,look:E.Looks.OUTLINED},"Installed")}return j.useNest(K.default.installed),h.React.createElement("div",{className:"ysink_zone_card"},h.React.createElement("div",{className:"ysink_zone_row"},h.React.createElement(kt,{tag:"p",className:"ysink_zone_title"},t.name),n(Fe(t.repo.url,t.url).href,t.name)),h.React.createElement(xe,{className:"ysink_zone_desc"},t.description),h.React.createElement(Rt,{className:"ysink_zone_divide"}),h.React.createElement(xe,{className:"ysink_zone_author_licence"},"by ",t.author," under ",t.license))};const xt=p.findByDisplayName("FormTitle"),Mt=p.findByDisplayName("FormText");p.findByDisplayName("FormDivider");const Me=p.findByProps("Sizes","Colors","Looks","DropdownSizes"),St=cumcord.modules.webpack.findByProps("BadgeShapes");var Nt=({repo:t,nest:e})=>h.React.createElement("div",{className:"ysink_zone_card"},h.React.createElement("div",{className:"ysink_zone_row"},h.React.createElement("div",null,h.React.createElement(xt,{tag:"p",className:"ysink_zone_title"},t.name,t.official?h.React.createElement(St.TextBadge,{className:"ysink_zone_badge",text:"official repo",color:"var(--info-positive-foreground)"}):[]),h.React.createElement(Mt,null,t.url)),h.React.createElement(Me,{color:Me.Colors.RED,className:"ysink_zone_button",onClick:()=>e.store.repos=e.ghost.repos.filter(s=>s.url!=t.url)},"Remove Repo")));const Ct=p.findByDisplayName("FormTitle"),vt=p.findByDisplayName("FormText"),It=p.findByDisplayName("FormSection"),X=p.findByProps("Sizes","Colors","Looks","DropdownSizes"),Se=({store:t})=>h.React.createElement(It,{className:"ysink_zone_splash"},h.React.createElement(Ct,{tag:"h2"},"No Repos!"),h.React.createElement(vt,null,"You do not have any repos added!"),h.React.createElement(X,{className:"ysink_zone_button",color:X.Colors.GREEN,sizes:X.Sizes.LARGE,onClick:()=>ne(t)},"Reset repo list to default")),bt=h.React.useState,D=p.findByProps("ModalCloseButton"),Ne=p.findByDisplayName("Header"),q=p.findByDisplayName("Flex"),{openModal:wt}=p.findByProps("openModal"),Tt=p.findByDisplayName("FormSection"),At=p.findByDisplayName("FormDivider"),Lt=p.findByDisplayName("TextInput"),Ft=p.findByProps("Sizes","Colors","Looks","DropdownSizes");function Bt(t){try{return re(t),!0}catch{return!1}}function $t(t,e){if(e.endsWith("/")||(e+="/"),t.ghost.repos.find(s=>s.url==e)!==void 0)B.showToast({title:"You already have this repo!",duration:5e3});else if(Bt(e)){let s=t.ghost.repos;s.push({url:e,name:"new repo",enabled:!0}),t.store.repos=s,B.showToast({title:"Added repo",duration:5e3})}else B.showToast({title:"Repo was invalid",duration:5e3})}const Dt=({nest:t,e})=>{const[s,n]=bt("");return j.useNest(t),h.React.createElement(se.ErrorBoundary,null,h.React.createElement(D.ModalRoot,{transitionState:e.transitionState,size:"large",className:"ysink_zone_modal"},h.React.createElement(D.ModalHeader,{separator:!1},h.React.createElement(q.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},h.React.createElement(Ne,{tag:"h2",size:Ne.Sizes.SIZE_20},"Manage Repos")),h.React.createElement(q.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},h.React.createElement(D.ModalCloseButton,{onClick:e.onClose}))),h.React.createElement(D.ModalContent,null,h.React.createElement(Tt,null,h.React.createElement(q,{basis:"auto",grow:1,shrink:1,className:"ysink_zone_row"},h.React.createElement(Lt,{className:"ysink_zone_input",placeholder:"https://example.com/repo",type:"text",value:s,onChange:r=>n(r)}),h.React.createElement(Ft,{className:"ysink_zone_button",onClick:()=>{n(""),$t(t,s)}},"Add")),h.React.createElement(At,{className:"ysink_zone_divide"}),t.ghost.repos.length==0?h.React.createElement(Se,{store:t.store}):t.ghost.repos.map(r=>h.React.createElement(Nt,{repo:r,nest:t}))))))};var Ot=t=>wt(e=>h.React.createElement(Dt,{nest:t,e}));const Pt=h.React.useState,jt=p.findByDisplayName("FormTitle");p.findByDisplayName("FormText");const Ut=p.findByDisplayName("FormSection"),Kt=p.findByDisplayName("FormDivider"),Wt=p.findByProps("Sizes","Colors","Looks","DropdownSizes"),Yt=p.findByDisplayName("TextInput"),Gt=(t,e)=>_t(ie(t),["name","author"],e);var Ht=({nest:t})=>{let[e,s]=Pt("");return j.useNest(t),h.React.createElement(se.ErrorBoundary,null,h.React.createElement(Ut,null,h.React.createElement("div",{className:"ysink_zone_header"},h.React.createElement(jt,{tag:"h1"},"Welcome to the Cum Zone"),h.React.createElement(Wt,{className:"ysink_zone_button",onClick:()=>Ot(t)},"Manage Repos")),h.React.createElement(Et,null),h.React.createElement(Yt,{className:"ysink_zone_input  ysink_zone_searchbox",placeholder:"Search plugins",type:"text",value:e,onChange:n=>s(n)}),h.React.createElement(Kt,{className:"ysink_zone_divide"}),t.ghost.repos.length==0?h.React.createElement(Se,{store:t.store}):h.React.createElement("div",{className:"ysink_zone_card_container"},Gt(t.ghost.repos,e).map(n=>h.React.createElement(zt,{plugin:n})))))},Zt=t=>Ie.after("getPredicateSections",p.findByDisplayName("SettingsView").prototype,(e,s)=>{if(s[1].label!=be.USER_SETTINGS_MY_ACCOUNT)return;let n=s.findIndex(r=>r.label=="Cumcord")+2;return s.splice(n,0,{section:"ysink_zone_CUMZONE",label:"The Cum Zone",element:()=>h.React.createElement(Ht,{nest:t})}),s}),Jt=t=>{if(!!window.commandPalette)return commandPalette.registerEntry("ysink_cumzone_installPlugin","Cum Zone","Install a plugin",()=>{let e=t.ghost.repos,s=ie(e).filter(n=>Object.values(U.installed.ghost).find(r=>r.manifest.hash==n.hash)==null);commandPalette.openPalette("Which plugin to install?",s.map(n=>({id:n.url,label:n.name,source:n.repo.name,action:()=>U.importPlugin(new URL(n.url,n.repo.url).href)})))},"\u{1F4E6}"),()=>commandPalette.unregisterSource("Cum Zone")},Qt=({persist:t})=>{let e=[Te(),Jt(t),Zt(t)];return Array.isArray(t.ghost.repos)||ne(t.store),{onUnload:()=>e.forEach(s=>s?.())}};return Qt})(cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common.i18n.Messages,cumcord.utils,cumcord.ui.components,cumcord.modules.common,cumcord.plugins,cumcord.ui.toasts);
