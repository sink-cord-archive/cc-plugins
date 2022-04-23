import { findInReactTree } from "@cumcord/utils";
import { after } from "@cumcord/patcher";
import { MemberListItem } from "./WPMODULES";

export default after("render", MemberListItem.prototype, (_, ret) => {
	// get activities
	const activities = findInReactTree(
		ret?.props?.subText,
		(m) => m?.activities?.length
	)?.activities;
	if (!activities) return;

	// remove exising children
	ret.props.children = [];

	// add a child for each activity
	for (const activity of activities) {
		const activityImage =
			activity?.assets?.large_image ?? activity?.assets?.small_image;

		if (!activity.application_id || !activityImage) continue;

		const activityImgUrl = activityImage.startsWith("mp:")
			? activityImage.replace("mp:", "https://media.discordapp.net/")
			: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activityImage}.png`;

		ret.props.children.push(
			<img src={activityImgUrl} className="ysink_activity_image" />
		);
	}

	return ret;
});
