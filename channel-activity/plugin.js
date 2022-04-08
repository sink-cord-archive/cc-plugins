(function(d,a,c){"use strict";function l(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(r){if(r!=="default"){var i=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:function(){return e[r]}})}}),t.default=e,Object.freeze(t)}var u=l(d);const{icon:m}=a.findByProps("icon","textRuler"),{children:f}=a.findByProps("nameAndDecorators");var y=()=>c.injectCss(`
.ysink_activity_image {
    height: 2rem;
    border-radius: .3rem;
}

/* remove redundant rich presence icon */
.${m} { display: none; }

/* idk why but this looks nicer */
.${f} { display: flex; }
`),h=e=>{let t=null,r=null;return{onLoad(){r=y();let i=a.findByDisplayName("MemberListItem").prototype;t=c.after("render",i,(g,n)=>{if(!n.props?.subText?.props)return;const p=n?.props?.subText?.props?.activities;if(p?.length){n.props.children=[];for(const s of p){const o=s?.assets?.large_image||s?.assets?.small_image;if(s.application_id&&o){const _=o.startsWith("mp:")?o.replace("mp:","https://media.discordapp.net/"):`https://cdn.discordapp.com/app-assets/${s.application_id}/${o}.png`;n.props.children.push(u.createElement("img",{src:_,className:"ysink_activity_image"}))}}return n}})},onUnload(){t&&t(),r&&r()}}};return h})(cumcord.modules.common.React,cumcord.modules.webpack,cumcord.patcher);
