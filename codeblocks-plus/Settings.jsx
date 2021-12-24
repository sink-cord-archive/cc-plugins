import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import includedThemes from "./themeProcessor";

const { SingleSelect } = findByDisplayName("Select", false);

export default () => {
    useNest(persist);

    const includedThemeOptions = includedThemes.map(({ name, url }) => ({
        value: url,
        label: name,
    }));
    const themeOptions = [{ label: "Discord default" }].concat(
        includedThemeOptions
    );

    return (
        <>
            <SingleSelect
                options={themeOptions}
                value={persist.ghost.theme}
                onChange={(e) => (persist.store.theme = e)}
                isDisabled={false}
            />
        </>
    );
};
