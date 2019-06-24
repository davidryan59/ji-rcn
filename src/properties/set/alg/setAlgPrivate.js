var parseAlgText = require('../../../notation/algs/parseAlgText');
var algIndex = require('../../../notation/algs/algIndex');
var consts = require('../../../constants/consts');

var setAlgPrivate = function setAlgPrivate(jint, theAlg) {
  // Format - 3 cases
  // Case 1 Text:        theAlg = "ALG"
  // Case 2 Function:    theAlg = aFunction
  // Case 3 Object:      theAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)

  // Return if no alg inputted
  if (!theAlg) return;

  // Have algorithm here. Make a new blank property.
  jint.set.alg = {};

  var inputAlgText = parseAlgText(theAlg);
  if (inputAlgText) {
    // Case 1: theAlg = 'ALG'
    jint.set.alg.txt = inputAlgText;
    var inputAlgFn = algIndex[inputAlgText];
    if (inputAlgFn) jint.set.alg.fn = inputAlgFn;
  } else if (theAlg instanceof Function) {
    // Case 2: theAlg = aFunction
    jint.set.alg.fn = theAlg;
    jint.set.alg.txt = consts.ALG_CUSTOM;
  } else if (typeof theAlg === 'object') {
    // Case 3: theAlg = {txt: 'ALG', fn: aFunction}   (could be 0 or 1 inputs)
    // Copy the function first, if it is there
    if (theAlg.fn instanceof Function) {
      jint.set.alg.fn = theAlg.fn;
      jint.set.alg.txt = theAlg.txt || consts.ALG_CUSTOM;
    }
    // Copy the text second, and overwrite the function if it is available
    var inputAlgTxtText = parseAlgText(theAlg.txt);
    if (inputAlgTxtText) {
      jint.set.alg.txt = inputAlgTxtText;
      var inputAlgTxtFn = algIndex[inputAlgTxtText];
      if (inputAlgTxtFn) jint.set.alg.fn = inputAlgTxtFn;
    }
  }
};

module.exports = setAlgPrivate;
