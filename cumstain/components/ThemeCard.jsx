// roughly based off https://github.com/yellowsink/cc-plugins/blob/master/cum-zone/components/PluginCard.jsx

import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
//const FormSection = findByDisplayName("FormSection");
//const FormDivider = findByDisplayName("FormDivider");
//const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
//const TextInput = findByDisplayName("TextInput");

export default ({ theme }) => (
    <div className="ysink_stain_themecard">
        <FormTitle tag="p" className="ysink_stain_title">{theme.name}</FormTitle>
    </div>
);
