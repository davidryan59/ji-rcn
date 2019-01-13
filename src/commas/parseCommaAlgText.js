var isString = require('is-string');

var consts = require('../constants/consts');

var parseCommaAlgText = function parseCommaAlgText(input) {
  // Is input a string containing an algorithm name/acronym?
  // Ought to return '' (falsy) if the input is not a valid algorithm acronym
  if (!isString(input)) return '';
  if (input.length > 3) return '';
  var theAlgLowerCase = input.toLowerCase();
  if (theAlgLowerCase.includes('sag') || theAlgLowerCase.includes('dk')) {
    return consts.ALG_SAG;
  } else if (theAlgLowerCase.includes('kg')) {
    return consts.ALG_KG;
  } else if (theAlgLowerCase.includes('bad')) {
    return consts.ALG_BAD;
  } else if (theAlgLowerCase.includes('dr')) {
    return consts.ALG_DR;
  } else if (theAlgLowerCase === 'emp') {
    return 'EMP';  // Test value only - key intentionally missing from algIndex
  } else if (theAlgLowerCase === 'nul') {
    return 'NUL';  // Test value only - algorithm returns null
  }
  return '';
};

module.exports = parseCommaAlgText;
