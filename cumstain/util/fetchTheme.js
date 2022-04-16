import extractMeta from "./bdMetaParser";

const cssCache = {};
const manifestCache = {};

async function getBdTheme(url, repoUrl) {
    const actualUrl = new URL(url, repoUrl).href;

    let CSS;

    const cached = cssCache[actualUrl];

    if (cached?.[0] === 200) CSS = cached[1];
    else if (cached)
        throw new Error(
            `BD theme existed in cache with non-200 status ${cached[0]}`
        );
    else {
        const req = await fetch(actualUrl);
        if (req.status !== 200)
            cssCache[actualUrl] = [req.status, null];

        CSS = await req.text();

        cssCache[actualUrl] = [req.status, CSS];
    }

    return {
        url: actualUrl,
        CSS: () => Promise.resolve(CSS),
        compat: true,
        repoUrl,
        ...extractMeta(CSS),
    };
}

async function getCcTheme(url, repoUrl) {
    const actualUrl = new URL(url, repoUrl).href;

    //const CSS = await (await fetch(actualUrl)).text();

    let splitPath = new URL(url, repoUrl).pathname.split("/");
    splitPath.splice(splitPath.length - 1, 1, "cumcord_theme.json");
    const manifestUrl = new URL(
        splitPath.join("/"),
        new URL(url, repoUrl).origin
    ).href;

    let manifest;

    const cachedManifest = manifestCache[manifestUrl];
    if (cachedManifest?.[0] === 200) manifest = cachedManifest[1];
    else if (cachedManifest)
        throw new Error(
            `CC manifest existed in cache with non-200 status ${cachedManifest[0]}`
        );
    else {
        const req = await fetch(manifestUrl);
        if (req.status !== 200)
            manifestCache[manifestUrl] = [req.status, null];

        manifest = await req.json();

        manifestCache[manifestUrl] = [req.status, manifest];
    }

    return {
        url: actualUrl,
        compat: false,
        ...manifest,
        repoUrl,

        CSS: async () => {
            const cached = cssCache[actualUrl];
            if (cached?.[0] === 200) return cached[1];
            else if (cached)
                throw new Error(
                    `CC CSS existed in cache with non-200 status ${cached[0]}`
                );

            const req = await fetch(actualUrl);
            if (req.status !== 200)
                cssCache[actualUrl] = [req.status, null];
            const css = await req.text();
            cssCache[actualUrl] = [req.status, css];
            return css;
        },
    };
}

export default async (url, repoUrl) => {
    try {
        return await getCcTheme(url, repoUrl);
    } catch (e1) {
        try {
            return await getBdTheme(url, repoUrl);
        } catch (e2) {
            let err = new Error(
                "Failed to fetch theme - both CC and BD either failed to fetch or failed to parse"
            );
            err.e1 = e1;
            err.e2 = e2;
            throw err;
        }
    }
};
