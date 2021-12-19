/* eslint-disable no-use-before-define */

const { getModule } = require('powercord/webpack');
const { hex2int } = getModule([ 'hex2int' ], false);


function fixArrays (arrays) {
  return arrays.map((obj) => fixObject({ ...obj }));
}

/**
 * Delete 'raw' prefix from keys
 * @param {Object} obj
 * @return {Object}
 */
function fixObject (obj) {
  if ('id' in obj) {
    delete obj.id;
  }
  if ('color' in obj && !isNaN(obj.color)) {
    obj.color = String(hex2int(obj.color));
  }
  Object.entries(obj).forEach(([ key, value ]) => {
    const newKey = key.startsWith('raw') ? fixKey(key) : null;
    if (newKey) {
      renameKey(key, newKey, obj);
    }
    if (key === 'image' && obj.type !== 'rich') {
      obj.image.proxy_url = value.proxyURL;
      renameKey('image', 'thumbnail', obj);
    }
    if (Array.isArray(value)) {
      obj[newKey || key] = fixArrays(obj[newKey || key]);
    }
  });

  return obj;
}

function fixKey (str) {
  return str
    .replace(/^raw/, '')
    .charAt(0)
    .toLowerCase() + str.slice(4);
}

function renameKey (key, newKey, obj) {
  Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, key));
  delete obj[key];
}

module.exports = fixArrays;
