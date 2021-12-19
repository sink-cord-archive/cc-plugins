/* eslint-disable object-property-newline, no-use-before-define */

const { writeFile, existsSync } = require('fs');
const { get, post } = require('powercord/http');
const { resolve } = require('path');

const API_ENDPOINT = 'https://translate.yandex.net/';
const cache = initCache();

function initCache () {
  if (existsSync(resolve(__dirname, './cache.json'))) {
    return require('./cache.json');
  }
  return {};
}

/**
 * generate reqId access
 * @return {Promise<String>}
 */
function genReqId () {
  return get('https://translate.yandex.com/')
    .then((res) => {
      const raw = res.body
        .toString()
        .match(/Ya\.reqid\s?=\s?'(.+?)'/);

      if (raw) {
        return raw[1];
      }

      const error = new Error();
      error.name = 'reqId not fount';
      error.name = 'REQ_ID_NOT_FOUNT';
      throw error;
    });
}

/**
 * wrapper for updating ReqId which synchronizes the file cache
 * @return {Promise<String>}
 */
async function updateReqId () {
  cache.reqId = await genReqId();
  writeFile(resolve(__dirname, './cache.json'), JSON.stringify(cache, null, 2), (err) => {
    if (err) {
      throw err;
    }
  });
  console.log('%c[TranslationOption]', 'color: #1967d2', 'Yandex: update reqId');
  return cache.reqId;
}

/**
 * @return {Promise}
 */
function makeRequest (text, { from, to }, reqId) {
  const url = new URL('/api/v1/tr.json/translate', API_ENDPOINT);

  url.searchParams.set('id', `${reqId}-0-0`);
  url.searchParams.set('srv', 'tr-text');
  url.searchParams.set('format', 'text');
  url.searchParams.set('lang', (from === 'auto') ? to : `${from}-${to}`);

  return post(url.href)
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .send(`text=${encodeURIComponent(text)}`);
}


/**
 * The main function that controls the caching of the reqId for requests
 * @param {String} text
 * @param {Object} params
 * @param {String} params.from
 * @param {String} params.to
 * @return {Promise<{text: String, lang: String}>}
 */
async function translate (text, { from, to }) {
  const reqId = cache.reqId || await updateReqId();

  return makeRequest(text, { from, to }, reqId)
    .then(async (res) => {
      if (res.statusCode === '403') {
        const reqId = await updateReqId();
        return makeRequest(text, { from, to }, reqId);
      }
      return res;
    })
    .then((res) => ({
      text: res.body.text.shift(),
      lang: res.body.lang.split('-').shift()
    }));
}

module.exports = translate;
