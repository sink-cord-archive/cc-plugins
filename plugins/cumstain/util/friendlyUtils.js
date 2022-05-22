import fetchRepo from "./fetchRepo";
import { persist } from "@cumcord/pluginData";
import fetchTheme from "./fetchTheme";
import { loadTheme } from "./themeLoadUtil";

async function verifyRepo(repo) {
	try {
		await fetchRepo(repo);
		return true;
	} catch {
		return false;
	}
}

export async function addRepo(repo, ok, err) {
	if (!repo.endsWith("/")) repo += "/";

	if (persist.ghost.repos.includes(repo)) {
		err("You already have this repo!");
		return false;
	}

	if (!(await verifyRepo(repo))) {
		err("Repo was invalid");
		return false;
	}

	persist.ghost.repos.push(repo);
	// correctly raise events
	persist.set({ path: ["repos"] });
	ok("Added repo");
	return true;
}

export async function addTheme(url, ok, err) {
	const theme = await fetchTheme(url).catch(err);
	if (!theme) return;

	if (theme.enabled) return err("Theme is already loaded!");

	loadTheme(theme).then(ok, err);
}
