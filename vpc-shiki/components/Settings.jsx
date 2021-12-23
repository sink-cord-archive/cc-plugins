import { findByDisplayName, findByProps } from "@cumcord/modules/webpack";
import { sleep, useNest } from "@cumcord/utils";

const { useState } = React;

const { SingleSelect } = findByDisplayName("Select", false);
const TextInput = findByDisplayName("TextInput");
const SwitchItem = findByDisplayName("SwitchItem");
const Slider = findByDisplayName("Slider");
const Spinner = findByDisplayName("Spinner");
const RadioGroup = findByDisplayName("RadioGroup");
const Header = findByProps("Sizes", "Tags");
const FormDivider = findByDisplayName("FormDivider");

import ShikiHighlighter from "./ShikiHighlighter";
import previewsData from "../previews";

const ERROR_COLOR = "var(--text-danger)";
const CUSTOM_THEME_ISSUES = [
    "Invalid URL.",
    "The theme must be a json file with the vscode color theme schema.",
    "The theme must be accessed with HTTPS.",
];
const LOAD_PADDING = 250;

// powercord settings polyfill in 3 lines amazing
import { persist } from "@cumcord/pluginData";
const getSetting = (name, fallback) => persist.ghost[name] ?? fallback;
const updateSetting = (name, val) => (persist.store[name] = val);
const humanizeTheme = (theme) =>
    theme
        .split(/[^a-zA-Z0-9]/)
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" ");

const getCustomThemeIssue = (href) => {
    if (!href) return 0;
    try {
        const url = new URL(href);
        if (!url.pathname.endsWith(".json")) return 2;
        if (url.protocol !== "https:") return 3;
    } catch (error) {
        return 1;
    }
    return 0;
};

// sorry aeth but i think thats an exceptionally dumb idea -- Yellowsink, during porting this to CC
// https://i.imgur.com/G7Qmfxj.png
const padPromise = (promise) => promise; //Promise.all([promise, sleep(LOAD_PADDING)]);

let debounces = {};
const debounce = (id, fn, wait) => {
    if (!debounces[id]) {
        debounces[id] = _.debounce((fn) => fn(), wait);
    }
    debounces[id](fn);
};

