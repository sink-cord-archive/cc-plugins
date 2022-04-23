import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";
import { batchFind } from "@cumcord/modules/webpack";

const [FormText, Switch] = batchFind(({ findByDisplayName }) => {
	findByDisplayName("FormText");
	findByDisplayName("Switch");
});

const Option = ({ k, depends, children }) => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			gap: ".5rem",
			marginBottom: "1rem",
			marginLeft: depends ? "1rem" : 0,
		}}
	>
		<Switch
			checked={persist.ghost[k]}
			disabled={depends && !persist.ghost[depends]}
			onChange={(v) => (persist.store[k] = v)}
		/>
		<FormText>{children}</FormText>
	</div>
);

export default () => {
	useNest(persist);

	return (
		<>
			<Option k="assign">Assign modules, utils, patcher to window</Option>
			<Option k="otp" depends="apply">
				Make exported patcher functions one time by default
			</Option>
			<Option k="startupDev">Enable Cumcord dev mode on plugin load</Option>
			<Option k="disableCallbacks">Disable DevTools warning logs</Option>
		</>
	);
};
