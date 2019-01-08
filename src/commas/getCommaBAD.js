var getCommaDR = require('./getCommaDR');
var tripleToPeo = require('../maths/tripleToPeo');

var getCommaBAD = function getCommaBAD(p) {
  // Multiply a good algorithm by a Pythagorean comma to get a bad algorithm,
  // used for testing purposes
  var resultDR = getCommaDR(p);
  var sign = (resultDR.getAsDecimal() < 1) ? 1 : -1;
  var bungleFactor = tripleToPeo(1, -19, 12);      //  {2:-19, 3:12, 1:1}
  var resultBAD = resultDR.mult(bungleFactor, sign);
  return resultBAD;
};

module.exports = getCommaBAD;
