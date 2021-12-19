const Engine = require('../Engine.js');

const libPath = 'bing-translate-api';

module.exports = class Bing extends Engine {
  constructor () {
    super({
      __dirname,
      needNodeModules: true
    });
  }

  get info () {
    return {
      name: 'Bing Microsoft Translator',
      description: 'Quickly translate words, phrases, and web pages between English and over 70 languages.',
      icon: require('./Icon.jsx'),
      languages: (this.isInstalled) ? Object.keys(require(libPath).lang.LANGS) : []
    };
  }

  run (text, { from, to }) {
    return require(libPath).translate(text, ((from === 'auto') ? null : from), to, true)
      .then((res) => ({
        text: res.translation,
        iso: res.language.from
      })).catch((err) => {
        console.error(err);
      });
  }
};
