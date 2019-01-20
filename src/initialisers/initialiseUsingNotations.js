var setAlg = require('./setAlg');
var parseNotation = require('../notation/parseNotation');
var recalcStartAndEndNotations = require('../notation/recalcStartAndEndNotations');

var initialiseUsingNotations = function initialiseUsingNotations(jint, startN, endN, alg) {
  setAlg(jint, alg);
  var startPeo = parseNotation(startN, jint.getAlgFn());
  var endPeo = parseNotation(endN, jint.getAlgFn());
  var intervalPeo = endPeo.mult(startPeo, -1);
  jint.peo = intervalPeo;
  recalcStartAndEndNotations(jint, startN, endN);
};

module.exports = initialiseUsingNotations;
