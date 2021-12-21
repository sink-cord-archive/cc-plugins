import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import settingsEntry from "./patches/settingsEntry";
import injectStyles from "./styles.sass";
import quickCSS from "./patches/quickCSS";
import themeUpdates from "./patches/themeUpdates";
import ver from "./patches/ver";
import exposeApi from "./patches/exposeApi";

export default ({ persist }) => {
    let patches = [];

    if (!Array.isArray(persist.ghost.repos))
        persist.store.repos = [];

    return {
        onLoad: async () => {
            //persist.store.repos = ["http://127.0.0.1:8080/"];
            patches.push(
                ver(),
                injectStyles(),
                prepareState(),
                restoreThemes(),
                quickCSS(),
                settingsEntry(),
                themeUpdates(),
                exposeApi()
            );
        },
        // iterate in reverse order. This allows patches to depend on previous patches' side effects.
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
