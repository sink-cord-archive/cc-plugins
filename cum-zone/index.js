import injectCss from "./styles.sass";
import settingsEntryPatch from "./patches/settingsEntry.jsx";
import resetReposToDefault from "./defaultRepos.js";
import commandPalette from "./patches/commandPalette.js";

export default ({ persist }) => {
    let patches = [
        injectCss(),
        commandPalette(persist),
        settingsEntryPatch(persist),
    ];

    if (!Array.isArray(persist.ghost.repos)) resetReposToDefault(persist.store);

    return {
        onUnload: () => patches.forEach((unpatch) => unpatch?.()),
    };
};
