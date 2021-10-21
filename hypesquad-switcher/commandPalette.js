import { findByProps } from "@cumcord/modules/webpack";

export default () => {
    // check if command palette api exists
    if (!window.commandPalette) return () => {};

    function setHouse(house) {
        findByProps("joinHypeSquadOnline").joinHypeSquadOnline({
            houseID: "HOUSE_" + house,
        });
    }

    commandPalette.registerEntry(
        "ysink_hypesquad_switch",
        "HypeSquad Switcher",
        "Switch HypeSquad house",
        async () => {
            try {
                let houseChoice = await commandPalette.openPaletteAsync(
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

    return () =>
        commandPalette.unregisterEntry(
            "ysink_hypesquad_switch",
            "HypeSquad Switcher"
        );
};
