import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-css";

import { persist, reloadCSS } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

import { ErrorBoundary } from "@cumcord/ui/components";

export default () => {
    // this component is very noisy on nest sets & gets
    useNest(persist);

    return (
        <ErrorBoundary>
            <div class="ysink_stain_quickcss">
                <Editor
                    className="ysink_stain_editorroot"
                    value={persist.ghost.quickCSS ?? ""}
                    onValueChange={(v) => {
                        persist.store.quickCSS = v;
                        reloadCSS();
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
