import extractMeta from "./bdMetaParser";

export default async (url, repoUrl) => {
    const CSS = await (await fetch(new URL(url, repoUrl).href)).text();

    return {
        id: url,
        CSS,
        ...extractMeta(CSS),
    };
};
