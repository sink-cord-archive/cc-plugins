(function(c,i){"use strict";var m=c.memo(({src:a})=>i.React.createElement("img",{src:a,className:"ysink_activity_image"})),n=()=>cumcord.patcher.injectCSS(".ysink_activity_image{height:2rem;border-radius:.3rem}.icon-15YQ1T{display:none}.children-gzQq2t{display:flex}"),o=a=>{let s=null;return{onLoad(){n();let p=cumcord.modules.webpack.findByDisplayName("MemberListItem").prototype;s=cumcord.patcher.after("render",p,(l,t)=>{if(!t.props?.subText?.props)return;const r=t?.props?.subText?.props?.activities;if(!!r?.length){t.props.children=[];for(const e of r)if(e.application_id&&e.assets&&(e.assets?.large_image||e.assets?.small_image)){const d=`https://cdn.discordapp.com/app-assets/${e.application_id}/${e.assets?.large_image||e.assets?.small_image}.png`;t.props.children.push(i.React.createElement(m,{src:d}))}return t}})},onUnload(){s&&s()}}};return o})(cumcord.modules.common.React,cumcord.modules.common);
