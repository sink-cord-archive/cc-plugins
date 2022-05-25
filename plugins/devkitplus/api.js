import * as cctools from "cumcord-tools";
import bestFindMethod from "./bestFindMethod";

import { findAll } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";

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

let recons = [];

const recon = (funcName, parent, oneTime = false) => {
	const unrecon = after(
		funcName,
		parent,
		(args, ret) => console.log("|| RECON: ", funcName, " ||", args, ret),
		oneTime
	);
	recons.push(unrecon);
	return unrecon;
};

window.dk = {
	cctools,
	bestFindMethod,
	autoModuleFind,
	findClassNameModuleAll,
	findClassNameModule: (className) => findClassNameModuleAll(className)[0],
	recon,
	unrecon: () => {
		recons.forEach((p) => p());
		recons = [];
	},
};

export default () => delete window.dk;
