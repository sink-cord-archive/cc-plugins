const rankResults = (set, usageCounts) => {
    let working = [];

    // add all with usage counts
    usageCounts.forEach((count, id) => {
        let index = set.findIndex((entry) => entry.id == id);
        if (index == -1) return;

        working.push([set[index], count]);
        set.splice(index, 1);
    });

    // sort by count and remove now useless count
    working = working.sort((a, b) => b[1] - a[1]).map((n) => n[0]);

    // add rest of set on the end
    return working.concat(set);
};

const filter = (set, searchTerm) => {
    let noId = set.filter((entry) => !entry.id);
    if (noId.length != 0)
        throw `One or more entry had no ID. If you have custom entries, disable the plugins providing them.
If you do not, please ping Yellowsink constantly with this:

\`\`\`
${noId.map((e) => e.label).join("\n")}
\`\`\``;

    return set.filter(
        (entry) =>
            entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
};

export default (set, usageCounts, searchTerm) => {
    if (!searchTerm || searchTerm == "") return rankResults(set, usageCounts);

    let matches = filter(set, searchTerm);

    return rankResults(matches, usageCounts);
};
