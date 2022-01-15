import { find, findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
const UserBanner = findByDisplayName("UserBanner", false);

const { popoutBannerPremium } = findByProps("popoutBannerPremium");

export default (db_cache) =>
    after("default", UserBanner, ([{ user }], ret) => {
        if (!user || !ret || user.banner) return;
        let bg_img = db_cache.get(user.id)?.img;
        if (!bg_img) return;

        ret.props.style = { "background-image": `url("${bg_img}")` };
        ret.props.className += ` ${popoutBannerPremium}`;

        return ret;
    });