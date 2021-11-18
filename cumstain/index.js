import prepareState from "./patches/prepareState";
import fetchRepo from "./repoFetcher";

export default ({ persist }) => {
    fetchRepo("http://127.0.0.1:8080/").then(console.log);

    let patches = [];

    return {
        onLoad: async () => {
            patches.push(prepareState());
        },
        onUnload: () => patches.forEach((unpatch) => unpatch?.()),
    };
};
