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
    var correctedPitchNotationObject = null;
    var tuningMultHz = null;
    var freqHz = theOptions.tuning.freqHz;
    var pitchNotation = theOptions.tuning.pitchNotation;
    if (!freqHz) freqHz = consts.DEFAULT_FREQ_HZ;
    if (!pitchNotation) {
      thePeo = new Peo(1);
      correctedPitchNotationObject = consts.DEFAULT_PITCH_NOTATION;
      tuningMultHz = freqHz;
    } else {
      thePeo = parseNotation(pitchNotation, theAlg);
      correctedPitchNotationObject = calcNotationObject(thePeo, theAlg).pitch;
      tuningMultHz = thePeo.mult(freqHz, -1).pow(-1).getAsDecimal();   // freq/peo = (peo * freq^-1)^-1
    }
    jint.tuning = {
      freqHz: freqHz,
      pitchNotation: correctedPitchNotationObject,
      multHz: tuningMultHz
    };
    if (pitchNotation) jint.tuning.inputPitchNotation = pitchNotation;

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
