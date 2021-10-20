import Fuse from "fuse.js";

const fuzzySearch = (set, keys, search) =>
    !search || search == ""
        ? set
        : new Fuse(set, { keys })
              .search(search)
              .map((searchResult) => searchResult.item);

export default fuzzySearch;
