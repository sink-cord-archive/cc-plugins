import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { USER_SETTINGS_MY_ACCOUNT } from "@cumcord/modules/common/i18n/Messages";
import resetReposToDefault from "../defaultRepos.js";

import CumZone from "../components/CumZone.jsx";

export default (nest) =>
    after(
        "getPredicateSections",
        findByDisplayName("SettingsView").prototype,
        (_, retVal) => {
            // don't inject into server settings!!!
            if (retVal[1].label != USER_SETTINGS_MY_ACCOUNT) return;

            // add myself underneath cumcord! (find header, +1 to skip header, +1 to skip plugins)
            let index = retVal.findIndex((val) => val.label == "Cumcord") + 2;

            retVal.splice(index, 0, {
                section: "ysink_zone_CUMZONE",
                label: "The Cum Zone",
                element: () => <CumZone nest={nest} />,
            });
            return retVal;
        }
    );
