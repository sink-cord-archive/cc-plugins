import injectCss from "./styles.sass";

import { createElement } from "@cumcord/modules/common/React";
import Settings from "./Settings";
import reaction from "./patches/reaction";

export default () => {
    let patches = [];

    return {
        onLoad: async () => {
            patches.push(injectCss());
            patches.push(await reaction());
        },
        onUnload: () => patches.forEach((p) => p?.()),
        settings: createElement(Settings),
    };
};
