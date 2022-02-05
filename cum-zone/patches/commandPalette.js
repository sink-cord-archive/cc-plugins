import { depend } from "cumcord-tools";
import { persist } from "@cumcord/pluginData"
import { combinePluginLists } from "../pluginFetcher";
import { installed } from "@cumcord/plugins";

const commandPalettePluginIds = [
    "https://yellowsink.github.io/discord-command-palette/",
    "https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/",
];

const source = "Cum Zone";

const patch = () => {
    commandPalette.registerEntry({
        source,
        id: "ysink_cumzone_installPlugin",
        label: "Install a plugin from repo",
        icon: "📦",
        action: async () => {
            let repos = persist.ghost.repos;
            let plugins = (await combinePluginLists(repos)).filter(
                (plugin) =>
                    Object.values(installed.ghost).find(
                        (p) => p.manifest.hash == plugin.hash
                    ) == undefined
            );

            commandPalette.openPalette(
                "Which plugin to install?",
                plugins.map((entry) => ({
                    id: entry.url,
                    label: entry.name,
                    source: entry.repo.name,
                    action: () =>
                        importPlugin(new URL(entry.url, entry.repo.url).href),
                }))
            );
        },
    });

    return () => window.commandPalette?.unregisterSource(source);
};

export default () => depend(commandPalettePluginIds, patch);
