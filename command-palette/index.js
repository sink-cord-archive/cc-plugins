import injectCss from "./styles.css";
import keybindPatch from "./patches/keybind.js";
import paletteEntries from "./paletteEntries.js";
import exposeApiPatch from "./patches/exposeApi.js";

export default ({ persist, id }) => {
    // initialise nest
    if (!Array.isArray(persist.ghost.customEntries))
        persist.store.customEntries = [];
    if (!persist.ghost.usageCounts) persist.store.usageCounts = new Map();

    // load patches
    let patches = [];
    return {
        onLoad: () =>
            patches.push(
                injectCss(),
                keybindPatch(persist, paletteEntries),
                exposeApiPatch(persist)
            ),
        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
