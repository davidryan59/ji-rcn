var initialise = require('./initialisers/initialise');

// JInterval class constructor
// Object's purpose is to translate between a fraction (in Peo format)
// and a notation (text)
function JInterval() {
  this.peo = null; // Want this key to appear first
  this.setup = {};
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
JInterval.prototype.getSetupObject = require('./api/general/getSetupObject');

// Interval Frequency Ratio / Width / Relative Position
JInterval.prototype.ratio = require('./api/freqRatio/ratio');
JInterval.prototype.ratioFractionText = require('./api/freqRatio/ratioFractionText');
JInterval.prototype.ratioPeo = require('./api/freqRatio/ratioPeo');

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
JInterval.prototype.getSetupAlgObject = require('./api/alg/getSetupAlgObject');
JInterval.prototype.hasAlg = require('./api/alg/hasAlg');

// Tuning
JInterval.prototype.getTuningFreqHz = require('./api/tuning/getTuningFreqHz');
JInterval.prototype.getTuningInputPitchNotation = require('./api/tuning/getTuningInputPitchNotation');
JInterval.prototype.getTuningPitchNotation = require('./api/tuning/getTuningPitchNotation');
JInterval.prototype.getTuningMultHz = require('./api/tuning/getTuningMultHz');
JInterval.prototype.getSetupTuningObject = require('./api/tuning/getSetupTuningObject');
JInterval.prototype.hasTuning = require('./api/tuning/hasTuning');

// Display
JInterval.prototype.hideComma5Syntonic = require('./api/display/hideComma5Syntonic');
JInterval.prototype.levelComma12Pythag = require('./api/display/levelComma12Pythag');
JInterval.prototype.levelComma53Mercator = require('./api/display/levelComma53Mercator');
JInterval.prototype.levelComma665Small = require('./api/display/levelComma665Small');
JInterval.prototype.levelComma190537Tiny = require('./api/display/levelComma190537Tiny');
JInterval.prototype.getSetupDisplayObject = require('./api/display/getSetupDisplayObject');
JInterval.prototype.hasDisplay = require('./api/display/hasDisplay');

module.exports = JInterval;
