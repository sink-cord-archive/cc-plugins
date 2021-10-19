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

export default getPlugins;
export { getPlugins, getPluginUrl };
