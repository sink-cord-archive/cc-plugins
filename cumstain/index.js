import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import fetchRepo from "./repoFetcher";
import { loadTheme, unloadAll } from "./themeLoadUtil";

export default ({ persist }) => {
    let patches = [];

    return {
        onLoad: async () => {
            patches.push(prepareState(), await restoreThemes());
        },
        // iterate in reverse order. This allows patches to depend on previous patches' side effects.
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
