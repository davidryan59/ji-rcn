var parseNotation = require('./parseNotation');
var calcNotationObject = require('./calcNotationObject');

var setNotation = function setNotation(jint, inputStartN, inputEndN) {
  // Given a start notation for a JInterval:
  // - Return the end notation, if answer is already cached
  // - Otherwise calculate the end notation from the start notation and interval width

  // inputEndN is optional, not used to calculate, only to cache value at end.

  // Check if correct result has been cached. If so, return it.
  if (jint.notation && jint.notation.start && jint.notation.end && jint.notation.start.pitch) {
    // There is a cached result
    // Use cached result (i.e. return without updating) in these three cases:
    if (inputStartN === jint.notation.start.inputPitch ) return false;
    if (inputStartN === jint.notation.start.pitch) return false;
    if (!inputStartN) return false;
  }

  // Need to calculate and cache a new start and end notation.
  // Use as appropriate either inputted, cached or default start notation
  var alg = jint.getAlgFn();
  var startNotation = inputStartN || jint.getStartPitchNotation();

  // Calculate Peos
  var startNotationPeo = parseNotation(startNotation, alg);
  var intervalPeo = jint.peo;
  var endNotationPeo = startNotationPeo.mult(intervalPeo);

  // Calculate text notations for start and end
  var startNotationObject = calcNotationObject(startNotationPeo, alg);
  var endNotationObject = calcNotationObject(endNotationPeo, alg);

  // Cache the results for reuse
  jint.notation = {};
  jint.notation.start = {};
  jint.notation.end = {};
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

  // Return the peo for starting notation, for reuse
  return startNotationPeo;
};

module.exports = setNotation;
