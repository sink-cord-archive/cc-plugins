(function(d,f,s,p){"use strict";var b=()=>cumcord.patcher.injectCSS(".ysink_palette_modal{position:absolute;top:5rem;left:0;width:100vw;display:flex;align-items:center;background:none!important;box-shadow:none!important}.ysink_palette_palette{width:50rem;background-color:var(--background-secondary);color:#fff;padding:.75rem 0;border-radius:0;overflow:unset!important}.ysink_palette_item{padding:.3rem 1rem}.ysink_palette_item.ysink_palette_selected{background-color:#0005}.ysink_palette_input_wrapper{margin:0 .5rem 1rem;border:#ffffff33 solid 1px;display:flex;align-items:center;padding-left:.5rem}.ysink_palette_input{flex:1;margin-left:.5rem}.ysink_palette_input input{border:none!important;background:none!important;padding:0!important}.ysink_palette_source{text-transform:uppercase;font-style:italic;color:#aaa;float:right}"),C=({entry:e,selected:t})=>s.React.createElement("div",{className:t?"ysink_palette_item ysink_palette_selected":"ysink_palette_item"},e.label,s.React.createElement("span",{className:"ysink_palette_source"},e.source));const h=(e,t)=>{let n=[];return t.forEach((a,r)=>{let o=e.findIndex(i=>i.id==r);r!=-1&&(n.push([e[o],a]),e.splice(o,1))}),n=n.sort((a,r)=>r[1]-a[1]).map(a=>a[0]),n.concat(e)};var R=(e,t,n)=>{if(!n||n=="")return h(e,t);let a=e.filter(r=>r.label.toLowerCase().includes(n));return h(a,t)};const x=s.React.useState,{openModal:P}=d.findByProps("openModal"),g=d.findByProps("ModalCloseButton"),v=d.findByDisplayName("TextInput"),I=({e,nest:t,defaultEntries:n})=>{let[a,r]=x({selected:0,search:""});const o=R(t?n.concat(t.ghost.customEntries):n,t?t.ghost.usageCounts:new Map,a.search),i=l=>{let c=a.selected;r({selected:c,search:l})},u=l=>{let c=a.search;r({selected:l,search:c})},L=l=>{switch(l.which){case 38:a.selected>0?u(a.selected-1):u(o.length-1);break;case 40:a.selected<o.length-1?u(a.selected+1):u(0);break;case 13:e.onClose();let c=o[a.selected];if(t){let y=t.ghost.usageCounts,K=y.get(c.id)??0;y.set(c.id,K+1),t.store.usageCounts=y}c.action();break;default:document.getElementsByClassName("ysink_palette_input")[0].children[0].focus();break}};return s.React.createElement(f.ErrorBoundary,null,s.React.createElement(g.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:L},s.React.createElement(g.ModalContent,{className:"ysink_palette_palette"},s.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",s.React.createElement(v,{className:"ysink_palette_input",placeholder:"Search Actions",type:"text",value:a.search,onChange:l=>i(l)})),o.map((l,c)=>s.React.createElement(C,{entry:l,selected:c==a.selected})))))};var E=(e,t)=>P(n=>s.React.createElement(I,{e:n,nest:e,defaultEntries:t})),M=(e,t)=>{let n=a=>{(a.ctrlKey||a.metaKey)&&a.shiftKey&&a.which==80&&E(e,t)};return document.addEventListener("keyup",n),()=>{document.removeEventListener("keyup",n)}};const _="Built In",m=[{id:"notcum",label:"Not cum",action:()=>p.showToast({title:"You chose: Not cum",duration:5e3})},{id:"abitcum",label:"A bit cum",action:()=>p.showToast({title:"You chose: A bit cum",duration:5e3})},{id:"cum",label:"Cum",action:()=>p.showToast({title:"You chose: Cum",duration:5e3})}].map(e=>({source:_,id:e.id,label:e.label,action:e.action})),N=s.React.useState,{openModal:B}=d.findByProps("openModal"),w=d.findByProps("ModalCloseButton"),S=d.findByDisplayName("TextInput"),A=({e,prompt:t,finishAction:n,closeAction:a})=>{let[r,o]=N("");return s.React.createElement(f.ErrorBoundary,null,s.React.createElement(w.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:i=>{i.which==13&&(e.onClose(),n(r))}},s.React.createElement(w.ModalContent,{className:"ysink_palette_palette"},s.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",s.React.createElement(S,{className:"ysink_palette_input",placeholder:t,type:"text",value:r,onChange:i=>o(i),onBlur:()=>a("User closed text box")})))))},k=(e,t,n)=>B(a=>s.React.createElement(A,{e:a,prompt:e,finishAction:t,closeAction:n})),D=e=>new Promise((t,n)=>{k(e,t,n)});var T=e=>(window.commandPalette={openPalette:t=>{E(null,t)},openTextEntry:(t,n)=>k(t,n),openTextEntryPromise:D,registerEntry(t,n,a,r){if(!t||t=="")throw"Register failed: Please supply an ID (string) for your entry";if(!n||n=="")throw"Register failed: Please identify a source (string) for your entry";if(!a||a=="")throw"Register failed: Please supply a label (string) for your entry";if(!r)throw"Register failed: Please supply an action (JS function) for your entry";if(n==_)throw"Register failed: That source is reserved for built in entries";if(m.find(i=>i.id==t)!=null)throw"Register failed: Entry ID taken by a built in entry";let o=e.ghost.customEntries.findIndex(i=>i.id==t);if(o!=-1)throw`Register failed: Entry ID taken by entry from source ${e.ghost.customEntries[o].source}`;e.ghost.customEntries.push({id:t,source:n,label:a,action:r})},unregisterEntry(t,n){if(!t||t=="")throw"Unregister failed: Please supply an ID (string) to deregister";if(!n||n=="")throw"Unregister failed: Please identify your source (string)";let a=e.ghost.customEntries,r=a.findIndex(i=>i.id==t);if(r==-1)throw"Unregister failed: No entry with that ID could be found";if(a[r].source!=n)throw"Unregister failed: An entry with that ID was found, but was not from your source";let o=a[r];return a.splice(r,1),e.store.customEntries=a,o},getBuiltInEntries:()=>m,getAllCustomEntries:()=>e.ghost.customEntries,getCustomEntriesBySouce:t=>e.ghost.customEntries.filter(n=>n.source==t),getCustomEntryById:t=>e.ghost.customEntries.find(n=>n.id==t)},console.log("|| COMMAND PALETTE || Initialised window.commandPalette API"),()=>{window.commandPalette=void 0,delete window.commandPalette,console.log("|| COMMAND PALETTE || Disposed window.commandPalette API")}),U=({persist:e,id:t})=>{Array.isArray(e.ghost.customEntries)||(e.store.customEntries=[]),e.ghost.usageCounts||(e.store.usageCounts=new Map);let n=[];return{onLoad:()=>n.push(b(),M(e,m),T(e)),onUnload:()=>n.forEach(a=>a())}};return U})(cumcord.modules.webpack,cumcord.ui.components,cumcord.modules.common,cumcord.ui.toasts);
