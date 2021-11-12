import injectCss from "./styles.sass";
import keybindPatch from "./patches/keybind.js";
import paletteEntries from "./paletteEntries.js";
import exposeApiPatch from "./patches/exposeApi.js";

import Settings from "./Settings";
import React from "@cumcord/modules/common/React";
import { nests } from "@cumcord/modules/internal";

export default ({ persist, id }) => {
    // initialise nest
    persist.store.customEntries = [];
    if (!persist.ghost.usageCounts) persist.store.usageCounts = new Map();
    if (!persist.ghost.keyBind)
        persist.store.keyBind = {
            ctrlMeta: true,
            shift: true,
            code: 80,
        };

    let stateNest = nests.make({ pickingBind: false });

    // load patches
    let patches = [
        injectCss(),
        keybindPatch(stateNest, paletteEntries),
        exposeApiPatch(),
    ];

    // remove patches and reset custom entries
    return {
        onLoad() {},
        onUnload() {
            persist.store.customEntries = [];
            delete persist.store.customEntries;
            patches.forEach((unpatch) => unpatch());
        },

        settings: React.createElement(Settings, { persist, stateNest }),
    };
};
