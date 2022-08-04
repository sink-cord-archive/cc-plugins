import { persist } from "@cumcord/pluginData";
import { useNest, copyText } from "@cumcord/utils";
import { loadTheme, removeTheme, unloadTheme } from "../../util/themeLoadUtil";
import { BDBadge, CCBadge } from "../badges";
import { Switch } from "../../WPMODULES";
import fetchTheme from "../../util/fetchTheme";
import showCarouselModal from "../CarouselModal";

import Delete from "../../assets/Delete";
import Copy from "../../assets/Copy";

function themeIsEnabled(url) {
	for (const theme of persist.ghost.themes)
		if (theme.url === url && theme.enabled) return true;

	return false;
}

const themeIsInstalled = (url) =>
	persist.ghost.themes.some((t) => t.url === url);

export default ({ theme, deleteHook, gap }) => {
	useNest(persist, false, (_, { path }) => path[0] === "themes");

	return (
		<div
			className="ysink_stain_card ysink_stain_tcard"
			style={{ marginBottom: gap }}
		>
			<div
				className="ysink_stain_tmedia"
				style={{
					backgroundImage:
						theme.media &&
						`url(${Array.isArray(theme.media) ? theme.media[0] : theme.media})`,
				}}
				onClick={() => theme.media && showCarouselModal(theme.media)}
			>
				{theme.media ? (
					<div className="ysink_stain_tview">VIEW MEDIA</div>
				) : (
					<div>NO MEDIA</div>
				)}
			</div>

			<div className="ysink_stain_title">
				{theme.compat ? <BDBadge /> : <CCBadge />}
				{theme.name}
			</div>

			<div className="ysink_stain_tdesc">{theme.description}</div>

			<div className="ysink_stain_tacts">
				<Copy
					className="ysink_stain_iconbtn"
					onClick={() => copyText(theme.url)}
				/>

				{themeIsInstalled(theme.url) ? (
					<Delete
						className="ysink_stain_iconbtn"
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
