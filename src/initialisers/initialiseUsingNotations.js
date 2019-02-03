var parseNotation = require('../notation/parseNotation');
var setNotation = require('../notation/setNotation');
var setFrequency = require('../freq/setFrequency');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startN, endN) {
  var startPeo = parseNotation(startN, jint.getAlgFn());
  var endPeo = parseNotation(endN, jint.getAlgFn());
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  setNotation(jint, startN, endN);
  setFrequency(jint, jint.getTuningMultHz() * startPeo.getAsDecimal());
};

module.exports = initialiseUsingNotations;
