
/** Translate Response
 * @type TranslateResponse
 * @typedef {Object} TranslateResponse
 * @property {String} text translated text
 * @property {String} iso language iso from which the translation was performed
 */

const { resolve } = require('path');
const { existsSync } = require('fs');
const { spawn } = require('child_process');

const { exceptions } = require('../utils');

/* eslint-disable no-use-before-define, no-unused-vars,object-property-newline */
// noinspection JSUnusedGlobalSymbols
module.exports = class Engine {
  constructor ({ __dirname, needNodeModules } = {}) {
    this.cacheTranslation = {}; // { ru: Map(raw, text), es: Map(raw, text), ... }
    this.rateLimit = 1000;
    this.lastRun = 0;
    this._needNodeModules = needNodeModules;
    this.__dirname = __dirname;
  }

  /**
   * Check loaded dependencies
   * @return {boolean}
   */
  get isInstalled () {
    if (this._needNodeModules) {
      return existsSync(resolve(this.__dirname, 'node_modules'));
    }
    return true;
  }

  /**
   * If you need some kind of API Key
   * @return {boolean}
   */
  get isReady () {
    return this.isInstalled;
  }

  /**
   * Request Planner to service, time between queries this.rateLimit (ms)
   * @return {number}
   */
  get timeout () {
    const now = Date.now();
    const { lastRun, rateLimit } = this;
    const delta = (lastRun - now);

    if (delta <= 1) {
      this.lastRun = (now + rateLimit);
      return 0;
    }
    this.lastRun += rateLimit;
    return (delta + rateLimit);
  }

  installDependencies () {
    const command = (/^win/).test(process.platform) ? 'npm.cmd' : 'npm';
    const child = spawn(command, [ 'install' ], {
      cwd: this.__dirname
    });

    return new Promise((resolve, reject) => {
      child.stdout.on('data', (data) => {
        console.info('%c[NPM]', 'color: #009200', data.toString().substr(1));
      });

      child.stderr.on('data', (data) => {
        console.error('%c[NPM] ERROR', 'color: #cc3534', data.toString());
      });

      child.on('close', (code) => {
        if (code) {
          const err = new Error();
          err.name = 'npm error';
          err.code = 'NPM_ERROR';
          reject(err);
        } else {
          resolve('done');
        }
      });
    });
  }

  /**
   * Providing caching of response
   * @param {String} raw
   * @param {Object} options
   * @param {String} options.from
   * @param {String} options.to
   * @return {Promise<TranslateResponse>}
   */
  translate (raw, { from, to }) {
    const [ rawText, excepts ] = exceptions.extract(raw);
    const key = this._raw2key(rawText);
    const cache = this.cacheTranslation;

    return new Promise((resolve, reject) => {
      const drop = (t) => resolve({ text: t, iso: to });

      if (rawText === '') {
        drop(raw);
        return;
      }
      if (to in cache) {
        if (cache[to].has(key)) {
          drop(cache[to].get(key));
          return;
        }
      } else {
        cache[to] = new Map();
      }
      this._translateTimeoutHandler(rawText, { from, to })
        .then(({ text, iso }) => {
          text = exceptions.insert([ text, excepts ]);
          cache[to].set(key, text);
          resolve({ text, iso });
        })
        .catch(reject);
    });
  }

  /**
   * Plug
   * @param {String} text
   * @param {Object} options
   * @param {String} options.to
   * @param {String} options.from
   * @return {Promise<TranslateResponse>}
   */
  run (text, options) {
    return new Promise((resolve) => {
      resolve({ text });
    });
  }

  safeRequire (path) {
    let mod = null;
    try {
      mod = require(path);
    } catch (err) {
      if (err.code !== 'MODULE_NOT_FOUND') {
        throw err; // не блокировать ошибки модуля
      }
    }
    return mod;
  }

  /**
   * Timeout wrapper
   * @return {Promise<run>}
   */
  _translateTimeoutHandler (...args) {
    const { timeout } = this;
    const handler = this.run.bind(this);
    if (timeout) {
      console.log('%c[TranslationOption]', 'color: #1967d2', `Translate timeout: ${timeout}ms`);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        handler(...args)
          .then(resolve)
          .catch(reject);
      }, timeout);
    });
  }

  _raw2key (text) {
    return text.toLowerCase();
  }
};
