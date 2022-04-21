import { persist } from "@cumcord/pluginData";
import { injectCSS } from "@cumcord/patcher";

export default () => {
	const modify = injectCSS(persist.ghost.quickCSS);

	const handler = (_type, { path: [topKey] }) => {
		if (topKey === "quickCSS") modify(persist.ghost.quickCSS);
	};

	persist.on("SET", handler);

	return () => {
		modify();
		persist.off("SET", handler);
	};
};
