import { persist } from "@cumcord/pluginData";
import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";

const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Badges = cumcord.modules.webpack.findByProps("BadgeShapes");

export default ({ repo }) => (
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

                <FormText>{repo.url}</FormText>
            </div>

            <Button
                color={Button.Colors.RED}
                className="ysink_zone_button"
                onClick={() =>
                    (persist.store.repos = persist.ghost.repos.filter(
                        (r) => r.url != repo.url
                    ))
                }
            >
                Remove Repo
            </Button>
        </div>
    </div>
);
