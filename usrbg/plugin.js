(function(o,h,a,c,i,y,M,p){"use strict";function b(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}function B(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(n){if(n!=="default"){var s=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,s.get?s:{enumerable:!0,get:function(){return e[n]}})}}),t.default=e,Object.freeze(t)}var d=B(h),l=b(p);const P="https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json",v=()=>fetch(P).then(e=>e.json()),_=e=>new Map(e.map(t=>[t.uid,t]));var S=()=>v().then(_);const[f,U,{premiumIconWrapper:j},{TextBadge:N}]=i.batchFind(({findByProps:e,findByDisplayName:t})=>{t("UserBanner",!1),e("UserPopoutAvatar"),e("premiumIconWrapper"),e("TextBadge")});var T=e=>{const t=c.before("default",f,([r])=>{if(e.has(r.user.id)&&(!r?.displayProfile?.premiumType||!a.persist.ghost.nitroBanner)){const u=e.get(r.user.id)?.img;r.bannerSrc=u,r.displayProfile&&c.instead("getBannerURL",r.displayProfile,()=>u,!1)}}),n=c.before("UserPopoutAvatar",U,([r])=>{e.has(r.user.id)&&(!r?.displayProfile?.premiumType||!a.persist.ghost.nitroBanner)&&(r.displayProfile.banner="_")}),s=c.after("default",f,([r],u)=>{e.has(r.user.id)&&(!r?.displayProfile?.premiumType||!a.persist.ghost.nitroBanner)&&(u.props.children[0]=d.createElement(N,{color:"rgba(32, 34, 37, 0.8)",className:j,text:"USRBG"}))});return()=>{t(),n(),s()}};const O=i.findByDisplayName("FormText"),E=i.findByDisplayName("Switch");i.findByDisplayName("TextInput"),i.findByDisplayName("Select",!1).SingleSelect;const R=e=>({display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem",marginLeft:e!==void 0?"1rem":0}),w=({k:e,depends:t,children:n})=>l.default.createElement("div",{style:R(t)},l.default.createElement(E,{checked:a.persist.ghost[e],disabled:t!==void 0&&!a.persist.ghost[t],onChange:s=>a.persist.store[e]=s}),l.default.createElement(O,{children:n})),D=e=>t=>(y.useNest(a.persist),e(t));((e,t=a.persist)=>{for(const n in e)t.ghost[n]===void 0&&(t.store[n]=e[n])})({nitroBanner:!0});var L=D(()=>d.createElement(w,{k:"nitroBanner"},"Prioritise Nitro banner"));let m=!1,g;async function A(){const e=await S();m||(g=T(e))}function I(){m=!0,g?.()}return o.onLoad=A,o.onUnload=I,o.settings=L,Object.defineProperty(o,"__esModule",{value:!0}),o})({},cumcord.modules.common.React,cumcord.pluginData,cumcord.patcher,cumcord.modules.webpack,cumcord.utils,cumcord.plugins,cumcord.modules.common.React);
