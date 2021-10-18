function getPlugins(repoUrl) {
    // non-async http? sue me.
    let xhr = new XMLHttpRequest();
    xhr.open("GET", repoUrl, false);
    xhr.send(null);
    let parsed = JSON.parse(xhr.responseText);

    return Object.keys(parsed).map((key) => {
        let plugin = parsed[key];
        plugin.url = key;
        return plugin;
    });
}

export default getPlugins;
