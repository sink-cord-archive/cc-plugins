import { findByPropsAll } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import Codeblock from "../components/Codeblock";

const codeblocksModule = findByPropsAll("LazyLibrary")[1];

export default () =>
    after("LazyLibrary", codeblocksModule, (args, ret) => {
        if (!ret?.props?.children?.props) return;

        const codeHtml =
            ret.props.children.props.dangerouslySetInnerHTML?.__html;
        const code = ret.props.children.props.children;
        const lang = _.last(ret.props.children.props.className.split(" "));

        return <Codeblock {...{ codeHtml, code, lang }} />;
    });
