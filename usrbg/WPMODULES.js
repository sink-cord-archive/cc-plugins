import { batchFind } from "@cumcord/modules/webpack";

export const [
	UserBannerParent,
	Clickable,
	{ popoutBannerPremium },
	{ avatarPositionPremium, avatarWrapperNormal },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("UserBanner", false);
	findByDisplayName("Clickable");
	findByProps("popoutBannerPremium");
	findByProps("avatarPositionPremium");
});
