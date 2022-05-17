import { persist } from "@cumcord/pluginData";

const apply = () => {
	if (persist.ghost.disableCallbacks)
		DiscordNative.window.setDevtoolsCallbacks(
			() => {},
			() => {}
		);
};

if (window.DiscordNative) {
	persist.on("SET", apply);
	apply();
}

export default !window.DiscordNative
	? undefined
	: () => persist.off("SET", apply);
