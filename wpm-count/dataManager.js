import data from "@cumcord/pluginData";

// 3 seconds of not submitting a new word in the chatbox to flush
const SECS_TO_FLUSH = 3;
// must be at least 3 words for a valid datapoint
const MIN_WORDS = 3;

const wpm = (datapoints) => {
    const words = datapoints.length;
    const timespanMs = datapoints[datapoints.length - 1] - datapoints[0];
    const timespanMins = timespanMs / 1000 / 60;
    return words / timespanMins;
};

const flush = () => {
    data.liveTimeoutId = null;

    // update persist store
    if (data.live.length >= MIN_WORDS)
        data.persist.ghost.datapoints.set(
            data.live[data.live.length - 1],
            data.live
        );

    // broadcast events
    data.persist.store.datapoints = data.persist.ghost.datapoints;

    data.live = [];
};

const pushToLive = () => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    data.live.push(Date.now());
    data.liveTimeoutId = setTimeout(flush, SECS_TO_FLUSH * 1000);
};

const disqualify = () => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    // incur a 1 word penalty for backspacing.
    data.live.pop();
};

export { pushToLive, disqualify, wpm };
