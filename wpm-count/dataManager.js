import data from "@cumcord/pluginData";

// 3 seconds of not submitting a new word in the chatbox to flush
const SECS_TO_FLUSH = 3;

const flush = () => {
    data.liveTimeoutId = null;
    const words = data.live.length;
    const timespanMs = data.live[data.live.length - 1] - data.live[0];
    const timespanMins = timespanMs / 1000 / 60;
    const wpm = words / timespanMins;

    // update persist store
    data.persist.ghost.datapoints.set(data.live[data.live.length - 1], data.live);

    // broadcast events
    data.persist.store.datapoints = data.persist.ghost.datapoints;

    console.log(data.persist.ghost.datapoints);

    data.live = [];
};

const pushToLive = () => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    data.live.push(Date.now());
    data.liveTimeoutId = setTimeout(flush, SECS_TO_FLUSH * 1000);
};

const disqualify = () => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    data.live = [];
};

export { pushToLive, disqualify };
