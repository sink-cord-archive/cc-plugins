(function(n,b,i,f,d){"use strict";const[{getChannel:w},{getMessages:A},N]=b.batchFind(({findByProps:e})=>{e("getDMUserIds"),e("getRawMessages"),e("setPendingReplyShouldMention")}),T=()=>w(d.getChannelId()),c=new Set;let t=-1,l=d.getChannelId(),u,a=Symbol("quickreply_deletePendingReply_int");function _(){const e=document.querySelector('[data-list-id="chat-messages"]');Array.from(e.children).find(r=>r.firstChild?.className?.includes("replying-"))?.scrollIntoView({behavior:"smooth",block:"center"})}function I(e,r,s,o){typeof o=="undefined"&&(o=e.guild_id!==null),i.FluxDispatcher.dirtyDispatch({type:n.ActionTypes.CREATE_PENDING_REPLY,channel:e,message:r,shouldMention:s,showMentionToggle:o}),setTimeout(_,100)}function E(e){i.FluxDispatcher.dirtyDispatch({type:n.ActionTypes.DELETE_PENDING_REPLY,channelId:d.getChannelId(),...e})}function p(e){l!==e.channelId&&(l=e.channelId,t=-1)}function y(e){u=e.message.id}function h(e){u=void 0,e[a]||(t=-1)}async function g(e){if(!e.ctrlKey||e.key!=="ArrowUp"&&e.key!=="ArrowDown")return;const r=(await A(d.getChannelId())).toArray().reverse(),s=r.findIndex(o=>o.id===u)||0;if(e.key==="ArrowUp"?t=s+1:e.key==="ArrowDown"&&(t=s-1),t>r.length&&(t=r.length),t<0)return E();E({[a]:!0}),I(T(),r[t],!c.has(d.getChannelId()))}let D;var P={onLoad(){i.FluxDispatcher.subscribe(n.ActionTypes.CHANNEL_SELECT,p),i.FluxDispatcher.subscribe(n.ActionTypes.CREATE_PENDING_REPLY,y),i.FluxDispatcher.subscribe(n.ActionTypes.DELETE_PENDING_REPLY,h),window.addEventListener("keydown",g),D=f.before("setPendingReplyShouldMention",N,e=>{e[1]?c.delete(e[0]):c.add(e[0])})},onUnload(){i.FluxDispatcher.unsubscribe(n.ActionTypes.CHANNEL_SELECT,p),i.FluxDispatcher.unsubscribe(n.ActionTypes.CREATE_PENDING_REPLY,y),i.FluxDispatcher.unsubscribe(n.ActionTypes.DELETE_PENDING_REPLY,h),window.removeEventListener("keydown",g),D?.()}};return P})(cumcord.modules.common.constants,cumcord.modules.webpack,cumcord.modules.common,cumcord.patcher,cumcord.modules.common.channels);
