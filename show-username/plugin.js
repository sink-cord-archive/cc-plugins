(function(i,s,a,m,c,p,x,h){"use strict";function g(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}function S(e){if(e&&e.__esModule)return e;var r=Object.create(null);return e&&Object.keys(e).forEach(function(t){if(t!=="default"){var n=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(r,t,n.get?n:{enumerable:!0,get:function(){return e[t]}})}}),r.default=e,Object.freeze(r)}var o=S(p),f=g(h);const[y,L,P,{getMember:b},{getUser:E},v,w]=c.batchFind(({findByProps:e,findByDisplayName:r,find:t})=>{r("VoiceUsers"),r("FormText"),r("Switch"),e("getMember"),e("getUser","_dispatcher"),t(n=>n.type?.toString().indexOf("MESSAGE_A11Y_ROLE_DESCRIPTION")>-1),r("ConnectedChannelMembers",!1)});var M=a.after("type",v,([{channel:e,message:r}],t)=>{if(!s.persist.ghost.msg)return;const n=m.findInReactTree(t,N=>N?.childrenHeader)?.childrenHeader.props.author;if(!n)return;const d=b(e.guild_id,r.author.id),l=E(r.author.id);return d?.nick&&(n.nick=s.persist.ghost.paren?`${d.nick} (${l.username})`:l.username),t}),k=a.after("render",y.prototype,(e,r)=>{if(!(!s.persist.ghost.vc||!r?.props?.children?.[0])){for(const t of r.props.children)t?.props?.nick&&(t.props.nick=s.persist.ghost.paren?`${t.props.nick} (${t.props.user.username})`:t.props.user.username);return r}}),R=()=>a.injectCSS(".ysink_usern_row{display:flex;align-items:center;gap:.5rem;margin-bottom:1rem}"),O=a.after("default",w,(e,r)=>{if(!s.persist.ghost.ml)return;const t=m.findInReactTree(r,n=>n?.rows)?.rows;if(!!t){for(const n of t)!n||(n.YS_UN=1,n?.type==="MEMBER"&&!n.YS_UN&&n.nick&&(n.nick=s.persist.ghost.paren?`${n.nick} (${n.user.username})`:n.user.username));return r}});const j=c.findByDisplayName("FormText"),C=c.findByDisplayName("Switch");c.findByDisplayName("TextInput"),c.findByDisplayName("Select",!1).SingleSelect;const T=e=>({display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem",marginLeft:e!==void 0?"1rem":0}),u=({k:e,depends:r,children:t})=>f.default.createElement("div",{style:T(r)},f.default.createElement(C,{checked:s.persist.ghost[e],disabled:r!==void 0&&!s.persist.ghost[r],onChange:n=>s.persist.store[e]=n}),f.default.createElement(j,{children:t})),U=e=>r=>(m.useNest(s.persist),e(r));((e,r=s.persist)=>{for(const t in e)r.ghost[t]===void 0&&(r.store[t]=e[t])})({vc:!0,ml:!0,msg:!0,paren:!0});var $=U(()=>o.createElement(o.Fragment,null,o.createElement(u,{k:"vc"},"Show usernames in Voice Chat"),o.createElement(u,{k:"ml"},"Show usernames in Member List"),o.createElement(u,{k:"msg"},"Show usernames in Member List"),o.createElement(u,{k:"paren"},"Show username in parenthesis instead of replacing nickname")));const F=[R(),M,k,O],I=()=>_.forEachRight(F,e=>e());return i.onUnload=I,i.settings=$,Object.defineProperty(i,"__esModule",{value:!0}),i})({},cumcord.pluginData,cumcord.patcher,cumcord.utils,cumcord.modules.webpack,cumcord.modules.common.React,cumcord.plugins,cumcord.modules.common.React);
