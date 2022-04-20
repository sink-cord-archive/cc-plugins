import { common } from "@cumcord/modules";

export default () => {
	Object.assign(window, common);

	return () => {
		for (const key in common) delete window[key];
	};
};
