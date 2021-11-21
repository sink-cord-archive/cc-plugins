import { persist } from "@cumcord/pluginData";
import { useNest } from "@cumcord/utils";

const { useState, useReducer } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import ThemeCard from "./ThemeCard";
import InstallBar from "./InstallBar";

export default () => {
    useNest(persist /* , false, (type, path) => path?.[0] === "themes" */);

    // React really doesn't like re-rendering when themes are deleted, so here we are
    const [, rerender] = useReducer((x) => ~x, 0);

    return (
        <ErrorBoundary>
            <InstallBar />

            <div className="ysink_stain_cardcontainer">
                {persist.ghost.themes.map((theme) => (
                    <ThemeCard theme={theme} deleteHook={rerender} />
                ))}
            </div>
        </ErrorBoundary>
    );
};
