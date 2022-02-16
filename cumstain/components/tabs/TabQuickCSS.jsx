import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";

import { persist, reloadCSS } from "@cumcord/pluginData";
import { findByProps } from "@cumcord/modules/webpack";

const { useState, useCallback } = React;

import { ErrorBoundary } from "@cumcord/ui/components";

const saveCss = (v) => reloadCSS((persist.store.quickCSS = v));
const saveCssDebounced = _.debounce(saveCss, 250);

export default () => {
    const [css, setCss] = useState(persist.ghost.quickCSS);

    return (
        <ErrorBoundary>
            <div class="ysink_stain_quickcss">
                <Editor
                    className="ysink_stain_editorroot"
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
                <style>{`:root { --background-primary: #1d1f21; } .theme-light .${
                    findByProps("contentColumn").contentColumn
                } { --text-normal: white; }`}</style>
            </div>
        </ErrorBoundary>
    );
};
