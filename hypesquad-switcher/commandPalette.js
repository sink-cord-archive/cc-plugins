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
import { findByProps } from "@cumcord/modules/webpack";
const patch = () => {
    function setHouse(house) {
        findByProps("joinHypeSquadOnline").joinHypeSquadOnline({
            houseID: "HOUSE_" + house,
        });
    }

    commandPalette.registerEntry(
        "HypeSquad Switcher",
        "ysink_hypesquad_switch",
        "Switch HypeSquad house",
        "🏠",
        async () => {
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
        }
    );

    return () => window.commandPalette?.unregisterSource("HypeSquad Switcher");
};
