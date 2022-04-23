import { before } from "@cumcord/patcher";
import modifyIfNeeded from "../msgProcessor";
import { uploadModule, messageModule } from "../WPMODULES";

export default () => {
	// these patches don't return the args array as good citizens should
	// however if we're modifying the message by reference anyway why not
	// modify the whole args array by reference lmao

	const sendMessagePatch = before("sendMessage", messageModule, (args) =>
		modifyIfNeeded(args[1])
	);

	const sendMessageAttachmentsPatch = before(
		"uploadFiles",
		uploadModule,
		(args) => modifyIfNeeded(args[0].parsedMessage)
	);

	return () => {
		sendMessagePatch();
		sendMessageAttachmentsPatch();
	};
};
