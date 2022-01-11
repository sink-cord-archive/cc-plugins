import { before } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";
import getEmojiLinks from "../getLinks";

export default () =>
    before("uploadFiles", findByProps("uploadFiles"), (args) => {
        // see sendMessage.js
        // THE ART OF THE BODGE (Tom Scott reference :p )
        const sendMsgArgs = [args[0], args[3] /* , undefined, {} */];

        if (sendMsgArgs[1].content.match(/<a?:(\w+):(\d+)>/i)) {
            const sendMsgFixed = getEmojiLinks(
                /* settings.emojisize */ "64",
                sendMsgArgs
            );

            return [
                sendMsgFixed[0],
                args[1],
                args[2],
                sendMsgFixed[1],
                args[4],
            ];
        }
    });
