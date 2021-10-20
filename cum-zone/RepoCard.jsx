import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Badges = cumcord.modules.webpack.findByProps("BadgeShapes");

export default ({ repo, nest }) => (
    <div className="ysink_zone_card">
        <div className="ysink_zone_row">
            <div>
                <FormTitle tag="p" className="ysink_zone_title">
                    {repo.name}
                    {repo.official ? (
                        <Badges.TextBadge
                            className="ysink_zone_badge"
                            text="official repo"
                            color="var(--info-positive-foreground)"
                        />
                    ) : (
                        []
                    )}
                </FormTitle>

                <FormText>{repo.url.href}</FormText>
            </div>

            <Button
                color={Button.Colors.RED}
                className="ysink_zone_button"
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
