const getRepoRoot = (repoUrl) => new URL("plugins-large.json", repoUrl).href;

const getPluginUrl = (repoUrl, pluginUrl) => new URL(pluginUrl, repoUrl);

// async
const getPlugins = (repoUrl) =>
	fetch(getRepoRoot(repoUrl)).then((r) => r.json());

const combinePluginLists = async (repos) => {
	const repoPluginListPromise = repos.map(async (repo) =>
		(await getPlugins(repo.url)).map((p) => {
			p.repo = repo;
			return p;
		})
	);

	const repoPluginLists = await Promise.all(repoPluginListPromise);

	return repoPluginLists.length == 0
		? []
		: repoPluginLists.reduce((c, n) => c.concat(n));
};

export default getPlugins;
export { getPlugins, getPluginUrl, combinePluginLists };
