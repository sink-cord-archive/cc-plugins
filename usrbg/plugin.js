(function(r,f,c,d){"use strict";function m(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if(n!=="default"){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var b=m(f);const g="https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json",h=()=>fetch(g).then(e=>e.json()),p=e=>new Map(e.map(t=>[t.uid,t]));var v=()=>h().then(p);const[s,_,{premiumIconWrapper:P},{TextBadge:U}]=d.batchFind(({findByProps:e,findByDisplayName:t})=>{t("UserBanner",!1),e("UserPopoutAvatar"),e("premiumIconWrapper"),e("TextBadge")});var j=e=>{const t=c.before("default",s,([a])=>{if(e.has(a.user.id)){const u=e.get(a.user.id)?.img;a.bannerSrc=u,a.displayProfile&&c.instead("getBannerURL",a.displayProfile,()=>u,!1)}}),n=c.before("UserPopoutAvatar",_,([a])=>{e.has(a.user.id)&&(a.displayProfile.banner="_")}),o=c.after("default",s,([a],u)=>{e.has(a.user.id)&&(u.props.children[0]=b.createElement(U,{color:"rgba(32, 34, 37, 0.8)",className:P,text:"USRBG"}))});return()=>{t(),n(),o()}};let i=!1,l;async function B(){const e=await v();i||(l=j(e))}function O(){i=!0,l?.()}return r.onLoad=B,r.onUnload=O,Object.defineProperty(r,"__esModule",{value:!0}),r})({},cumcord.modules.common.React,cumcord.patcher,cumcord.modules.webpack);
