var isString = require('is-string');

var consts = require('../constants/consts');

var parseAlg = function parseAlg(input) {
  // Is input a string containing an algorithm name?
  if (!isString(input)) return '';
  if (input.length > 3) return '';
  var theAlg = input.toLowerCase();
  if (theAlg.includes('sag') || theAlg.includes('dk')) {
    return consts.ALG_SAG;
  } else if (theAlg.includes('kg')) {
    return consts.ALG_KG;
  } else if (theAlg.includes('bad')) {
    return consts.ALG_BAD;
  } else if (theAlg.includes('dr')) {
    return consts.ALG_DR;
  }
  return '';
};

module.exports = parseAlg;
