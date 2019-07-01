var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var setupPosFromNotation = require('../properties/pos/setupPosFromNotation');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startNInput, endNInput) {
  var startNote = (endNInput) ? startNInput : consts.DEFAULT_PITCH_NOTATION;
  var endNote = (endNInput) ? endNInput : startNInput;
  var startPeo = parseNotation(jint, startNote);
  var endPeo = parseNotation(jint, endNote);
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  setupPosFromNotation(jint, startNote, endNote, startPeo);
};

module.exports = initialiseUsingNotations;
