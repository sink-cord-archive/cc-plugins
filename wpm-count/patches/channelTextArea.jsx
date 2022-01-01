import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { disqualify, pushToLive } from "../dataManager";
import { live } from "@cumcord/pluginData"

const cec = findByDisplayName("ChannelEditorContainer");

const handler = (e) => {
    if (e.code === "Space" || e.code === "Enter") pushToLive();
    if (e.key === "Backspace" && !live.lastBspc) disqualify();

    // im assigning a property on an array, cry about it
    live.lastBspc = e.key === "Backspace";
};

export default () =>
    after("render", cec.prototype, (_, ret) => (
        <div id="ysink_wpm_wrapper" onKeyUp={handler}>
            {ret}
        </div>
    ));
