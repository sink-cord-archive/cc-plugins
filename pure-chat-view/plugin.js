(function(i,t){"use strict";const o=t.findByProps("activityPanel").sidebar,c=t.findByProps("membersGroup").container,a=`
nav,                  /* server list */
section,              /* channel header */
.${o},     /* channel sidebar */
.${c} { /* member list */
  display: none !important;
}`;let e=null;function r(n){n.code==="KeyH"&&n.ctrlKey&&n.getModifierState("Alt")&&(e===null?e=i.injectCSS(a):(e(),e=null))}var d={onLoad:()=>document.addEventListener("keyup",r),onUnload(){document.removeEventListener("keyup",r),e?.()}};return d})(cumcord.patcher,cumcord.modules.webpack);
