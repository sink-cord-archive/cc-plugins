import * as cctools from "cumcord-tools";
import bestFindMethod from "./bestFindMethod";

import { findAll, findByKeywordAll, modules } from "@cumcord/modules/webpack";
import { after, injectCSS } from "@cumcord/patcher";
import grass from "./grass";

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
		(args, ret) =>
			console.log(
				"%cRECON: " + funcName,
				"background-color: #9d65ff; color: white; border-radius: 4px; padding: 0px 6px 0px 6px;",
				"",
				args,
				ret
			),
		oneTime
	);
	recons.push(unrecon);
	return unrecon;
};

const shotgunRecon = (parentOrKeyword, oneTime = false) => {
	const reconObj = (obj) => {
		for (const k in obj)
			if (typeof obj[k] === "function")
				try {
					recon(k, obj, oneTime);
				} catch {}
	};

	if (typeof parentOrKeyword === "string")
		findByKeywordAll(parentOrKeyword).forEach(reconObj);
	else reconObj(parentOrKeyword);
};

// this is irresponsible
/*const atomBombRecon = () => {
	for (const module of Object.values(modules))
		try {
			shotgunRecon(module.exports);
		} catch {}
};*/

const injectSCSS = (scss, pretty = false) => {
	const ret = injectCSS(grass(scss, pretty));
	return (scss, pretty = false) =>
		ret(scss === undefined ? undefined : grass(scss, pretty));
};

window.dk = {
	cctools,
	bestFindMethod,
	autoModuleFind,
	findClassNameModuleAll,
	findClassNameModule: (className) => findClassNameModuleAll(className)[0],
	recon: {
		snipe: recon,
		shotgun: shotgunRecon,
		//atomBomb: atomBombRecon,
	},
	unrecon: () => {
		recons.forEach((p) => p());
		recons = [];
	},
	injectSCSS,
};

export default () => delete window.dk;
