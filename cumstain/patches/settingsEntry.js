import { findByDisplayName, findAsync } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import SettingsMain from "../components/SettingsMain";
import { dePromisifyPatch } from "cumcord-tools";

export default () =>
    dePromisifyPatch(
        findAsync(() => findByDisplayName("SettingsView")),
        (SettingsView) =>
            after("getPredicateSections", SettingsView.prototype, (_, ret) => {
                // don't inject into server settings!!!
                if (ret[1]?.section != "My Account") return;

                // add myself underneath cumcord! (find plugins, +1 to skip past it)
                let index =
                    ret.findIndex((e) => e.section == "CUMCORD_PLUGINS") + 1;

                ret.splice(index, 0, {
                    section: "ysink_stain_CUMSTAIN",
                    label: "Themes",
                    element: SettingsMain,
                });

                return ret;
            })
    );
