import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";

const TextInput = findByDisplayName("TextInput");

export default () => {
    useNest(persist);

    return (
        <TextInput
            placeholder="Emote size in pixels, falls back to 64 if invalid"
            onChange={(e) => (persist.store.size = e)}
            value={persist.ghost.size}
        />
    );
};
