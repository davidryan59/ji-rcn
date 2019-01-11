// Algorithm index.
// Output of parseCommaAlgText can be used to obtain the algorithm from here
var getCommaDR = require('./getCommaDR');
var getCommaSAG = require('./getCommaSAG');
var getCommaKG2 = require('./getCommaKG2');
var getCommaBAD = require('./getCommaBAD');
var returnNull = function returnNull() {return null;};

module.exports = {
  DEFAULT: getCommaDR,
  DR: getCommaDR,     // Key must match ALG_DR in constants file
  SAG: getCommaSAG,   // ALG_SAG
  KG2: getCommaKG2,   // ALG_KG

  NUL: returnNull,    // For testing when algorithm returns null
  BAD: getCommaBAD    // ALG_BAD
};
