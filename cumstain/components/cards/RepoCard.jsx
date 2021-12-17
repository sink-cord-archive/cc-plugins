import { persist } from "@cumcord/pluginData";
import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import fetchRepo from "../../fetchRepo";
const { useEffect } = React;

const FormTitle = findByDisplayName("FormTitle");
const FormText = findByDisplayName("FormText");
const FormDivider = findByDisplayName("FormDivider");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

export default ({ repo }) => {
    const [fullRepo, setFullRepo] = React.useState(undefined);
    useEffect(async () => {
        if (!fullRepo) setFullRepo(await fetchRepo(repo));
    });

    return (
        <div className="ysink_stain_card ysink_stain_repocard">
            <div className="ysink_stain_row">
                <div>
                    <FormTitle tag="p" className="ysink_stain_title">
                        {fullRepo?.manifest.meta.name}
                    </FormTitle>

                    <FormText>{repo}</FormText>
                </div>

                <Button
                    color={Button.Colors.RED}
                    className="ysink_stain_button"
                    onClick={() =>
                        (persist.store.repos = persist.ghost.repos.filter(
                            (r) => r != repo
                        ))
                    }
                >
                    Remove Repo
                </Button>
            </div>
        </div>
    );
};
