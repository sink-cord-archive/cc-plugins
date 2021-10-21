import { combinePluginLists } from "./pluginFetcher.js";
import { importPlugin, installed } from "@cumcord/plugins";

export default (nest) => {
    if (!window.commandPalette) return;

    commandPalette.registerEntry(
        "ysink_cumzone_installPlugin",
        "Cum Zone",
        "Install a plugin",
        () => {
            let repos = nest.ghost.repos;
            let plugins = combinePluginLists(repos)
            .filter(plugin => Object.values(installed.ghost).find(p => p.manifest.hash == plugin.hash) == undefined);

            commandPalette.openPalette(
                "Which plugin to install?",
                plugins.map((entry) => ({
                    id: entry.url,
                    label: entry.name,
                    source: entry.repo.name,
                    action: () => {
                        importPlugin(new URL(entry.url, entry.repo.url).href);
                    },
                }))
            );
        },
        "📦"
    );

    return () => commandPalette.unregisterSource("Cum Zone");
};
