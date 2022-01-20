import data from "@cumcord/pluginData";
import extractMeta from "./bdMetaParser";
import { cumcache } from "cumcord-tools";
import { make } from "@cumcord/modules/internal/nests";

let cssCache = new Map();
let manifestCacheBacking = make({});
const MANIFEST_CACHE_TIMEOUT = "10m";
let [manifestCacheCleanup, manifestCacheTimeOut, manifestCacheStore] = cumcache(
    "repoCache",
    manifestCacheBacking
);

data.extraUnpatches
    ? data.extraUnpatches.push(manifestCacheCleanup)
    : (data.extraUnpatches = [manifestCacheCleanup]);

async function getBdTheme(url, repoUrl) {
    const actualUrl = new URL(url, repoUrl).href;

    const CSS =
        cssCache.get(actualUrl) ?? (await (await fetch(actualUrl)).text());

    cssCache.set(actualUrl, CSS);

    return {
        url: actualUrl,
        CSS: () => Promise.resolve(CSS),
        compat: true,
        repoUrl,
        ...extractMeta(CSS),
    };
}

async function getCcTheme(url, repoUrl) {
    console.log("fetching theme", url, manifestCacheStore, manifestCacheBacking.ghost)

    const actualUrl = new URL(url, repoUrl).href;

    //const CSS = await (await fetch(actualUrl)).text();

    let splitPath = new URL(url, repoUrl).pathname.split("/");
    splitPath.splice(splitPath.length - 1, 1, "cumcord_theme.json");
    const manifestUrl = new URL(
        splitPath.join("/"),
        new URL(url, repoUrl).origin
    ).href;

    const manifest =
        manifestCacheStore[manifestUrl] ??
        (await (await fetch(manifestUrl)).json());

    if (!manifestCacheStore[manifestUrl])
        manifestCacheTimeOut(manifestUrl, manifest, MANIFEST_CACHE_TIMEOUT);

    return {
        url: actualUrl,
        compat: false,
        ...manifest,
        repoUrl,

        CSS: async () => {
            if (cssCache.has(actualUrl)) return cssCache.get(actualUrl);

            const css = await (await fetch(actualUrl)).text();
            cssCache.set(actualUrl, css);
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
