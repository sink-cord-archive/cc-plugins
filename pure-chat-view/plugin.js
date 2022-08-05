(function(s,t){"use strict";const i=t.findByProps("activityPanel").sidebar,o=t.findByProps("membersGroup").container,a=`
nav,                  /* server list */
section,              /* channel header */
.${i},     /* channel sidebar */
.${o} { /* member list */
  display: none !important;
}`;let e=null;function r(n){n.code==="KeyH"&&n.ctrlKey&&n.getModifierState("Alt")&&(e===null?e=s.injectCSS(a):(e(),e=null))}var c={onLoad:()=>document.addEventListener("keyup",r),onUnload(){document.removeEventListener("keyup",r),e?.()}};return c})(cumcord.patcher,cumcord.modules.webpack);
