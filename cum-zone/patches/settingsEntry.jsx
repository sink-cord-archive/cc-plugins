import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import resetReposToDefault from "../defaultRepos.js";

import CumZone from "../components/CumZone.jsx";

export default (nest) =>
    after(
        "getPredicateSections",
        findByDisplayName("SettingsView").prototype,
        (_, retVal) => {
            // don't inject into server settings!!!
            if (retVal[1].section != "My Account") return;

            // add myself underneath cumcord! (find plugins, +1 to skip past it)
            let index =
                retVal.findIndex((val) => val.section == "CUMCORD_PLUGINS") + 1;

            retVal.splice(index, 0, {
                section: "ysink_zone_CUMZONE",
                label: "The Cum Zone",
                element: () => <CumZone nest={nest} />,
            });

            return retVal;
        }
    );
