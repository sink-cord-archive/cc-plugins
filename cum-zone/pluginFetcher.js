// https://stackoverflow.com/a/48969580
function makeRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };
        xhr.send();
    });
}

async function getPlugins(repoUrl) {
    let rawJson = await makeRequest("GET", repoUrl);
    let parsed = JSON.parse(rawJson);

    return Object.keys(parsed).map((key) => {
        let plugin = parsed[key];
        plugin.url = key;
        return plugin;
    });
}

export default getPlugins;