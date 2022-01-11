import { copyText } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";
import { getLanguage, highlight } from "@cumcord/modules/common/highlightjs";
import { error } from "@cumcord/utils/logger";
const { useState, useEffect } = React;

const scrollbarClasses = findByProps("thin").thin;

export default ({ codeText, lang }) => {
    const [renderedCode, setRenderedCode] = React.useState();

    const getLang = (lang) => {
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

        setRenderedCode(
            getLang(lang) // if the lang isnt recognised by hljs, this is undefined
                ? highlight(lang, codeText).value
                : codeText
        );
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
            <pre>
                <code
                    className={`hljs ${lang} ${scrollbarClasses}`}
                    dangerouslySetInnerHTML={{ __html: renderedCode ?? "" }}
                />
            </pre>
        </div>
    );
};
