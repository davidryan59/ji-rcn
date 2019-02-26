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

// General
JInterval.prototype.compress = require('./api/general/compress');
JInterval.prototype.copy = require('./api/general/copy');
JInterval.prototype.toString = require('./api/general/toString');
JInterval.prototype.getOptionsSetupObject = require('./api/general/getOptionsSetupObject');

// Interval Width (Relative Position)
JInterval.prototype.width = require('./api/width/width');
JInterval.prototype.widthFractionText = require('./api/width/widthFractionText');
JInterval.prototype.widthPeo = require('./api/width/widthPeo');

// Absolute Position
JInterval.prototype.getEndFreqHz = require('./api/pos/getEndFreqHz');
JInterval.prototype.getEndFreqText = require('./api/pos/getEndFreqText');
JInterval.prototype.getEndInputPitchNotation = require('./api/pos/getEndInputPitchNotation');
JInterval.prototype.getEndPitchNotation = require('./api/pos/getEndPitchNotation');
JInterval.prototype.getEndPitchClassNotation = require('./api/pos/getEndPitchClassNotation');
JInterval.prototype.getStartFreqHz = require('./api/pos/getStartFreqHz');
JInterval.prototype.getStartFreqText = require('./api/pos/getStartFreqText');
JInterval.prototype.getStartInputPitchNotation = require('./api/pos/getStartInputPitchNotation');
JInterval.prototype.getStartPitchNotation = require('./api/pos/getStartPitchNotation');
JInterval.prototype.getStartPitchClassNotation = require('./api/pos/getStartPitchClassNotation');
JInterval.prototype.hasPos = require('./api/pos/hasPos');

// Maths
JInterval.prototype.get1 = require('./api/maths/get1');
JInterval.prototype.mult = require('./api/maths/mult');
JInterval.prototype.pow = require('./api/maths/pow');

// Algorithm
JInterval.prototype.getAlgFn = require('./api/alg/getAlgFn');
JInterval.prototype.getAlgText = require('./api/alg/getAlgText');
JInterval.prototype.getAlgSetupObject = require('./api/alg/getAlgSetupObject');
JInterval.prototype.hasAlg = require('./api/alg/hasAlg');

// Tuning
JInterval.prototype.getTuningFreqHz = require('./api/tuning/getTuningFreqHz');
JInterval.prototype.getTuningInputPitchNotation = require('./api/tuning/getTuningInputPitchNotation');
JInterval.prototype.getTuningPitchNotation = require('./api/tuning/getTuningPitchNotation');
JInterval.prototype.getTuningMultHz = require('./api/tuning/getTuningMultHz');
JInterval.prototype.getTuningSetupObject = require('./api/tuning/getTuningSetupObject');
JInterval.prototype.hasTuning = require('./api/tuning/hasTuning');

module.exports = JInterval;
