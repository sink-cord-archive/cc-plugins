import injectCss from "./styles.css";
import keybindPatch from "./patches/keybind.js";
import paletteEntries from "./paletteEntries.js";

export default ({ persist, id }) => {
    let patches = [];

    return {
        onLoad() {
            if (!Array.isArray(persist.ghost.customEntries)) persist.store.customEntries = [];
            
            patches.push(injectCss(), keybindPatch(persist, paletteEntries));
        },
        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
