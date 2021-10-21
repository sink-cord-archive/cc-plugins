const source = "Built In";
const icon = "♻";

export default [
    {
        source,
        icon,
        id: "reboot_reload",
        label: "Reload Discord",
        action: () => window.location.reload()
    },
    {
        // sorry for ripping off your plugin smartfridge, please don't hate me
        source,
        icon,
        id: "reboot_relaunch",
        label: "Relaunch Discord to updater",
        condition: () => window.DiscordNative,
        action: () => window.DiscordNative.app.relaunch()
    },
]