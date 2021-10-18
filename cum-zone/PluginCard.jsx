import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormText = findByDisplayName("FormText");
import plugins from "@cumcord/plugins";
import ui from "@cumcord/ui";

// props taken from https://github.com/Cumcord/Cumcord/blob/stable/src/api/ui/settings/components/Plugins.jsx
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ plugin }) => (
    <div className="ysink_card">
        <div className="ysink_toprow">
            <FormText className="ysink_title">{plugin.name}</FormText>
            <Button
                className="ysink_button"
                color={Button.Colors.BRAND}
                size={Button.Sizes.SMALL}
                look={Button.Looks.OUTLINED}
                onClick={() => {
                    let promise = plugins.importPlugin("https://" + plugin.url);
                    promise.then(() =>
                        ui.toasts.showToast({
                            title: "Installed plugin " + plugin.name,
                            duration: 5000,
                        })
                    );
                }}
            >
                Install
            </Button>
        </div>
    </div>
);
