(function(u,g,o,m){"use strict";var x=()=>cumcord.patcher.injectCSS(".ysink_palette_modal{position:absolute;top:5rem;left:0;width:100vw;display:flex;align-items:center;background:none!important;box-shadow:none!important}.ysink_palette_modal.ysink_palette_textentrymodal{min-height:0;height:4rem}.ysink_palette_palette{width:50rem;background-color:var(--background-secondary);color:#fff;padding:.75rem 0;border-radius:0;overflow:unset!important}.ysink_palette_item{padding:.3rem 1rem}.ysink_palette_item.ysink_palette_selected{background-color:#0005}.ysink_palette_input_wrapper{margin:0 .5rem 1rem;border:#ffffff33 solid 1px;display:flex;align-items:center;padding-left:.5rem}.ysink_palette_input{flex:1;margin-left:.5rem}.ysink_palette_input input{border:none!important;background:none!important;padding:0!important}.ysink_palette_source{text-transform:uppercase;font-style:italic;color:#aaa;float:right}"),R=({entry:t,selected:n})=>o.React.createElement("div",{className:n?"ysink_palette_item ysink_palette_selected":"ysink_palette_item"},t.label,o.React.createElement("span",{className:"ysink_palette_source"},t.source));const _=(t,n)=>{let e=[];return n.forEach((a,r)=>{let s=t.findIndex(i=>i.id==r);r!=-1&&(e.push([t[s],a]),t.splice(s,1))}),e=e.sort((a,r)=>r[1]-a[1]).map(a=>a[0]),e.concat(t)};var b=(t,n,e)=>{if(!e||e=="")return _(t,n);let a=t.filter(r=>r.label.toLowerCase().includes(e));return _(a,n)};const C=o.React.useState,{openModal:I}=u.findByProps("openModal"),E=u.findByProps("ModalCloseButton"),v=u.findByDisplayName("TextInput"),M=({e:t,prompt:n,nest:e,defaultEntries:a,closeAction:r})=>{let[s,i]=C({selected:0,search:""});const d=b(e?a.concat(e.ghost.customEntries):a,e?e.ghost.usageCounts:new Map,s.search),Y=l=>{let c=s.selected;i({selected:c,search:l})},p=l=>{let c=s.search;i({selected:l,search:c})},$=l=>{switch(l.which){case 38:s.selected>0?p(s.selected-1):p(d.length-1);break;case 40:s.selected<d.length-1?p(s.selected+1):p(0);break;case 13:t.onClose();let c=d[s.selected];if(e){let h=e.ghost.usageCounts,j=h.get(c.id)??0;h.set(c.id,j+1),e.store.usageCounts=h}c.action();break;default:document.getElementsByClassName("ysink_palette_input")[0].children[0].focus();break}};return o.React.createElement(g.ErrorBoundary,null,o.React.createElement(E.ModalRoot,{transitionState:t.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:$,onBlur:()=>{r&&r()}},o.React.createElement(E.ModalContent,{className:"ysink_palette_palette"},o.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",o.React.createElement(v,{className:"ysink_palette_input",placeholder:n??"Search Actions",type:"text",value:s.search,onChange:l=>Y(l)})),d.map((l,c)=>o.React.createElement(R,{entry:l,selected:c==s.selected})))))};let y=(t,n,e,a)=>I(r=>o.React.createElement(M,{e:r,prompt:t,nest:n,defaultEntries:e,closeAction:a})),N=(t,n)=>new Promise((e,a)=>{y(t,null,n.map(r=>({label:r,action:()=>e(r)})),()=>a("user closed palette"))});var B=(t,n)=>{let e=a=>{(a.ctrlKey||a.metaKey)&&a.shiftKey&&a.which==80&&y(t,n)};return document.addEventListener("keyup",e),()=>{document.removeEventListener("keyup",e)}};const w="Built In",f=[{id:"notcum",label:"Not cum",action:()=>m.showToast({title:"You chose: Not cum",duration:5e3})},{id:"abitcum",label:"A bit cum",action:()=>m.showToast({title:"You chose: A bit cum",duration:5e3})},{id:"cum",label:"Cum",action:()=>m.showToast({title:"You chose: Cum",duration:5e3})}].map(t=>({source:w,id:t.id,label:t.label,action:t.action})),S=o.React.useState,{openModal:A}=u.findByProps("openModal"),k=u.findByProps("ModalCloseButton"),T=u.findByDisplayName("TextInput"),D=({e:t,prompt:n,finishAction:e,closeAction:a})=>{let[r,s]=S("");return o.React.createElement(g.ErrorBoundary,null,o.React.createElement(k.ModalRoot,{transitionState:t.transitionState,size:"small",className:"ysink_palette_modal ysink_palette_textentrymodal",onKeyDown:i=>{i.which==13&&(t.onClose(),e(r))}},o.React.createElement(k.ModalContent,{className:"ysink_palette_palette"},o.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",o.React.createElement(T,{className:"ysink_palette_input",placeholder:n,type:"text",value:r,onChange:i=>s(i),onBlur:()=>a()})))))},P=(t,n,e)=>A(a=>o.React.createElement(D,{e:a,prompt:t,finishAction:n,closeAction:e})),L=t=>new Promise((n,e)=>{P(t,n,()=>e("user closed textentry"))});var U=t=>(window.commandPalette={openPalette:(n,e)=>{y(n,null,e)},openPaletteAsync:N,openTextEntry:(n,e)=>P(n,e),openTextEntryAsync:n=>L(n),registerEntry(n,e,a,r){if(!n||n=="")throw"Register failed: Please supply an ID (string) for your entry";if(!e||e=="")throw"Register failed: Please identify a source (string) for your entry";if(!a||a=="")throw"Register failed: Please supply a label (string) for your entry";if(!r)throw"Register failed: Please supply an action (JS function) for your entry";if(e==w)throw"Register failed: That source is reserved for built in entries";if(f.find(i=>i.id==n)!=null)throw"Register failed: Entry ID taken by a built in entry";let s=t.ghost.customEntries.findIndex(i=>i.id==n);if(s!=-1)throw`Register failed: Entry ID taken by entry from source ${t.ghost.customEntries[s].source}`;t.ghost.customEntries.push({id:n,source:e,label:a,action:r})},unregisterEntry(n,e){if(!n||n=="")throw"Unregister failed: Please supply an ID (string) to deregister";if(!e||e=="")throw"Unregister failed: Please identify your source (string)";let a=t.ghost.customEntries,r=a.findIndex(i=>i.id==n);if(r==-1)throw"Unregister failed: No entry with that ID could be found";if(a[r].source!=e)throw"Unregister failed: An entry with that ID was found, but was not from your source";let s=a[r];return a.splice(r,1),t.store.customEntries=a,s},unRegisterSource(n){let e=t.ghost.customEntries,a=e.filter(r=>r.source!=n);if(a.length==e.length)throw"Bulk unregister failed: No entries with that source were found";t.store.customEntries=a},getBuiltInEntries:()=>f,getAllCustomEntries:()=>t.ghost.customEntries,getCustomEntriesBySouce:n=>t.ghost.customEntries.filter(e=>e.source==n),getCustomEntryById:n=>t.ghost.customEntries.find(e=>e.id==n)},console.log("|| COMMAND PALETTE || Initialised window.commandPalette API"),()=>{window.commandPalette=void 0,delete window.commandPalette,console.log("|| COMMAND PALETTE || Disposed window.commandPalette API")}),K=({persist:t,id:n})=>{Array.isArray(t.ghost.customEntries)||(t.store.customEntries=[]),t.ghost.usageCounts||(t.store.usageCounts=new Map);let e=[];return{onLoad:()=>e.push(x(),B(t,f),U(t)),onUnload:()=>e.forEach(a=>a())}};return K})(cumcord.modules.webpack,cumcord.ui.components,cumcord.modules.common,cumcord.ui.toasts);
