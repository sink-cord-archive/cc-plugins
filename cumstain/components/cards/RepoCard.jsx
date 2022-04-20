import { persist } from "@cumcord/pluginData";
import fetchRepo from "../../util/fetchRepo";
import { officialRepos } from "../../defaultRepos";

import { FormTitle, FormText, Button, Badges } from "../../WPMODULES";

export default ({ repo }) => {
	const [fullRepo, setFullRepo] = React.useState(undefined);
	React.useEffect(async () => {
		if (!fullRepo) setFullRepo(await fetchRepo(repo));
	});

	return (
		<div className="ysink_stain_card ysink_stain_repocard">
			<div className="ysink_stain_row">
				<div>
					<FormTitle tag="p" className="ysink_stain_title">
						{fullRepo?.manifest.meta.name}
						{officialRepos.includes(repo) ? (
							<Badges.TextBadge
								className="ysink_stain_officialbadge"
								text="official repo"
								color="var(--info-positive-foreground)"
							/>
						) : (
							[]
						)}
					</FormTitle>

					<FormText>{repo}</FormText>
				</div>

				<Button
					color={Button.Colors.RED}
					className="ysink_stain_button"
					onClick={() =>
						(persist.store.repos = persist.ghost.repos.filter(r => r != repo))
					}
				>
					Remove Repo
				</Button>
			</div>
		</div>
	);
};
