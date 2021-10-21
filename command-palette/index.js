import injectCss from "./styles.css";
import keybindPatch from "./patches/keybind.js";
import paletteEntries from "./paletteEntries.js";
import exposeApiPatch from "./patches/exposeApi.js";

export default ({ persist, id }) => {
    // initialise nest
    persist.store.customEntries = [];
    if (!persist.ghost.usageCounts) persist.store.usageCounts = new Map();

    // load patches
    let patches = [
        injectCss(),
        keybindPatch(persist, paletteEntries),
        exposeApiPatch(persist),
    ];

    // remove patches and reset custom entries
    return {
        onUnload: () => {
            persist.store.customEntries = [];
            patches.forEach((unpatch) => unpatch());
        },
    };
};
