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
    const timingPoints = data.live
        .filter((v) => v[0].key === " " || v[0].key === "Enter")
        .map((v) => v[1]);

    data.liveTimeoutId = null;

    // update persist store
    if (timingPoints.length >= MIN_WORDS)
        data.persist.ghost.datapoints.set(_.last(data.live)[1], timingPoints);

    // broadcast events
    data.persist.store.datapoints = data.persist.ghost.datapoints;

    data.live = [];
};

const pushToLive = (e) => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    data.live.push([e, Date.now()]);
    data.liveTimeoutId = setTimeout(flush, SECS_TO_FLUSH * 1000);
};

const pop = () => {
    if (data.liveTimeoutId) clearTimeout(data.liveTimeoutId);
    data.live.pop();
};

export { pushToLive, pop, wpm };
