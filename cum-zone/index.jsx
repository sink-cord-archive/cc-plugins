import { findByDisplayName } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import CumZone from "./CumZone.jsx";
import injectCss from "./styles.css";
import { resetReposToDefault } from "./NoReposSplash.jsx";
import { USER_SETTINGS_MY_ACCOUNT } from "@cumcord/modules/common/i18n/Messages";

let patches = [];

export default (data) => {
    return {
        async onLoad() {
            const nest = data.persist;
            if (!Array.isArray(nest.ghost.repos))
                resetReposToDefault(nest.store);

            patches.push(injectCss());

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
                            section: "YSINK_CUMZONE",
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
