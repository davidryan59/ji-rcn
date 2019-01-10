var parseNotation = require('../notation/parseNotation');

var initialiseFromNotations = function initialiseFromNotations(jint, startN, endN, alg) {
  var startPeo = parseNotation(startN, alg);
  var endPeo = parseNotation(endN, alg);
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  if (alg) jint.alg = alg;
};

module.exports = initialiseFromNotations;
