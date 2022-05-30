import { before } from "@cumcord/patcher";
import { FluxDispatcher } from "@cumcord/modules/common";

export const onUnload = before("dispatch", FluxDispatcher, ([arg]) => {
	if (arg.type === "MESSAGE_CREATE")
		arg.message.content = arg.message.content.replaceAll(/\/.*?(?: |$)/g, "");
});
