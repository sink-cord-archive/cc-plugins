(function(n,s,c){"use strict";function a(e){const t="https://media.discordapp.net/attachments/",i="https://cdn.discordapp.com/attachments/";return e.startsWith(t)?i+e.slice(t.length):e}function r(e){return e.content_type?.startsWith("image/svg+xml")&&(e.width=e.height=1e3,e.filename+=".png",e.proxy_url=a(e.proxy_url)),e}const o=c.before("default",s.findByDisplayName("ConnectedMessageAccessories",!1),e=>{const t=e[0].message;return t.attachments=t.attachments.map(r),e});return n.onUnload=o,Object.defineProperty(n,"__esModule",{value:!0}),n})({},cumcord.modules.webpack,cumcord.patcher);