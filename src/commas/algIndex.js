// Algorithm index.
// Output of parseCommaAlgText can be used to obtain the algorithm from here
var getCommaDR = require('./getCommaDR');
var getCommaSAG = require('./getCommaSAG');
var getCommaKG2 = require('./getCommaKG2');
var getCommaBAD = require('./getCommaBAD');
var returnNull = function returnNull() {return null;};

module.exports = {
  DEFAULT_ALG: getCommaDR,

  DR: getCommaDR,     // ALG_DR (These keys must match values in constants file)
  SAG: getCommaSAG,   // ALG_SAG
  KG2: getCommaKG2,   // ALG_KG
  BAD: getCommaBAD,   // ALG_BAD

  NUL: returnNull     // Used for testing when bad value returned
};
