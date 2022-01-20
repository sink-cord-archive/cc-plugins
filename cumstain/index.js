import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import settingsEntry from "./patches/settingsEntry";
import injectUiStyles from "./styles.sass";
import quickCSS from "./patches/quickCSS";
import ver from "./patches/ver";
import exposeApi from "./patches/exposeApi";

export default ({ persist }) => {
    let patches = [
        ver(),
        injectUiStyles(),
        prepareState(),
        restoreThemes(),
        quickCSS(),
        settingsEntry(),
        exposeApi(),
    ];

    if (!Array.isArray(persist.ghost.repos)) persist.store.repos = [];

    return {
        // iterate in reverse order. This allows patches to depend on previous patches' side effects.
        onUnload: () => _.forEachRight(patches, (p) => p()),
    };
};
