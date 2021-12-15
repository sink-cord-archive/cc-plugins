import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import resetReposToDefault from "../defaultRepos.js";

const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

const component = () => (
    <FormSection className="ysink_zone_splash">
        <FormTitle tag="h2">No Repos!</FormTitle>
        <FormText>You do not have any repos added!</FormText>
        <Button
            className="ysink_zone_button"
            color={Button.Colors.GREEN}
            sizes={Button.Sizes.LARGE}
            onClick={() => resetReposToDefault()}
        >
            Reset repo list to default
        </Button>
    </FormSection>
);

export default component;