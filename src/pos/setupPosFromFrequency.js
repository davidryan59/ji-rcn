var Peo = require('peo');

var setPos = require('./setPos');
var consts = require('../constants/consts');

var smallLimit = 1e-12;
var largeLimit = 1e15;

var checkInput = function checkInput(numericInput) {
  return Number.isFinite(numericInput) && numericInput > 0 && numericInput < largeLimit;
};

var setupPosFromFrequency = function setupPosFromFrequency(jint, inputStartFreqHz) {
  if (!jint.hasPos()) {
    // Absolute position (pos) not yet set
    // Create position using inputted start frequency, or failing that, default start frequency
    var theStartFreq = (checkInput(inputStartFreqHz)) ? inputStartFreqHz : consts.DEFAULT_FREQ_HZ;
    var theStartPeo1 = new Peo(theStartFreq / jint.getTuningMultHz());
    setPos(jint, theStartPeo1);
  } else {
    // Absolute position has already been set
    // Reuse if no (valid) start frequency has been inputted
    if (!checkInput(inputStartFreqHz)) return;
    // Reuse if input start frequency is close enough to existing frequency
    if (Math.abs(jint.pos.s.fhz - inputStartFreqHz) < smallLimit) return;
    // Cannot reuse. Must reset.
    var theStartPeo2 = new Peo(inputStartFreqHz / jint.getTuningMultHz());
    setPos(jint, theStartPeo2);
  }
};

module.exports = setupPosFromFrequency;
