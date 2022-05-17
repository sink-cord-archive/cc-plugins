import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { combinePluginLists } from "../pluginFetcher.js";
import fuzzySearch from "../fuzzy.js";

import { ErrorBoundary } from "@cumcord/ui/components";
import Ticker from "./Ticker.jsx";
import PluginCard from "./PluginCard.jsx";
import showRepoModal from "./RepoModal.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
import {
	Button,
	FormDivider,
	FormSection,
	FormTitle,
	TextInput,
} from "../WPMODULES.js";

const arrayEquals = (a, b) =>
	Array.isArray(a) &&
	Array.isArray(b) &&
	a.length === b.length &&
	a.every((val, index) => val === b[index]);

export default () => {
	let [search, setSearch] = React.useState("");
	let [repoPlugins, setRepoPlugins] = React.useState([]);
	let [repos, setRepos] = React.useState([]);

	useNest(persist);

	React.useEffect(() => {
		// if the repos have changed, cause a re-render
		if (!arrayEquals(persist.ghost.repos, repos))
			setTimeout(() => {
				setRepos(persist.ghost.repos);
				setRepoPlugins([]);
			});

		if (repoPlugins.length == 0 && persist.ghost.repos.length !== 0)
			combinePluginLists(persist.ghost.repos).then(setRepoPlugins);
	});

	return (
		<ErrorBoundary>
			<FormSection>
				<div className="ysink_zone_header">
					<FormTitle tag="h1">Welcome to the Cum Zone</FormTitle>
					<Button className="ysink_zone_button" onClick={() => showRepoModal()}>
						Manage Repos
					</Button>
				</div>

				<Ticker />

				<TextInput
					className="ysink_zone_input  ysink_zone_searchbox"
					placeholder="Search plugins"
					type="text"
					value={search}
					onChange={setSearch}
				/>

				<FormDivider className="ysink_zone_divide" />

				{persist.ghost.repos.length === 0 ? (
					<NoReposSplash store={persist.store} />
				) : (
					<div className="ysink_zone_card_container">
						{fuzzySearch(repoPlugins, search)
							.reverse()
							.map((p) => (
								<PluginCard key={p.url} plugin={p} />
							))}
					</div>
				)}
			</FormSection>
		</ErrorBoundary>
	);
};
