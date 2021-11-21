import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { persist } from "@cumcord/pluginData";
import { showToast } from "@cumcord/ui/toasts";

import { useNest } from "@cumcord/utils";
const { useState } = React;

import { ErrorBoundary } from "@cumcord/ui/components";
import fetchTheme from "../fetchTheme";
import { loadTheme } from "../themeLoadUtil";
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const TextInput = findByDisplayName("TextInput");

export default () => {
    useNest(persist);

    let [urlInput, setUrlInput] = useState("");

    return (
        <ErrorBoundary>
            <div className="ysink_stain_installbar">
                <TextInput
                    className="ysink_stain_input"
                    placeholder="Theme import URL"
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e)}
                />

                <Button
                    className="ysink_stain_button"
                    onClick={() => {
                        fetchTheme(urlInput).then(
                            (t) => {
                                loadTheme(t);
                                showToast({
                                    title: `Loaded theme ${t.name}`,
                                    duration: 5000,
                                });
                            },
                            () =>
                                showToast({
                                    title: "Failed to fetch theme - check URL",
                                    duration: 5000,
                                })
                        );
                        setUrlInput("");
                    }}
                >
                    Install
                </Button>
            </div>
        </ErrorBoundary>
    );
};
