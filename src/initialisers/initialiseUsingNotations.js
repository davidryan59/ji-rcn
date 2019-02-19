var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var setupPosFromNotation = require('../pos/setupPosFromNotation');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startNInput, endNInput) {
  var startNote = (endNInput) ? startNInput : consts.DEFAULT_PITCH_NOTATION;
  var endNote = (endNInput) ? endNInput : startNInput;
  var startPeo = parseNotation(startNote, jint.getAlgFn());
  var endPeo = parseNotation(endNote, jint.getAlgFn());
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  setupPosFromNotation(jint, startNote, endNote);
};

module.exports = initialiseUsingNotations;
