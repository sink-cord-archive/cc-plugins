const { readdirSync } = require('fs');
const { resolve } = require('path');
const { _ } = global;

const { getModule, FluxDispatcher } = require('powercord/webpack');
const { fixEmbeds } = require('../utils');

const userSettings = getModule([ 'afkTimeout', 'locale', 'developerMode' ], false);

// noinspection JSUnusedGlobalSymbols, BadExpressionStatementJS
module.exports = class TranslationManager {
  constructor (OutputManager, settings) {
    this.output = OutputManager;
    this.settings = settings;
    this.Engines = {};
    this.messagesStorage = new Map(); // Map(channelID-MessageID, { original, translated, ... })
    this.initEngines();
  }

  get infoEngines () {
    return Object.fromEntries(
      Object.entries(this.Engines)
        .map(([ key, value ]) => [ key, value.info ])
    );
  }

  get userLocale () {
    return userSettings.locale.replace(/(.+?)-.*/, '$1');
  }

  initEngines () {
    const { get, set } = this.settings;

    readdirSync(__dirname)
      .filter((f) => !f.endsWith('.js'))
      .forEach((e) => {
        const Engine = require(resolve(__dirname, e));
        const settings = {
          get (key) {
            const data = get(e);
            return (data) ? data[key] : null;
          },
          set (key, value) {
            set(e, {
              ...get(e),
              [key]: value
            });
          }
        };

        this.Engines[e] = new Engine(settings);
      });
  }

  async translateMessage (message, params) {
    const key = `${message.channel_id}-${message.id}`;
    const fromIso = [];
    let isChanges = false;
    const getTranslate = (raw) => (
      this.translateText(raw, params)
        .then(({ text, iso }) => {
          fromIso.push(iso);
          if (raw !== text) {
            isChanges = true;
          }
          return text;
        })
    );
    const content = (message.content) ? await getTranslate(message.content) : message.content;
    const embedsFixed = fixEmbeds(message.embeds);
    const embeds = _.cloneDeep(embedsFixed);

    if (embeds.length) {
      for (const embed of embeds) {
        if (embed.description) {
          embed.description = await getTranslate(embed.description);
        }
        if (embed?.fields?.length) {
          for (const field of embed.fields) {
            field.value = await getTranslate(field.value);
            // field.name = await getTranslate(field.name);
          }
        }
      }
    }

    if (isChanges) {
      this.messagesStorage.set(key, {
        original: {
          content: message.content,
          embeds: embedsFixed,
          author: message.author // обход ошибки "[MessageStore] Message was missing an author!"
        },
        translated: true,
        from: fromIso,
        to: params.to || this.userLocale
      });
      this.updateMessage({
        ...message,
        content,
        embeds
      });
    }
  }

  translateText (text, { engine, to, from }) {
    if (engine) {
      if (this.infoEngines[engine].noSupportAuto && from === 'auto') {
        const error = new Error();
        error.name = 'Not support auto detection of translated language';
        error.code = 'NO_SUPPORT_AUTO';
        throw error;
      }

      return this.Engines[engine].translate(text, {
        to: to || this.userLocale,
        from: from || 'auto'
      });
    }
    const error = new Error();
    error.name = 'No translation engine';
    error.code = 'NO_TRANSLATION_ENGINE';
    throw error;
  }

  updateMessage (message) {
    FluxDispatcher.dirtyDispatch({
      type: 'MESSAGE_UPDATE',
      forceUpdate: true, // предупреждение для обработчиков
      message
    });
  }

  recover (message) {
    const key = `${message.channel_id}-${message.id}`;
    this.messagesStorage.set(key, {
      ...this.messagesStorage.get(key),
      translated: false
    });
    this.updateMessage({
      ...message,
      ...this.messagesStorage.get(key).original
    });
  }

  isTranslated (message) {
    const key = `${message.channel_id}-${message.id}`;
    return !!(this.messagesStorage.has(key) && this.messagesStorage.get(key).translated);
  }

  engineIsReady (id) {
    return this.Engines[id].isReady;
  }

  engineIsInstalled (id) {
    return this.Engines[id].isInstalled;
  }

  installEngine (id) {
    return this.Engines[id].installDependencies();
  }
};
