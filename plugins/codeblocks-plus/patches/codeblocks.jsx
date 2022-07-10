import { findByPropsAll } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import Codeblock from "../components/Codeblock";
import { ErrorBoundary } from "@cumcord/ui/components";
import { findInReactTree } from "@cumcord/utils";

const codeblocksModule = findByPropsAll("LazyLibrary")[1];

const flat = (html) =>
	new DOMParser().parseFromString(html, "text/html").children[0].textContent;

export default () =>
	after("LazyLibrary", codeblocksModule, (args, ret) => {
		const codeProps = findInReactTree(ret, (n) => n.type === "code")?.props;

		if (!codeProps) return;

		const codeHtml = codeProps.dangerouslySetInnerHTML?.__html;
		const codeTextRaw = codeProps.children;
		const lang = _.last(codeProps.className.split(" "));

		const codeText = codeTextRaw ?? flat(codeHtml);

		return (
			<ErrorBoundary>
				<Codeblock {...{ codeText, lang }} />
			</ErrorBoundary>
		);
	});
