import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { TextInput } from "./WPMODULES";

export default () => {
	useNest(persist);

	return (
		<TextInput
			placeholder="Emote size in pixels, falls back to 64 if invalid"
			onChange={e => (persist.store.size = e)}
			value={persist.ghost.size}
		/>
	);
};
