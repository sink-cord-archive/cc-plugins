// unlike the other two patches, not adapted from the GooseMod module.

import { after, injectCSS } from "@cumcord/patcher";
import { persist } from "@cumcord/pluginData";
import { UsrbgDb } from "../usrbg-db";
import {
	bodyInnerWrapper,
	footer,
	UserBannerParent,
	UserPopoutContainerMemo,
} from "../WPMODULES";

export default (db: UsrbgDb) => {
	const unpatchUserPopout = after(
		"default",
		UserBannerParent,
		([{ user }], { props }) => {
			const usrbg = db.get(user.id)?.img;

			if (!persist.ghost.classic || !usrbg) return;

			props.style = { display: "contents" };

			props.children.push(
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundImage: `url(${usrbg})`,
						filter: "brightness(.75)",
						borderRadius: "8px"
					}}
				/>,
				<div className={props.className} />
			);
		}
	);

	const removeStyles = injectCSS(
		`.${footer}{background:none}.${footer},.${bodyInnerWrapper}{opacity:.75}`
	);

	return () => {
		unpatchUserPopout();
		removeStyles();
	};
};
