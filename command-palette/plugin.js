(function(l,b,a,T,U,A,L,I){"use strict";function j(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var u=j(T),K=()=>cumcord.patcher.injectCSS(".ysink_palette_modal{position:absolute;top:5rem;left:0;width:100vw;display:flex;align-items:center;background:none!important;box-shadow:none!important}.ysink_palette_modal.ysink_palette_textentrymodal{min-height:0;height:4rem}.ysink_palette_palette{width:50rem;background-color:var(--background-secondary);color:#fff;padding:.75rem 0 0;border-radius:0;overflow:unset!important}.ysink_palette_item{padding:.3rem 1rem .3rem .5rem}.ysink_palette_icon{width:1.5rem;display:inline-block;text-align:center}.ysink_palette_iconseparator{border:solid 1px #ffffff55;margin:0 .5rem;border-radius:1px}.ysink_palette_item.ysink_palette_selected{background-color:#0005}.ysink_palette_input_wrapper{margin:0 .5rem 1rem;border:#ffffff33 solid 1px;display:flex;align-items:center;padding-left:.5rem}.ysink_palette_input{flex:1;margin-left:.5rem}.ysink_palette_input input{border:none!important;background:none!important;padding:0!important}.ysink_palette_source{text-transform:uppercase;font-style:italic;color:#aaa;float:right}.ysink_palette_scrollcontainer{overflow:hidden scroll;max-height:30rem;padding-bottom:.75rem}.ysink_palette_scrollcontainer::-webkit-scrollbar{width:1rem;background-color:#0003}.ysink_palette_scrollcontainer::-webkit-scrollbar-thumb{background-color:#fff3;min-height:40px}"),F=({entry:e,selected:t,id:n,icon:o})=>a.React.createElement("div",{className:t?"ysink_palette_item ysink_palette_selected":"ysink_palette_item",id:n},a.React.createElement("span",{className:"ysink_palette_icon"},o??""),a.React.createElement("span",{className:"ysink_palette_iconseparator"}),e.label,a.React.createElement("span",{className:"ysink_palette_source"},e.source));const P=(e,t)=>{let n=[];return t.forEach((o,r)=>{let i=e.findIndex(c=>c.id==r);r!=-1&&(n.push([e[i],o]),e.splice(i,1))}),n=n.sort((o,r)=>r[1]-o[1]).map(o=>o[0]),n.concat(e)};var G=(e,t,n)=>{if(!n||n=="")return P(e,t);let o=e.filter(r=>r.label.toLowerCase().includes(n.toLowerCase())||r.id.toLowerCase().includes(n.toLowerCase()));return P(o,t)};const O=a.React.useState,{openModal:z}=l.findByProps("openModal"),R=l.findByProps("ModalCloseButton"),H=l.findByDisplayName("TextInput"),W=({e,prompt:t,nest:n,defaultEntries:o,closeAction:r})=>{let[i,c]=O({selected:0,search:""});const m=G(n?o.concat(n.ghost.customEntries):o,n?n.ghost.usageCounts:new Map,i.search),g=s=>{let d=i.selected;c({selected:d,search:s})},k=s=>{let d=i.search;c({selected:s,search:d})},de=s=>{switch(s.which){case 38:i.selected>0?k(i.selected-1):k(m.length-1);break;case 40:i.selected<m.length-1?k(i.selected+1):k(0);break;case 13:e.onClose();let d=m[i.selected];if(n){let w=n.ghost.usageCounts,ue=w.get(d.id)??0;w.set(d.id,ue+1),n.store.usageCounts=w}d.action();break;default:document.getElementsByClassName("ysink_palette_input")[0].children[0].focus();break}document.getElementById(`palette_item_${i.selected}`)?.scrollIntoView(!1)};return a.React.createElement(b.ErrorBoundary,null,a.React.createElement(R.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal",onKeyDown:de,onBlur:()=>{r&&r()}},a.React.createElement(R.ModalContent,{className:"ysink_palette_palette"},a.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",a.React.createElement(H,{className:"ysink_palette_input",placeholder:t??"Search Actions",type:"text",value:i.search,onChange:s=>g(s)})),a.React.createElement("div",{className:"ysink_palette_scrollcontainer"},m.filter(s=>s&&(s.condition?.()??!0)).map((s,d)=>a.React.createElement(F,{entry:s,id:`palette_item_${d}`,selected:d==i.selected,icon:s.icon}))))))};let p=(e,t,n,o)=>z(r=>a.React.createElement(W,{e:r,prompt:e,nest:t,defaultEntries:n,closeAction:o})),J=(e,t)=>new Promise((n,o)=>{p(e,null,t.map(r=>({label:r,action:()=>n(r)})),()=>o("user closed palette"))});var V=(e,t)=>{let n=o=>{(o.ctrlKey||o.metaKey)&&o.shiftKey&&o.which==80&&p(null,e,t)};return document.addEventListener("keyup",n),()=>{document.removeEventListener("keyup",n)}};const{getGuildPermissions:q}=l.findByProps("getGuildPermissions"),{getLastSelectedGuildId:f}=l.findByProps("getLastSelectedGuildId"),v=(e,t)=>{let n=q({id:e});return!!(n&&(n&t)!=0)},Q=()=>v(f(),BigInt(4)),X=()=>v(f(),BigInt(2)),Y=a.React.useState,{openModal:Z}=l.findByProps("openModal"),x=l.findByProps("ModalCloseButton"),ee=l.findByDisplayName("TextInput"),te=({e,prompt:t,finishAction:n,closeAction:o})=>{let[r,i]=Y("");return a.React.createElement(b.ErrorBoundary,null,a.React.createElement(x.ModalRoot,{transitionState:e.transitionState,size:"small",className:"ysink_palette_modal ysink_palette_textentrymodal",onKeyDown:c=>{c.which==13&&(e.onClose(),n(r))}},a.React.createElement(x.ModalContent,{className:"ysink_palette_palette"},a.React.createElement("div",{className:"ysink_palette_input_wrapper"},">",a.React.createElement(ee,{className:"ysink_palette_input",placeholder:t,type:"text",value:r,onChange:c=>i(c),onBlur:()=>o()})))))},y=(e,t,n)=>Z(o=>a.React.createElement(te,{e:o,prompt:e,finishAction:t,closeAction:n})),C=e=>new Promise((t,n)=>{y(e,t,()=>n("user closed textentry"))}),{getMembers:B}=l.findByProps("getMembers"),{getUser:M}=l.findByProps("getUser"),{banUser:ne,kickUser:oe}=l.findByProps("banUser"),N="Built In",$="\u{1F6E0}";var re=[{source:N,icon:$,id:"moderation_banuser",label:"Ban user from current guild",condition:Q,action:()=>{p("Which user to ban?",null,B(f()).map(e=>{let t=M(e.userId),n=e.nick?`[${e.nick}]`:"";return{id:e.userId,label:`${t.username}#${t.discriminator} ${n} (${e.userId})`,action:()=>y("Enter ban reason",o=>{ne(f(),e.userId,null,o)})}}))}},{source:N,icon:$,id:"moderation_kickuser",label:"Kick user from current guild",condition:X,action:()=>{p("Which user to kick?",null,B(f()).map(e=>{let t=M(e.userId),n=e.nick?`[${e.nick}]`:"";return{id:e.userId,label:`${t.username}#${t.discriminator} ${n} (${e.userId})`,action:()=>y("Enter kick reason",o=>{oe(f(),e.userId,o)})}}))}}];const h="Built In",_="\u{1F4A7}";var ae=[{source:h,icon:_,id:"cumcord_installplug",label:"Install plugin from URL",action:async()=>{try{let e=await C("Enter URL");await u.default.importPlugin(e),U.showToast({title:"Installed plugin",duration:3e3})}catch{}}},{source:h,icon:_,id:"cumcord_removeplug",label:"Remove plugin",action:()=>{let e=Object.keys(u.default.installed.ghost).map(t=>[t,u.default.installed.ghost[t]]);p("Choose plugin to remove",null,e.map(t=>({id:t[0],label:t[1].manifest.name,action:()=>u.default.removePlugin(t[0])})))}},{source:h,icon:_,id:"cumcord_toggleplug",label:"Toggle plugin",action:()=>{let e=Object.keys(u.default.installed.ghost).map(t=>[t,u.default.installed.ghost[t]]);p("Choose plugin to toggle",null,e.map(t=>({id:t[0],label:(t[1].enabled?"\u{1F7E2} ":"\u{1F534} ")+t[1].manifest.name,action:()=>u.default.togglePlugin(t[0])})))}},{source:h,icon:_,id:"cumcord_uninject",label:"Uninject Cumcord",action:()=>setTimeout(async()=>{await A.showConfirmationModal({header:"Really uninject Cumcord?",content:"This will disable all of your plugins, and Cumcord will be completely removed",type:"danger",confirmText:"Uninject",cancelText:"Actually, never mind"})&&L.uninject()},500)}];const S="Built In",D="\u267B";var ie=[{source:S,icon:D,id:"reboot_reload",label:"Reload Discord",action:()=>window.location.reload()},{source:S,icon:D,id:"reboot_relaunch",label:"Relaunch Discord to updater",condition:()=>window.DiscordNative,action:()=>window.DiscordNative.app.relaunch()}];const se="Built In",E=re.concat(ae).concat(ie);var le=e=>(window.commandPalette={openPalette:(t,n)=>{p(t,null,n)},openPaletteAsync:J,openTextEntry:(t,n)=>y(t,n),openTextEntryAsync:t=>C(t),registerEntry(t,n,o,r,i,c){if(!t||t=="")throw"Register failed: Please supply an ID (string) for your entry";if(!n||n=="")throw"Register failed: Please identify a source (string) for your entry";if(!o||o=="")throw"Register failed: Please supply a label (string) for your entry";if(!r)throw"Register failed: Please supply an action (JS function) for your entry";if(n==se)throw"Register failed: That source is reserved for built in entries";if(E.find(g=>g.id==t)!=null)throw"Register failed: Entry ID taken by a built in entry";let m=e.ghost.customEntries.findIndex(g=>g.id==t);if(m!=-1)throw`Register failed: Entry ID taken by entry from source ${e.ghost.customEntries[m].source}`;e.ghost.customEntries.push({id:t,source:n,label:o,action:r,icon:i,console})},unregisterEntry(t,n){if(!t||t=="")throw"Unregister failed: Please supply an ID (string) to deregister";if(!n||n=="")throw"Unregister failed: Please identify your source (string)";let o=e.ghost.customEntries,r=o.findIndex(c=>c.id==t);if(r==-1)throw"Unregister failed: No entry with that ID could be found";if(o[r].source!=n)throw"Unregister failed: An entry with that ID was found, but was not from your source";let i=o[r];return o.splice(r,1),e.store.customEntries=o,i},unregisterSource(t){let n=e.ghost.customEntries,o=n.filter(r=>r.source!=t);if(o.length==n.length)throw"Bulk unregister failed: No entries with that source were found";e.store.customEntries=o},getBuiltInEntries:()=>E,getAllCustomEntries:()=>e.ghost.customEntries,getCustomEntriesBySouce:t=>e.ghost.customEntries.filter(n=>n.source==t),getCustomEntryById:t=>e.ghost.customEntries.find(n=>n.id==t)},I.log("|| COMMAND PALETTE || Initialised window.commandPalette API"),()=>{window.commandPalette=void 0,delete window.commandPalette,I.log("|| COMMAND PALETTE || Disposed window.commandPalette API")}),ce=({persist:e,id:t})=>{e.store.customEntries=[],e.ghost.usageCounts||(e.store.usageCounts=new Map);let n=[K(),V(e,E),le(e)];return{onUnload:()=>{e.store.customEntries=[],delete e.store.customEntries,n.forEach(o=>o())}}};return ce})(cumcord.modules.webpack,cumcord.ui.components,cumcord.modules.common,cumcord.plugins,cumcord.ui.toasts,cumcord.ui.modals,cumcord,cumcord.utils.logger);