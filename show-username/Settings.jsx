import { persist } from "@cumcord/pluginData";
import { findByDisplayName } from "@cumcord/modules/webpack";
import { useNest } from "@cumcord/utils";

const FormText = findByDisplayName("FormText");
const Switch = findByDisplayName("Switch");

export default () => {
	useNest(persist);
	return (
		<>
			<div className="ysink_usern_row">
				<Switch
					checked={persist.ghost.vc ?? true}
					onChange={e => (persist.store.vc = e)}
				/>
				<FormText>Show usernames in Voice Chat</FormText>
			</div>

			<div className="ysink_usern_row">
				<Switch
					checked={persist.ghost.ml ?? true}
					onChange={e => (persist.store.ml = e)}
				/>
				<FormText>Show usernames in Member List</FormText>
			</div>

			<div className="ysink_usern_row">
				<Switch
					checked={persist.ghost.msg ?? true}
					onChange={e => (persist.store.msg = e)}
				/>
				<FormText>Show usernames in Messages</FormText>
			</div>
		</>
	);
};
