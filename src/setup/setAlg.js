var parseCommaAlgText = require('../commas/parseCommaAlgText');
var algIndex = require('../commas/algIndex');
var consts = require('../constants/consts');

var setAlg = function setAlg(jint, theAlg) {
  // Three theAlg formats to deal with:
  // Case 1: theAlg = "ALG"
  // Case 2: theAlg = aFunction
  // Case 3: theAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)

  // If theAlg missing, do nothing further
  if (!theAlg) return;

  // Have algorithm here. Make a new blank property.
  jint.setup.alg = {};

  var inputAlgText = parseCommaAlgText(theAlg);
  if (inputAlgText) {
    // Case 1: theAlg = 'ALG'
    jint.setup.alg.txt = inputAlgText;
    var inputAlgFn = algIndex[inputAlgText];
    if (inputAlgFn) jint.setup.alg.fn = inputAlgFn;
  } else if (theAlg instanceof Function) {
    // Case 2: theAlg = aFunction
    jint.setup.alg.fn = theAlg;
    jint.setup.alg.txt = consts.ALG_CUSTOM;
  } else if (typeof theAlg === 'object') {
    // Case 3: theAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)
    // Copy the function first, if it is there
    if (theAlg.fn instanceof Function) {
      jint.setup.alg.fn = theAlg.fn;
      jint.setup.alg.txt = theAlg.txt || consts.ALG_CUSTOM;
    }
    // Copy the text second, and overwrite the function if it is available
    var inputAlgTxtText = parseCommaAlgText(theAlg.txt);
    if (inputAlgTxtText) {
      jint.setup.alg.txt = inputAlgTxtText;
      var inputAlgTxtFn = algIndex[inputAlgTxtText];
      if (inputAlgTxtFn) jint.setup.alg.fn = inputAlgTxtFn;
    }
  }
};

module.exports = setAlg;
