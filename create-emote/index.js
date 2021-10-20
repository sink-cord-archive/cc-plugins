// huge credit to A Useer for the vizality original @ https://github.com/A-User-s-Discord-Plugins/emoji-util

import cssInject from "./styles.css";
import patchContextMenu from "./patchContextMenu.jsx";

export default (data) => {
    let patches = [];

    return {
        onLoad() {
            patches.push(cssInject(), patchContextMenu());
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
