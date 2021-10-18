import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormText = findByDisplayName("FormText");

// props taken from https://github.com/Cumcord/Cumcord/blob/stable/src/api/ui/settings/components/Plugins.jsx
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ plugin }) => (
    <div className="ysink_card">
        <div className="ysink_toprow">
            <FormText className="ysink_title">{plugin.name}</FormText>
            <Button className="ysink_button"
                color={Button.Colors.BRAND}
                size={Button.Sizes.SMALL}
                look={Button.Looks.OUTLINED}
                onClick={() => {
                    cumcord.plugins.importPlugin("https://" + plugin.url);
                }}
            >
                Install
            </Button>
        </div>
    </div>
);