export default ({
    shiki,
    loadHighlighter,
    getHighlighter,
    getLang,
    refreshCodeblocks,
}) => {
    useNest(persist);

    let [themeLoadingCauses, setThemeLoadingCauses] = useState([]);
    let [isCustomThemeValid, setIsCustomThemeValid] = useState(true);
    let [customThemeIssue, setCustomThemeIssue] = useState(null);
    let [lastEdited, setLastEdited] = useState(Date.now());

    const addLoadingCause = (cause) => {
        if (themeLoadingCauses.indexOf(cause) === -1) {
            setThemeLoadingCauses([...themeLoadingCauses, cause]);
            return true;
        }
        return false;
    };
    const removeLoadingCause = (cause) => {
        const index = themeLoadingCauses.indexOf(cause);
        if (index >= 0) {
            setThemeLoadingCauses(
                themeLoadingCauses
                    .slice(0, index)
                    .concat(...themeLoadingCauses.slice(index + 1))
            );
            return true;
        }
        return false;
    };

    if (!themeLoadingCauses.length && !getHighlighter()) {
        const highlighterCause = Date.now();
        addLoadingCause(highlighterCause);
        loadHighlighter().then(() => {
            removeLoadingCause(highlighterCause);
        });
    }

    const previews = previewsData.map((data) => (
        <ShikiHighlighter
            lang={data.lang}
            content={data.content}
            getHighlighter={getHighlighter}
            getLang={getLang}
            isPreview={true}
            tryHLJS={getSetting("try-hljs", "never")}
            useDevIcon={getSetting("use-devicon", "false")}
            bgOpacity={getSetting("bg-opacity", 100)}
        >
            {themeLoadingCauses.length ? (
                <div class="vpc-shiki-spinner-container">
                    <Spinner type="spinningCircle" />
                </div>
            ) : null}
        </ShikiHighlighter>
    ));

    let customThemeLabel = "Custom Theme";
    if (customThemeIssue) {
        customThemeLabel = (
            <span style={{ color: ERROR_COLOR }}>
                {customThemeLabel}
                <span
                    style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        fontStyle: "italic",
                        textTransform: "none",
                    }}
                >
                    <span style={{ padding: "0 4px" }}>-</span>
                    {customThemeIssue}
                </span>
            </span>
        );
    }

    return (
        <div className="ysink_shiki_settingsroot">
            {/* ... */ previews}
            <SingleSelect
                onChange={(value) => {
                    updateSetting("theme", value);
                    const themeCause = Date.now();
                    addLoadingCause(themeCause);
                    padPromise(loadHighlighter()).then(() => {
                        removeLoadingCause(themeCause);
                        refreshCodeblocks();
                    });
                }}
                options={shiki.BUNDLED_THEMES.map((theme) => ({
                    label: humanizeTheme(theme),
                    value: theme,
                }))}
                value={getSetting("theme", shiki.BUNDLED_THEMES[0])}
                isDisabled={!!getSetting("custom-theme")}
            >
                Theme
            </SingleSelect>
            <FormDivider className="ysink_shiki_divider" />
            <TextInput
                style={!isCustomThemeValid ? { borderColor: ERROR_COLOR } : {}}
                onChange={(value) => {
                    const issue = getCustomThemeIssue(value);
                    if (!issue) {
                        updateSetting("custom-theme", value);
                        const themeCause = Date.now();
                        addLoadingCause(themeCause);
                        padPromise(loadHighlighter()).then(() => {
                            removeLoadingCause(themeCause);
                            refreshCodeblocks();
                        });
                        setLastEdited(Date.now());
                        setIsCustomThemeValid(true);
                        setCustomThemeIssue(null);
                    } else {
                        setLastEdited(Date.now());
                        setIsCustomThemeValid(false);
                        setCustomThemeIssue(CUSTOM_THEME_ISSUES[issue - 1]);
                    }
                }}
                placeholder="https://raw.githubusercontent.com/millsp/material-candy/master/material-candy.json"
                value={getSetting("custom-theme")}
                placeholder={customThemeLabel}
            />
            <FormDivider className="ysink_shiki_divider" />
            <Header tag="h3">Use Default Highlighter</Header>
            <RadioGroup
                value={getSetting("try-hljs", "never")}
                onChange={({ value }) => {
                    updateSetting("try-hljs", value);
                    setLastEdited(Date.now());
                }}
                options={[
                    {
                        name: "Never",
                        value: "never",
                    },
                    {
                        name: "As Secondary",
                        desc: "Use the default highlighter only with langauges missing in this plugin but supported by default.",
                        value: "secondary",
                    },
                    {
                        name: "As Primary",
                        desc: "Use the default highlighter with supported langauges, with shiki as a fallback.",
                        value: "primary",
                    },
                    {
                        name: "Always",
                        value: "always",
                    },
                ]}
                note={
                    <>
                        Uses the more lightweight, <b>unthemed</b> default
                        highlighter.
                    </>
                }
            ></RadioGroup>
            <FormDivider className="ysink_shiki_divider" />
            <Header tag="h3">Icons</Header>
            <RadioGroup
                value={getSetting("use-devicon", "false")}
                onChange={({ value }) => {
                    updateSetting("use-devicon", value);
                    setLastEdited(Date.now());
                }}
                options={[
                    {
                        name: "Disabled",
                        value: "false",
                    },
                    {
                        name: "Colorless",
                        value: "colorless",
                    },
                    {
                        name: "Colored",
                        value: "colored",
                    },
                ]}
            ></RadioGroup>
            <FormDivider className="ysink_shiki_divider" />
            <Header tag="h3">BG Opacity</Header>
            <Slider
                initialValue={getSetting("bg-opacity", 100)}
                onValueChange={(value) => {
                    updateSetting("bg-opacity", value);
                    if (addLoadingCause("bgOpacity")) {
                        setLastEdited(Date.now());
                    }
                    debounce(
                        "bgOpacity",
                        () => {
                            removeLoadingCause("bgOpacity");
                            setLastEdited(Date.now());
                        },
                        200
                    );
                }}
                minValue={0}
                maxValue={100}
                stickToMarkers={false}
            ></Slider>
        </div>
    );
};
