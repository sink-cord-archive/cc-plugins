import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import settingsEntry from "./patches/settingsEntry";
import injectUiStyles from "./styles.sass";
import quickCSS from "./patches/quickCSS";
import exposeApi from "./patches/exposeApi";

const patches = [
    injectUiStyles(),
    prepareState(),
    restoreThemes(),
    quickCSS(),
    settingsEntry(),
    exposeApi(),
];

export function onUnload() {
    _.forEachRight(patches, (p) => p());
}
