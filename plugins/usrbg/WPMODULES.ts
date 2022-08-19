import { batchFind } from "@cumcord/modules/webpack";

export const [
	UserBannerParent,
	UserPopoutAvatarParent,
	{ premiumIconWrapper },
	{ TextBadge },
] = batchFind(({ findByProps, findByDisplayName }) => {
	findByDisplayName("UserBanner", false);
	findByProps("UserPopoutAvatar");
	findByProps("premiumIconWrapper");
	findByProps("TextBadge");
});
