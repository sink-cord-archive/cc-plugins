import { instead } from "@cumcord/patcher";
import { nitroInfo } from "../WPMODULES";

export default () => {
	const serverCheck = instead("canUseEmojisEverywhere", nitroInfo, () => true);
	const animatedCheck = instead("canUseAnimatedEmojis", nitroInfo, () => true);

	return () => {
		serverCheck();
		animatedCheck();
	};
};
