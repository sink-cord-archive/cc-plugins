import fetchTheme from "./fetchTheme";

const manifestCache = {};

async function getRepoManifest(url) {
	if (manifestCache[url]) return manifestCache[url];

	const manifestURL = new URL("repo.json", url).href;
	const manifest = await fetch(manifestURL).then((r) => r.json());

	if (!manifest.themes || manifest.themes?.length === 0)
		throw new Error("No themes found in repo");
	if (!manifest.meta) throw new Error("No repo metadata");
	if (!manifest?.meta.name) throw new Error("Repo did not have a name");

	manifestCache[url] = manifest;

	return manifest;
}

export default async (url) => {
	const manifest = await getRepoManifest(url);

	const themes = await Promise.all(
		manifest.themes.map((tu) => fetchTheme(tu, url))
	);

	return { manifest, themes };
};
