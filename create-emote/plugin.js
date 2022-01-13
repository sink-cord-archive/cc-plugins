(function(s,u,l,f,h,n){"use strict";var E=()=>cumcord.patcher.injectCSS(".ysink_emote_modal .ysink_emote_row{display:flex;margin-bottom:1rem}.ysink_emote_modal .ysink_emote_row:last-child{margin-bottom:unset}.ysink_emote_modal .ysink_emote_row>*{flex:1;margin-right:1rem}.ysink_emote_modal .ysink_emote_row>:last-child{flex:unset;margin-right:unset}");const _=s.findByProps("uploadEmoji"),{getGuildPermissions:g}=s.findByProps("getGuildPermissions"),{getGuilds:C}=s.findByProps("getGuilds"),M=BigInt(1073741824),R=r=>{let e=g({id:r});return!!(e&&(e&M)!==0n)},x=()=>Object.values(C()).filter(r=>R(r.id)),B=r=>new Promise((e,t)=>{let a=new FileReader;a.onloadend=()=>e(a.result),a.readAsDataURL(r)}),S=async r=>await B(await(await fetch(r)).blob()),m=(r,e,t)=>{S(e).then(a=>_.uploadEmoji(r,a,t))},{openModal:N}=s.findByProps("openModalLazy"),i=s.findByProps("ModalCloseButton"),c=s.findByDisplayName("Flex"),p=s.findByProps("Sizes","Tags"),P=s.findByDisplayName("FormSection"),j=s.findByDisplayName("FormText"),I=s.findByDisplayName("TextInput"),w=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),T=({guildId:r,emoteUrl:e,e:t})=>{const[a,o]=n.React.useState("");return n.React.createElement(h.ErrorBoundary,null,n.React.createElement(i.ModalRoot,{transitionState:t.transitionState,size:"small",className:"ysink_emote_modal"},n.React.createElement(i.ModalHeader,{separator:!1},n.React.createElement(c.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},n.React.createElement(p,{tag:"h2",size:p.Sizes.SIZE_20},"Create Emote")),n.React.createElement(c.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},n.React.createElement(i.ModalCloseButton,{onClick:t.onClose}))),n.React.createElement(i.ModalContent,null,n.React.createElement(P,null,n.React.createElement("div",{className:"ysink_emote_row"},n.React.createElement(j,null,"You are now creating an emote for the following image:"),n.React.createElement("img",{src:e,height:"70"})),n.React.createElement(c,{basis:"auto",grow:1,shrink:1,className:"ysink_emote_row",style:{"margin-bottom":"1rem"}},n.React.createElement(I,{className:"ysink_emote_input",placeholder:"myamazingemote",type:"text",value:a,onChange:G=>o(G)}),n.React.createElement(w,{className:"ysink_emote_button",onClick:()=>{m(r,e,a),l.showToast({title:`created emote ${a}`,duration:3e3}),t.onClose()}},"Create Emote!"))))))};var k=(r,e)=>N(t=>n.React.createElement(T,{guildId:r,emoteUrl:e,e:t}));const d=s.findByProps("MenuGroup","default");var y=({isEmote:r,emoteAlt:e,url:t})=>n.React.createElement(n.React.Fragment,null,n.React.createElement(d.MenuItem,{id:"ysink_emoji_msgitem",label:r?`Clone Emote ${e}`:"Create Emote"},x().map(a=>n.React.createElement(d.MenuItem,{label:a.name,id:`ysink_emoji_server_${a.id}`,action:()=>{let o=e?.substring(1,e.length-1);r?(m(a.id,t,o),l.showToast({title:`cloned emote ${o}`,duration:3e3})):k(a.id,t)}}))),n.React.createElement(d.MenuItem,{label:"Copy URL",id:"ysink_emoji_copyitem",action:()=>{let a=e?.substring(1,e.length-1);f.copyText(t),l.showToast({title:`Copied url for ${a}`,duration:3e3})}}));const v=s.findByProps("MenuGroup","default");var F=()=>{const r=s.findByDisplayName("MessageContextMenu",!1);return u.after("default",r,(e,t)=>{let a=e[0].target,o=!!a?.classList?.contains("emoji");if(!(!a||!t?.props?.children||!o&&a?.nodeName!="IMG"||o&&a.alt.length<=2))return t.props.children.splice(3,0,n.React.createElement(v.MenuSeparator,null),y({isEmote:o,emoteAlt:a.alt,url:a.currentSrc})),t})},z=()=>{const r=s.findByDisplayName("ExpressionPickerContextMenu",!1);return u.after("default",r,([{target:e}],t)=>(e.firstChild.currentSrc&&(Array.isArray(t.props.children.props.children)||(t.props.children.props.children=[t.props.children.props.children]),t.props.children.props.children.push(y({isEmote:!0,emoteAlt:`:${e.dataset.name}:`,url:e.firstChild.currentSrc}))),t))},D=r=>{let e=[E(),F(),z()];return{onUnload:()=>e.forEach(t=>t())}};return D})(cumcord.modules.webpack,cumcord.patcher,cumcord.ui.toasts,cumcord.utils,cumcord.ui.components,cumcord.modules.common);
