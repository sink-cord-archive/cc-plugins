import restoreThemes from "./patches/restoreThemes";
import prepareState from "./patches/prepareState";
import settingsEntry from "./patches/settingsEntry";

export default ({ persist }) => {
    let patches = [];

    return {
        onLoad: async () => {
            patches.push(
                settingsEntry(),
                prepareState(),
                await restoreThemes()
            );
        },
        // iterate in reverse order. This allows patches to depend on previous patches' side effects.
        onUnload: () => patches.reduceRight((_, unpatch) => unpatch?.(), null),
    };
};
