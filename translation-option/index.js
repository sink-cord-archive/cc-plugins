const { Plugin } = require('powercord/entities');
const { React, getModule, channels: { getChannelId }, i18n: { Messages } } = require('powercord/webpack');
const { open } = require('powercord/modal');

const SettingsModal = require('./components/SettingsModal.jsx');
const Settings = require('./components/Settings.jsx');

const { settings } = require('./structures');
const i18n = require('./i18n');

const Translator = require('./engines');
const { Patcher, OutputManager } = require('./utils');

const { default: Dispatcher } = getModule((m) => m?.default?._subscriptions, false);

/* eslint-disable object-property-newline */
// noinspection ES6MissingAwait, JSCheckFunctionSignatures, JSIgnoredPromiseFromCall, JSUnusedGlobalSymbols
module.exports = class TranslationOption extends Plugin {
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
