import { persist } from "@cumcord/pluginData";
import { showToast } from "@cumcord/ui/toasts";

import { useNest } from "@cumcord/utils";

import { ErrorBoundary } from "@cumcord/ui/components";
import fetchTheme from "../util/fetchTheme";
import { loadTheme } from "../util/themeLoadUtil";
import { Button, TextInput } from "../WPMODULES";

export default () => {
	useNest(persist);

	let [urlInput, setUrlInput] = React.useState("");

	return (
		<ErrorBoundary>
			<div className="ysink_stain_installbar">
				<TextInput
					className="ysink_stain_input"
					placeholder="Theme import URL"
					type="text"
					value={urlInput}
					onChange={e => setUrlInput(e)}
				/>

				<Button
					className="ysink_stain_button"
					onClick={() => {
						fetchTheme(urlInput).then(
							async t => {
								await loadTheme(t);
								showToast({
									title: `Loaded theme ${t.name}`,
									duration: 5000,
								});
								setUrlInput("");
							},
							() =>
								showToast({
									title: "Failed to fetch theme - check URL",
									duration: 5000,
								})
						);
					}}
				>
					Install
				</Button>
			</div>
		</ErrorBoundary>
	);
};
