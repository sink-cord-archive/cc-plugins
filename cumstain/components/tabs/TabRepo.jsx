import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { showToast } from "@cumcord/ui/toasts";
const { useState } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import fetchRepo from "../../util/fetchRepo";
import RepoCard from "../cards/RepoCard";
const Flex = findByDisplayName("Flex");
const FormSection = findByDisplayName("FormSection");
const FormDivider = findByDisplayName("FormDivider");
const TextInput = findByDisplayName("TextInput");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");

async function verifyRepo(repo) {
    try {
        await fetchRepo(repo);
        return true;
    } catch {
        return false;
    }
}

const toast = (str) => showToast({ title: str, duration: 5000 });

async function addRepo(repo) {
    if (!repo.endsWith("/")) repo += "/";

    if (persist.ghost.repos.find((r) => r.url == repo) !== undefined) {
        toast("You already have this repo!");
        return false;
    } else if (await verifyRepo(repo)) {
        // copy like this to correctly raise events
        let repos = persist.ghost.repos;
        repos.push(repo);
        persist.store.repos = repos;
        toast("Added repo");
        return true;
    } else {
        toast("Repo was invalid");
        return false;
    }
}

export default ({ goTo }) => {
    const [url, setUrl] = useState("");
    useNest(persist);

    return (
        <ErrorBoundary>
            <FormSection>
                <Flex
                    basis="auto"
                    grow={1}
                    shrink={1}
                    className="ysink_stain_row"
                >
                    <TextInput
                        placeholder="https://example.com/repo"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e)}
                    />
                    <Button
                        className="ysink_stain_button"
                        onClick={async () => {
                            if (await addRepo(url)) setUrl("");
                        }}
                    >
                        Add
                    </Button>
                </Flex>

                <FormDivider className="ysink_stain_divide" />

                {persist.ghost.repos.map((repo) => (
                    <RepoCard repo={repo} />
                ))}
            </FormSection>
        </ErrorBoundary>
    );
};
