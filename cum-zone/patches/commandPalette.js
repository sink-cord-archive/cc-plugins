import { persist } from "@cumcord/pluginData";
import { importPlugin, installed, loaded } from "@cumcord/plugins";
import { nests } from "@cumcord/modules/internal";
import { combinePluginLists } from "../pluginFetcher.js";

const patch = () => {
    commandPalette.registerEntry(
        "Cum Zone",
        "ysink_cumzone_installPlugin",
        "Install a plugin",
        "📦",
        async () => {
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
        }
    );

    return () => window?.commandPalette?.unregisterSource?.("Cum Zone");
};

const commandPalettePluginIds = [
    "https://yellowsink.github.io/cc-plugins/command-palette/",
];

export default () => {
    let unpatch = null;

    let listener = (eventType, { path }) => {
        if (commandPalettePluginIds.includes(path[0])) unpatch = patch(persist);
    };

    if (window.commandPalette) unpatch = patch(persist);
    else loaded.on(nests.Events.SET, listener);

    return () => {
        unpatch?.();
        loaded.listeners.SET.delete(listener);
    };
};
