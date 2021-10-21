const rankResults = (set, usageCounts) => {
    let working = [];

    // add all with usage counts
    usageCounts.forEach((count, id) => {
        let index = set.findIndex((entry) => entry.id == id);
        if (id == -1) return;

        working.push([set[index], count]);
        set.splice(index, 1);
    });

    // sort by count and remove now useless count
    working = working.sort((a, b) => b[1] - a[1]).map((n) => n[0]);

    // add rest of set on the end
    return working.concat(set);
};

export default (set, usageCounts, searchTerm) => {
    if (!searchTerm || searchTerm == "") return rankResults(set, usageCounts);

    let matches = set.filter(
        (entry) =>
            entry.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return rankResults(matches, usageCounts);
};
