(function(s,c,a){"use strict";const{icon:p}=s.findByProps("icon","textRuler"),{children:m}=s.findByProps("nameAndDecorators");var d=()=>c.injectCss(`
.ysink_activity_image {
    height: 2rem;
    border-radius: .3rem;
}

/* remove redundant rich presence icon */
.${p} { display: none; }

/* idk why but this looks nicer */
.${m} { display: flex; }
`),l=y=>{let r=null,n=null;return{onLoad(){n=d();let u=s.findByDisplayName("MemberListItem").prototype;r=c.after("render",u,(f,e)=>{if(!e.props?.subText?.props)return;const o=e?.props?.subText?.props?.activities;if(!!o?.length){e.props.children=[];for(const t of o){const i=t?.assets?.large_image||t?.assets?.small_image;if(t.application_id&&i){const h=i.startsWith("mp:")?i.replace("mp:","https://media.discordapp.net/"):`https://cdn.discordapp.com/app-assets/${t.application_id}/${i}.png`;e.props.children.push(a.React.createElement("img",{src:h,className:"ysink_activity_image"}))}}return e}})},onUnload(){r&&r(),n&&n()}}};return l})(cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common);
