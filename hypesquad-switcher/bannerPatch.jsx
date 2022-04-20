import { after, findAndPatch } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import getSwitchButtonArray from "./getSwitchButtonArray";

export default findAndPatch(
	() => findByDisplayName("JoinHypeSquadCTA"),
	JoinHypeSquadCTA => {
		// lazy loading workaround madness
		const { SwitchButton, SwitchButtonArray } = getSwitchButtonArray(
			findByProps("joinHypeSquadOnline").joinHypeSquadOnline,
			findByProps("getQuestions").getHouseNameFromHouseID
		);

		return after("render", JoinHypeSquadCTA.prototype, (_, ret) => {
			const inSquad = !Array.isArray(ret?.props?.children);

			if (inSquad)
				ret.props.children.props.children.push(<SwitchButtonArray />);
			else {
				const subProps = findInReactTree(ret, n => n.children?.props?.onClick);

				// change button text from "Join Hypesquad"
				subProps.children.props.children = "Take HypeSquad test";

				subProps.children = [subProps.children];

				subProps.children.push(
					<div className="ysink_hypesquad_container ysink_new">
						{[1, 2, 3].map(n => (
							<SwitchButton houseNum={n} />
						))}
					</div>
				);

				return ret;
			}
		});
	}
);
