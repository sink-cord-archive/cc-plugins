import { findByPropsAll } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import Codeblock from "../components/Codeblock";
import { ErrorBoundary } from "@cumcord/ui/components";

const codeblocksModule = findByPropsAll("LazyLibrary")[1];

const flat = (html) =>
	new DOMParser().parseFromString(html, "text/html").children[0].textContent;

export default () =>
	after("LazyLibrary", codeblocksModule, (args, ret) => {
		// <pre> element containing <code>
		const pre = ret?.props?.children;
		// <code> element, which we care about
		const code = pre?.props?.children;

		if (!code?.props) return;

		const codeHtml = code.props.dangerouslySetInnerHTML?.__html;
		const codeTextRaw = code.props.children;
		const lang = _.last(code.props.className.split(" "));

		const codeText = codeTextRaw ?? flat(codeHtml);

		return (
			<ErrorBoundary>
				<Codeblock {...{ codeText, lang }} />
			</ErrorBoundary>
		);
	});
