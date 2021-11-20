import data from "@cumcord/pluginData";
import nests from "@cumcord/modules/internal/nests";

export default () => {
    if (!data.persist.ghost.repos) data.persist.store.repos = [];
    if (!data.persist.ghost.themes) data.persist.store.themes = [];

    data.state = nests.make({ unpatchCache: new Map() });
    return () => {
        data.state = undefined;
        delete data.state;
    };
};
