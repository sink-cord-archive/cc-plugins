const getRepoRoot = (repoUrl) => new URL("plugins-large.json", repoUrl);

const getPluginUrl = (repoUrl, pluginUrl) => new URL(pluginUrl, repoUrl);

function getPlugins(repoUrl) {
    // non-async http? sue me.
    let xhr = new XMLHttpRequest();
    xhr.open("GET", getRepoRoot(repoUrl), false);
    xhr.send(null);
    let parsed = [];
    try {
        parsed = JSON.parse(xhr.responseText);
    } catch {
        return [];
    }

    return Object.keys(parsed).map((key) => {
        let plugin = parsed[key];
        plugin.url = key;
        return plugin;
    });
}

const combinePluginLists = (repos) => {
    let repoPluginLists = repos.map((repo) =>
        getPlugins(repo.url).map((p) => {
            p.repo = repo;
            return p;
        })
    );

    return repoPluginLists.length == 0
        ? []
        : repoPluginLists.reduce((c, n) => c.concat(n));
};

export default getPlugins;
export { getPlugins, getPluginUrl, combinePluginLists };
