import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ repo, nest }) => {
    return (
        <div className="ysink_card">
            <div className="ysink_row">
                <FormTitle tag="p" className="ysink_title">
                    {repo.name}
                </FormTitle>
                <Button
                    color={Button.Colors.RED}
                    className="ysink_button"
                    onClick={() =>
                        (nest.store.repos = nest.ghost.repos.filter((r) => r.url != repo.url))
                    }
                >
                    Remove Repo
                </Button>
            </div>
            <FormText>{repo.url}</FormText>
        </div>
    );
};
