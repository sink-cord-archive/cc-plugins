// https://github.com/jaimeadf/who-reacted/blob/main/components/Reactors.jsx

import { connectStores } from "@cumcord/modules/common/Flux";
import { findByProps, findByDisplayName } from "@cumcord/modules/webpack";

const ReactionStore = findByProps("getReactions", "_dispatcher");
const VoiceUserSummaryItem = findByDisplayName("VoiceUserSummaryItem");

const Reactors = ({ count, max, users }) => {
    function renderMoreUsers(text, className) {
        return (
            <div className={`${className} more_reactors`}>
                +{1 + count - max}
            </div>
        );
    }

    return (
        <VoiceUserSummaryItem
            className="ysink_reacted_reactors"
            max={max}
            users={users}
            renderMoreUsers={renderMoreUsers}
        />
    );
};

export default connectStores([ReactionStore], ({ message, emoji }) => ({
    users: Object.values(
        ReactionStore.getReactions(message.getChannelId(), message.id, emoji) ??
            {}
    ),
}))(Reactors);
