import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Badges = cumcord.modules.webpack.findByProps("BadgeShapes");

export default ({ repo, nest }) => {
    return (
        <div className="ysink_card">
            <div className="ysink_row">
                <div>
                    <FormTitle tag="p" className="ysink_title">
                        {repo.name}
                        {repo.official ? (
                            <Badges.TextBadge
                                className="ysink_badge"
                                text="official repo"
                                color="var(--info-positive-foreground)"
                            />
                        ) : (
                            []
                        )}
                    </FormTitle>

                    <FormText>{repo.url}</FormText>
                </div>

                <Button
                    color={Button.Colors.RED}
                    className="ysink_button"
                    onClick={() =>
                        (nest.store.repos = nest.ghost.repos.filter(
                            (r) => r.url != repo.url
                        ))
                    }
                >
                    Remove Repo
                </Button>
            </div>
        </div>
    );
};
