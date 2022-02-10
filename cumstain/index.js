import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import settingsEntry from "./patches/settingsEntry";
import injectUiStyles from "./styles.sass";
import quickCSS from "./patches/quickCSS";
import exposeApi from "./patches/exposeApi";

export default ({ persist }) => {
    const patches = [
        injectUiStyles(),
        prepareState(),
        restoreThemes(),
        quickCSS(),
        settingsEntry(),
        exposeApi(),
    ];

    return {
        onUnload: () => _.forEachRight(patches, (p) => p()),
    };
};
