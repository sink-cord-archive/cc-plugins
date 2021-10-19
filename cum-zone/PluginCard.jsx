import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import plugins from "@cumcord/plugins";
import { showToast } from "@cumcord/ui/toasts";
import { useNest } from "@cumcord/utils";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");

// props taken from https://github.com/Cumcord/Cumcord/blob/stable/src/api/ui/settings/components/Plugins.jsx
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ plugin }) => {
    let rawPlugins = plugins.installed.ghost;
    let installedPlugins = Object.keys(rawPlugins)
        .map((key) => [key, rawPlugins[key].enabled])
        .filter((pair) => typeof pair[1] === "boolean");

    function interactButton(pluginId, pluginName) {
        return installedPlugins.find((p) => p[0] == pluginId) == undefined ? (
            <Button
                className="ysink_button"
                color={Button.Colors.BRAND}
                size={Button.Sizes.TINY}
                look={Button.Looks.OUTLINED}
                onClick={() => {
                    let promise = plugins.importPlugin(pluginId);
                    promise.then(() =>
                        showToast({
                            title: "Installed plugin " + pluginName,
                            duration: 5000,
                        })
                    );
                }}
            >
                Install
            </Button>
        ) : installedPlugins.find((p) => p[0] == pluginId)[1] ? (
            <Button
                className="ysink_button"
                color={Button.Colors.GREEN}
                size={Button.Sizes.TINY}
                look={Button.Looks.OUTLINED}
            >
                Running
            </Button>
        ) : (
            <Button
                className="ysink_button"
                color={Button.Colors.GREY}
                size={Button.Sizes.TINY}
                look={Button.Looks.OUTLINED}
            >
                Installed
            </Button>
        );
    }

    useNest(plugins.installed);

    return (
            <div className="ysink_card">
                <div className="ysink_row">
                    <FormTitle tag="p" className="ysink_title">
                        {plugin.name}
                    </FormTitle>
                    {interactButton("https://" + plugin.url + "/", plugin.name)}
                </div>

                <FormText className="ysink_desc">{plugin.description}</FormText>

                <FormDivider className="ysink_divide" />
                <FormText className="ysink_author_licence">
                    by {plugin.author} under {plugin.license}
                </FormText>
            </div>
    );
};
