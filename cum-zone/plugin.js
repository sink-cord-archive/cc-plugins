(function(s,D,h,u,t,S,c,F){"use strict";function _(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var b=_(D),m=_(S);function g(e){let a=new XMLHttpRequest;a.open("GET",e,!1),a.send(null),console.log(a.responseText);let i=[];try{i=JSON.parse(a.responseText)}catch{return[]}return Object.keys(i).map(l=>{let r=i[l];return r.url=l,r})}const R=s.findByDisplayName("FormText"),E="Welcome to the cum zone - Only cum inside anime girls - Quivering clit, double jointed pussy - Fresh balls, elegant ejaculation - First the kiss, then the cum - My dick is in love with pain - Co-op cock torture - Stuff my dick into a furnace - Stitch my cock shut - Pressure cook my greasy balls - Cumblast me and make it snappy - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - Cum, cum, cum, cum, cum, cum, cum, cum - What's all the cummotion? - My dad fell into a cum shaft - My dad glazed my face with cum - Fertilize a baby with hunk spunk - Cum spunk in my trunk - Cum craving toddler - Cum drippin' cunt - Cummy Rae Jepsen - Cum me maybe - Cummy bottom boy - Night of the living cum - Nefarious cum mastermind - Cum makes me fearless - Cum crammer, cock slammer - Cum slammed ya mum - Mail your mums pieces of my dick - Bazinga! - Chug the cum, fug ya mum - Fuck my asshole full of cum - Three little words - Get fucked, nerd - Cum stuffer, jenkem huffer - Fuck my cum puddle - Bottom stuffer, semen huffer - Would love a gator to fuck me - Undercooked baby pig penises - Help my dogs get a huge boner - Water bong full of cat cum - Accidentally fucked my own ass - I barely had any dicks inside me - Who ate all my cum? A mystery - Cum detective hot on the trail - Bees make honey, I make cummy";let N=[];for(let e=0;e<40;e++)N.push(0);var z=({fillscreen:e})=>e?t.React.createElement(R,{className:"ysink_ticker_fillscreen"},N.map(a=>t.React.createElement("marquee",{className:"ysink_cuminside",scrolldelay:"65"},E))):t.React.createElement(R,{className:"ysink_ticker"},t.React.createElement("marquee",{className:"ysink_cuminside",scrolldelay:"65"},E));const M=s.findByDisplayName("FormTitle"),C=s.findByDisplayName("FormText"),w=s.findByDisplayName("FormDivider"),n=s.findByProps("Sizes","Colors","Looks","DropdownSizes");var I=({plugin:e})=>{let a=m.default.installed.ghost,i=Object.keys(a).map(r=>[r,a[r].enabled]).filter(r=>typeof r[1]=="boolean");function l(r,k){return i.find(o=>o[0]==r)==null?t.React.createElement(n,{className:"ysink_button",color:n.Colors.BRAND,size:n.Sizes.TINY,look:n.Looks.OUTLINED,onClick:()=>{m.default.importPlugin(r).then(()=>c.showToast({title:"Installed plugin "+k,duration:5e3}))}},"Install"):i.find(o=>o[0]==r)[1]?t.React.createElement(n,{className:"ysink_button",color:n.Colors.GREEN,size:n.Sizes.TINY,look:n.Looks.OUTLINED},"Running"):t.React.createElement(n,{className:"ysink_button",color:n.Colors.GREY,size:n.Sizes.TINY,look:n.Looks.OUTLINED},"Installed")}return u.useNest(m.default.installed),t.React.createElement("div",{className:"ysink_card"},t.React.createElement("div",{className:"ysink_row"},t.React.createElement(M,{tag:"p",className:"ysink_title"},e.name),l("https://"+e.url+"/",e.name)),t.React.createElement(C,{className:"ysink_desc"},e.description),t.React.createElement(w,{className:"ysink_divide"}),t.React.createElement(C,{className:"ysink_author_licence"},"by ",e.author," under ",e.license))};const L=s.findByDisplayName("FormTitle"),P=s.findByDisplayName("FormText");s.findByDisplayName("FormDivider");const v=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),$=cumcord.modules.webpack.findByProps("BadgeShapes");var j=({repo:e,nest:a})=>t.React.createElement("div",{className:"ysink_card"},t.React.createElement("div",{className:"ysink_row"},t.React.createElement("div",null,t.React.createElement(L,{tag:"p",className:"ysink_title"},e.name,e.official?t.React.createElement($.TextBadge,{className:"ysink_badge",text:"official repo",color:"var(--info-positive-foreground)"}):[]),t.React.createElement(P,null,e.url)),t.React.createElement(v,{color:v.Colors.RED,className:"ysink_button",onClick:()=>a.store.repos=a.ghost.repos.filter(i=>i.url!=e.url)},"Remove Repo")));const A=s.findByDisplayName("FormTitle"),O=s.findByDisplayName("FormText"),U=s.findByDisplayName("FormSection"),y=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),Y=[{url:"https://cumcordplugins.github.io/Condom/plugins-large.json",name:"Condom",enabled:!0,official:!0}];function B(e){e.repos=Y}const x=({store:e})=>t.React.createElement(U,{className:"ysink_splash"},t.React.createElement(A,{tag:"h2"},"No Repos!"),t.React.createElement(O,null,"You do not have any repos added!"),t.React.createElement(y,{className:"ysink_button",color:y.Colors.GREEN,sizes:y.Sizes.LARGE,onClick:()=>B(e)},"Reset repo list to default")),G=t.React.useState,d=s.findByProps("ModalCloseButton"),T=s.findByDisplayName("Header"),p=s.findByDisplayName("Flex"),{openModal:W}=s.findByProps("openModal"),H=s.findByDisplayName("FormSection"),Z=s.findByDisplayName("FormDivider"),q=s.findByDisplayName("TextInput"),J=s.findByProps("Sizes","Colors","Looks","DropdownSizes");function K(e){try{return g(e),!0}catch{return!1}}function Q(e,a){if(e.ghost.repos.find(i=>i.url==a)!==void 0)c.showToast({title:"You already have this repo!",duration:5e3});else if(K(a)){let i=e.ghost.repos;i.push({url:a,name:"new repo",enabled:!0}),e.store.repos=i,c.showToast({title:"Added repo",duration:5e3})}else c.showToast({title:"Repo was invalid",duration:5e3})}const X=({nest:e,e:a})=>{const[i,l]=G("");return u.useNest(e),t.React.createElement(h.ErrorBoundary,null,t.React.createElement(d.ModalRoot,{transitionState:a.transitionState,size:"large",className:"ysink_modal"},t.React.createElement(d.ModalHeader,{separator:!1},t.React.createElement(p.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},t.React.createElement(T,{tag:"h2",size:T.Sizes.SIZE_20},"Manage Repos")),t.React.createElement(p.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},t.React.createElement(d.ModalCloseButton,{onClick:a.onClose}))),t.React.createElement(d.ModalContent,null,t.React.createElement(H,null,t.React.createElement(p,{basis:"auto",grow:1,shrink:1,className:"ysink_row"},t.React.createElement(q,{className:"ysink_input",placeholder:"https://example.com/repo.json",type:"text",value:i,onChange:r=>l(r)}),t.React.createElement(J,{onClick:()=>{l(""),Q(e,i)}},"Add")),t.React.createElement(Z,{className:"ysink_divide"}),e.ghost.repos.length==0?t.React.createElement(x,{store:e.store}):e.ghost.repos.map(r=>t.React.createElement(j,{repo:r,nest:e}))))))};var V=e=>W(a=>t.React.createElement(X,{nest:e,e:a}));const ee=s.findByDisplayName("FormTitle");s.findByDisplayName("FormText");const te=s.findByDisplayName("FormSection"),ae=s.findByDisplayName("FormDivider"),se=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),ie=e=>e.map(a=>g(a.url)).reduce((a,i)=>a.concat(i));var re=({nest:e})=>(u.useNest(e),t.React.createElement(h.ErrorBoundary,null,t.React.createElement(te,null,t.React.createElement("div",{className:"ysink_header"},t.React.createElement(ee,{tag:"h1"},"Welcome to the Cum Zone"),t.React.createElement(se,{className:"ysink_button",onClick:()=>V(e)},"Manage Repos")),t.React.createElement(z,null),t.React.createElement(ae,{className:"ysink_divide"}),e.ghost.repos.length==0?t.React.createElement(x,{store:e.store}):t.React.createElement("div",{className:"ysink_card_container"},ie(e.ghost.repos).map(a=>t.React.createElement(I,{plugin:a})))))),ne=()=>cumcord.patcher.injectCSS(".ysink_cuminside{font-size:1.2rem;padding-bottom:1rem;font-style:italic}.ysink_card_container{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}.ysink_card{padding:1rem;border:1px solid var(--background-modifier-accent);border-radius:.25rem;display:flex;flex-direction:column}.ysink_card .ysink_title{font-size:1rem;padding-bottom:.25rem;display:inline;flex:1;margin:0}.ysink_card .ysink_button{display:inline}.ysink_card .ysink_row{display:flex}.ysink_card .ysink_divide{margin:.2rem 0}.ysink_card .ysink_author_licence{font-style:italic}.ysink_card button{padding:0}.ysink_card button>div{padding:2px 16px}.ysink_card button{margin-bottom:.2rem;width:6rem}.ysink_card .ysink_desc{flex:1}.ysink_header{display:flex}.ysink_header>*{flex:1}.ysink_header>:last-child{flex:unset}.ysink_card .ysink_row>*{flex:1}.ysink_card .ysink_row>:last-child{flex:unset}.ysink_modal .ysink_row{display:flex}.ysink_modal .ysink_row>*{flex:1}.ysink_modal .ysink_row>:last-child{flex:unset;margin-left:1rem}.ysink_divide{margin:0 0 1rem}.ysink_modal .ysink_divide{margin:.5rem 0}.ysink_splash{display:flex;justify-content:center;align-items:center;margin-top:10rem;flex-flow:column nowrap}.ysink_modal .ysink_splash{margin-top:6rem}.ysink_splash .ysink_button{margin-top:1rem}.ysink_badge{display:inline;margin-left:.5rem}.ysink_ticker{margin-top:.2rem}.ysink_ticker_fillscreen{position:fixed;left:0;top:1rem;width:100vw;height:100vh;opacity:.1;pointer-events:none}.ysink_card{z-index:1;background-color:var(--deprecated-card-bg)}");let f=[];var le=e=>({async onLoad(){const a=e.persist;Array.isArray(a.ghost.repos)||B(a.store),f.push(ne());let i=cumcord.modules.webpack.findByDisplayName("SettingsView").prototype;f.push(b.default.after("getPredicateSections",i,(l,r)=>{if(r[1].label!=F.USER_SETTINGS_MY_ACCOUNT)return;let k=r.findIndex(o=>o.label=="Cumcord")+2;return r.splice(k,0,{section:"YSINK_CUMZONE",label:"The Cum Zone",element:()=>t.React.createElement(re,{nest:a})}),r}))},onUnload:()=>f.forEach(a=>a())});return le})(cumcord.modules.webpack,cumcord.patcher,cumcord.ui.components,cumcord.utils,cumcord.modules.common,cumcord.plugins,cumcord.ui.toasts,cumcord.modules.common.i18n.Messages);
