import { after } from "@cumcord/patcher";
import { findInReactTree } from "@cumcord/utils";
import { SwitchButtonArray, SwitchButton } from "./SwitchButtonArray";
import { JoinHypeSquadCTA } from "./WPMODULES";

export default after("render", JoinHypeSquadCTA.prototype, (_, ret) => {
	debugger;
	const inSquad = !Array.isArray(ret?.props?.children);

	if (inSquad) ret.props.children.props.children.push(<SwitchButtonArray />);
	else {
		const subProps = findInReactTree(temp1, n => n.children?.props?.onClick);

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
