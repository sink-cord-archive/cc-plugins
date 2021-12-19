// this plugin is a port from pc, this file being based on https://github.com/powerfart-plugins/translation-option/blob/master/index.js

// cumcord imports
import { find, findByProps } from "@cumcord/modules/webpack";
import { Messages } from "@cumcord/modules/common/i18n";
import React from "@cumcord/modules/common/React";

// react components
import SettingsModal from './components/SettingsModal.jsx';
import Settings from './components/Settings.jsx';

// discord modules
const { getChannelId } = findByProps("getChannelId")
const Dispatcher = findByProps("_subscriptions");
const { openModal } = findByProps("openModalLazy");

// styles
import styles from "./style.scss"

// misc imports
import  { settings } from './structures';
import i18n from './i18n';
import Translator from './engines';
import { Patcher, OutputManager } from './utils';

export default ({ persist, id }) => {
    // some ported constructor & injection stuff
    let outputManager = new OutputManager("translation-option", {});
    let translator = new Translator(outputManager);

    // ported class members
    const openSettingsModal = () => {
        openModal((e) =>
            React.createElement(SettingsModal, { Translator: translator })
        );
    };

    const translate = (message, force) => {
        if (!force && translator.isTranslated(message)) {
          this.Translator.recover(message);
          return;
        }
        translator.translateMessage(message, {
          engine: this.settings.get('inEngine', null),
          to: this.settings.get('inTo', null),
          from: this.settings.get('inFrom', null)
        })
          .catch((err) => {
            if (err.code === 'NO_TRANSLATION_ENGINE') {
              outputManager.error(Messages.TRANSLATION_OPTION_CHOOSE_ENGINE, [ {
                text: Messages.TRANSLATION_OPTION_SETTINGS,
                onClick: openSettingsModal
              } ]);
              return;
            }
            outputManager.error(`${Messages.TRANSLATION_OPTION_ERRORS_TRANSLATE}: ${err.name}`);
            this.error(
              `${this.settings.get('inEngine', null)}:`,
              `${this.settings.get('inFrom', 'auto')}->${this.settings.get('inTo', 'user lang')} \n`,
              err
            );
          });
      }

    // remaining ported constructor & injection stuff
    let patcher = new Patcher(translator, outputManager, {
        openSettingsModal
    });

    patcher.inject();

    Dispatcher.subscribe("MESSAGE_UPDATE" /* this.messageUpdate */);
    Dispatcher.subscribe("MESSAGE_CREATE" /* this.messageCreate */);

    let uninjectStyles = styles();

    // janky, but adds i18n entries depending on the locale at plugin load time
    let removei18n = i18n();

    return {
        onUnload() {
            uninjectStyles();
            removei18n();
            
            [...translator.messagesStorage.keys()].forEach((key) => {
                const [channel_id, id] = key.split("-");
                translator.recover({ channel_id, id });
            });
            translator.messagesStorage.clear();

            patcher.uninject();

            Dispatcher.unsubscribe("MESSAGE_UPDATE" /* this.messageUpdate */);
            Dispatcher.unsubscribe("MESSAGE_CREATE" /* this.messageCreate */);
        },
        settings: React.createElement(SettingsModal, {
            Translator: translator,
        }),
    };
};

/* module.exports =  */class TranslationOption extends Plugin {
  constructor () {
    super();
    this.SettingsModal = this.settings.connectStore(SettingsModal);
    this.messageCreate = this.messageCreate.bind(this);
    this.messageUpdate = this.messageUpdate.bind(this);
    this.openSettingsModal = this.openSettingsModal.bind(this);

    this.OutputManager = new OutputManager('translation-option', {});
    this.Translator = new Translator(this.OutputManager, this.settings);
    this.Patcher = new Patcher(this.Translator, this.OutputManager, {
      openSettingsModal: this.openSettingsModal,
      translate: this.translate.bind(this),
      settings: this.settings
    });
  }

  async startPlugin () {
    powercord.api.i18n.loadAllStrings(i18n);
    this.loadStylesheet('style.scss');

    this.Patcher.inject();

    Dispatcher.subscribe('MESSAGE_UPDATE', this.messageUpdate);
    Dispatcher.subscribe('MESSAGE_CREATE', this.messageCreate);

    Settings.register({
      entityID: this.entityID,
      items: settings(this.Translator)
    });
  }

  pluginWillUnload () {
    [ ...this.Translator.messagesStorage.keys() ].forEach((key) => {
      const [ channel_id, id ] = key.split('-');
      this.Translator.recover({ channel_id, id });
    });
    this.Translator.messagesStorage.clear();

    this.Patcher.uninject();

    Dispatcher.unsubscribe('MESSAGE_UPDATE', this.messageUpdate);
    Dispatcher.unsubscribe('MESSAGE_CREATE', this.messageCreate);

    powercord.api.settings.unregisterSettings('translation-option-settings');
  }

  translate (message, force = false) {
    if (!force && this.Translator.isTranslated(message)) {
      this.Translator.recover(message);
      return;
    }
    this.Translator.translateMessage(message, {
      engine: this.settings.get('inEngine', null),
      to: this.settings.get('inTo', null),
      from: this.settings.get('inFrom', null)
    })
      .catch((err) => {
        if (err.code === 'NO_TRANSLATION_ENGINE') {
          this.OutputManager.error(Messages.TRANSLATION_OPTION_CHOOSE_ENGINE, [ {
            text: Messages.TRANSLATION_OPTION_SETTINGS,
            onClick: this.openSettingsModal
          } ]);
          return;
        }
        this.OutputManager.error(`${Messages.TRANSLATION_OPTION_ERRORS_TRANSLATE}: ${err.name}`);
        this.error(
          `${this.settings.get('inEngine', null)}:`,
          `${this.settings.get('inFrom', 'auto')}->${this.settings.get('inTo', 'user lang')} \n`,
          err
        );
      });
  }

  messageUpdate ({ message, forceUpdate }) {
    if (!forceUpdate && this.Translator.isTranslated(message)) {
      this.translate(message, true);
    }
  }

  messageCreate ({ channelId, message, sendMessageOptions }) {
    if (
      this.settings.get('inMessages', false) && (getChannelId() === channelId) &&
        message.state !== 'SENDING' && !sendMessageOptions
    ) {
      this.translate(message);
    }
  }


  openSettingsModal () {
    open(() => (
      React.createElement(this.SettingsModal, { Translator: this.Translator }))
    );
  }
};
