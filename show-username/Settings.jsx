import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { FormText, Switch } from "./WPMODULES";

const Option = ({ k, children }) => (
	<div className="ysink_usern_row">
		<Switch
			checked={persist.ghost[k]}
			onChange={(v) => (persist.store[k] = v)}
		/>
		<FormText>{children}</FormText>
	</div>
);

export default () => {
	useNest(persist);

	return (
		<>
			<Option k="vc">Show usernames in Voice Chat</Option>
			<Option k="ml">Show usernames in Member List</Option>
			<Option k="msg">Show usernames in Member List</Option>
		</>
	);
};
