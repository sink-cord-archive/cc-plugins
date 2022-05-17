import { batchFind } from "@cumcord/modules/webpack";

export const [
	UserBannerParent,
	UserPopoutContainerMemo,
	{ premiumIconWrapper },
	{ footer },
	{ bodyInnerWrapper },
	{ avatarPositionPremium, avatarWrapperNormal },
	{ TextBadge },
] = batchFind(({ findByProps, findByDisplayName, find }) => {
	findByDisplayName("UserBanner", false);
	find((m: any) => m.type?.displayName === "UserPopoutContainer");
	findByProps("premiumIconWrapper");
	findByProps("wumpusWrapper");
	findByProps("bodyInnerWrapper");
	findByProps("avatarPositionPremium");
	findByProps("TextBadge");
});
