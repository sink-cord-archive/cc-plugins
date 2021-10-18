import { findByDisplayName } from "@cumcord/modules/webpack";
import patcher from "@cumcord/patcher";
import CumZone from "./CumZone.jsx";
import injectCss from "./styles.css";

const defaultRepos = [
    "https://cumcordplugins.github.io/Condom/plugins-large.json",
];

let patches = [];

export default (data) => {
    return {
        async onLoad() {
            const store = data.persist.store;
            if (!Array.isArray(store.repos)) store.repos = defaultRepos;

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
                        if (retVal[1].section != "My Account")return;

                        // add myself underneath cumcord! (find header, +1 to skip header, +1 to skip plugins)
                        let index =
                            retVal.findIndex((val) => val.label == "Cumcord") +
                            2;

                        retVal.splice(index, 0, {
                            section: "YSINK_CUMZONE",
                            label: "The Cum Zone",
                            element: () => <CumZone repos={store.repos} />,
                        });
                        return retVal;
                    }
                )
            );
        },

        onUnload: () => patches.forEach((unpatch) => unpatch()),
    };
};
