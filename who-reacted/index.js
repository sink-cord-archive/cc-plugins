import injectCss from "./styles.sass";

import Settings from "./Settings";
import reaction from "./patches/reaction";

export default () => {
    let patches = [];

    return {
        onLoad: async () => {
            patches = [injectCss(), await reaction()];
        },
        onUnload: () => _.forEachRight(patches, (p) => p?.()),
        settings: Settings,
    };
};
