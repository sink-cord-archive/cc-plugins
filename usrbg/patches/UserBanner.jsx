import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
const UserBanner = findByDisplayName("UserBanner", false);
import { persist } from "@cumcord/pluginData";

const { popoutBannerPremium } = findByProps("popoutBannerPremium");

export default (db_cache) =>
    after("default", UserBanner, ([{ bannerType, user }], ret) => {
        if (
            (persist.ghost.classicPopout === true &&
                bannerType === UserBanner.UserBannerTypes.POPOUT) ||
            (persist.ghost.classicProfile === true &&
                bannerType === UserBanner.UserBannerTypes.PROFILE)
        )
            return;

        if (!user || !ret || user.banner) return;
        let bg_img = db_cache.get(user.id)?.img;
        if (!bg_img) return;

        ret.props.style = { "background-image": `url("${bg_img}")` };
        ret.props.className += ` ${popoutBannerPremium}`;

        return ret;
    });
