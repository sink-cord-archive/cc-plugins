import * as cctools from "cumcord-tools";
import bestFindMethod from "./bestFindMethod";

import { findAll } from "@cumcord/modules/webpack";
import { injectCSS } from "@cumcord/patcher";

const findClassNameModuleAll = className => {
	if (className.startsWith(".")) className = className.substring(1);
	return findAll(
		m =>
			typeof m === "object" &&
			Object.values(m).some(p => typeof p === "string" && p.includes(className))
	);
};

const autoModuleFind = selectorOrElement => {
	if (typeof selectorOrElement === "string")
		selectorOrElement = document.querySelector(selectorOrElement);

	return bestFindMethod(cctools.findByDomNode(selectorOrElement, false, true));
};

export default () => {
	window.dk = {
		cctools,
		bestFindMethod,
		autoModuleFind,
		findClassNameModuleAll,
		findClassNameModule: className => findClassNameModuleAll(className)[0],
		/* injectSCSS: (scss) => injectSCSS(scss),
		injectSass: (sass) => injectSCSS(sass, true), */
	};

	return () => delete window.dk;
};
