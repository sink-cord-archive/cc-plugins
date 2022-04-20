import { persist } from "@cumcord/pluginData";
import { patcher } from "@cumcord";

export default () => {
	if (persist.ghost.otp)
		Object.assign(window, {
			injectCSS: patcher.injectCSS,
			after: (name, obj, func, otp = true) =>
				patcher.after(name, obj, func, otp),
			before: (name, obj, func, otp = true) =>
				patcher.before(name, obj, func, otp),
			instead: (name, obj, func, otp = true) =>
				patcher.instead(name, obj, func, otp),
		});
	else Object.assign(window, patcher);

	return () => {
		for (const key in patcher) delete window[key];
	};
};
