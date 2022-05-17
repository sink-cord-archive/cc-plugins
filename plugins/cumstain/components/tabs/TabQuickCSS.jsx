import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";

import { persist } from "@cumcord/pluginData";

import { ErrorBoundary } from "@cumcord/ui/components";

const saveCss = (v) => (persist.store.quickCSS = v);
const saveCssDebounced = _.debounce(saveCss, 250);

export default () => {
	const [css, setCss] = React.useState(persist.ghost.quickCSS);

	return (
		<ErrorBoundary>
			<Editor
				className="ysink_stain_cssedit"
				value={css ?? ""}
				onValueChange={(v) => {
					setCss(v);
					saveCssDebounced(v);
				}}
				highlight={(code) => highlight(code, languages.css)}
				padding={10}
			/>
			<link
				href="https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-atom-dark.css"
				rel="stylesheet"
			/>
		</ErrorBoundary>
	);
};
