var setPos = require('./setPos');
var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');

var setupPosFromNotation = function setupPosFromNotation(jint, inputStartNotation, inputEndNotation) {
  if (!jint.hasPos()) {
    // Absolute position (pos) not yet set
    // Create position using inputted start notation, or failing that, default start notation
    var theStartNotation = (!inputStartNotation) ? consts.DEFAULT_PITCH_NOTATION : inputStartNotation;
    var theStartPeo1 = parseNotation(theStartNotation, jint.getAlgFn());
    setPos(jint, theStartPeo1);
  } else {
    // Absolute position has already been set
    // Reuse if no inputStartNotation has been inputted
    if (!inputStartNotation) return;
    // Reuse if input start notation matches the stored value (or the stored input value)
    if (inputStartNotation === (jint.pos.start.inputPitch || jint.pos.start.pitch)) return;
    // Cannot reuse. Must reset.
    var theStartPeo2 = parseNotation(inputStartNotation, jint.getAlgFn());
    setPos(jint, theStartPeo2);
  }
  // Set the input notations here if they are not the same
  if (inputStartNotation && inputStartNotation !== jint.pos.start.pitch) jint.pos.start.inputPitch = inputStartNotation;
  if (inputEndNotation && inputEndNotation !== jint.pos.end.pitch) jint.pos.end.inputPitch = inputEndNotation;
};

module.exports = setupPosFromNotation;
