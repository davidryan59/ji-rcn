var setAlg = require('../commas/setAlg');
var parseNotation = require('../notation/parseNotation');
var setNotation = require('../notation/setNotation');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startN, endN, alg) {
  setAlg(jint, alg);
  var startPeo = parseNotation(startN, jint.getAlgFn());
  var endPeo = parseNotation(endN, jint.getAlgFn());
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  setNotation(jint, startN, endN);
};

module.exports = initialiseUsingNotations;
