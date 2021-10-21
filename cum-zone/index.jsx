import { findByDisplayName } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import CumZone from "./CumZone.jsx";
import injectCss from "./sass_build.css";
import { resetReposToDefault } from "./NoReposSplash.jsx";
import { USER_SETTINGS_MY_ACCOUNT } from "@cumcord/modules/common/i18n/Messages";
import commandPalette from "./commandPalette.js"

let patches = [];

export default (data) => {
    return {
        async onLoad() {
            const nest = data.persist;
            if (!Array.isArray(nest.ghost.repos))
                resetReposToDefault(nest.store);

            patches.push(injectCss(), commandPalette(nest));

            let settingsView =
                cumcord.modules.webpack.findByDisplayName(
                    "SettingsView"
                ).prototype;

            patches.push(
                patcher.after(
                    "getPredicateSections",
                    settingsView,
                    (_, retVal) => {
                        // don't inject into server settings!!!
                        if (retVal[1].label != USER_SETTINGS_MY_ACCOUNT) return;

                        // add myself underneath cumcord! (find header, +1 to skip header, +1 to skip plugins)
                        let index =
                            retVal.findIndex((val) => val.label == "Cumcord") +
                            2;

                        retVal.splice(index, 0, {
                            section: "ysink_zone_CUMZONE",
                            label: "The Cum Zone",
                            element: () => <CumZone nest={nest} />,
                        });
                        return retVal;
                    }
                )
            );
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
