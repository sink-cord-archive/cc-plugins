import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { showToast } from "@cumcord/ui/toasts";
import getPlugins from "../pluginFetcher.js";

import RepoCard from "./RepoCard.jsx";
import NoReposSplash from "./NoReposSplash.jsx";
import { ErrorBoundary } from "@cumcord/ui/components";
import {
	ModalComponents,
	Header,
	Flex,
	openModal,
	FormSection,
	FormDivider,
	TextInput,
	Button,
} from "../WPMODULES";

async function verifyRepo(repo) {
	try {
		await getPlugins(repo);
		return true;
	} catch {
		return false;
	}
}

async function addRepo(nest, repo, onSuccess) {
	if (!repo.endsWith("/")) repo += "/";

	if (nest.ghost.repos.find((r) => r.url == repo))
		showToast({
			title: "You already have this repo!",
			duration: 5000,
		});
	else if (await verifyRepo(repo)) {
		const split = repo.split("/");

		nest.store.repos = [
			...nest.ghost.repos,
			{
				url: repo,
				name: split[split.length - 2],
				enabled: true,
			},
		];

		showToast({
			title: "Added repo",
			duration: 5000,
		});
		onSuccess();
	} else
		showToast({
			title: "Repo was invalid",
			duration: 5000,
		});
}

const RepoModalComponent = ({ e }) => {
	const [input, setInput] = React.useState("");

	useNest(persist);

	return (
		<ErrorBoundary>
			<ModalComponents.ModalRoot
				transitionState={e.transitionState}
				size="large"
				className="ysink_zone_modal"
			>
				<ModalComponents.ModalHeader separator={false}>
					<Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
						<Header tag="h2" size={Header.Sizes.SIZE_20}>
							Manage Repos
						</Header>
					</Flex.Child>
					<Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
						<ModalComponents.ModalCloseButton onClick={e.onClose} />
					</Flex.Child>
				</ModalComponents.ModalHeader>

				<ModalComponents.ModalContent>
					<FormSection>
						<Flex basis="auto" grow={1} shrink={1} className="ysink_zone_row">
							<TextInput
								className="ysink_zone_input"
								placeholder="https://example.com/repo"
								type="text"
								value={input}
								onChange={setInput}
							/>
							<Button
								className="ysink_zone_button"
								onClick={() => addRepo(persist, input, () => setInput(""))}
							>
								Add
							</Button>
						</Flex>

						<FormDivider className="ysink_zone_divide" />

						{persist.ghost.repos.length == 0 ? (
							<NoReposSplash />
						) : (
							persist.ghost.repos.map((repo) => (
								<RepoCard key={repo.url} repo={repo} />
							))
						)}
					</FormSection>
				</ModalComponents.ModalContent>
			</ModalComponents.ModalRoot>
		</ErrorBoundary>
	);
};

export default () => openModal((e) => <RepoModalComponent e={e} />);
