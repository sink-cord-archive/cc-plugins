import { persist } from "@cumcord/pluginData";
import fetchRepo from "./util/fetchRepo";

const defaultRepos = ["https://cumcordthemes.github.io/Cumsock/"];

export const officialRepos = defaultRepos;

export default async () => {
	if (!Array.isArray(persist.ghost.repos))
		// dont bother setting store, we raise events anyway later
		persist.ghost.repos = [];

	for (const r of defaultRepos) {
		if (persist.ghost.repos.find(r1 => r1.url === r.url)) continue;

		// see verifyRepo in ReposModal.jsx
		try {
			await fetchRepo(r);
		} catch {
			continue;
		}

		persist.ghost.repos.push(r);
	}
	// raise events
	persist.set({ path: ["repos"], value: persist.ghost.repos });
};
