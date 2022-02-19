/*\
|*| this is a quick and dirty plugin thrown togther for someone at request
|*| this will not be going on any plugin stores nor be listed in the readme
|*| the code will be annotated fully too.
\*/

// we will need these functions that cumcord provides for us
import { injectCSS } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";

// unfortunately, discord's CSS classes change. Instead of hardcording them and updating the plugin on change,
// we can grab them from discord itself. Going into the intricacies of module finding is not necessary for
// this plugin, but essentially, this just gets the css classes we need.
const sidebarClass = findByProps("activityPanel").sidebar;
const memberListClass = findByProps("membersGroup").container;

// this holds the actual css that we will inject while "purifying" chat
// it is a const, i.e. cannot be modified.
// Template literal (`) allows newlines and inserting the result of js expressions with ${}
const purifyCss = `
nav,                  /* server list */
section,              /* channel header */
.${sidebarClass},     /* channel sidebar */
.${memberListClass} { /* member list */
  display: none !important;
}`;

// this variable will contain a function to remove the css while in pure mode
let removeCss = null;

// this function will receive a KeyEvent (e) for every keypress that happens
function keyHandler(e) {
    // check if we're interested in the keypress
    if (e.code === "KeyH" && e.ctrlKey && e.getModifierState("Alt")) {
        // if our css is injected, remove it, else inject it!

        if (removeCss === null) {
            removeCss = injectCSS(purifyCss);
        } else {
            removeCss();
            removeCss = null;
        }
    }
}

// this object contains the code that tells cumcord how we want to start and stop our function
export default {
    onLoad() {
        // actually assign our keyHandler function to the keyup event
        document.addEventListener("keyup", keyHandler);
    },
    onUnload() {
        // stop listening for keypresses
        document.removeEventListener("keyup", keyHandler);
        // remove the css. The `?.` is so that it doesnt error if removeCss is null
        removeCss?.();
    },
};
