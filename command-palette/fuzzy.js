import Fuse from "fuse.js";

// i'm really not satisfied with these options, but they'll have to do.
const fuseOptions = {
    // tune threshold to fix strangeness
    threshold: 0.7,
    // (partial) globbing go br|rr
    useExtendedSearch: true,
    keys: ["label", "id"],
    // i dont want to know whyyy, but this fixes loads of JS weirdness
    ignoreLocation: true,
};

export default (set, search) =>
    !search || search == ""
        ? set
        : new Fuse(set, fuseOptions)
              .search(search)
              .map((searchResult) => searchResult.item);
