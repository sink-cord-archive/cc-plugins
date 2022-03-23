(function(m,a,o){"use strict";function d(e){if(e&&e.__esModule)return e;var i=Object.create(null);return e&&Object.keys(e).forEach(function(t){if(t!=="default"){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(i,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})}}),i.default=e,Object.freeze(i)}var u=d(m);const{icon:l}=a.findByProps("icon","textRuler"),{children:f}=a.findByProps("nameAndDecorators");var y=()=>o.injectCss(`
.ysink_activity_image {
    height: 2rem;
    border-radius: .3rem;
}

/* remove redundant rich presence icon */
.${l} { display: none; }

/* idk why but this looks nicer */
.${f} { display: flex; }
`),h=e=>{let i=null,t=null;return{onLoad(){t=y();let n=a.findByDisplayName("MemberListItem").prototype;i=o.after("render",n,(_,r)=>{if(!r.props?.subText?.props)return;const p=r?.props?.subText?.props?.activities;if(!!p?.length){r.props.children=[];for(const s of p){const c=s?.assets?.large_image||s?.assets?.small_image;if(s.application_id&&c){const g=c.startsWith("mp:")?c.replace("mp:","https://media.discordapp.net/"):`https://cdn.discordapp.com/app-assets/${s.application_id}/${c}.png`;r.props.children.push(u.createElement("img",{src:g,className:"ysink_activity_image"}))}}return r}})},onUnload(){i&&i(),t&&t()}}};return h})(cumcord.modules.common.React,cumcord.modules.webpack,cumcord.patcher);
