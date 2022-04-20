import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Text = findByDisplayName("Text");

function setHouse(house) {
	findByProps("joinHypeSquadOnline").joinHypeSquadOnline({
		houseID: "HOUSE_" + house,
	});
}

const SwitchButton = ({ houseNum }) => (
	<Button color={Button.Colors.GREY} onClick={() => setHouse(houseNum)}>
		{findByProps("getQuestions").getHouseNameFromHouseID("HOUSE_" + houseNum)}
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

export default SwitchButtonArray;
export { SwitchButtonArray, SwitchButton };
