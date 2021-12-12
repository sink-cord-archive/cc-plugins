import extractMeta from "./bdMetaParser";

async function getBdTheme(url, repoUrl) {
    const CSS = await (await fetch(new URL(url, repoUrl).href)).text();

    return {
        id: url,
        CSS,
        compat: true,
        ...extractMeta(CSS),
    };
}

async function getCcTheme(url, repoUrl) {
    const CSS = await (await fetch(new URL(url, repoUrl).href)).text();

    let splitPath = new URL(url, repoUrl).pathname.split("/");
    splitPath.splice(splitPath.length - 1, 1, "cumcord_theme.json");
    const manifestUrl = new URL(
        splitPath.join("/"),
        new URL(url, repoUrl).origin
    );
    
    const manifest = await (await fetch(manifestUrl.href)).json();

    return {
        id: url,
        CSS,
        compat: false,
        ...manifest,
    };
}

export default async (url, repoUrl) => {
    try {
        return await getCcTheme(url, repoUrl);
    } catch (e1) {
        try {
            return await getBdTheme(url, repoUrl);
        } catch (e2) {
            console.log(e1, e2)
            let err = new Error("Failed to fetch theme - both CC and BD either failed to fetch or failed to parse");
            err.e1 = e1;
            err.e2 = e2;
            throw err;
        }
    }
};
