const Engine = require('../Engine.js');

const translate = require('./lib');

module.exports = class Yandex extends Engine {
  constructor () {
    super();
    this.maxEntity = 600;
  }


  get info () {
    return {
      name: 'Yandex.Translate',
      description: 'Synchronized translation for ~100 languages, predictive typing, dictionary with transcription, pronunciation and usage examples, and many other features.',
      icon: require('./Icon.jsx'),
      languages: require('./lib/languages.js')
    };
  }

  run (text, params) {
    return translate(text, params)
      .then((res) => ({
        text: res.text,
        iso: res.lang
      }));
  }
};
