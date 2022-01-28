import { depend } from "cumcord-tools";
import { findByProps } from "@cumcord/modules/webpack";

const commandPalettePluginIds = [
    "https://yellowsink.github.io/discord-command-palette/",
    "https://cumcordplugins.github.io/Condom/yellowsink.github.io/discord-command-palette/",
];

const source = "HypeSquad Switcher";

const patch = () => {
    function setHouse(house) {
        findByProps("joinHypeSquadOnline").joinHypeSquadOnline({
            houseID: "HOUSE_" + house,
        });
    }

    commandPalette.registerEntry({
        source,
        id: "ysink_hypesquad_switch",
        label: "Switch HypeSquad house",
        icon: "🏠",
        action: async () => {
            try {
                const houseChoice = await commandPalette.openPaletteAsync(
                    "Choose a house",
                    ["Bravery", "Brilliance", "Balance"]
                );
                switch (houseChoice) {
                    case "Bravery":
                        setHouse(1);
                        break;
                    case "Brilliance":
                        setHouse(2);
                        break;
                    case "Balance":
                        setHouse(3);
                        break;

                    default:
                        break;
                }
            } catch {}
        },
    });

    return () => window.commandPalette?.unregisterSource(source);
};

export default () => depend(commandPalettePluginIds, patch);
