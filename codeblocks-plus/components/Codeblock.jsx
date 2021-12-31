import { copyText } from "@cumcord/utils";
import { findByProps } from "@cumcord/modules/webpack";
import { getLanguage, highlight } from "@cumcord/modules/common/highlightjs";
const { useState, useEffect } = React;

const flat = (html) =>
    new DOMParser().parseFromString(html, "text/html").children[0].textContent;

const scrollbarClasses = findByProps("thin").thin;

export default ({ codeHtml, code, lang }) => {
    const [renderedCode, setRenderedCode] = React.useState(undefined);

    // >0: need to wait this amount next render
    // 0: no cooldown
    // -1: currently waiting for cooldown
    let [cooldown, setCooldown] = useState(0);
    useEffect(() => {
        if (cooldown > 0) {
            setCooldown(-1);
            setTimeout(() => setCooldown(0), cooldown);
        }

        if (!renderedCode) {
            if (getLanguage(lang))
                setRenderedCode(highlight(lang, code ?? flat(codeHtml)).value);
            else setRenderedCode(code ?? flat(codeHtml));
        }
    });

    return (
        <div className="ysink_code_wrapper hljs">
            <div className="ysink_code_row">
                <div className="ysink_code_lang">{getLanguage(lang)?.name}</div>
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
