(function(c,i,o,p,f){"use strict";function d(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(a){if(a!=="default"){var n=Object.getOwnPropertyDescriptor(e,a);Object.defineProperty(t,a,n.get?n:{enumerable:!0,get:function(){return e[a]}})}}),t.default=e,Object.freeze(t)}var m=d(p);const[b,g,h,{premiumIconWrapper:_},{footer:W},{bodyInnerWrapper:D},{avatarPositionPremium:I,avatarWrapperNormal:N},{TextBadge:P}]=i.batchFind(({findByProps:e,findByDisplayName:t,find:a})=>{t("UserBanner",!1),a(n=>n.type?.displayName==="UserPopoutContainer"),t("AccountProfilePopoutContainer",!1),e("premiumIconWrapper"),e("wumpusWrapper"),e("bodyInnerWrapper"),e("avatarPositionPremium"),e("TextBadge")});var v=e=>{const t=o.after("type",g,(u,{props:{user:r}})=>{e.has(r.id)&&(r.banner??="_")}),a=o.after("default",h,(u,{props:{user:r}})=>{e.has(r.id)&&(r.banner??="_")}),n=o.findAndPatch(()=>i.findByDisplayName("UserProfileModalHeader",!1),u=>o.after("default",u,([{user:r}])=>{e.has(r.id)&&(r.banner??="_")}));return()=>{t(),a(),n()}},j=e=>o.after("default",b,([{user:t}],a)=>{if(!(f.persist.ghost.classic||t.banner!=="_"))return a.props.style.backgroundImage=`url(${e.get(t.id).img})`,a.props.children[0]=m.createElement(P,{color:"rgba(32, 34, 37, 0.8)",className:_,text:"USRBG"}),a});const U="https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json",y=()=>fetch(U).then(e=>e.json()),C=e=>new Map(e.map(t=>[t.uid,t]));var O=()=>y().then(C);let s=!1,l=[];async function w(){const e=await O();s||(l=[j(e),v(e)])}function M(){s=!0,window._.forEachRight(l,e=>e())}return c.onLoad=w,c.onUnload=M,Object.defineProperty(c,"__esModule",{value:!0}),c})({},cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common.React,cumcord.pluginData);
