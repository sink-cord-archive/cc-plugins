import fuzzy from "./fuzzy.js";

const rankResults = (set, usageCounts) => {
    let source = set;
    let working = [];

    // add all with usage counts
    usageCounts.forEach((count, id) => {
        let index = source.findIndex((entry) => entry.id == id);
        if (id == -1) return;

        working.push([source[index], count]);
        source.splice(index, 1);
    });

    // sort by count and remove now useless count
    working = working.sort((a, b) => b[1] - a[1]).map((n) => n[0]);

    // add rest of set on the end
    return working.concat(source);
};

export default (set, usageCounts, searchTerm) => {
    if (!searchTerm || searchTerm == "") return rankResults(set, usageCounts);

    let matches = fuzzy(set, searchTerm);

    return rankResults(matches, usageCounts);
};
