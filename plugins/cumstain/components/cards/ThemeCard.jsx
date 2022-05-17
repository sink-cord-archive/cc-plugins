import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { loadTheme, removeTheme, unloadTheme } from "../../util/themeLoadUtil";
import { BDBadge, CCBadge } from "../badges";

import { Switch } from "../../WPMODULES";

import fetchTheme from "../../util/fetchTheme";

const DeleteButton = ({ onClick }) => (
	<svg
		onClick={onClick}
		className="ysink_stain_delete"
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 0 24 24"
		width="24px"
	>
		<path d="M0 0h24v24H0z" fill="none" />
		<path d="M0 0h24v24H0V0z" fill="none" />
		<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
	</svg>
);

const themeIsEnabled = (url) => {
	for (const theme of persist.ghost.themes)
		if (theme.url === url && theme.enabled) return true;

	return false;
};

const themeIsInstalled = (url) =>
	persist.ghost.themes.some((t) => t.url === url);

export default ({ theme, deleteHook }) => {
	useNest(persist, false, (_, { path }) => path[0] === "themes");

	return (
		<div className="ysink_stain_card ysink_stain_tcard">
			<div className="ysink_stain_tsmmed">
				{theme.media ? (
					<img src={theme.media[0] ?? theme.media} />
				) : (
					<span>NO MEDIA</span>
				)}
			</div>

			<div className="ysink_stain_title">
				{theme.compat ? <BDBadge /> : <CCBadge />}
				{theme.name}
			</div>

			<div className="ysink_stain_tdesc">{theme.description}</div>

			<div className="ysink_stain_tacts">
				{themeIsInstalled(theme.url) ? (
					<DeleteButton
						onClick={() => {
							removeTheme(theme);
							deleteHook?.();
						}}
					/>
				) : (
					[]
				)}

				<Switch
					checked={themeIsEnabled(theme.url)}
					onChange={
						async () =>
							themeIsEnabled(theme.url)
								? unloadTheme(theme)
								: loadTheme(await fetchTheme(theme.url)) // not awaiting but loadTheme is async
					}
				/>
			</div>

			<div className="ysink_stain_taulic">
				{theme.author ? `by ${theme.author} ` : ""}
				{theme.license ? `under ${theme.license}` : ""}
			</div>
		</div>
	);
};
