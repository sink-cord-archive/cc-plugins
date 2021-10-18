import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
import ui from "@cumcord/ui";

// props taken from https://github.com/Cumcord/Cumcord/blob/stable/src/api/ui/settings/components/Plugins.jsx
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ plugin }) => (
    <div className="ysink_card">
        <div className="ysink_row">
            <FormTitle tag="p" className="ysink_title">{plugin.name}</FormTitle>
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

        <FormText>{plugin.description}</FormText>
        <FormDivider className="ysink_divide" />
        <FormText className="ysink_author_licence">by {plugin.author} under {plugin.license}</FormText>
    </div>
);
