const getRepoRoot = (repoUrl) => new URL("plugins-large.json", repoUrl).href;

const getPluginUrl = (repoUrl, pluginUrl) => new URL(pluginUrl, repoUrl);

async function getPlugins(repoUrl) {
    const parsed = await (await fetch(getRepoRoot(repoUrl))).json();

    return Object.keys(parsed).map((key) => {
        let plugin = parsed[key];
        plugin.url = key;
        return plugin;
    });
}

const combinePluginLists = async (repos) => {
    const repoPluginListPromise = repos.map(async (repo) =>
        (await getPlugins(repo.url)).map((p) => {
            p.repo = repo;
            return p;
        })
    );

    const repoPluginLists = await Promise.all(repoPluginListPromise);

    return repoPluginLists.length == 0
        ? []
        : repoPluginLists.reduce((c, n) => c.concat(n));
};

export default getPlugins;
export { getPlugins, getPluginUrl, combinePluginLists };
