import { findByDisplayName } from "@cumcord/modules/webpack";
import { after, findAndPatch } from "@cumcord/patcher";

import CumZone from "../components/CumZone.jsx";

export default () =>
	findAndPatch(
		() => findByDisplayName("SettingsView"),
		(SettingsView) =>
			after("getPredicateSections", SettingsView.prototype, (_, ret) => {
				// only inject into user settings
				if (ret[1]?.section != "My Account") return;

				// add myself underneath cumcord (find plugins, +1 to skip past it)
				const index =
					ret.findIndex((val) => val.section == "CUMCORD_PLUGINS") + 1;

				ret.splice(index, 0, {
					section: "ysink_zone_CUMZONE",
					label: "The Cum Zone",
					element: CumZone,
				});

				return ret;
			})
	);
