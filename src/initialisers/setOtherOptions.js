var Peo = require('peo');

var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var calcNotationObject = require('../notation/calcNotationObject');
var recalcStartAndEndNotations = require('../notation/recalcStartAndEndNotations');
var recalcStartAndEndFrequencies = require('../freq/recalcStartAndEndFrequencies');

var setOtherOptions = function setOtherOptions(jint, theOptions) {
  // Do specific things to object initialisation
  var theAlg = jint.getAlgFn();

  if (theOptions.tuning) {
    var thePeo = null;
    var tuningMultHz = null;
    var pitchNotation = null;
    var inputPitchNotation = theOptions.tuning.pitchNotation;
    var freqHz = theOptions.tuning.freqHz;
    if (!freqHz) freqHz = consts.DEFAULT_FREQ_HZ;
    if (!inputPitchNotation) {
      thePeo = new Peo(1);
      pitchNotation = consts.DEFAULT_PITCH_NOTATION;
      tuningMultHz = freqHz;
    } else {
      thePeo = parseNotation(inputPitchNotation, theAlg);
      pitchNotation = calcNotationObject(thePeo, theAlg).pitch;
      tuningMultHz = thePeo.mult(freqHz, -1).pow(-1).getAsDecimal();   // freq/peo = (peo * freq^-1)^-1
    }
    jint.tuning = {
      freqHz: freqHz,
      pitchNotation: pitchNotation,
      multHz: tuningMultHz
    };
    if (inputPitchNotation && inputPitchNotation !== pitchNotation) jint.tuning.inputPitchNotation = inputPitchNotation;

    // Some automatic population of values based on tuning
    if (jint.hasTuning() && jint.hasFreq() && !jint.hasNotation()) {
      // Set notation, using frequency and tuning
      var startFreqHz1 = jint.getStartFreqHz();
      var startDecimal1 = startFreqHz1 / tuningMultHz;
      var startPeo1 = new Peo(startDecimal1);
      var startNotationObject = calcNotationObject(startPeo1, theAlg);
      var startPitchNotation1 = startNotationObject.pitch;
      recalcStartAndEndNotations(jint, startPitchNotation1);
    } else if (jint.hasTuning() && jint.hasNotation() && !jint.hasFreq()) {
      // Set freq, using notation and tuning
      var startPitchNotation2 = jint.getStartPitchNotation();
      var startPeo2 = parseNotation(startPitchNotation2, theAlg);
      var startDecimal2 = startPeo2.getAsDecimal();
      var startFreqHz2 = startDecimal2 * tuningMultHz;
      recalcStartAndEndFrequencies(jint, startFreqHz2);
    }
  }
};

module.exports = setOtherOptions;
