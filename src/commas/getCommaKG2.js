var tripleToPeo = require('../maths/tripleToPeo');
var calcExp2 = require('../maths/calcExp2');

var getCommaKG2 = function getCommaKG2(p) {
  // Calculate a prime comma, according to the KG2 algorithm

  var logp = Math.log(p);
  var log2 = Math.log(2);
  var log2p = logp / log2;   // Octaves
  var octFloor = Math.floor(log2p);
  var fractPart = log2p - octFloor;
  var halfSemitones = Math.floor(24 * fractPart);

  var exponents3 = [
    0,
    5, 5, -2, -2,
    3, 3, -4, -4,
    1, 1, -6,
    6, -1, -1,
    4, 4, -3, -3,
    2, 2, -5, -5,
    0
  ];
  // Note this array has 24 elements, and is skew-symmetric about its middle.

  var b = exponents3[halfSemitones];
  var a = calcExp2(p, b);

  return tripleToPeo(p, a, b);
};

module.exports = getCommaKG2;
