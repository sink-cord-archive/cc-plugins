import Fuse from "fuse.js";

const errorHandle = (set) => {
    let noId = set.filter((entry) => !entry.id);
    let [noIdCustom, noIdBuiltIn] = noId.reduce(
        (result, element) => {
            if (element.source != "Built In") result[0].push(element);
            else result[1].push(element);
            return result;
        },
        [[], []]
    );

    if (noIdBuiltIn.length != 0)
        throw `One or more built-in entries had no ID. Please ping Yellowsink constantly with this:

\`\`\`
${noIdBuiltIn.map((e) => e.label).join("\n")}
\`\`\``;

    if (noIdCustom.length != 0)
        throw `One or more custom entries had no ID. Please disable the following entry sources:

\`\`\`
${noIdCustom.map((e) => e.source).join("\n")}
\`\`\`

The devs of those sources would likely appreciate this info too:

\`\`\`
${noIdCustom.map((e) => e.label).join("\n")}
\`\`\``;
};

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
    errorHandle(set);

    const fuseOptions = {
        threshold: 0.5,
        useExtendedSearch: true,
        keys: ["label", "id"],
    };

    return new Fuse(set, fuseOptions)
        .search(searchTerm)
        .map((searchResult) => searchResult.item);
};

export default (set, usageCounts, searchTerm) => {
    if (!searchTerm || searchTerm == "") return rankResults(set, usageCounts);

    let matches = filter(set, searchTerm);

    return rankResults(matches, usageCounts);
};
