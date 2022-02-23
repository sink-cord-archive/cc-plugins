import data from "@cumcord/pluginData";
import nests from "@cumcord/modules/internal/nests";
import defaultRepos from "../defaultRepos";


export default () => {
    data.state = nests.make({
        unpatchCache: new Map(),
        caches: {
            css:  {},
            repo: {},
            manifest: {},
        },
    });

    if (!Array.isArray(data.persist.ghost.repos)) defaultRepos();

    if (!Array.isArray(data.persist.ghost.themes))
        data.persist.store.themes = [];

    return () => {
        delete data.state;
    };
};
