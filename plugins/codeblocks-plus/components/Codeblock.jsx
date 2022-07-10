import { persist } from "@cumcord/pluginData";
import { copyText } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";
import {
	getLanguage,
	highlightBlock,
} from "@cumcord/modules/common/highlightjs";
import { error } from "@cumcord/utils/logger";
import LineNumbers from "./LineNumbers";

const scrollbarClasses = findByProps("thin").thin;

export default ({ codeText, lang }) => {
	const codeRef = React.useRef();

	const getLang = (lang) => {
		if (getLanguage) return getLanguage(lang);
		error(
			"|| Codeblocks Plus || highlight.js was not found. Please ensure cumcord.modules.common.highlightjs isnt undefined..."
		);
	};

	// >0: need to wait this amount next render
	// 0: no cooldown
	// -1: currently waiting for cooldown
	let [cooldown, setCooldown] = React.useState(0);
	React.useEffect(() => {
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
						copyText(codeText);
						if (!cooldown) setCooldown(2000);
					}}
				>
					{cooldown ? "Copied!" : "Copy"}
				</button>
			</div>

			<div className="ysink_code_prewrap">
				{(persist.ghost.nums ?? true) && (
					<LineNumbers lines={codeText.split?.("\n").length} />
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
