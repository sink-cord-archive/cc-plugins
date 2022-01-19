const themeCSSCache = {};

import extractMeta from "./bdMetaParser";

async function getBdTheme(url, repoUrl) {
    const actualUrl = new URL(url, repoUrl).href;

    const CSS =
        themeCSSCache[actualUrl] ?? (await (await fetch(actualUrl)).text());

    themeCSSCache[actualUrl] = CSS;

    return {
        id: actualUrl,
        CSS: () => Promise.resolve(CSS),
        compat: true,
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
    );

    const manifest = await (await fetch(manifestUrl.href)).json();

    return {
        id: actualUrl,
        compat: false,
        ...manifest,

        CSS: async () => {
            if (themeCSSCache[actualUrl]) return themeCSSCache[actualUrl];

            const css = await (await fetch(actualUrl)).text();
            themeCSSCache[actualUrl] = css;
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
