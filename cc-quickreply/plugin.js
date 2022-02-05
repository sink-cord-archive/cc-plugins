// see https://github.com/relative/cumcord-quickreply/pull/2

import { ActionTypes } from "@cumcord/modules/common/constants";
import { findByProps } from "@cumcord/modules/webpackModules";
import { FluxDispatcher as Dispatcher } from "@cumcord/modules/common";
import { before } from "@cumcord/patcher";

const { getChannelId } = findByProps(
    "getChannelId",
    "getLastSelectedChannelId",
    "getVoiceChannelId"
);
const { getChannel } = findByProps("getChannel", "getDMUserIds");
const { getMessages } = findByProps("getRawMessages");

const pendingReplyModule = findByProps("setPendingReplyShouldMention");

const dontReplyStore = new Set();

let messageIndex = -1;
let activeChannel = getChannelId();
let replyingToMessage = undefined;
let QRSymbol = Symbol("quickreply_deletePendingReply_int");

function scrollToReplyingMsg() {
    const messageContainer = document.querySelector(
        '[data-list-id="chat-messages"]'
    );
    const replyingMsg = Array.from(messageContainer.children).find((elem) =>
        elem.firstChild?.className?.includes("replying-")
    );

    replyingMsg?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function getCurrentChannel() {
    return getChannel(getChannelId());
}

function createPendingReply(
    channel,
    message,
    shouldMention,
    showMentionToggle
) {
    if (typeof showMentionToggle === "undefined") {
        showMentionToggle = channel.guild_id !== null; // DM channel showMentionToggle = false
    }

    Dispatcher.dirtyDispatch({
        type: ActionTypes.CREATE_PENDING_REPLY,
        channel,
        message,
        shouldMention,
        showMentionToggle,
    });

    setTimeout(() => {
        scrollToReplyingMsg();
    }, 100);
}

function deletePendingReply(data) {
    Dispatcher.dirtyDispatch({
        type: ActionTypes.DELETE_PENDING_REPLY,
        channelId: getChannelId(),
        ...data,
    });
}

function channelSelect(data) {
    if (activeChannel !== data.channelId) {
        activeChannel = data.channelId;
        messageIndex = -1;
    }
}

function onCreatePendingReply(data) {
    if (replyingToMessage !== data.message.id) {
        replyingToMessage = data.message.id;
    }
}

function onDeletePendingReply(data) {
    replyingToMessage = undefined;
    if (!data[QRSymbol]) {
        messageIndex = -1;
    }
}

async function keyDown(event) {
    if (!event.ctrlKey) return;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

    let messages = await getMessages(getChannelId());
    let msgArray = messages.toArray().reverse();

    let lastIndex =
        msgArray.findIndex((msg) => msg.id === replyingToMessage) || 0;
    if (event.key === "ArrowUp") {
        messageIndex = lastIndex + 1;
    } else if (event.key === "ArrowDown") {
        messageIndex = lastIndex - 1;
    }

    if (messageIndex > msgArray.length) messageIndex = msgArray.length;
    if (messageIndex < 0) {
        return deletePendingReply();
    }

    let message = msgArray[messageIndex];
    deletePendingReply({
        [QRSymbol]: true,
    });
    createPendingReply(
        getCurrentChannel(),
        message,
        !dontReplyStore.has(getChannelId())
    );
}

let unloadPatch;

export default {
    onLoad() {
        Dispatcher.subscribe(ActionTypes.CHANNEL_SELECT, channelSelect);
        Dispatcher.subscribe(
            ActionTypes.CREATE_PENDING_REPLY,
            onCreatePendingReply
        );
        Dispatcher.subscribe(
            ActionTypes.DELETE_PENDING_REPLY,
            onDeletePendingReply
        );

        window.addEventListener("keydown", keyDown);

        unloadPatch = before(
            "setPendingReplyShouldMention",
            pendingReplyModule,
            (args) => {
                if (args[1]) dontReplyStore.delete(args[0]);
                else dontReplyStore.add(args[0]);
            }
        );
    },
    onUnload() {
        Dispatcher.unsubscribe(ActionTypes.CHANNEL_SELECT, channelSelect);
        Dispatcher.unsubscribe(
            ActionTypes.CREATE_PENDING_REPLY,
            onCreatePendingReply
        );
        Dispatcher.unsubscribe(
            ActionTypes.DELETE_PENDING_REPLY,
            onDeletePendingReply
        );
        window.removeEventListener("keydown", keyDown);
        unloadPatch();
    },
};
