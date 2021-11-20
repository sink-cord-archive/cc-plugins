// roughly based off https://github.com/yellowsink/cc-plugins/blob/master/cum-zone/components/PluginCard.jsx

import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { persist, state } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { loadTheme, removeTheme, unloadTheme } from "../themeLoadUtil";

const useReducer = React.useReducer;

import ThemeCardDeleteButton from "./ThemeCardDeleteButton";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
//const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
//const TextInput = findByDisplayName("TextInput");
const Switch = findByDisplayName("Switch");

const themeIsEnabled = (id) => {
    for (const theme of persist.ghost.themes)
        if (theme.id === id && theme.enabled) return true;

    return false;
};

const themeIsInstalled = (id) => persist.ghost.themes.some((t) => t.id === id);

export default ({ theme }) => {
    useNest(persist, false, (type, path) => path?.[0] === "themes");

    // this is pure cancer but if I need React to re-render on toggle, so be it
    const [, forceUpdate] = useReducer((x) => ~x, 0);

    return (
        <div className="ysink_stain_card">
            <FormSection>
                <div className="ysink_stain_row">
                    <FormTitle tag="p" className="ysink_stain_title">
                        {theme.name}
                    </FormTitle>

                    {themeIsInstalled(theme.id) ? (
                        <ThemeCardDeleteButton
                            theme={theme}
                            onClick={() => {
                                removeTheme(theme);
                                forceUpdate();
                            }}
                        />
                    ) : (
                        []
                    )}

                    <Switch
                        checked={themeIsEnabled(theme.id)}
                        onChange={() => {
                            themeIsEnabled(theme.id)
                                ? unloadTheme(theme)
                                : loadTheme(theme);

                            forceUpdate();
                        }}
                    />
                </div>

                <FormText className="ysink_stain_desc">
                    {theme.description}
                </FormText>

                <FormDivider className="ysink_stain_divide" />
                <FormText className="ysink_stain_author_licence">
                    {theme.author ? `by ${theme.author} ` : ""}
                    {theme.license ? `under ${theme.license}` : ""}
                </FormText>
            </FormSection>
        </div>
    );
};
