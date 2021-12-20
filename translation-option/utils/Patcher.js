const { inject, uninject } = require("powercord/injector");
const { ContextMenu } = require("powercord/components");

import { findInReactTree } from "@cumcord/utils";
import React from "@cumcord/modules/common/React";
import { find, findByProps, findByDisplayName } from "@cumcord/modules/webpack";
import { Messages } from "@cumcord/modules/common/i18n";

const TranslateButton = require("../components/TranslateButton.jsx");
const Pointer = require("../components/Pointer.jsx");

class Patcher {
    constructor(Translator, OutputManager, props) {
        this.Translator = Translator;
        this.OutputManager = OutputManager;
        this.props = props;
        this._uninjectIDs = [];
    }

    inject() {
        Object.getOwnPropertyNames(Patcher.prototype)
            .filter((f) => f.startsWith("patch"))
            .forEach((name) => {
                const { module, method, func, displayName, pre } = this[name];
                const injectId = `translation-option${(
                    displayName || name.replace(/^patch/, "")
                ).replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`)}`;

                inject(injectId, module, method, func, pre);
                this._uninjectIDs.push(injectId);
                if (displayName) {
                    module[method].displayName = displayName;
                }
            });
    }

    uninject() {
        this._uninjectIDs.forEach(uninject);
    }

    get patchMessageContextMenu() {
        return {
            module: findByDisplayName("MessageContextMenu", false),
            displayName: "MessageContextMenu",
            method: "default",
            func: ([{ message }], res) => {
                const {
                    props: { children },
                } = res;
                const [btn] = ContextMenu.renderRawItems([
                    {
                        type: "button",
                        name: this.Translator.isTranslated(message)
                            ? Messages.TRANSLATION_OPTION_SHOW_ORIGINAL
                            : Messages.TRANSLATION_OPTION_TRANSLATE_MESSAGE,
                        disabled: !message.content && !message.embeds.length,
                        onClick: () => this.props.translate(message),
                    },
                ]);
                children.splice(children.length - 1, 0, btn);
                return res;
            },
        };
    }

    get patchMiniPopover() {
        const MiniPopover = findByDisplayName("MiniPopover", false);

        return {
            module: MiniPopover,
            displayName: "MiniPopover",
            method: "default",
            func: (args, res) => {
                const props = findInReactTree(res, ({ message }) => message);
                if (props) {
                    res.props.children.unshift(
                        React.createElement(TranslateButton, {
                            Button: MiniPopover.Button,
                            onClick: () => this.props.translate(props.message),
                            name: Messages.TRANSLATION_OPTION_TRANSLATE_MESSAGE,
                            icon: { width: 22 },
                        })
                    );
                }
                return res;
            },
        };
    }

    get patchChannelTextAreaContainer() {
        const { Button } = require("powercord/components");

        return {
            module: find(
                (m) =>
                    m?.type?.render?.displayName === "ChannelTextAreaContainer"
            ).type,
            displayName: "ChannelTextAreaContainer",
            method: "render",
            func: (args, res) => {
                const props = findInReactTree(res, ({ className }) =>
                    className?.includes("buttons-")
                );
                if (props) {
                    props.children.unshift(
                        React.createElement(TranslateButton, {
                            Button,
                            onClick: this.props.openSettingsModal,
                            name: Messages.TRANSLATION_OPTION_MODAL_SETTINGS,
                            icon: { width: 24 },
                        })
                    );
                }
                return res;
            },
        };
    }

    get patchMessageContent() {
        return {
            module: findByDisplayName("MessageContent", false),
            displayName: "MessageContent",
            method: "type",
            func: ([{ message }], res) => {
                if (this.Translator.isTranslated(message)) {
                    const { from, to } = this.Translator.messagesStorage.get(
                        `${message.channel_id}-${message.id}`
                    );
                    res.props.children.push(
                        React.createElement(Pointer, { from, to })
                    );
                }
                return res;
            },
        };
    }

    get patchSendMessage() {
        const messages = findByProps("sendMessage");

        return {
            module: messages,
            displayName: null,
            method: "sendMessage",
            pre: true,
            func: ([id, message, ...args]) => {
                const {
                    Translator,
                    props: { settings },
                } = this;
                const error = (msg) => {
                    this.OutputManager.error(msg, [
                        {
                            text: Messages.TRANSLATION_OPTION_SEND_ORIGINAL,
                            onClick: () =>
                                messages.sendMessage(
                                    id,
                                    { ...message, alreadyTranslated: true },
                                    ...args
                                ),
                        },
                    ]);
                };

                if (
                    settings.get("outMessages", false) &&
                    message.content &&
                    !message.alreadyTranslated
                ) {
                    if (!settings.get("outTo", false)) {
                        error(Messages.TRANSLATION_OPTION_LANG_TO);
                        return false;
                    }
                    Translator.translateText(message.content, {
                        engine:
                            settings.get("outEngine", null) ||
                            settings.get("inEngine", null),
                        to: settings.get("outTo"),
                        from: settings.get("outFrom", null),
                    })
                        .then(({ text }) => {
                            const msg = {
                                ...message,
                                content: text,
                                alreadyTranslated: true,
                            };
                            messages.sendMessage(id, msg, ...args);
                        })
                        .catch((err) => {
                            error(
                                `${Messages.TRANSLATION_OPTION_ERRORS_TRANSLATE}: ${err.name}`
                            );
                            console.error(err);
                        });
                    return false;
                }

                return [id, message, ...args];
            },
        };
    }

    get patchEditMessage() {
        return {
            module: findByProps("editMessage"),
            displayName: null,
            method: "editMessage",
            pre: true,
            func: ([channel, message, config]) => {
                if (this.Translator.isTranslated(message)) {
                    const { original } = this.Translator.messagesStorage.get(
                        `${message.channel_id}-${message.id}`
                    );
                    message.content = original.content;
                    message.embeds = original.embeds;
                    this.Translator.recover(message);
                }

                return [channel, message, config];
            },
        };
    }
}


export default Patcher;