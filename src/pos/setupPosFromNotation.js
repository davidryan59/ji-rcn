var setPos = require('./setPos');
var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');

var setupPosFromNotation = function setupPosFromNotation(jint, inputStartNotation, inputEndNotation, optionalStartPeo) {
  // optionalStartPeo can speed up calculation by cutting out slow parseNotation steps
  if (!jint.hasPos()) {
    // Absolute position (pos) not yet set
    // Create position using inputted start notation, or failing that, default start notation
    if (optionalStartPeo) {
      setPos(jint, optionalStartPeo);
    } else {
      var theStartNotation = (!inputStartNotation) ? consts.DEFAULT_PITCH_NOTATION : inputStartNotation;
      setPos(jint, parseNotation(jint, theStartNotation));
    }
  } else {
    // Absolute position has already been set
    // Reuse if no inputStartNotation has been inputted (and no start peo value)
    if (!(inputStartNotation || optionalStartPeo)) return;
    // Reuse if input start notation matches the stored value (or the stored input value)
    if (inputStartNotation === (jint.pos.s.ipn || jint.pos.s.pn)) return;
    // Cannot reuse. Must reset.
    // optionalStartPeo only used on initialisation,
    // so wouldn't be available here for amending the start position
    setPos(jint, parseNotation(jint, inputStartNotation));
  }
  // Set the input notations here if they are not the same
  if (inputStartNotation && inputStartNotation !== jint.pos.s.pn) jint.pos.s.ipn = inputStartNotation;
  if (inputEndNotation && inputEndNotation !== jint.pos.e.pn) jint.pos.e.ipn = inputEndNotation;
};

module.exports = setupPosFromNotation;
