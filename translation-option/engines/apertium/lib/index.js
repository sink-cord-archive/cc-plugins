/* eslint-disable object-property-newline, no-use-before-define */

const { get } = require('powercord/http');

const API_ENDPOINT = 'https://apertium.org/apy/translate';

module.exports = function (text, { from, to }) {
  const url = new URL(API_ENDPOINT);

  url.searchParams.set('langpair', `${from}|${to}`);
  url.searchParams.set('q', text);

  return get(url.href)
    .then((res) => ({
      text: res.body.responseData.translatedText,
      lang: from
    }))
    .catch((res) => {
      if (res.body.explanation === 'That pair is not installed') {
        const error = new Error();
        error.name = 'Not supported pair';
        error.code = 'NOT_SUPPORTED_PAIR';
        throw error;
      }
      throw res;
    });
};
