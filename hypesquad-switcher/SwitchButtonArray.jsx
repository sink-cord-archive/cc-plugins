import {
	Button,
	getHouseNameFromHouseID,
	joinHypeSquadOnline,
	Text,
} from "./WPMODULES";

const SwitchButton = ({ houseNum }) => (
	<Button
		color={Button.Colors.GREY}
		onClick={() =>
			joinHypeSquadOnline({
				houseID: "HOUSE_" + houseNum,
			})
		}
	>
		{getHouseNameFromHouseID("HOUSE_" + houseNum)}
	</Button>
);

const SwitchButtonArray = () => (
	<div>
		<Text className="ysink_hypesquad_text">Or, choose from below:</Text>
		<div className="ysink_hypesquad_container">
			{[1, 2, 3].map(n => (
				<SwitchButton houseNum={n} />
			))}
		</div>
	</div>
);

export { SwitchButtonArray, SwitchButton };
