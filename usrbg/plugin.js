(function(n,o){"use strict";const i="https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json",p=async()=>await(await fetch(i)).json(),u=t=>{let r=new Map;for(const e of t)r.set(e.uid,e);return r};var l=async()=>u(await p());const c=n.find(t=>t?.default?.displayName=="UserBanner"),{popoutBannerPremium:d}=n.findByProps("popoutBannerPremium");var m=t=>o.after("default",c,([{user:r}],e)=>{let a=t.get(r?.id)?.img;if(!(!r||!e||r.banner||!a))return e.props.style={background:`url(${a})`},e.props.className+=` ${d}`,e});const{avatarPositionPremium:f,avatarWrapperNormal:g}=n.findByProps("avatarPositionPremium"),v=n.findByDisplayName("Clickable").prototype;var y=t=>o.after("render",v,(r,e)=>{let a=e?.props?.children;if(!a?.props?.className.includes(g))return;let s=a.props?.children?.[0]?.props?.src?.split("/"),h=s?.[s.length-2];if(!(!s||!t.get(h)))return e.props.children.props.className+=` ${f}`,e}),b=()=>{let t=[];return l().then(r=>{t=[m(r),y(r)]}),{onUnload:()=>t.forEach(r=>r?.())}};return b})(cumcord.modules.webpack,cumcord.patcher);