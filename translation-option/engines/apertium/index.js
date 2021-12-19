const Engine = require('../Engine.js');

const translate = require('./lib');

module.exports = class Apertium extends Engine {
  run (text, params) {
    return translate(text, params)
      .then((res) => ({
        text: res.text,
        iso: res.lang
      }));
  }

  get info () {
    return {
      name: 'Apertium machine translation',
      description: 'Apertium is a rule-based machine translation platform. It is free software and released under the terms of the GNU General Public License.',
      icon: require('./Icon.jsx'),
      languages: require('./lib/languages.js'),
      noSupportAuto: true
    };
  }
};
