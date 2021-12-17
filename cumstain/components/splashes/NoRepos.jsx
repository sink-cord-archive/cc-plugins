import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormSection = findByDisplayName("FormSection");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
import openReposModal from "../ReposModal"

export default ({ }) => (
    <FormSection className="ysink_stain_nosplash">
        <FormTitle tag="h2">No Repos</FormTitle>
        <FormText>Add one in the repo manager!</FormText>
        <Button
            className="ysink_stain_button"
            color={Button.Colors.GREEN}
            sizes={Button.Sizes.LARGE}
            onClick={openReposModal}
        >
            Open repo manager
        </Button>
    </FormSection>
);
