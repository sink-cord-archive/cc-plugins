import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";

import { persist, reloadCSS } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

const { useState, useCallback } = React;

import { ErrorBoundary } from "@cumcord/ui/components";

export default () => {
    const [css, setCss] = useState(persist.ghost.quickCSS);

    const saveCss = (v) => {
        persist.store.quickCSS = v;
        reloadCSS();
    };
    const saveCssThrottle = useCallback(
        _.throttle(saveCss, 250, { leading: true, trailing: true }),
        []
    );

    return (
        <ErrorBoundary>
            <div class="ysink_stain_quickcss">
                <Editor
                    className="ysink_stain_editorroot"
                    value={css ?? ""}
                    onValueChange={(v) => {
                        setCss(v);
                        saveCssThrottle(v);
                    }}
                    highlight={(code) => highlight(code, languages.css)}
                    padding={10}
                />
                <link
                    href="https://cdn.jsdelivr.net/gh/PrismJS/prism-themes@master/themes/prism-atom-dark.css"
                    rel="stylesheet"
                />
                <style>{`:root { --background-primary: 1d1f21; }`}</style>
            </div>
        </ErrorBoundary>
    );
};
