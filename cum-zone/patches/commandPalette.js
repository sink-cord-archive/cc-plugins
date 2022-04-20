import { depend } from "cumcord-tools";
import { persist } from "@cumcord/pluginData";
import { combinePluginLists } from "../pluginFetcher";
import { installed } from "@cumcord/plugins";

const commandPalettePluginIds = [
	"https://yellowsink.github.io/discord-command-palette/",
	"https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/",
];

const source = "Cum Zone";

export default () =>
	depend(commandPalettePluginIds, () => {
		commandPalette.registerEntry({
			source,
			id: "ysink_cumzone_installPlugin",
			label: "Install a plugin from repo",
			icon: "📦",
			action: async () => {
				const plugins = (await combinePluginLists(persist.ghost.repos)).filter(
					(p) =>
						!Object.values(installed.ghost).some(
							(p2) => p2.manifest.hash == p.hash
						)
				);

				commandPalette.openPalette(
					"Which plugin to install?",
					plugins.map((entry) => ({
						id: entry.url,
						label: entry.name,
						source: entry.repo.name,
						action: () => importPlugin(new URL(entry.url, entry.repo.url).href),
					}))
				);
			},
		});

		return () => window.commandPalette?.unregisterSource(source);
	});
