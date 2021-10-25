import plugins from "@cumcord/plugins";
import { showToast } from "@cumcord/ui/toasts";
import { showConfirmationModal } from "@cumcord/ui/modals";
import { uninject } from "@cumcord";
import { toggleDevMode } from "@cumcord/dev";
import textEntry from "../components/TextEntryPalette.jsx";
import openPalette from "../components/Palette.jsx";

const source = "Built In";
const icon = "💧";

export default [
    {
        source,
        icon,
        id: "cumcord_installplug",
        label: "Install plugin from URL",
        action: async () => {
            try {
                let url = await textEntry("Enter URL");
                await plugins.importPlugin(url);
                showToast({
                    title: "Installed plugin",
                    duration: 3000,
                });
            } catch {}
        },
    },
    {
        source,
        icon,
        id: "cumcord_removeplug",
        label: "Remove plugin",
        action: () => {
            let plugs = Object.keys(plugins.installed.ghost).map((k) => [
                k,
                plugins.installed.ghost[k],
            ]);

            openPalette(
                "Choose plugin to remove",
                null,
                plugs.map((plugin) => ({
                    id: plugin[0],
                    label: plugin[1].manifest.name,
                    action: () => plugins.removePlugin(plugin[0]),
                }))
            );
        },
    },
    {
        source,
        icon,
        id: "cumcord_toggleplug",
        label: "Toggle plugin",
        action: () => {
            let plugs = Object.keys(plugins.installed.ghost).map((k) => [
                k,
                plugins.installed.ghost[k],
            ]);

            openPalette(
                "Choose plugin to toggle",
                null,
                plugs.map((plugin) => ({
                    id: plugin[0],
                    label:
                        (plugin[1].enabled ? "🟢 " : "🔴 ") +
                        plugin[1].manifest.name,
                    action: () => plugins.togglePlugin(plugin[0]),
                }))
            );
        },
    },
    {
        source,
        icon,
        id: "cumcord_uninject",
        label: "Uninject Cumcord",
        action: () =>
            setTimeout(async () => {
                // i know setTimeout is bad but
                let confirmed = await showConfirmationModal({
                    header: "Really uninject Cumcord?",
                    content:
                        "This will disable all of your plugins, and Cumcord will be completely removed",
                    type: "danger",
                    confirmText: "Uninject",
                    cancelText: "Actually, never mind",
                });

                if (confirmed) uninject();
            }, 500),
    },

    {
        source,
        icon,
        id: "cumcord_toggle_dev",
        label: "Toggle DevMode",
        action: toggleDevMode,
    },
];
