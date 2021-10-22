import Fuse from "fuse.js";

export default (set, keys, search) =>
    !search || search == ""
        ? set
        : new Fuse(set, { keys })
              .search(search)
              .map((searchResult) => searchResult.item);
