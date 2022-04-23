import { after } from "@cumcord/patcher";
import { popoutBannerPremium, UserBannerParent } from "../WPMODULES";

export default db_cache =>
	after("default", UserBannerParent, ([{ user }], ret) => {
		const bg_img = db_cache.get(user?.id)?.img;

		if (!ret || user?.banner || !bg_img) return;

		ret.props.style = { backgroundImage: `url("${bg_img}")` };
		ret.props.className += ` ${popoutBannerPremium}`;

		return ret;
	});
