var getTuningSetupObject = function getTuningSetupObject() {
  if (!this.hasTuning()) return null;
  return {
    pitchNotation: this.getTuningInputPitchNotation(),
    freqHz: this.getTuningFreqHz()
  };
};

module.exports = getTuningSetupObject;
