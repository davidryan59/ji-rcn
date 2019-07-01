// Algorithm index.
// Look up algorithms by text strings (outputted from parseAlgText)

var consts = require('../../constants/consts');

var getCommaDR = require('./getCommaDR');
var getCommaSAG = require('./getCommaSAG');
var getCommaKG2 = require('./getCommaKG2');
var getCommaBAD = require('./getCommaBAD');
var getCommaADJ = require('./getCommaADJ');

var returnNull = function returnNull() {return null;};

var theObject = {
  DEFAULT_ALG: getCommaDR,
  NUL: returnNull           // Used for testing when bad value returned from this object
};
// Value EMP parses, but algIndex.EMP is undefined. This value for testing all branches.

theObject[consts.ALG_DR] = getCommaDR;     // List of comma algorithms. See list of acronyms in constants file
theObject[consts.ALG_SAG] = getCommaSAG;
theObject[consts.ALG_KG] = getCommaKG2;
theObject[consts.ALG_BAD] = getCommaBAD;
theObject[consts.ALG_ADJ] = getCommaADJ;   // Uses some prime commas with 5+ in them (between 3 and p)

module.exports = theObject;
