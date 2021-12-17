import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ goToStore }) => (
    <FormSection className="ysink_stain_nosplash">
        <FormTitle tag="h2">No Themes</FormTitle>
        <FormText>Paste a link in above, or head over to the store</FormText>
        <Button
            className="ysink_stain_button"
            color={Button.Colors.GREEN}
            sizes={Button.Sizes.LARGE}
            onClick={goToStore}
        >
            Get some themes
        </Button>
    </FormSection>
);
