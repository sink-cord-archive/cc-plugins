(function(c,y,t,f,p){"use strict";function u(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var k=u(y),h=u(f),g=u(p);function _(e){let a=new XMLHttpRequest;a.open("GET",e,!1),a.send(null);let n=JSON.parse(a.responseText);return Object.keys(n).map(l=>{let i=n[l];return i.url=l,i})}const C=c.findByDisplayName("FormText"),N="Welcome to the cum zone - Only cum inside anime girls - Quivering clit, double jointed pussy - Fresh balls, elegant ejaculation - First the kiss, then the cum - My dick is in love with pain - Co-op cock torture - Stuff my dick into a furnace - Stitch my cock shut - Pressure cook my greasy balls - Cumblast me and make it snappy - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - What's all the cummotion? - My dad fell into a cum shaft - My dad glazed my face with cum - Fertilize a baby with hunk spunk - Cum spunk in my trunk - Cum craving toddler - Cum drippin' cunt - Cummy Rae Jepsen - Cum me maybe - Cummy bottom boy - Night of the living cum - Nefarious cum mastermind - Cum makes me fearless - Cum crammer, cock slammer - Cum slammed ya mum - Mail your mums pieces of my dick - Bazinga! - Chug the cum, fug ya mum - Fuck my asshole full of cum - Three little words - Get fucked, nerd - Cum stuffer, jenkem huffer - Fuck my cum puddle - Bottom stuffer, semen huffer - Would love a gator to fuck me - Undercooked baby pig penises - Help my dogs get a huge boner - Water bong full of cat cum - Accidentally fucked my own ass - I barely had any dicks inside me - Who ate all my cum? A mystery - Cum detective hot on the trail - Bees make honey, I make cummy";var b=()=>t.React.createElement(C,null,t.React.createElement("marquee",{className:"ysink_cuminside"},N));const E=c.findByDisplayName("FormTitle"),d=c.findByDisplayName("FormText"),R=c.findByDisplayName("FormDivider"),s=c.findByProps("Sizes","Colors","Looks","DropdownSizes");var v=({plugin:e})=>{let a=cumcord.plugins.installed.ghost,n=Object.keys(a).map(i=>[i,a[i].enabled]).filter(i=>typeof i[1]=="boolean");console.log(n);function l(i,o){return n.find(r=>r[0]==i)==null?t.React.createElement(s,{className:"ysink_button",color:s.Colors.BRAND,size:s.Sizes.SMALL,look:s.Looks.OUTLINED,onClick:()=>{h.default.importPlugin(i).then(()=>g.default.toasts.showToast({title:"Installed plugin "+o,duration:5e3}))}},"Install"):n.find(r=>r[0]==i)[1]?t.React.createElement(s,{className:"ysink_button",color:s.Colors.GREEN,size:s.Sizes.SMALL,look:s.Looks.OUTLINED},"Running"):t.React.createElement(s,{className:"ysink_button",color:s.Colors.GREY,size:s.Sizes.SMALL,look:s.Looks.OUTLINED},"Installed")}return t.React.createElement("div",{className:"ysink_card"},t.React.createElement("div",{className:"ysink_row"},t.React.createElement(E,{tag:"p",className:"ysink_title"},e.name),l("https://"+e.url+"/",e.name)),t.React.createElement(d,null,e.description),t.React.createElement(R,{className:"ysink_divide"}),t.React.createElement(d,{className:"ysink_author_licence"},"by ",e.author," under ",e.license))};const F=c.findByDisplayName("FormTitle");c.findByDisplayName("FormText");const S=c.findByDisplayName("FormSection");c.findByDisplayName("Flex");const T=e=>e.map(_).reduce((a,n)=>a.concat(n));var D=({repos:e})=>t.React.createElement(S,null,t.React.createElement(F,{tag:"h1"},"Welcome to the Cum Zone"),t.React.createElement(b,null),t.React.createElement("div",{className:"ysink_card_container"},T(e).map(a=>t.React.createElement(v,{plugin:a})))),L=()=>cumcord.patcher.injectCSS(".ysink_cuminside{font-size:1.2rem;padding-bottom:1rem;font-style:italic}.ysink_card_container{display:grid;grid-template-columns:1fr 1fr}.ysink_card{margin:.25rem;padding:1rem;border:1px solid var(--background-modifier-accent);border-radius:.25rem}.ysink_card .ysink_title{font-size:1rem;padding-bottom:.25rem;display:inline;flex:1;margin:0}.ysink_card .ysink_button{display:inline}.ysink_card .ysink_row{display:flex}.ysink_card .ysink_divide{margin:.2rem 0}.ysink_card .ysink_author_licence{font-style:italic}");const B=["https://cumcordplugins.github.io/Condom/plugins-large.json"];let m=[];var x=e=>({async onLoad(){const a=e.persist.store;Array.isArray(a.repos)||(a.repos=B),m.push(L());let n=cumcord.modules.webpack.findByDisplayName("SettingsView").prototype;m.push(k.default.after("getPredicateSections",n,(l,i)=>{if(i[1].section!="My Account")return;let o=i.findIndex(r=>r.label=="Cumcord")+2;return i.splice(o,0,{section:"YSINK_CUMZONE",label:"The Cum Zone",element:()=>t.React.createElement(D,{repos:a.repos})}),i}))},onUnload:()=>m.forEach(a=>a())});return x})(cumcord.modules.webpack,cumcord.patcher,cumcord.modules.common,cumcord.plugins,cumcord.ui);
