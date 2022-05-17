// The following code much adapted from the GooseMod module by Ducko
// originally licensed under MIT, available at
// https://github.com/GooseMod-Modules/User-Backgrounds/blob/e49ac4153af3e7dcae0f5a173b9c5d0e3ff69253/index.js

import { after } from "@cumcord/patcher";
import { persist } from "@cumcord/pluginData";
import { UsrbgDb } from "../usrbg-db";
import { premiumIconWrapper, TextBadge, UserBannerParent } from "../WPMODULES";

// fixes the styles
export default (db: UsrbgDb) =>
	after("default", UserBannerParent, ([{ user }], ret) => {
		// if this is "_" the user must be in the db as well, see above patch
		if (persist.ghost.classic || user.banner !== "_") return;

		// the above patch could be done in here, but it causes visual glitches

		ret.props.style.backgroundImage = `url(${db.get(user.id).img})`;

		ret.props.children[0] = (
			<TextBadge
				color="rgba(32, 34, 37, 0.8)"
				className={premiumIconWrapper}
				text="USRBG"
			/>
		);

		return ret;
	});
