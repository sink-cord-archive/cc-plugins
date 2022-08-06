import { batchFind } from "@cumcord/modules/webpack";

export const [
	UserBannerParent,
	UserPopoutContainerMemo,
	AccountProfilePopoutContainerParent,
	{ premiumIconWrapper },
	{ footer },
	{ bodyInnerWrapper },
	{ avatarPositionPremium, avatarWrapperNormal },
	{ TextBadge },
] = batchFind(({ findByProps, findByDisplayName, find }) => {
	findByDisplayName("UserBanner", false);
	find((m: any) => m.type?.displayName === "UserPopoutContainer");
	findByDisplayName("AccountProfilePopoutContainer", false)
	findByProps("premiumIconWrapper");
	findByProps("wumpusWrapper");
	findByProps("bodyInnerWrapper");
	findByProps("avatarPositionPremium");
	findByProps("TextBadge");
});
