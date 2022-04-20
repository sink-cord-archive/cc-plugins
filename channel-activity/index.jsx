import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import CssInject from "./styles.js";

export default data => {
	let memberListItemUnPatch = null;
	let cssUnpatch = null;

	return {
		onLoad() {
			cssUnpatch = CssInject();

			let memberlistitem = findByDisplayName("MemberListItem").prototype;
			memberListItemUnPatch = after(
				"render",
				memberlistitem,
				// args are always empty here so ignore them
				(_, retVal) => {
					// get activities
					if (!retVal.props?.subText?.props) return;
					const activities = retVal?.props?.subText?.props?.activities;
					if (!activities?.length) return;

					// remove exising children
					retVal.props.children = [];

					// add a child for each activity
					for (const activity of activities) {
						const activityImage =
							activity?.assets?.large_image || activity?.assets?.small_image;
						if (activity.application_id && activityImage) {
							const activityImgUrl = activityImage.startsWith("mp:")
								? activityImage.replace("mp:", "https://media.discordapp.net/")
								: `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activityImage}.png`;
							retVal.props.children.push(
								<img src={activityImgUrl} className="ysink_activity_image" />
							);
						}
					}

					return retVal;
				}
			);
		},
		onUnload() {
			if (memberListItemUnPatch) memberListItemUnPatch();
			if (cssUnpatch) cssUnpatch();
		},
	};
};
