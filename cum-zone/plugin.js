(function(i,o,t,d,y){"use strict";function r(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var f=r(o),p=r(d),h=r(y);function k(e){let a=new XMLHttpRequest;a.open("GET",e,!1),a.send(null);let n=JSON.parse(a.responseText);return Object.keys(n).map(u=>{let s=n[u];return s.url=u,s})}const g=i.findByDisplayName("FormText"),_="Welcome to the cum zone - Only cum inside anime girls - Quivering clit, double jointed pussy - Fresh balls, elegant ejaculation - First the kiss, then the cum - My dick is in love with pain - Co-op cock torture - Stuff my dick into a furnace - Stitch my cock shut - Pressure cook my greasy balls - Cumblast me and make it snappy - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - What's all the cummotion? - My dad fell into a cum shaft - My dad glazed my face with cum - Fertilize a baby with hunk spunk - Cum spunk in my trunk - Cum craving toddler - Cum drippin' cunt - Cummy Rae Jepsen - Cum me maybe - Cummy bottom boy - Night of the living cum - Nefarious cum mastermind - Cum makes me fearless - Cum crammer, cock slammer - Cum slammed ya mum - Mail your mums pieces of my dick - Bazinga! - Chug the cum, fug ya mum - Fuck my asshole full of cum - Three little words - Get fucked, nerd - Cum stuffer, jenkem huffer - Fuck my cum puddle - Bottom stuffer, semen huffer - Would love a gator to fuck me - Undercooked baby pig penises - Help my dogs get a huge boner - Water bong full of cat cum - Accidentally fucked my own ass - I barely had any dicks inside me - Who ate all my cum? A mystery - Cum detective hot on the trail - Bees make honey, I make cummy";var C=()=>t.React.createElement(g,null,t.React.createElement("marquee",{className:"ysink_cuminside"},_));const N=i.findByDisplayName("FormTitle"),l=i.findByDisplayName("FormText"),b=i.findByDisplayName("FormDivider"),c=i.findByProps("Sizes","Colors","Looks","DropdownSizes");var v=({plugin:e})=>t.React.createElement("div",{className:"ysink_card"},t.React.createElement("div",{className:"ysink_row"},t.React.createElement(N,{tag:"p",className:"ysink_title"},e.name),t.React.createElement(c,{className:"ysink_button",color:c.Colors.BRAND,size:c.Sizes.SMALL,look:c.Looks.OUTLINED,onClick:()=>{p.default.importPlugin("https://"+e.url).then(()=>h.default.toasts.showToast({title:"Installed plugin "+e.name,duration:5e3}))}},"Install")),t.React.createElement(l,null,e.description),t.React.createElement(b,{className:"ysink_divide"}),t.React.createElement(l,{className:"ysink_author_licence"},"by ",e.author," under ",e.license));const E=i.findByDisplayName("FormTitle");i.findByDisplayName("FormText");const F=i.findByDisplayName("FormSection");i.findByDisplayName("Flex");const R=e=>e.map(k).reduce((a,n)=>a.concat(n));var T=({repos:e})=>t.React.createElement(F,null,t.React.createElement(E,{tag:"h1"},"Welcome to the Cum Zone"),t.React.createElement(C,null),t.React.createElement("div",{className:"ysink_card_container"},R(e).map(a=>t.React.createElement(v,{plugin:a})))),B=()=>cumcord.patcher.injectCSS(".ysink_cuminside{font-size:1.2rem;padding-bottom:1rem;font-style:italic}.ysink_card_container{display:grid;grid-template-columns:1fr 1fr}.ysink_card{margin:.25rem;padding:1rem;border:1px solid var(--background-modifier-accent);border-radius:.25rem}.ysink_card .ysink_title{font-size:1rem;padding-bottom:.25rem;display:inline;flex:1;margin:0}.ysink_card .ysink_button{display:inline}.ysink_card .ysink_row{display:flex}.ysink_card .ysink_divide{margin:.2rem 0}.ysink_card .ysink_author_licence{font-style:italic}");const D=["https://cumcordplugins.github.io/Condom/plugins-large.json"];let m=[];var x=e=>({async onLoad(){const a=e.persist.store;Array.isArray(a.repos)||(a.repos=D),m.push(B());let n=cumcord.modules.webpack.findByDisplayName("SettingsView").prototype;m.push(f.default.after("getPredicateSections",n,(u,s)=>{if(s[1].section!="My Account")return;let S=s.findIndex(z=>z.label=="Cumcord")+2;return s.splice(S,0,{section:"YSINK_CUMZONE",label:"The Cum Zone",element:()=>t.React.createElement(T,{repos:a.repos})}),s}))},onUnload:()=>m.forEach(a=>a())});return x})(cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common,cumcord.plugins,cumcord.ui);
