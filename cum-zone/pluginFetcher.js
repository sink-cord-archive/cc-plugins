function getPlugins(repoUrl) {
    // non-async http? sue me.
    let xhr = new XMLHttpRequest();
    xhr.open("GET", repoUrl, false);
    xhr.send(null);
    console.log(xhr.responseText)
    let parsed = [];
    try {
        parsed = JSON.parse(xhr.responseText);
    } catch {
        return []
    }

    return Object.keys(parsed).map((key) => {
        let plugin = parsed[key];
        plugin.url = key;
        return plugin;
    });
}

export default getPlugins;
