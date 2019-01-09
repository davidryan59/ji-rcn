var parseNotation = require('./parseNotation');
var calcNotation = require('./calcNotation');

var recalcStartAndEndNotations = function recalcStartAndEndNotations(jint, inputtedStartNotation) {
  // Given a start notation for a JInterval:
  // - Return the end notation, if answer is already cached
  // - Otherwise calculate the end notation from the start notation and interval width

  // Check if correct result has been cached. If so, return it.
  if (jint.notation.start.inputPitch) {
    // There is a cached result
    if (inputtedStartNotation === jint.notation.start.inputPitch) {
      // Asking for same cached result. Return it.
      return jint.notation.end;
    } else if (!inputtedStartNotation) {
      // No inputtedStartNotation specified. Repeat previous result
      return jint.notation.end;
    }
  }

  // Need to calculate and cache a new start and end notation.
  // Use as appropriate either inputted, cached or default start notation
  var alg = jint.getAlg();
  var startNotation = inputtedStartNotation || jint.getStartPitchNotation();

  // Calculate Peos
  var startNotationPeo = parseNotation(startNotation, alg);
  var intervalPeo = jint.peo;
  var endNotationPeo = startNotationPeo.mult(intervalPeo);

  // Calculate text notations for start and end
  var startNotationResults = calcNotation(startNotationPeo, alg);
  var endNotationResults = calcNotation(endNotationPeo, alg);

  // Cache the results for reuse
  jint.notation.start.inputPitch = inputtedStartNotation;
  jint.notation.start.pitch = startNotationResults.pitch;
  jint.notation.start.pclass = startNotationResults.pclass;
  jint.notation.end.pitch = endNotationResults.pitch;
  jint.notation.end.pclass = endNotationResults.pclass;

  return jint.notation.end;
};

module.exports = recalcStartAndEndNotations;
