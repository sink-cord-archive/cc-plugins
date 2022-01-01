import { findByDisplayName } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { disqualify, pushToLive } from "../dataManager";

const cec = findByDisplayName("ChannelEditorContainer");

const handler = (e) => {
    if (e.code === "Space" || e.code === "Enter") pushToLive();
    if (e.key === "Backspace") disqualify();
};

export default () =>
    after("render", cec.prototype, (_, ret) => (
        <div id="ysink_wpm_wrapper" onKeyUp={handler}>
            {ret}
        </div>
    ));
