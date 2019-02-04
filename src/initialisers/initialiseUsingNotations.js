var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var setNotation = require('../notation/setNotation');
var setFrequency = require('../freq/setFrequency');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startNInput, endNInput) {
  var startNote = (endNInput) ? startNInput : consts.DEFAULT_PITCH_NOTATION;
  var endNote = (endNInput) ? endNInput : startNInput;
  var startPeo = parseNotation(startNote, jint.getAlgFn());
  var endPeo = parseNotation(endNote, jint.getAlgFn());
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  setNotation(jint, startNote, endNote);
  setFrequency(jint, jint.getTuningMultHz() * startPeo.getAsDecimal());
};

module.exports = initialiseUsingNotations;
