import { persist } from "@cumcord/pluginData";
import { copyText } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";
import {
	getLanguage,
	highlightBlock,
} from "@cumcord/modules/common/highlightjs";
import { error } from "@cumcord/utils/logger";
const { useState, useEffect } = React;

const scrollbarClasses = findByProps("thin").thin;

import LineNumbers from "./LineNumbers";

export default ({ codeText, lang }) => {
	const codeRef = React.useRef();

	const getLang = lang => {
		if (getLanguage) return getLanguage(lang);
		error(
			"|| Codeblocks Plus || highlight.js was not found. Please ensure cumcord.modules.common.highlightjs isnt undefined..."
		);
	};

	// >0: need to wait this amount next render
	// 0: no cooldown
	// -1: currently waiting for cooldown
	let [cooldown, setCooldown] = useState(0);
	useEffect(() => {
		if (cooldown > 0) {
			setCooldown(-1);
			setTimeout(() => setCooldown(0), cooldown);
		}

		if (getLang(lang)) highlightBlock(codeRef.current);
	});

	return (
		<div className="ysink_code_wrapper hljs">
			<div className="ysink_code_row">
				<div className="ysink_code_lang">{getLang(lang)?.name}</div>
				<button
					className="dark"
					disabled={cooldown}
					onClick={() => {
						if (cooldown) return;

						copyText(codeText);
						setCooldown(2000);
					}}
				>
					{cooldown ? "Copied!" : "Copy"}
				</button>
			</div>

			<div class="ysink_code_prewrap">
				{persist.ghost.nums ?? true ? (
					<LineNumbers lines={codeText.split("\n").length} />
				) : (
					[]
				)}

				<pre className={scrollbarClasses}>
					<code ref={codeRef} className={`hljs ${lang} ${scrollbarClasses}`}>
						{codeText}
					</code>
				</pre>
			</div>
		</div>
	);
};
