(function(y,W,h,Ue,se,ze,Ke,He,re,We){"use strict";function ie(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var $=ie(Ue),Ge=ie(We),Ve=()=>cumcord.patcher.injectCSS(".ysink_palette_modal{position:absolute;top:5rem;left:0;width:100vw;display:flex;align-items:center;background:none!important;box-shadow:none!important}.ysink_palette_modal.ysink_palette_textentrymodal{min-height:0}.ysink_palette_palette{width:50rem;background-color:var(--background-secondary);color:#fff;padding:.75rem 0 0;border-radius:0;overflow:unset!important}.ysink_palette_item{padding:.3rem 1rem .3rem .5rem;transition:background-color .15s;display:flex}.ysink_palette_icon{width:1.5rem;display:inline-block;text-align:center}.ysink_palette_icon_container{width:1.5rem;display:inline-flex;justify-content:center}.ysink_palette_icon_container>img{height:1rem}.ysink_palette_iconseparator{border:solid 1px #ffffff55;margin:-.3rem .5rem}.ysink_palette_item.ysink_palette_selected{background-color:#0005}.ysink_palette_input_wrapper{margin:0 .5rem 1rem;border:#ffffff33 solid 1px;display:flex;align-items:center;padding-left:.5rem}.ysink_palette_input{flex:1;margin-left:.5rem}.ysink_palette_input input{border:none!important;background:none!important;padding:0!important}.ysink_palette_source{text-transform:uppercase;font-style:italic;color:#aaa}.ysink_palette_scrollcontainer{overflow:hidden scroll;max-height:30rem;padding-bottom:.75rem}.ysink_palette_scrollcontainer::-webkit-scrollbar{width:1rem;background-color:#0003}.ysink_palette_scrollcontainer::-webkit-scrollbar-thumb{background-color:#fff3;min-height:40px}.ysink_palette_md{margin:0 .5rem 1rem;padding:.5rem;background-color:#fff1;border:1px solid #ffffff33}.ysink_palette_md>*>:last-child{margin-bottom:0}"),Ye=({entry:t,selected:e,id:n,icon:s,finish:r,hover:i})=>{s||(s="");let o=!1;try{new URL(s),o=!0}catch{}return h.React.createElement("div",{className:e?"ysink_palette_item ysink_palette_selected":"ysink_palette_item",id:n,onClick:r,onMouseOver:i},o?h.React.createElement("div",{className:"ysink_palette_icon_container"},h.React.createElement("img",{src:s})):h.React.createElement("span",{className:"ysink_palette_icon"},s),h.React.createElement("span",{className:"ysink_palette_iconseparator"}),t.label,h.React.createElement("div",{style:{flex:1}}),h.React.createElement("span",{className:"ysink_palette_source"},t.source))};const Je=y.findByProps("rules");var oe=({children:t})=>h.React.createElement("div",{class:"ysink_palette_md"},h.React.createElement(Je,null,t));function R(t){return Array.isArray?Array.isArray(t):le(t)==="[object Array]"}const Qe=1/0;function Xe(t){if(typeof t=="string")return t;let e=t+"";return e=="0"&&1/t==-Qe?"-0":e}function Ze(t){return t==null?"":Xe(t)}function v(t){return typeof t=="string"}function ce(t){return typeof t=="number"}function qe(t){return t===!0||t===!1||et(t)&&le(t)=="[object Boolean]"}function ae(t){return typeof t=="object"}function et(t){return ae(t)&&t!==null}function M(t){return t!=null}function G(t){return!t.trim().length}function le(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const En="Extended search is not available",tt="Incorrect 'index' type",nt=t=>`Invalid value for key ${t}`,st=t=>`Pattern length exceeds max of ${t}.`,rt=t=>`Missing ${t} property in key`,it=t=>`Property 'weight' in key '${t}' must be a positive integer`,ue=Object.prototype.hasOwnProperty;class ot{constructor(e){this._keys=[],this._keyMap={};let n=0;e.forEach(s=>{let r=de(s);n+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,n+=r.weight}),this._keys.forEach(s=>{s.weight/=n})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function de(t){let e=null,n=null,s=null,r=1;if(v(t)||R(t))s=t,e=he(t),n=V(t);else{if(!ue.call(t,"name"))throw new Error(rt("name"));const i=t.name;if(s=i,ue.call(t,"weight")&&(r=t.weight,r<=0))throw new Error(it(i));e=he(i),n=V(i)}return{path:e,id:n,weight:r,src:s}}function he(t){return R(t)?t:t.split(".")}function V(t){return R(t)?t.join("."):t}function ct(t,e){let n=[],s=!1;const r=(i,o,c)=>{if(!!M(i))if(!o[c])n.push(i);else{let a=o[c];const u=i[a];if(!M(u))return;if(c===o.length-1&&(v(u)||ce(u)||qe(u)))n.push(Ze(u));else if(R(u)){s=!0;for(let l=0,d=u.length;l<d;l+=1)r(u[l],o,c+1)}else o.length&&r(u,o,c+1)}};return r(t,v(e)?e.split("."):e,0),s?n:n[0]}var f={...{isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1},...{includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},...{location:0,threshold:.6,distance:100},...{useExtendedSearch:!1,getFn:ct,ignoreLocation:!1,ignoreFieldNorm:!1}};const at=/[^ ]+/g;function lt(t=3){const e=new Map,n=Math.pow(10,t);return{get(s){const r=s.match(at).length;if(e.has(r))return e.get(r);const i=1/Math.sqrt(r),o=parseFloat(Math.round(i*n)/n);return e.set(r,o),o},clear(){e.clear()}}}class Y{constructor({getFn:e=f.getFn}={}){this.norm=lt(3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((n,s)=>{this._keysMap[n.id]=s})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,v(this.docs[0])?this.docs.forEach((e,n)=>{this._addString(e,n)}):this.docs.forEach((e,n)=>{this._addObject(e,n)}),this.norm.clear())}add(e){const n=this.size();v(e)?this._addString(e,n):this._addObject(e,n)}removeAt(e){this.records.splice(e,1);for(let n=e,s=this.size();n<s;n+=1)this.records[n].i-=1}getValueForItemAtKeyId(e,n){return e[this._keysMap[n]]}size(){return this.records.length}_addString(e,n){if(!M(e)||G(e))return;let s={v:e,i:n,n:this.norm.get(e)};this.records.push(s)}_addObject(e,n){let s={i:n,$:{}};this.keys.forEach((r,i)=>{let o=this.getFn(e,r.path);if(!!M(o)){if(R(o)){let c=[];const a=[{nestedArrIndex:-1,value:o}];for(;a.length;){const{nestedArrIndex:u,value:l}=a.pop();if(!!M(l))if(v(l)&&!G(l)){let d={v:l,i:u,n:this.norm.get(l)};c.push(d)}else R(l)&&l.forEach((d,p)=>{a.push({nestedArrIndex:p,value:d})})}s.$[i]=c}else if(!G(o)){let c={v:o,n:this.norm.get(o)};s.$[i]=c}}}),this.records.push(s)}toJSON(){return{keys:this.keys,records:this.records}}}function fe(t,e,{getFn:n=f.getFn}={}){const s=new Y({getFn:n});return s.setKeys(t.map(de)),s.setSources(e),s.create(),s}function ut(t,{getFn:e=f.getFn}={}){const{keys:n,records:s}=t,r=new Y({getFn:e});return r.setKeys(n),r.setIndexRecords(s),r}function U(t,{errors:e=0,currentLocation:n=0,expectedLocation:s=0,distance:r=f.distance,ignoreLocation:i=f.ignoreLocation}={}){const o=e/t.length;if(i)return o;const c=Math.abs(s-n);return r?o+c/r:c?1:o}function dt(t=[],e=f.minMatchCharLength){let n=[],s=-1,r=-1,i=0;for(let o=t.length;i<o;i+=1){let c=t[i];c&&s===-1?s=i:!c&&s!==-1&&(r=i-1,r-s+1>=e&&n.push([s,r]),s=-1)}return t[i-1]&&i-s>=e&&n.push([s,i-1]),n}const A=32;function ht(t,e,n,{location:s=f.location,distance:r=f.distance,threshold:i=f.threshold,findAllMatches:o=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,includeMatches:a=f.includeMatches,ignoreLocation:u=f.ignoreLocation}={}){if(e.length>A)throw new Error(st(A));const l=e.length,d=t.length,p=Math.max(0,Math.min(s,d));let m=i,_=p;const g=c>1||a,E=g?Array(d):[];let w;for(;(w=t.indexOf(e,_))>-1;){let I=U(e,{currentLocation:w,expectedLocation:p,distance:r,ignoreLocation:u});if(m=Math.min(I,m),_=w+l,g){let P=0;for(;P<l;)E[w+P]=1,P+=1}}_=-1;let N=[],B=1,K=l+d;const _n=1<<l-1;for(let I=0;I<l;I+=1){let P=0,C=K;for(;P<C;)U(e,{errors:I,currentLocation:p+C,expectedLocation:p,distance:r,ignoreLocation:u})<=m?P=C:K=C,C=Math.floor((K-P)/2+P);K=C;let Fe=Math.max(1,p-C+1),ne=o?d:Math.min(p+C,d)+l,O=Array(ne+2);O[ne+1]=(1<<I)-1;for(let x=ne;x>=Fe;x-=1){let H=x-1,je=n[t.charAt(H)];if(g&&(E[H]=+!!je),O[x]=(O[x+1]<<1|1)&je,I&&(O[x]|=(N[x+1]|N[x])<<1|1|N[x+1]),O[x]&_n&&(B=U(e,{errors:I,currentLocation:H,expectedLocation:p,distance:r,ignoreLocation:u}),B<=m)){if(m=B,_=H,_<=p)break;Fe=Math.max(1,2*p-_)}}if(U(e,{errors:I+1,currentLocation:p,expectedLocation:p,distance:r,ignoreLocation:u})>m)break;N=O}const te={isMatch:_>=0,score:Math.max(.001,B)};if(g){const I=dt(E,c);I.length?a&&(te.indices=I):te.isMatch=!1}return te}function ft(t){let e={};for(let n=0,s=t.length;n<s;n+=1){const r=t.charAt(n);e[r]=(e[r]||0)|1<<s-n-1}return e}class pe{constructor(e,{location:n=f.location,threshold:s=f.threshold,distance:r=f.distance,includeMatches:i=f.includeMatches,findAllMatches:o=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:a=f.isCaseSensitive,ignoreLocation:u=f.ignoreLocation}={}){if(this.options={location:n,threshold:s,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:u},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;const l=(p,m)=>{this.chunks.push({pattern:p,alphabet:ft(p),startIndex:m})},d=this.pattern.length;if(d>A){let p=0;const m=d%A,_=d-m;for(;p<_;)l(this.pattern.substr(p,A),p),p+=A;if(m){const g=d-A;l(this.pattern.substr(g),g)}}else l(this.pattern,0)}searchIn(e){const{isCaseSensitive:n,includeMatches:s}=this.options;if(n||(e=e.toLowerCase()),this.pattern===e){let _={isMatch:!0,score:0};return s&&(_.indices=[[0,e.length-1]]),_}const{location:r,distance:i,threshold:o,findAllMatches:c,minMatchCharLength:a,ignoreLocation:u}=this.options;let l=[],d=0,p=!1;this.chunks.forEach(({pattern:_,alphabet:g,startIndex:E})=>{const{isMatch:w,score:N,indices:B}=ht(e,_,g,{location:r+E,distance:i,threshold:o,findAllMatches:c,minMatchCharLength:a,includeMatches:s,ignoreLocation:u});w&&(p=!0),d+=N,w&&B&&(l=[...l,...B])});let m={isMatch:p,score:p?d/this.chunks.length:1};return p&&s&&(m.indices=l),m}}class S{constructor(e){this.pattern=e}static isMultiMatch(e){return ge(e,this.multiRegex)}static isSingleMatch(e){return ge(e,this.singleRegex)}search(){}}function ge(t,e){const n=t.match(e);return n?n[1]:null}class pt extends S{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){const n=e===this.pattern;return{isMatch:n,score:n?0:1,indices:[0,this.pattern.length-1]}}}class gt extends S{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){const s=e.indexOf(this.pattern)===-1;return{isMatch:s,score:s?0:1,indices:[0,e.length-1]}}}class yt extends S{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){const n=e.startsWith(this.pattern);return{isMatch:n,score:n?0:1,indices:[0,this.pattern.length-1]}}}class mt extends S{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){const n=!e.startsWith(this.pattern);return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}}class _t extends S{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){const n=e.endsWith(this.pattern);return{isMatch:n,score:n?0:1,indices:[e.length-this.pattern.length,e.length-1]}}}class Et extends S{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){const n=!e.endsWith(this.pattern);return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}}class ye extends S{constructor(e,{location:n=f.location,threshold:s=f.threshold,distance:r=f.distance,includeMatches:i=f.includeMatches,findAllMatches:o=f.findAllMatches,minMatchCharLength:c=f.minMatchCharLength,isCaseSensitive:a=f.isCaseSensitive,ignoreLocation:u=f.ignoreLocation}={}){super(e);this._bitapSearch=new pe(e,{location:n,threshold:s,distance:r,includeMatches:i,findAllMatches:o,minMatchCharLength:c,isCaseSensitive:a,ignoreLocation:u})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}}class me extends S{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let n=0,s;const r=[],i=this.pattern.length;for(;(s=e.indexOf(this.pattern,n))>-1;)n=s+i,r.push([s,n-1]);const o=!!r.length;return{isMatch:o,score:o?0:1,indices:r}}}const J=[pt,me,yt,mt,Et,_t,gt,ye],_e=J.length,Mt=/ +(?=([^\"]*\"[^\"]*\")*[^\"]*$)/,It="|";function kt(t,e={}){return t.split(It).map(n=>{let s=n.trim().split(Mt).filter(i=>i&&!!i.trim()),r=[];for(let i=0,o=s.length;i<o;i+=1){const c=s[i];let a=!1,u=-1;for(;!a&&++u<_e;){const l=J[u];let d=l.isMultiMatch(c);d&&(r.push(new l(d,e)),a=!0)}if(!a)for(u=-1;++u<_e;){const l=J[u];let d=l.isSingleMatch(c);if(d){r.push(new l(d,e));break}}}return r})}const wt=new Set([ye.type,me.type]);class xt{constructor(e,{isCaseSensitive:n=f.isCaseSensitive,includeMatches:s=f.includeMatches,minMatchCharLength:r=f.minMatchCharLength,ignoreLocation:i=f.ignoreLocation,findAllMatches:o=f.findAllMatches,location:c=f.location,threshold:a=f.threshold,distance:u=f.distance}={}){this.query=null,this.options={isCaseSensitive:n,includeMatches:s,minMatchCharLength:r,findAllMatches:o,ignoreLocation:i,location:c,threshold:a,distance:u},this.pattern=n?e:e.toLowerCase(),this.query=kt(this.pattern,this.options)}static condition(e,n){return n.useExtendedSearch}searchIn(e){const n=this.query;if(!n)return{isMatch:!1,score:1};const{includeMatches:s,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let i=0,o=[],c=0;for(let a=0,u=n.length;a<u;a+=1){const l=n[a];o.length=0,i=0;for(let d=0,p=l.length;d<p;d+=1){const m=l[d],{isMatch:_,indices:g,score:E}=m.search(e);if(_){if(i+=1,c+=E,s){const w=m.constructor.type;wt.has(w)?o=[...o,...g]:o.push(g)}}else{c=0,i=0,o.length=0;break}}if(i){let d={isMatch:!0,score:c/i};return s&&(d.indices=o),d}}return{isMatch:!1,score:1}}}const Q=[];function Rt(...t){Q.push(...t)}function X(t,e){for(let n=0,s=Q.length;n<s;n+=1){let r=Q[n];if(r.condition(t,e))return new r(t,e)}return new pe(t,e)}const T={AND:"$and",OR:"$or"},Z={PATH:"$path",PATTERN:"$val"},q=t=>!!(t[T.AND]||t[T.OR]),vt=t=>!!t[Z.PATH],St=t=>!R(t)&&ae(t)&&!q(t),Ee=t=>({[T.AND]:Object.keys(t).map(e=>({[e]:t[e]}))});function Me(t,e,{auto:n=!0}={}){const s=r=>{let i=Object.keys(r);const o=vt(r);if(!o&&i.length>1&&!q(r))return s(Ee(r));if(St(r)){const a=o?r[Z.PATH]:i[0],u=o?r[Z.PATTERN]:r[a];if(!v(u))throw new Error(nt(a));const l={keyId:V(a),pattern:u};return n&&(l.searcher=X(u,e)),l}let c={children:[],operator:i[0]};return i.forEach(a=>{const u=r[a];R(u)&&u.forEach(l=>{c.children.push(s(l))})}),c};return q(t)||(t=Ee(t)),s(t)}function bt(t,{ignoreFieldNorm:e=f.ignoreFieldNorm}){t.forEach(n=>{let s=1;n.matches.forEach(({key:r,norm:i,score:o})=>{const c=r?r.weight:null;s*=Math.pow(o===0&&c?Number.EPSILON:o,(c||1)*(e?1:i))}),n.score=s})}function Pt(t,e){const n=t.matches;e.matches=[],!!M(n)&&n.forEach(s=>{if(!M(s.indices)||!s.indices.length)return;const{indices:r,value:i}=s;let o={indices:r,value:i};s.key&&(o.key=s.key.src),s.idx>-1&&(o.refIndex=s.idx),e.matches.push(o)})}function Ct(t,e){e.score=t.score}function $t(t,e,{includeMatches:n=f.includeMatches,includeScore:s=f.includeScore}={}){const r=[];return n&&r.push(Pt),s&&r.push(Ct),t.map(i=>{const{idx:o}=i,c={item:e[o],refIndex:o};return r.length&&r.forEach(a=>{a(i,c)}),c})}class L{constructor(e,n={},s){this.options={...f,...n},this.options.useExtendedSearch,this._keyStore=new ot(this.options.keys),this.setCollection(e,s)}setCollection(e,n){if(this._docs=e,n&&!(n instanceof Y))throw new Error(tt);this._myIndex=n||fe(this.options.keys,this._docs,{getFn:this.options.getFn})}add(e){!M(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){const n=[];for(let s=0,r=this._docs.length;s<r;s+=1){const i=this._docs[s];e(i,s)&&(this.removeAt(s),s-=1,r-=1,n.push(i))}return n}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:n=-1}={}){const{includeMatches:s,includeScore:r,shouldSort:i,sortFn:o,ignoreFieldNorm:c}=this.options;let a=v(e)?v(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return bt(a,{ignoreFieldNorm:c}),i&&a.sort(o),ce(n)&&n>-1&&(a=a.slice(0,n)),$t(a,this._docs,{includeMatches:s,includeScore:r})}_searchStringList(e){const n=X(e,this.options),{records:s}=this._myIndex,r=[];return s.forEach(({v:i,i:o,n:c})=>{if(!M(i))return;const{isMatch:a,score:u,indices:l}=n.searchIn(i);a&&r.push({item:i,idx:o,matches:[{score:u,value:i,norm:c,indices:l}]})}),r}_searchLogical(e){const n=Me(e,this.options),s=(c,a,u)=>{if(!c.children){const{keyId:l,searcher:d}=c,p=this._findMatches({key:this._keyStore.get(l),value:this._myIndex.getValueForItemAtKeyId(a,l),searcher:d});return p&&p.length?[{idx:u,item:a,matches:p}]:[]}switch(c.operator){case T.AND:{const l=[];for(let d=0,p=c.children.length;d<p;d+=1){const m=c.children[d],_=s(m,a,u);if(_.length)l.push(..._);else return[]}return l}case T.OR:{const l=[];for(let d=0,p=c.children.length;d<p;d+=1){const m=c.children[d],_=s(m,a,u);if(_.length){l.push(..._);break}}return l}}},r=this._myIndex.records,i={},o=[];return r.forEach(({$:c,i:a})=>{if(M(c)){let u=s(n,c,a);u.length&&(i[a]||(i[a]={idx:a,item:c,matches:[]},o.push(i[a])),u.forEach(({matches:l})=>{i[a].matches.push(...l)}))}}),o}_searchObjectList(e){const n=X(e,this.options),{keys:s,records:r}=this._myIndex,i=[];return r.forEach(({$:o,i:c})=>{if(!M(o))return;let a=[];s.forEach((u,l)=>{a.push(...this._findMatches({key:u,value:o[l],searcher:n}))}),a.length&&i.push({idx:c,item:o,matches:a})}),i}_findMatches({key:e,value:n,searcher:s}){if(!M(n))return[];let r=[];if(R(n))n.forEach(({v:i,i:o,n:c})=>{if(!M(i))return;const{isMatch:a,score:u,indices:l}=s.searchIn(i);a&&r.push({score:u,key:e,value:i,idx:o,norm:c,indices:l})});else{const{v:i,n:o}=n,{isMatch:c,score:a,indices:u}=s.searchIn(i);c&&r.push({score:a,key:e,value:i,norm:o,indices:u})}return r}}L.version="6.4.6",L.createIndex=fe,L.parseIndex=ut,L.config=f,L.parseQuery=Me,Rt(xt);const At=t=>{let e=t.filter(r=>!r.id),[n,s]=e.reduce((r,i)=>(i.source!="Built In"?r[0].push(i):r[1].push(i),r),[[],[]]);if(s.length!=0)throw`One or more built-in entries had no ID. Please ping Yellowsink constantly with this:

\`\`\`
${s.map(r=>r.label).join(`
`)}
\`\`\``;if(n.length!=0)throw`One or more custom entries had no ID. Please disable the following entry sources:

\`\`\`
${n.map(r=>r.source).join(`
`)}
\`\`\`

The devs of those sources would likely appreciate this info too:

\`\`\`
${n.map(r=>r.label).join(`
`)}
\`\`\``},Ie=(t,e)=>{let n=[];return e.forEach((s,r)=>{let i=t.findIndex(o=>o.id==r);i!=-1&&(n.push([t[i],s]),t.splice(i,1))}),n=n.sort((s,r)=>r[1]-s[1]).map(s=>s[0]),n.concat(t)},Bt=(t,e)=>(At(t),L(t,{threshold:.5,useExtendedSearch:!0,keys:["label","id"]}).search(e).map(s=>s.item));var Lt=(t,e,n)=>{if(!n||n=="")return Ie(t,e);let s=Bt(t,n);return Ie(s,e)};const z=y.findByProps("ModalCloseButton"),ke=y.findByProps("Sizes","Tags"),we=y.findByDisplayName("Flex"),{openModal:Nt}=y.findByProps("openModalLazy"),Ot=y.findByDisplayName("FormSection");y.findByProps("Sizes","Colors","Looks","DropdownSizes");const Tt=y.findByProps("rules"),Dt=({err:t,e})=>h.React.createElement(W.ErrorBoundary,null,h.React.createElement(z.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_errormodal"},h.React.createElement(z.ModalHeader,{separator:!1},h.React.createElement(we.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},h.React.createElement(ke,{tag:"h2",size:ke.Sizes.SIZE_20},"We screwed up!!!")),h.React.createElement(we.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},h.React.createElement(z.ModalCloseButton,{onClick:e.onClose}))),h.React.createElement(z.ModalContent,null,h.React.createElement(Ot,null,h.React.createElement(Tt,null,t)))));var Ft=t=>Nt(e=>h.React.createElement(Dt,{e,err:t}));const jt=h.React.useState,{openModal:Ut}=y.findByProps("openModalLazy"),xe=y.findByProps("ModalCloseButton"),zt=y.findByDisplayName("TextInput"),Kt=({e:t,prompt:e,nest:n,defaultEntries:s,closeAction:r,markdown:i})=>{let[o,c]=jt({selected:0,search:""}),a=n?s.concat(n.ghost.customEntries):s,u=n?n.ghost.usageCounts:new Map;const l=g=>{let E=o.selected;c({selected:E,search:g})},d=g=>{let E=o.search;c({selected:g,search:E})};let p=[];try{p=Lt(a,u,o.search)}catch(g){l(""),Ft(g)}const m=()=>{t.onClose();let g=p[o.selected];if(n){let E=n.ghost.usageCounts,w=E.get(g.id)??0;E.set(g.id,w+1),n.store.usageCounts=E}g.action()},_=g=>{switch(g.which){case 38:o.selected>0?d(o.selected-1):d(p.length-1);break;case 40:o.selected<p.length-1?d(o.selected+1):d(0);break;case 13:m();break;default:document.getElementsByClassName("ysink_palette_input")[0].children[0].focus();break}document.getElementById(`palette_item_${o.selected}`)?.scrollIntoView(!1)};return t.transitionState==3&&r&&r(),h.React.createElement(W.ErrorBoundary,null,h.React.createElement(xe.ModalRoot,{transitionState:t.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:_},h.React.createElement(xe.ModalContent,{className:"ysink_palette_palette"},i?h.React.createElement(oe,null,i):[],h.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",h.React.createElement(zt,{className:"ysink_palette_input",placeholder:e??"Search Actions",type:"text",value:o.search,onChange:g=>l(g)})),h.React.createElement("div",{className:"ysink_palette_scrollcontainer"},p.filter(g=>g&&(g.condition?.()??!0)).map((g,E)=>h.React.createElement(Ye,{entry:g,id:`palette_item_${E}`,selected:E==o.selected,icon:g.icon,hover:()=>d(E),finish:m}))))))};let b=(t,e,n,s,r)=>Ut(i=>h.React.createElement(Kt,{e:i,prompt:t,nest:e,defaultEntries:n,closeAction:r,markdown:s})),Ht=(t,e,n)=>new Promise((s,r)=>{b(t,null,e.map(i=>({label:i,action:()=>s(i)})),n,()=>r("user closed palette"))});const Wt="\u{1F389} Welcome to **Command Palette**! \u{1F389} Start typing to pick an item from the list, or visit the API Docs to start building custom actions at https://yellowsink.github.io/cc-plugins/palette-docs";var Gt=(t,e)=>{let n=s=>{if(!t.ghost.pickingBind)return;let r=t.ghost.keyBind;if((s.ctrlKey||s.metaKey)==r.ctrlMeta&&s.shiftKey==r.shift&&s.which==r.code){let o=t.ghost.doNotShowWelcome?null:Wt;b(null,t,e,o),t.store.doNotShowWelcome=!0}};return document.addEventListener("keyup",n),()=>{document.removeEventListener("keyup",n)}};const{getGuildPermissions:Vt}=y.findByProps("getGuildPermissions"),{getLastSelectedGuildId:k}=y.findByProps("getLastSelectedGuildId"),Re=(t,e)=>{let n=Vt({id:t});return!!(n&&(n&e)!=0)},Yt=()=>Re(k(),BigInt(4)),Jt=()=>Re(k(),BigInt(2)),Qt=h.React.useState,{openModal:Xt}=y.findByProps("openModalLazy"),ve=y.findByProps("ModalCloseButton"),Zt=y.findByDisplayName("TextInput"),qt=({e:t,prompt:e,finishAction:n,closeAction:s,markdown:r})=>{let[i,o]=Qt("");return h.React.createElement(W.ErrorBoundary,null,h.React.createElement(ve.ModalRoot,{transitionState:t.transitionState,size:"small",className:"ysink_palette_modal ysink_palette_textentrymodal",onKeyDown:c=>{c.which==13&&(t.onClose(),n(i))}},h.React.createElement(ve.ModalContent,{className:"ysink_palette_palette"},r?h.React.createElement(oe,null,r):[],h.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",h.React.createElement(Zt,{className:"ysink_palette_input",placeholder:e,type:"text",value:i,onChange:c=>o(c),onBlur:()=>s()})))))},D=(t,e,n,s)=>Xt(r=>h.React.createElement(qt,{e:r,prompt:t,finishAction:e,markdown:n,closeAction:s})),Se=(t,e)=>new Promise((n,s)=>{D(t,n,e,()=>s("user closed textentry"))}),{getMembers:be}=y.findByProps("getMembers"),{getUser:Pe}=y.findByProps("getUser"),{banUser:en,kickUser:tn}=y.findByProps("banUser"),Ce="Built In",$e="\u{1F6E0}";var nn=[{source:Ce,icon:$e,id:"moderation_banuser",label:"Ban user from current guild",condition:Yt,action:async()=>{b("Which user to ban?",null,await Promise.all(be(k()).map(async t=>{let e=await Pe(t.userId),n=t.nick?`[${t.nick}]`:"";return{id:t.userId,label:`${e.username}#${e.discriminator} ${n} (${t.userId})`,icon:`https://cdn.discordapp.com/avatars/${t.userId}/${e.avatar}.webp`,action:()=>D("Enter ban reason",s=>{en(k(),t.userId,null,s)})}})))}},{source:Ce,icon:$e,id:"moderation_kickuser",label:"Kick user from current guild",condition:Jt,action:async()=>{b("Which user to kick?",null,await Promise.all(be(k()).map(async t=>{let e=await Pe(t.userId),n=t.nick?`[${t.nick}]`:"";return{id:t.userId,label:`${e.username}#${e.discriminator} ${n} (${t.userId})`,icon:`https://cdn.discordapp.com/avatars/${t.userId}/${e.avatar}.webp`,action:()=>D("Enter kick reason",s=>{tn(k(),t.userId,s)})}})))}}];const F="Built In",j="\u{1F4A7}";var sn=[{source:F,icon:j,id:"cumcord_installplug",label:"Install plugin from URL",action:async()=>{try{let t=await Se("Enter URL");await $.default.importPlugin(t),se.showToast({title:"Installed plugin",duration:3e3})}catch{}}},{source:F,icon:j,id:"cumcord_removeplug",label:"Remove plugin",action:()=>{let t=Object.keys($.default.installed.ghost).map(e=>[e,$.default.installed.ghost[e]]);b("Choose plugin to remove",null,t.map(e=>({id:e[0],label:e[1].manifest.name,action:()=>$.default.removePlugin(e[0])})))}},{source:F,icon:j,id:"cumcord_toggleplug",label:"Toggle plugin",action:()=>{let t=Object.keys($.default.installed.ghost).map(e=>[e,$.default.installed.ghost[e]]);b("Choose plugin to toggle",null,t.map(e=>({id:e[0],label:(e[1].enabled?"\u{1F7E2} ":"\u{1F534} ")+e[1].manifest.name,action:()=>$.default.togglePlugin(e[0])})))}},{source:F,icon:j,id:"cumcord_uninject",label:"Uninject Cumcord",action:()=>setTimeout(async()=>{await ze.showConfirmationModal({header:"Really uninject Cumcord?",content:"This will disable all of your plugins, and Cumcord will be completely removed",type:"danger",confirmText:"Uninject",cancelText:"Actually, never mind"})&&Ke.uninject()},500)},{source:F,icon:j,id:"cumcord_toggle_dev",label:"Toggle DevMode",action:He.toggleDevMode}];const Ae="Built In",Be="\u267B";var rn=[{source:Ae,icon:Be,id:"reboot_reload",label:"Reload Discord",action:()=>window.location.reload()},{source:Ae,icon:Be,id:"reboot_relaunch",label:"Relaunch Discord to updater",condition:()=>window.DiscordNative,action:()=>window.DiscordNative.app.relaunch()}];const{getMembers:on}=y.findByProps("getMembers"),{getUser:cn}=y.findByProps("getUser"),{openUserProfileModal:Le}=y.findByProps("openUserProfileModal"),Ne="Built In",Oe="\u{1F680}";var an=[{source:Ne,icon:Oe,id:"navigate_user_profile_id",label:"Open user profile by ID",action:()=>{D("Enter user ID",t=>{setTimeout(()=>{try{Le({userId:t})}catch{se.showToast({title:"Failed! - Is the user ID correct?",duration:3e3})}},200)})}},{source:Ne,icon:Oe,id:"navigate_user_profile_server",label:"Open user profile from current server",action:async()=>{b("Which profile to open?",null,await Promise.all(on(k()).map(async t=>{let e=await cn(t.userId),n=t.nick?`[${t.nick}]`:"";return{id:t.userId,label:`${e.username}#${e.discriminator} ${n} (${t.userId})`,icon:`https://cdn.discordapp.com/avatars/${t.userId}/${e.avatar}.webp`,action:()=>setTimeout(()=>Le({userId:t.userId}),200)}})))}}];const{updateChannelOverrideSettings:ln}=y.findByProps("updateChannelOverrideSettings"),{getCurrentChannelSettings:un}=y.findByProps("getCurrentChannelSettings"),{getChannelId:Te}=y.findByProps("getChannelId","getVoiceChannelId"),{updateGuildNotificationSettings:dn}=y.findByProps("updateGuildNotificationSettings"),{isMuted:hn}=y.findByProps("getMuteConfig"),De="Built In";var fn=[{source:De,icon:"\u{1F507}",id:"misc_toggle_channel_mute",label:"Toggle current channel mute",action:()=>{let t=un(k(),Te()).channel_is_muted;ln(k(),Te(),{muted:!t,suppress_everyone:!t,suppress_roles:!t})}},{source:De,icon:"\u{1F507}",id:"misc_toggle_guild_mute",label:"Toggle current guild mute",action:()=>{let t=hn(k());dn(k(),{muted:!t,suppress_everyone:!t,suppress_roles:!t})}}];const pn="Built In",ee=nn.concat(sn).concat(rn).concat(an).concat(fn);var gn=t=>(window.commandPalette={openPalette:(e,n,s)=>{b(e,null,n,s)},openPaletteAsync:Ht,openTextEntry:(e,n,s)=>D(e,n),openTextEntryAsync:Se,registerEntry(e,n,s,r,i,o){if(!n||n=="")throw"Register failed: Please supply an ID (string) for your entry";if(!e||e=="")throw"Register failed: Please identify a source (string) for your entry";if(!s||s=="")throw"Register failed: Please supply a label (string) for your entry";if(!i)throw"Register failed: Please supply an action (JS function) for your entry";if(e==pn)throw"Register failed: That source is reserved for built in entries";if(ee.find(a=>a.id==n)!=null)throw"Register failed: Entry ID taken by a built in entry";let c=t.ghost.customEntries.findIndex(a=>a.id==n);if(c!=-1)throw`Register failed: Entry ID taken by entry from source ${t.ghost.customEntries[c].source}`;t.ghost.customEntries.push({id:n,source:e,label:s,action:i,icon:r,console})},unregisterEntry(e,n){if(!n||n=="")throw"Unregister failed: Please supply an ID (string) to deregister";if(!e||e=="")throw"Unregister failed: Please identify your source (string)";let s=t.ghost.customEntries,r=s.findIndex(o=>o.id==n);if(r==-1)throw"Unregister failed: No entry with that ID could be found";if(s[r].source!=e)throw"Unregister failed: An entry with that ID was found, but was not from your source";let i=s[r];return s.splice(r,1),t.store.customEntries=s,i},unregisterSource(e){let n=t.ghost.customEntries,s=n.filter(r=>r.source!=e);if(s.length!=n.length)return t.store.customEntries=s,n.filter(r=>r.source==e)},getEntries:()=>ee.concat(t.ghost.customEntries)},re.log("|| COMMAND PALETTE || Initialised window.commandPalette API"),()=>{window.commandPalette=void 0,delete window.commandPalette,re.log("|| COMMAND PALETTE || Disposed window.commandPalette API")}),yn=({persist:t})=>h.React.createElement("div",null,h.React.createElement("div",null,"keycode: ",t.store.keyBind.code),h.React.createElement("div",null,h.React.createElement("input",{type:"checkbox",onClick:()=>!1,checked:t.store.keyBind.shift}),h.React.createElement("span",null,"shift")),h.React.createElement("div",null,h.React.createElement("input",{type:"checkbox",onClick:()=>!1,checked:t.store.keyBind.ctrlMeta}),h.React.createElement("span",null,"ctrl / meta / \u2318"))),mn=({persist:t,id:e})=>{t.store.customEntries=[],t.ghost.usageCounts||(t.store.usageCounts=new Map),t.ghost.keyBind||(t.store.keyBinds={ctrlMeta:!0,shift:!0,code:80});let n=[Ve(),Gt(t,ee),gn(t)];return{onUnload:()=>{t.store.customEntries=[],delete t.store.customEntries,n.forEach(s=>s())},settings:Ge.default.createElement(yn,{persist:t})}};return mn})(cumcord.modules.webpack,cumcord.ui.components,cumcord.modules.common,cumcord.plugins,cumcord.ui.toasts,cumcord.ui.modals,cumcord,cumcord.dev,cumcord.utils.logger,cumcord.modules.common.React);
