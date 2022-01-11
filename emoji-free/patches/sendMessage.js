import { before } from "@cumcord/patcher";
import { findByProps } from "@cumcord/modules/webpack";
import getEmojiLinks from "../getLinks";

export default () =>
    before("sendMessage", findByProps("sendMessage"), (args) => {
        debugger;
        // regex from https://github.com/luimu64/nitro-spoof/blob/1bb75a2471c39669d590bfbabeb7b922672929f5/index.js#L25
        if (args[1].content.match(/<a?:(\w+):(\d+)>/i)) {
            return getEmojiLinks(/* settings.emojisize */ "64", args);
        }
    });