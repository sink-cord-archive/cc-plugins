import * as cctools from "cumcord-tools";
import bestFindMethod from "./bestFindMethod";

import { findAll } from "@cumcord/modules/webpack";

const findClassNameModuleAll = (className) => {
	if (className.startsWith(".")) className = className.slice(1);

	return findAll(
		(m) =>
			typeof m === "object" &&
			Object.values(m).some(
				(p) => typeof p === "string" && p.includes(className)
			)
	);
};

const autoModuleFind = (selectorOrElement) =>
	bestFindMethod(
		cctools.findByDomNode(
			typeof selectorOrElement === "string"
				? document.querySelector(selectorOrElement)
				: selectorOrElement,
			false,
			true
		)
	);

window.dk = {
	cctools,
	bestFindMethod,
	autoModuleFind,
	findClassNameModuleAll,
	findClassNameModule: (className) => findClassNameModuleAll(className)[0],
};

export default () => delete window.dk;
