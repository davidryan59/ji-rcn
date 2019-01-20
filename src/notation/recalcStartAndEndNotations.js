var parseNotation = require('./parseNotation');
var calcNotationObject = require('./calcNotationObject');

var recalcStartAndEndNotations = function recalcStartAndEndNotations(jint, inputStartN, inputEndN) {
  // Given a start notation for a JInterval:
  // - Return the end notation, if answer is already cached
  // - Otherwise calculate the end notation from the start notation and interval width

  // inputEndN is optional, not used to calculate, only to cache value at end.

  // Check if correct result has been cached. If so, return it.
  if (jint.notation.start.inputPitch) {
    // There is a cached result
    if (inputStartN === jint.notation.start.inputPitch) {
      // Asking for same cached result. Return it.
      return jint.notation.end;
    } else if (!inputStartN) {
      // No inputStartN specified. Repeat previous result
      return jint.notation.end;
    }
  }

  // Need to calculate and cache a new start and end notation.
  // Use as appropriate either inputted, cached or default start notation
  var alg = jint.getAlgText();
  var startNotation = inputStartN || jint.getStartPitchNotation();

  // Calculate Peos
  var startNotationPeo = parseNotation(startNotation, alg);
  var intervalPeo = jint.peo;
  var endNotationPeo = startNotationPeo.mult(intervalPeo);

  // Calculate text notations for start and end
  var startNotationObject = calcNotationObject(startNotationPeo, alg);
  var endNotationObject = calcNotationObject(endNotationPeo, alg);

  // Cache the results for reuse
  // Start notations
  var startPitchNotation = startNotationObject.pitch;
  if (inputStartN && inputStartN !== startPitchNotation) jint.notation.start.inputPitch = inputStartN;
  jint.notation.start.pitch = startPitchNotation;
  jint.notation.start.pclass = startNotationObject.pclass;
  // End notations
  var endPitchNotation = endNotationObject.pitch;
  if (inputEndN && inputEndN !== endPitchNotation) jint.notation.end.inputPitch = inputEndN;
  jint.notation.end.pitch = endPitchNotation;
  jint.notation.end.pclass = endNotationObject.pclass;

  return jint.notation.end;
};

module.exports = recalcStartAndEndNotations;
