const Engine = require('../Engine.js');

const libPath = '@iamtraction/google-translate';

module.exports = class Google extends Engine {
  constructor () {
    super({
      __dirname,
      needNodeModules: true
    });
    this.rateLimit = 1500; // need more tests
  }

  get info () {
    return {
      name: 'Google Translate',
      description: 'The free Google service allows you to instantly translate words, phrases and web pages with English more than 100 languages and back.',
      icon: require('./Icon.jsx'),
      languages: (this.isInstalled) ? Object.keys(require(libPath).languages) : []
    };
  }

  run (text, options) {
    return require(libPath)(text, options)
      .then((res) => ({
        text: res.text,
        iso: res.from.language.iso
      }));
  }
};
