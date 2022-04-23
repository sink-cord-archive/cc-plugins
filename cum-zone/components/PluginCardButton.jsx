import plugins from "@cumcord/plugins";
import { useNest } from "@cumcord/utils";
import { showToast } from "@cumcord/ui/toasts";
import { Button } from "../WPMODULES";

const installedPlugins = () => Object.keys(plugins.installed.ghost)
	.map((key) => [key, plugins.installed.ghost[key].enabled])
	.filter(([, enabled]) => typeof enabled === "boolean");

const findPlugin = (pId) =>
	installedPlugins().find((p) => p[0] == pId || p[0] == pId + "/");

export default ({ id, name }) => {
	useNest(plugins.installed)

	const importPlugin = () =>
		plugins.importPlugin(id).then(() =>
			showToast({
				title: "Installed plugin " + name,
				duration: 5000,
			})
		);

	if (!findPlugin(id))
		return (
			<Button
				className="ysink_zone_button"
				color={Button.Colors.BRAND}
				size={Button.Sizes.TINY}
				look={Button.Looks.OUTLINED}
				onClick={importPlugin}
			>
				Install
			</Button>
		);

	const pluginEnabled = findPlugin(id)[1];

	return (
		<Button
			className="ysink_zone_button"
			color={pluginEnabled ? Button.Colors.GREEN : Button.Colors.GREY}
			size={Button.Sizes.TINY}
			look={Button.Looks.OUTLINED}
		>
			{pluginEnabled ? "Running" : "Installed"}
		</Button>
	);
};
