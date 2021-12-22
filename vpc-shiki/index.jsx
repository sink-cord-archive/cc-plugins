import { findByProps } from "@cumcord/modules/webpack";
import { after } from "@cumcord/patcher";
import { getReactInstance } from "@cumcord/utils";

import Settings from "./components/Settings";
import ShikiHighlighter from "./components/ShikiHighlighter";

import shiki from "./shiki";
const languages = shiki.BUNDLED_LANGUAGES;
const CDN_PATH = "https://unpkg.com/shiki@0.9.15/";
shiki.setCDN(CDN_PATH);

import styles from "./styles.css";

let highlighter = undefined;
let unpatch = undefined;

// polyfill getSetting
import { persist } from "@cumcord/pluginData";
const getSetting = (name, fallback) => persist.ghost[name] ?? fallback;

async function loadHighlighter(theme) {
    if (!theme) theme = getSetting("theme", shiki.BUNDLED_THEMES[0]);
    const customThemeHref = getSetting("custom-theme");
    if (customThemeHref) {
        try {
            const tempCDN =
                customThemeHref.split("/").slice(0, -2).join("/") + "/";
            shiki.setCDN(tempCDN);
            const tempThemeFile = customThemeHref
                .split("/")
                .slice(-2)
                .join("/");
            const customTheme = await shiki.loadTheme(tempThemeFile);
            shiki.setCDN(CDN_PATH);
            return (highlighter = await shiki.getHighlighter({
                theme: customTheme,
                langs: languages,
            }));
        } catch (error) {
            shiki.setCDN(CDN_PATH);
        }
    }

    return (highlighter = await shiki.getHighlighter({
        theme,
        langs: languages,
    }));
}

async function patchCodeblocks() {
    const parser = await getModule(["parse", "parseTopic"]);

    unpatch = after("react", parser.defaultRules.codeBlock, (args, res) => {
        injectCodeblock(args, res);
        return res;
    });

    forceUpdate();
}

function injectCodeblock(args, res) {
    if (!args) return;
    res.props.render = () => {
        const { lang, content } = args[0];

        return (
            <ShikiHighlighter
                {...{ lang, content, getHighlighter, getLang }}
                tryHLJS={getSetting("try-hljs", "never")}
                useDevIcon={getSetting("use-devicon", "false")}
                bgOpacity={getSetting("bg-opacity", 100)}
            />
        );
    };
}

const getHighlighter = () => highlighter;

const getLang = (id) =>
    languages.find((lang) => [...(lang.aliases || []), lang.id].includes(id));

const forceUpdate = () =>
    document
        .querySelectorAll('[id^="chat-messages-"]')
        .forEach((e) => getReactInstance(e)?.memoizedProps?.onMouseMove?.());

export default () => {
    let unpatchstyles = styles();

    return {
        onUnload() {
            unpatchstyles();
            unpatch();
            forceUpdate();
        },
        settings: (
            <Settings
                {...{ shiki, loadHighlighter, getHighlighter, getLang }}
                refreshCodeblocks={forceUpdate}
            />
        ),
    };
};
