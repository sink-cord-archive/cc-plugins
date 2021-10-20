import injectCss from "./styles.css";
import keybindPatch from "./patches/keybind.js"

export default ({ persist, id }) => {
    let patches = [];

    return {
        onLoad: () => patches.push(injectCss(), keybindPatch()),
        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
