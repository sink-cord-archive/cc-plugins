import { batchFind } from "@cumcord/modules/webpack";

const [Button, Text] = batchFind(({ findByProps, findByDisplayName }) => {
	findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
	findByDisplayName("Text");
});

export default (joinHypeSquadOnline, getHouseNameFromHouseID) => {
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
					<SwitchButton
						houseNum={n}
						{...{ joinHypeSquadOnline, getHouseNameFromHouseID }}
					/>
				))}
			</div>
		</div>
	);

	return { SwitchButton, SwitchButtonArray };
};
