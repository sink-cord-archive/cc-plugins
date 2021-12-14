// roughly based off https://github.com/yellowsink/cc-plugins/blob/master/cum-zone/components/PluginCard.jsx

import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { persist, state } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { loadTheme, removeTheme, unloadTheme } from "../themeLoadUtil";
import BDBadge from "./BDBadge";
import CCBadge from "./CCBadge";

import ThemeCardDeleteButton from "./ThemeCardDeleteButton";
import MediaCarousel from "./MediaCarousel";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const Switch = findByDisplayName("Switch");

const themeIsEnabled = (id) => {
    for (const theme of persist.ghost.themes)
        if (theme.id === id && theme.enabled) return true;

    return false;
};

const themeIsInstalled = (id) => persist.ghost.themes.some((t) => t.id === id);

export default ({ theme, deleteHook /* react madness */ }) => {
    useNest(persist);

    return (
        <div className="ysink_stain_card">
            <FormSection>
                <MediaCarousel media={theme.media} />

                <div className="ysink_stain_row">
                    {theme.compat ? <BDBadge /> : <CCBadge />}

                    <FormTitle tag="p" className="ysink_stain_title">
                        {theme.name}
                    </FormTitle>

                    {themeIsInstalled(theme.id) ? (
                        <ThemeCardDeleteButton
                            theme={theme}
                            onClick={() => {
                                removeTheme(theme);
                                deleteHook?.();
                            }}
                        />
                    ) : (
                        []
                    )}

                    <Switch
                        checked={themeIsEnabled(theme.id)}
                        onChange={() =>
                            themeIsEnabled(theme.id)
                                ? unloadTheme(theme)
                                : loadTheme(theme)
                        }
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
