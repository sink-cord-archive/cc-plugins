import { persist } from "@cumcord/pluginData"

const defaultRepos = [
    {
        url: "https://cumcordplugins.github.io/Condom/",
        name: "Condom",
        enabled: true,
        official: true,
    },
];

export default (store) => {
    persist.store.repos = defaultRepos.slice();
};
