import { persist } from "@cumcord/pluginData";
import { webpack, common, internal } from "@cumcord/modules";
import { utils, patcher } from "@cumcord";

const patch = () => {
	const patcherToApply = !persist.ghost.otp
		? patcher
		: {
				...patcher,
				after: (name, obj, func, otp = true) =>
					patcher.after(name, obj, func, otp),
				before: (name, obj, func, otp = true) =>
					patcher.before(name, obj, func, otp),
				instead: (name, obj, func, otp = true) =>
					patcher.instead(name, obj, func, otp),
		  };

	// spread is one byte smaller minified
	// if another is added object.assign is smaller
	const toApply = {
		...webpack,
		...common,
		...internal,
		...utils,
		...patcherToApply,
	};

	Object.assign(window, toApply);

	return () => Object.keys(toApply).forEach((k) => delete window[k]);
};


// automatic patch and unpatch handler via nests
let unpatch;

const handler = () => {
	unpatch?.();
	if (persist.ghost.assign) unpatch = patch();
};

persist.on("SET", handler);

handler();

export default () => {
	persist.off("SET", handler);
	unpatch?.();
};
