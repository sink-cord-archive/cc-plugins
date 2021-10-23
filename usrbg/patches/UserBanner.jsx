import { find, findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
const UserBanner = find((m) => m?.default?.displayName == "UserBanner");

const { popoutBannerPremium } = findByProps("popoutBannerPremium");

export default (db_cache) =>
    after("default", UserBanner, ([{ user }], ret) => {
        let bg_img = db_cache.get(user?.id)?.img;
        if (!user || !ret || user.banner || !bg_img) return;

        ret.props.style = { background: `url(${bg_img})` };
        ret.props.className += ` ${popoutBannerPremium}`;

        return ret;
    });
