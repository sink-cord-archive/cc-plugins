import data from "@cumcord/pluginData";
import nests from "@cumcord/modules/internal/nests";
import { boundCumcache } from "cumcord-tools";

// how long should the manifests persist in cache for?
const MANIFEST_CACHE_TIMEOUT = "10m";

export default () => {
    if (!data.persist.ghost.repos) data.persist.store.repos = [];
    if (!data.persist.ghost.themes) data.persist.store.themes = [];

    // backing nest to store the manifest cache in
    let manifestCacheBacking = nests.make({});
    // create a cumcache for the automatic timeout, here 10 minutes
    let [manifestCleanup, manifestStore] =
        boundCumcache("repoCache", MANIFEST_CACHE_TIMEOUT, manifestCacheBacking);

    data.state = nests.make({
        unpatchCache: new Map(),
        caches: {
            css: new Map(),
            repo: new Map(),
            manifest: manifestStore
        }
    });

    return () => {
        manifestCleanup();
        data.state = undefined;
        delete data.state;
    };
};
