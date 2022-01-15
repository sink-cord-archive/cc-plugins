import data from "@cumcord/pluginData";
import Chart from "./components/Chart";

import channelTextArea from "./patches/channelTextArea";
import styles from "./styles.sass";

export default () => {
    // init "hot" store, just an array of timestamps
    data.live = [];
    // init more sparsely accessed "expensive write" (indexedDB!) storage
    // a proper data store which we can pull stats from
    // and keep historical data in
    if (!data.persist.ghost.datapoints)
        data.persist.store.datapoints = new Map();

    const patches = [channelTextArea(), styles()];

    return {
        onUnload: () => _.forEachRight(patches, (p) => p()),
        settings: Chart,
    };
};
