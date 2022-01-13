/*=====================================*\
|  boilerplate, no need to change this  |
\*=====================================*/
import { loaded } from "@cumcord/plugins";

const commandPalettePluginIds = [
    "https://yellowsink.github.io/discord-command-palette/",
    "https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/",
];

export default () => {
    let unpatch;

    const listener = (eventType, { path }) => {
        if (commandPalettePluginIds.includes(path[0])) {
            unpatch?.();
            unpatch = patch();
        }
    };

    if (window.commandPalette) unpatch = patch();
    else loaded.on("SET", listener);

    return () => {
        unpatch?.();
        loaded.off("SET", listener);
    };
};

/*==============================================================*\
|  the command palette API is available to you in this function  |
\*==============================================================*/
import { persist } from "@cumcord/pluginData";
import { importPlugin, installed } from "@cumcord/plugins";
import { combinePluginLists } from "../pluginFetcher.js";
const patch = () => {
    commandPalette.registerEntry(
        "Cum Zone",
        "ysink_cumzone_installPlugin",
        "Install a plugin from repo",
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

    return () => window.commandPalette?.unregisterSource("Cum Zone");
};
