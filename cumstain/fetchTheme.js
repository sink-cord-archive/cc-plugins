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
    
    const resp = await fetch(manifestUrl.href)
    if (!resp.ok) throw "fail";
    const manifest = await (resp).json();

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
    } catch {}

    try {
        return await getBdTheme(url, repoUrl);
    } catch {
        console.log("caught 2!")
        throw new Error(
            "Failed to fetch theme - both CC and BD either failed to fetch or failed to parse"
        );
    }
};
