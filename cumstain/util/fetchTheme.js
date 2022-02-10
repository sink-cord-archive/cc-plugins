import extractMeta from "./bdMetaParser";
import { state } from "@cumcord/pluginData";

async function getBdTheme(url, repoUrl) {
    const actualUrl = new URL(url, repoUrl).href;

    const CSS =
        state.ghost.caches.css.get(actualUrl) ??
        (await (await fetch(actualUrl)).text());

    state.ghost.caches.css.set(actualUrl, CSS);

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

    const cachedManifest = state.ghost.caches.manifest[manifestUrl];

    const manifest =
        cachedManifest ?? (await (await fetch(manifestUrl)).json());

    if (!cachedManifest) state.ghost.caches.manifest[manifestUrl] = manifest;

    return {
        url: actualUrl,
        compat: false,
        ...manifest,
        repoUrl,

        CSS: async () => {
            if (state.ghost.caches.css.has(actualUrl))
                return state.ghost.caches.css.get(actualUrl);

            const css = await (await fetch(actualUrl)).text();
            state.ghost.caches.css.set(actualUrl, css);
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
