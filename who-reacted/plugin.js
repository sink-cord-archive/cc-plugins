(function(n,r,d,s,x,E,S){"use strict";function k(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var C=k(E),N=()=>cumcord.patcher.injectCSS(".ysink_reacted_grid{display:grid;gap:1rem;grid-template-columns:auto 1fr;align-items:center}.ysink_reacted_grid>div{font-weight:bold}.ysink_reacted_reactors{margin-left:6px}.ysink_reacted_reactors .more_reactors{background-color:var(--background-tertiary);color:var(--text-normal);font-weight:500}");const U=n.findByDisplayName("TextInput"),u=n.findByDisplayName("Slider"),w=n.findByDisplayName("Switch"),l=n.findByDisplayName("FormText"),h=e=>e===0?"Off":e%1e3==0?`${e/1e3}k`:e;var B=()=>(d.useNest(r.persist),s.React.createElement("div",{className:"ysink_reacted_grid"},s.React.createElement(l,null,"Max Users Shown"),s.React.createElement(U,{note:"The maximum number of users shown per reaction between 0 and 99.",value:r.persist.ghost.maxUsersShown??6,type:"text",onChange:e=>{!isNaN(e)&&e>=0&&e<=99&&(r.persist.store.maxUsersShown=e)}}),s.React.createElement(l,null,"Reaction Threshold"),s.React.createElement(u,{maxValue:20,markers:_.range(21),stickToMarkers:!0,initialValue:r.persist.ghost.reactionThreshold??10,onValueChange:e=>{r.persist.store.reactionThreshold=e},onMarkerRender:h}),s.React.createElement(l,null,"User Threshold"),s.React.createElement(u,{maxValue:1e4,markers:[0,10,20,50,100,500,1e3,2e3,3e3,4e3,5e3,1e4],stickToMarkers:!0,initialValue:r.persist.ghost.userThreshold??100,onValueChange:e=>{r.persist.store.userThreshold=e},onMarkerRender:h,equidistant:!0}),s.React.createElement(l,null,"Use highest user count"),s.React.createElement(w,{checked:r.persist.ghost.useHighestUserCount??!0,onChange:e=>{r.persist.store.useHighestUserCount=e}})));const m=n.findByProps("reaction").reaction,I=async e=>{let t;for(;!(t=document.getElementsByClassName(e)[0]);)await d.sleep(50);return t},p=e=>d.findInTree(d.getReactInstance(e),t=>t?.type?.displayName==="Reaction",{walkable:["return"]}),M=async()=>p(await I(m)).type,f=()=>{const e=document.getElementsByClassName(m);for(const t of e)p(t).stateNode.forceUpdate()},y=n.findByProps("getReactions","_dispatcher"),V=n.findByDisplayName("VoiceUserSummaryItem"),v=({count:e,max:t,users:a})=>{function c(o,i){return s.React.createElement("div",{className:`${i} more_reactors`},"+",1+e-t)}return s.React.createElement(V,{className:"ysink_reacted_reactors",max:t,users:a,renderMoreUsers:c})};var j=S.connectStores([y],({message:e,emoji:t})=>({users:Object.values(y.getReactions(e.getChannelId(),e.id,t)??{})}))(v);const b=({reactions:e})=>{const t=r.persist.ghost.reactionThreshold??10;if(t!==0&&e.length>t)return!1;const a=r.persist.ghost.userThreshold??100;return!(a!==0&&(r.persist.ghost.useHighestUserCount??!0?Math.max(...e.map(o=>o.count)):e.reduce((o,i)=>o+i.count,0))>a)};var F=async()=>{const e=await M(),t=x.after("render",e.prototype,function(a,c){const{message:o,emoji:i,count:L}=this.props;if(b(o)){const $=c.props.children;c.props.children=O=>{const g=$(O),R=g.props.children.props.children,P=R.props.children;return R.props.children=q=>{const T=P(q);return T.props.children.props.children.push(C.default.createElement(j,{message:o,emoji:i,count:L,max:r.persist.ghost.maxUsersShown??6})),T},g}}return c});return f(),()=>{t(),f()}},H=()=>{let e=[];return{onLoad:async()=>{e=[N(),await F()]},onUnload:()=>_.forEachRight(e,t=>t?.()),settings:B}};return H})(cumcord.modules.webpack,cumcord.pluginData,cumcord.utils,cumcord.modules.common,cumcord.patcher,cumcord.modules.common.React,cumcord.modules.common.Flux);