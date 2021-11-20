import fetchTheme from "./fetchTheme";

async function getRepoManifest(url) {
    const manifestURL = new URL("repo.json", url).href;
    const manifest = await (await fetch(manifestURL)).json();

    if (!manifest.themes || manifest.themes?.length === 0)
        throw new Error("No themes found in repo");
    if (!manifest.meta) throw new Error("No repo metadata");
    if (!manifest?.meta.name) throw new Error("Repo did not have a name");

    return manifest;
}

export default async (url) => {
    const manifest = await getRepoManifest(url);
    const themes = await Promise.all(
        manifest.themes.map((tu) => fetchTheme(tu, url))
    );

    return { manifest, themes };
};
