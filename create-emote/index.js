// huge credit to A User for the vizality original @ https://github.com/A-User-s-Discord-Plugins/emoji-util

import cssInject from "./styles.css";
import patchContextMenu from "./patchContextMenu.jsx";
import patchEmotePicker from "./patchEmotePicker.jsx";

export default (data) => {
    let patches = [];

    return {
        onLoad: () =>
            patches.push(cssInject(), patchContextMenu(), patchEmotePicker()),
        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
