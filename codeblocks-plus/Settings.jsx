import { persist } from "@cumcord/pluginData";
import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";
import includedThemes from "./themeProcessor";

const { SingleSelect } = findByDisplayName("Select", false);
const Header = findByProps("Sizes", "Tags");
const TextInput = findByDisplayName("TextInput");

export default () => {
    useNest(persist);
    const [custom, setCustom] = React.useState(persist.ghost.custom);

    const includedThemeOptions = includedThemes.map(({ name, url }) => ({
        value: url,
        label: name,
    }));
    const themeOptions = [{ label: "Discord default" }].concat(
        includedThemeOptions
    );

    return (
        <>
            <Header className="ysink_code_head">Select theme</Header>
            <SingleSelect
                options={themeOptions}
                value={persist.ghost.theme || undefined}
                onChange={(e) => (persist.store.theme = e)}
                isDisabled={custom}
            />

            <Header className="ysink_code_head">Custom theme url</Header>
            <TextInput
                placeholder="Custom theme URL"
                onChange={(e) =>
                    setCustom((persist.store.theme = persist.store.custom = e))
                }
                value={custom}
            />
        </>
    );
};
