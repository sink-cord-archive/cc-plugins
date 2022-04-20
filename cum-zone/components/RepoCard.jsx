import { persist } from "@cumcord/pluginData";
import { Badges, Button, FormText, FormTitle } from "../WPMODULES";

export default ({ repo }) => (
	<div className="ysink_zone_card ysink_zone_repocard">
		<div className="ysink_zone_row">
			{/* i dont know what this unmarked div is for. probably styling. */}
			<div>
				<FormTitle tag="p" className="ysink_zone_title">
					{repo.name}
					{repo.official && (
						<Badges.TextBadge
							className="ysink_zone_badge"
							text="official repo"
							color="var(--info-positive-foreground)"
						/>
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
