import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { FormText, Switch } from "./WPMODULES";

const Option = ({ key, children }) => (
	<div className="ysink_usern_row">
		<Switch
			checked={persist.ghost[key]}
			onChange={v => (persist.store[key] = v)}
		/>
		<FormText>{children}</FormText>
	</div>
);

export default () => {
	useNest(persist);

	return (
		<>
			<Option key="vc">Show usernames in Voice Chat</Option>
			<Option key="ml">Show usernames in Member List</Option>
			<Option key="msg">Show usernames in Member List</Option>
		</>
	);
};
