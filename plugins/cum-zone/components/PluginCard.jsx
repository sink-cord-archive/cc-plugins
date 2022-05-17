import plugins from "@cumcord/plugins";
import { useNest } from "@cumcord/utils";
import { getPluginUrl } from "../pluginFetcher.js";
import { FormDivider, FormText, FormTitle } from "../WPMODULES.js";
import PluginCardButton from "./PluginCardButton.jsx";

export default ({ plugin }) => {
	useNest(plugins.installed);

	return (
		<div className="ysink_zone_card">
			<div className="ysink_zone_row">
				<FormTitle tag="p" className="ysink_zone_title">
					{plugin.name}
				</FormTitle>
				<PluginCardButton
					id={getPluginUrl(plugin.repo.url, plugin.url).href}
					name={plugin.name}
				/>
			</div>

			<FormText className="ysink_zone_desc">{plugin.description}</FormText>

			<FormDivider className="ysink_zone_divide" />
			<FormText className="ysink_zone_author_licence">
				by {plugin.author} under {plugin.license}
			</FormText>
		</div>
	);
};
