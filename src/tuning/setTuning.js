var Peo = require('peo');

var consts = require('../constants/consts');
var parseNotation = require('../notation/parseNotation');
var calcNotationObject = require('../notation/calcNotationObject');
var setNotation = require('../notation/setNotation');
var setFrequency = require('../freq/setFrequency');

var setTuning = function setTuning(jint, theTuning) {
  var theAlg = jint.getAlgFn();

  var thePeo = null;
  var tuningMultHz = null;
  var pitchNotation = null;
  var inputPitchNotation = theTuning.pitchNotation;
  var freqHz = theTuning.freqHz;
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
    var startPitchNotation1 = calcNotationObject(startPeo1, theAlg).pitch;
    setNotation(jint, startPitchNotation1);
  } else if (jint.hasTuning() && jint.hasNotation() && !jint.hasFreq()) {
    // Set freq, using notation and tuning
    var startPitchNotation2 = jint.getStartPitchNotation();
    var startPeo2 = parseNotation(startPitchNotation2, theAlg);
    var startDecimal2 = startPeo2.getAsDecimal();
    var startFreqHz2 = startDecimal2 * tuningMultHz;
    setFrequency(jint, startFreqHz2);
  }
};

module.exports = setTuning;
