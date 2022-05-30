import { after } from "@cumcord/patcher";
import { Clickable } from "./WPMODULES";
import { findInReactTree } from "@cumcord/utils";

export default after("renderInner", Clickable.prototype, (__, ret) => {
	if (!ret.props["data-list-item-id"]?.startsWith("members-")) return;
	const activities = findInReactTree(
		ret,
		(n) => n.activities?.length
	)?.activities;
	if (!activities) return;

	const target = ret.props.children;

	for (const activity of activities) {
		const activityImage =
			activity?.assets?.large_image ?? activity?.assets?.small_image;
		if (!activity.application_id || !activityImage) continue;
		const activityImgUrl = activityImage.startsWith("mp:")
			? activityImage.replace("mp:", "https://media.discordapp.net/")
			: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activityImage}.png`;

		target.props.children.push(
			<img src={activityImgUrl} className="ysink_activity_image" />
		);
	}
});
