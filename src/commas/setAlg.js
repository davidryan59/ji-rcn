var parseCommaAlgText = require('../commas/parseCommaAlgText');
var algIndex = require('../commas/algIndex');
var consts = require('../constants/consts');

var setAlg = function setAlg(jint, inputAlg) {
  // If inputAlg missing, do nothing further
  if (!inputAlg) return;

  // Have algorithm here. Make a new blank property.
  jint.alg = {};

  // Three inputAlg formats to deal with:
  // Case 1: inputAlg = "ALG"
  // Case 2: inputAlg = aFunction
  // Case 3: inputAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)

  var inputAlgText = parseCommaAlgText(inputAlg);
  if (inputAlgText) {
    // Case 1: inputAlg = 'ALG'
    jint.alg.txt = inputAlgText;
    var inputAlgFn = algIndex[inputAlgText];
    if (inputAlgFn) jint.alg.fn = inputAlgFn;
  } else if (inputAlg instanceof Function) {
    // Case 2: inputAlg = aFunction
    jint.alg.fn = inputAlg;
    jint.alg.txt = consts.ALG_CUSTOM;
  } else if (typeof inputAlg === 'object') {
    // Case 3: inputAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)
    // Copy the function first, if it is there
    if (inputAlg.fn instanceof Function) {
      jint.alg.fn = inputAlg.fn;
      jint.alg.txt = inputAlg.txt || consts.ALG_CUSTOM;
    }
    // Copy the text second, and overwrite the function if it is available
    var inputAlgTxtText = parseCommaAlgText(inputAlg.txt);
    if (inputAlgTxtText) {
      jint.alg.txt = inputAlgTxtText;
      var inputAlgTxtFn = algIndex[inputAlgTxtText];
      if (inputAlgTxtFn) jint.alg.fn = inputAlgTxtFn;
    }
  }
};

module.exports = setAlg;
