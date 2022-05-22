import { addHandler } from "@cumcord/websocket";
import { addRepo, addTheme } from "../util/friendlyUtils";
import { showConfirmationModal } from "@cumcord/ui/modals";

const userDenyMsg = "User confirmation declined";

function addRepoHandler(msg, { ok, error }) {
	if (typeof msg?.repo !== "string") return error("You must supply a repo");

	showConfirmationModal({
		type: "confirm",
		confirmText: "Add Repo",
		header: "[Cumstain] Add Repo?",
		content: `A web page or another app on your PC just tried to add the following theme repo: \`${msg.repo}\`. Allow this?`,
	}).then((result) => {
		if (result)
			addRepo(msg.repo, ok, error).catch((e) => error("Unhandled error: " + e));
		else error(userDenyMsg);
	});
}

function addThemeHandler(msg, { ok, error }) {
	if (typeof msg?.url !== "string") return error("You must supply a theme url");

	showConfirmationModal({
		type: "confirm",
		confirmText: "Install Theme",
		header: "[Cumstain] Install theme?",
		content: `A web page or another app on your PC just tried to install the following theme: \`${msg.url}\`. Allow this?`,
	}).then((result) => {
		if (result)
			addTheme(msg.url, ok, error).catch((e) => error("Unhandled error: " + e));
		else error(userDenyMsg);
	});
}

export default () => [
	addHandler("ysink_stain_addrepo", addRepoHandler),
	addHandler("ysink_stain_addtheme", addThemeHandler),
];
