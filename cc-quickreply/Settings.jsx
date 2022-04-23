// i copy-pasted this file almost exactly from devkitplus' settings LMAOO

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
			<Option k="scroll">
				Scroll to keep the replying-to message on-screen
			</Option>
			<Option k="scrollSmooth" depends="scroll">
				Scroll smoothly
			</Option>
		</>
	);
};
