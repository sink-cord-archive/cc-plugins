// https://github.com/jaimeadf/who-reacted/blob/main/components/Settings.jsx

import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { FormText, Slider, Switch, TextInput } from "./WPMODULES";

const getThresholdMarkerLabel = value =>
	value === 0 ? "Off" : value % 1000 === 0 ? `${value / 1000}k` : value;

export default () => {
	useNest(persist);

	return (
		<div className="ysink_reacted_grid">
			<FormText>Max Users Shown</FormText>
			<TextInput
				note="The maximum number of users shown per reaction between 0 and 99."
				value={persist.ghost.maxUsersShown}
				type="text"
				onChange={value => {
					if (!isNaN(value) && value >= 0 && value <= 99)
						persist.store.maxUsersShown = value;
				}}
			/>

			<FormText>Reaction Threshold</FormText>
			<Slider
				maxValue={20}
				markers={_.range(21)}
				stickToMarkers={true}
				initialValue={persist.ghost.reactionThreshold}
				onValueChange={value => {
					persist.store.reactionThreshold = value;
				}}
				onMarkerRender={getThresholdMarkerLabel}
			/>

			<FormText>User Threshold</FormText>
			<Slider
				maxValue={10000}
				markers={[0, 10, 20, 50, 100, 500, 1000, 2000, 3000, 4000, 5000, 10000]}
				stickToMarkers={true}
				initialValue={persist.ghost.userThreshold}
				onValueChange={value => {
					persist.store.userThreshold = value;
				}}
				onMarkerRender={getThresholdMarkerLabel}
				equidistant={true}
			/>

			<FormText>Use highest user count</FormText>
			<Switch
				checked={persist.ghost.useHighestUserCount}
				onChange={value => {
					persist.store.useHighestUserCount = value;
				}}
			/>
		</div>
	);
};
