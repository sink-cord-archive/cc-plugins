const defaultRepos = [
    {
        url: "https://cumcordplugins.github.io/Condom/",
        name: "Condom",
        enabled: true,
        official: true,
    },
];

export default (store) => {
    store.repos = defaultRepos;
};
