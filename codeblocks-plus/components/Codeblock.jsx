import { copyText } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";
<<<<<<< HEAD
import { getLanguage } from "@cumcord/modules/common/highlightjs";
import { error } from "@cumcord/utils/logger";
=======
import { getLanguage, highlight } from "@cumcord/modules/common/highlightjs";
>>>>>>> 321b8cfaaa37b91aa8dbf3acba2241759a87bb93
const { useState, useEffect } = React;

const flat = (html) =>
    new DOMParser().parseFromString(html, "text/html").children[0].textContent;

const scrollbarClasses = findByProps("thin").thin;

export default ({ codeHtml, code, lang }) => {
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

        if (getLang(lang))
            setRenderedCode(highlight(lang, code ?? flat(codeHtml)).value);
        else setRenderedCode(code ?? flat(codeHtml));
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

                        copyText(code ?? flat(codeHtml));
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
