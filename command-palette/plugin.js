(function(c,E,s,M,S,A,N,w){"use strict";function $(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var d=$(M),T=()=>cumcord.patcher.injectCSS(".ysink_palette_modal{position:absolute;top:5rem;left:0;width:100vw;display:flex;align-items:center;background:none!important;box-shadow:none!important}.ysink_palette_modal.ysink_palette_textentrymodal{min-height:0;height:4rem}.ysink_palette_palette{width:50rem;background-color:var(--background-secondary);color:#fff;padding:.75rem 0 0;border-radius:0;overflow:unset!important}.ysink_palette_item{padding:.3rem 1rem}.ysink_palette_item.ysink_palette_selected{background-color:#0005}.ysink_palette_input_wrapper{margin:0 .5rem 1rem;border:#ffffff33 solid 1px;display:flex;align-items:center;padding-left:.5rem}.ysink_palette_input{flex:1;margin-left:.5rem}.ysink_palette_input input{border:none!important;background:none!important;padding:0!important}.ysink_palette_source{text-transform:uppercase;font-style:italic;color:#aaa;float:right}.ysink_palette_scrollcontainer{overflow:hidden scroll;max-height:30rem;padding-bottom:.75rem}.ysink_palette_scrollcontainer::-webkit-scrollbar{width:1rem;background-color:#0003}.ysink_palette_scrollcontainer::-webkit-scrollbar-thumb{background-color:#fff3;min-height:40px}"),U=({entry:e,selected:t,id:n})=>s.React.createElement("div",{className:t?"ysink_palette_item ysink_palette_selected":"ysink_palette_item",id:n},e.label,s.React.createElement("span",{className:"ysink_palette_source"},e.source));const I=(e,t)=>{let n=[];return t.forEach((r,a)=>{let o=e.findIndex(l=>l.id==a);a!=-1&&(n.push([e[o],r]),e.splice(o,1))}),n=n.sort((r,a)=>a[1]-r[1]).map(r=>r[0]),n.concat(e)};var D=(e,t,n)=>{if(!n||n=="")return I(e,t);let r=e.filter(a=>a.label.toLowerCase().includes(n.toLowerCase())||a.id.toLowerCase().includes(n.toLowerCase()));return I(r,t)};const L=s.React.useState,{openModal:j}=c.findByProps("openModal"),P=c.findByProps("ModalCloseButton"),F=c.findByDisplayName("TextInput"),K=({e,prompt:t,nest:n,defaultEntries:r,closeAction:a})=>{let[o,l]=L({selected:0,search:""});const y=D(n?r.concat(n.ghost.customEntries):r,n?n.ghost.usageCounts:new Map,o.search),ae=i=>{let u=o.selected;l({selected:u,search:i})},h=i=>{let u=o.search;l({selected:i,search:u})},oe=i=>{switch(i.which){case 38:o.selected>0?h(o.selected-1):h(y.length-1);break;case 40:o.selected<y.length-1?h(o.selected+1):h(0);break;case 13:e.onClose();let u=y[o.selected];if(n){let k=n.ghost.usageCounts,se=k.get(u.id)??0;k.set(u.id,se+1),n.store.usageCounts=k}u.action();break;default:document.getElementsByClassName("ysink_palette_input")[0].children[0].focus();break}document.getElementById(`palette_item_${o.selected}`).scrollIntoView(!1)};return s.React.createElement(E.ErrorBoundary,null,s.React.createElement(P.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:oe,onBlur:()=>{a&&a()}},s.React.createElement(P.ModalContent,{className:"ysink_palette_palette"},s.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",s.React.createElement(F,{className:"ysink_palette_input",placeholder:t??"Search Actions",type:"text",value:o.search,onChange:i=>ae(i)})),s.React.createElement("div",{className:"ysink_palette_scrollcontainer"},y.filter(i=>!i.condition||i.condition()).map((i,u)=>s.React.createElement(U,{entry:i,id:`palette_item_${u}`,selected:u==o.selected}))))))};let p=(e,t,n,r)=>j(a=>s.React.createElement(K,{e:a,prompt:e,nest:t,defaultEntries:n,closeAction:r})),G=(e,t)=>new Promise((n,r)=>{p(e,null,t.map(a=>({label:a,action:()=>n(a)})),()=>r("user closed palette"))});var O=(e,t)=>{let n=r=>{(r.ctrlKey||r.metaKey)&&r.shiftKey&&r.which==80&&p(null,e,t)};return document.addEventListener("keyup",n),()=>{document.removeEventListener("keyup",n)}};const{getGuildPermissions:z}=c.findByProps("getGuildPermissions"),{getLastSelectedGuildId:m}=c.findByProps("getLastSelectedGuildId"),b=(e,t)=>{let n=z({id:e});return!!(n&&(n&t)!=0)},H=()=>b(m(),BigInt(4)),W=()=>b(m(),BigInt(2)),J=s.React.useState,{openModal:V}=c.findByProps("openModal"),C=c.findByProps("ModalCloseButton"),q=c.findByDisplayName("TextInput"),Q=({e,prompt:t,finishAction:n,closeAction:r})=>{let[a,o]=J("");return s.React.createElement(E.ErrorBoundary,null,s.React.createElement(C.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal ysink_palette_textentrymodal",onKeyDown:l=>{l.which==13&&(e.onClose(),n(a))}},s.React.createElement(C.ModalContent,{className:"ysink_palette_palette"},s.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",s.React.createElement(q,{className:"ysink_palette_input",placeholder:t,type:"text",value:a,onChange:l=>o(l),onBlur:()=>r()})))))},f=(e,t,n)=>V(r=>s.React.createElement(Q,{e:r,prompt:e,finishAction:t,closeAction:n})),v=e=>new Promise((t,n)=>{f(e,t,()=>n("user closed textentry"))}),{getMembers:R}=c.findByProps("getMembers"),{getUser:x}=c.findByProps("getUser"),{banUser:X,kickUser:Y}=c.findByProps("banUser"),B="Built In";var Z=[{source:B,id:"moderation_banuser",label:"\u{1F527} | Ban user from current guild",condition:H,action:()=>{p("Which user to ban?",null,R(m()).map(e=>{let t=x(e.userId),n=e.nick?`[${e.nick}]`:"";return{id:e.userId,label:`${t.username}#${t.discriminator} ${n} (${e.userId})`,action:()=>f("Enter ban reason",r=>{X(m(),e.userId,null,r)})}}))}},{source:B,id:"moderation_kickuser",label:"\u{1F527} | Kick user from current guild",condition:W,action:()=>{p("Which user to kick?",null,R(m()).map(e=>{let t=x(e.userId),n=e.nick?`[${e.nick}]`:"";return{id:e.userId,label:`${t.username}#${t.discriminator} ${n} (${e.userId})`,action:()=>f("Enter kick reason",r=>{Y(m(),e.userId,r)})}}))}}];const g="Built In";var ee=[{source:g,id:"cumcord_installplug",label:"\u{1F4A7} | Install plugin from URL",action:async()=>{try{let e=await v("Enter URL");await d.default.importPlugin(e),S.showToast({title:"Installed plugin",duration:3e3})}catch{}}},{source:g,id:"cumcord_removeplug",label:"\u{1F4A7} | Remove plugin",action:()=>{let e=Object.keys(d.default.installed.ghost).map(t=>[t,d.default.installed.ghost[t]]);p("Choose plugin to remove",null,e.map(t=>({id:t[0],label:t[1].manifest.name,action:()=>d.default.removePlugin(t[0])})))}},{source:g,id:"cumcord_toggleplug",label:"\u{1F4A7} | Toggle plugin",action:()=>{let e=Object.keys(d.default.installed.ghost).map(t=>[t,d.default.installed.ghost[t]]);p("Choose plugin to toggle",null,e.map(t=>({id:t[0],label:(t[1].enabled?"\u{1F7E2} ":"\u{1F534} ")+t[1].manifest.name,action:()=>d.default.togglePlugin(t[0])})))}},{source:g,id:"cumcord_uninject",label:"\u{1F4A7} | Uninject Cumcord",action:()=>setTimeout(async()=>{await A.showConfirmationModal({header:"Really uninject Cumcord?",content:"This will disable all of your plugins, and Cumcord will be completely removed",type:"danger",confirmText:"Uninject",cancelText:"Actually, never mind"})&&N.uninject()},500)}];const te="Built In",_=Z.concat(ee);var ne=e=>(window.commandPalette={openPalette:(t,n)=>{p(t,null,n)},openPaletteAsync:G,openTextEntry:(t,n)=>f(t,n),openTextEntryAsync:t=>v(t),registerEntry(t,n,r,a){if(!t||t=="")throw"Register failed: Please supply an ID (string) for your entry";if(!n||n=="")throw"Register failed: Please identify a source (string) for your entry";if(!r||r=="")throw"Register failed: Please supply a label (string) for your entry";if(!a)throw"Register failed: Please supply an action (JS function) for your entry";if(n==te)throw"Register failed: That source is reserved for built in entries";if(_.find(l=>l.id==t)!=null)throw"Register failed: Entry ID taken by a built in entry";let o=e.ghost.customEntries.findIndex(l=>l.id==t);if(o!=-1)throw`Register failed: Entry ID taken by entry from source ${e.ghost.customEntries[o].source}`;e.ghost.customEntries.push({id:t,source:n,label:r,action:a})},unregisterEntry(t,n){if(!t||t=="")throw"Unregister failed: Please supply an ID (string) to deregister";if(!n||n=="")throw"Unregister failed: Please identify your source (string)";let r=e.ghost.customEntries,a=r.findIndex(l=>l.id==t);if(a==-1)throw"Unregister failed: No entry with that ID could be found";if(r[a].source!=n)throw"Unregister failed: An entry with that ID was found, but was not from your source";let o=r[a];return r.splice(a,1),e.store.customEntries=r,o},unregisterSource(t){let n=e.ghost.customEntries,r=n.filter(a=>a.source!=t);if(r.length==n.length)throw"Bulk unregister failed: No entries with that source were found";e.store.customEntries=r},getBuiltInEntries:()=>_,getAllCustomEntries:()=>e.ghost.customEntries,getCustomEntriesBySouce:t=>e.ghost.customEntries.filter(n=>n.source==t),getCustomEntryById:t=>e.ghost.customEntries.find(n=>n.id==t)},w.log("|| COMMAND PALETTE || Initialised window.commandPalette API"),()=>{window.commandPalette=void 0,delete window.commandPalette,w.log("|| COMMAND PALETTE || Disposed window.commandPalette API")}),re=({persist:e,id:t})=>{Array.isArray(e.ghost.customEntries)||(e.store.customEntries=[]),e.ghost.usageCounts||(e.store.usageCounts=new Map);let n=[];return{onLoad:()=>n.push(T(),O(e,_),ne(e)),onUnload:()=>n.forEach(r=>r())}};return re})(cumcord.modules.webpack,cumcord.ui.components,cumcord.modules.common,cumcord.plugins,cumcord.ui.toasts,cumcord.ui.modals,cumcord,cumcord.utils.logger);
