import { findByDisplayName, findAsync } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { dePromisifyPatch } from "cumcord-tools";

import CumZone from "../components/CumZone.jsx";

export default () =>
    dePromisifyPatch(
        findAsync(() => findByDisplayName("SettingsView")),
        (SettingsView) =>
            after(
                "getPredicateSections",
                SettingsView.prototype,
                (_, retVal) => {
                    // don't inject into server settings!!!
                    if (retVal[1]?.section != "My Account") return;

                    // add myself underneath cumcord! (find plugins, +1 to skip past it)
                    let index =
                        retVal.findIndex(
                            (val) => val.section == "CUMCORD_PLUGINS"
                        ) + 1;

                    retVal.splice(index, 0, {
                        section: "ysink_zone_CUMZONE",
                        label: "The Cum Zone",
                        element: CumZone,
                    });

                    return retVal;
                }
            )
    );
