// https://github.com/jaimeadf/who-reacted/blob/main/components/Reactors.jsx

import { connectStores } from "@cumcord/modules/common/Flux";
import { ReactionStore, VoiceUserSummaryItem } from "./WPMODULES";

const Reactors = ({ count, max, users }) => (
	<VoiceUserSummaryItem
		className="ysink_reacted_reactors"
		{...{ max, users }}
		renderMoreUsers={(_text, className) => (
			<div className={`${className} more_reactors`}>+{1 + count - max}</div>
		)}
	/>
);

export default connectStores([ReactionStore], ({ message, emoji }) => ({
	users: Object.values(
		ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ?? {}
	),
}))(Reactors);
