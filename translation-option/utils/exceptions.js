const REGEXES = [
    /<[@#](!?|&?)\d+>/g, // mention user, channel & role
    /@?\w+#\d{4}/gi, // user without mention
    /<(\w+)?:\w+:\d+>/gi, // emojis
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/g, // urls
    /```{1,3}(.+?|\n+)```/gis, // codeblocks
    /`(.+?|\n+)`/gis, // code snippets // ```var = `key`;```
];

function extract(text) {
    text = text.replace(/[[\]]/g, "\\$&"); // экранирование [ ]
    const excepts = REGEXES.reduce((acc, regex) => {
        const matches = text.match(regex);
        if (matches) {
            matches.forEach((match, index) => {
                text = text.replace(
                    new RegExp(
                        match.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"),
                        "g"
                    ), // чтобы не сломать код в codeblocks // v2? - /[-[\]{}()*+?.,\\^$|#\s]/g
                    `[${index + acc.length}]`
                );
            });
            acc.push(...matches);
        }
        return acc;
    }, []);

    if (/^(\[\d+]|\s)+$/.test(text)) {
        // [1] [2] [3][4] ...
        return ["", []];
    }
    return [text, excepts];
}

function insert([text, excepts]) {
    for (let i = 0; i < excepts.length; i++) {
        text = text.replace(new RegExp(`(\\[${i}\\])`, "gi"), excepts[i]);
    }
    text = text.replace(/\\\s?(\[)/g, "$1").replace(/\\\s?(])/g, "$1");

    return text;
}

// const e = extract('<#610035443940982794> hello `{$0}` ```js console.log()```'); // крутые юнит-тесты
// console.log(e);
// console.log(insert(e));

export default { extract, insert };
export { extract, insert };
