import { before, after, instead } from "@cumcord/patcher";
import { UsrbgDb } from "../usrbg-db";
import { premiumIconWrapper, TextBadge, UserBannerParent, UserPopoutAvatarParent } from "../WPMODULES";

export default (db: UsrbgDb) => {
  const unpatchUser = before("default", UserBannerParent, ([props]) => {
		if (db.has(props.user.id)) {
			const img = db.get(props.user.id)?.img;

			props.bannerSrc = img;
			instead("getBannerURL", props.displayProfile, () => img, false);
		}
	});

	const unpatchAvatar = before("UserPopoutAvatar", UserPopoutAvatarParent, ([props]) => {
		if (db.has(props.user.id)) props.displayProfile.banner = "_";
	});

	const unpatchBadge = after("default", UserBannerParent, ([props], res) => {
		if (db.has(props.user.id)) {
			res.props.children[0] = (
				<TextBadge
					color="rgba(32, 34, 37, 0.8)"
					className={premiumIconWrapper}
					text="USRBG"
				/>
			);
		}
	});

	return () => {
		unpatchUser();
		unpatchAvatar();
		unpatchBadge();
	};
};