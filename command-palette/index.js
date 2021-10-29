import injectCss from "./styles.sass";
import keybindPatch from "./patches/keybind.js";
import paletteEntries from "./paletteEntries.js";
import exposeApiPatch from "./patches/exposeApi.js";

import Settings from "./Settings";
import React from "@cumcord/modules/common/React";

export default ({ persist, id }) => {
    // initialise nest
    persist.store.customEntries = [];
    if (!persist.ghost.usageCounts) persist.store.usageCounts = new Map();
    if (!persist.ghost.keyBind)
        persist.store.keyBinds = {
            ctrlMeta: true,
            shift: true,
            code: 80,
        };

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
            delete persist.store.customEntries;
            patches.forEach((unpatch) => unpatch());
        },

        settings: React.createElement(Settings, { persist }),
    };
};
