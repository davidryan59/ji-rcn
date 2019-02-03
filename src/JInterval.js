var initialise = require('./initialisers/initialise');

// JInterval class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function JInterval() {
  initialise(this, arguments);
}

// Static or Class methods
JInterval.getComma = require('./api/class/getComma');
JInterval.getCommaAlgs = require('./api/class/getCommaAlgs');

// --------- Instance methods ---------

// Algorithm
JInterval.prototype.getAlgFn = require('./api/alg/getAlgFn');
JInterval.prototype.getAlgText = require('./api/alg/getAlgText');
JInterval.prototype.getAlgSetupObject = require('./api/alg/getAlgSetupObject');
JInterval.prototype.hasAlg = require('./api/alg/hasAlg');

// Frequency
JInterval.prototype.getEndFreqHz = require('./api/freq/getEndFreqHz');
JInterval.prototype.getEndFreqText = require('./api/freq/getEndFreqText');
JInterval.prototype.getStartFreqHz = require('./api/freq/getStartFreqHz');
JInterval.prototype.getStartFreqText = require('./api/freq/getStartFreqText');
JInterval.prototype.hasFreq = require('./api/freq/hasFreq');

// General
JInterval.prototype.compress = require('./api/general/compress');
JInterval.prototype.copy = require('./api/general/copy');
JInterval.prototype.getPeo = require('./api/general/getPeo');
JInterval.prototype.toDecimal = require('./api/general/toDecimal');
JInterval.prototype.toFractionText = require('./api/general/toFractionText');
JInterval.prototype.toString = require('./api/general/toString');

// Maths
JInterval.prototype.get1 = require('./api/maths/get1');
JInterval.prototype.mult = require('./api/maths/mult');
JInterval.prototype.pow = require('./api/maths/pow');

// Notation
JInterval.prototype.getEndPitchClassNotation = require('./api/notation/getEndPitchClassNotation');
JInterval.prototype.getEndPitchInputNotation = require('./api/notation/getEndPitchInputNotation');
JInterval.prototype.getEndPitchNotation = require('./api/notation/getEndPitchNotation');
JInterval.prototype.getStartPitchClassNotation = require('./api/notation/getStartPitchClassNotation');
JInterval.prototype.getStartPitchInputNotation = require('./api/notation/getStartPitchInputNotation');
JInterval.prototype.getStartPitchNotation = require('./api/notation/getStartPitchNotation');
JInterval.prototype.hasNotation = require('./api/notation/hasNotation');

// Notation
JInterval.prototype.getTuningFreqHz = require('./api/tuning/getTuningFreqHz');
JInterval.prototype.getTuningMultHz = require('./api/tuning/getTuningMultHz');
JInterval.prototype.getTuningInputPitchNotation = require('./api/tuning/getTuningInputPitchNotation');
JInterval.prototype.getTuningPitchNotation = require('./api/tuning/getTuningPitchNotation');
JInterval.prototype.getTuningSetupObject = require('./api/tuning/getTuningSetupObject');
JInterval.prototype.hasTuning = require('./api/tuning/hasTuning');

module.exports = JInterval;
