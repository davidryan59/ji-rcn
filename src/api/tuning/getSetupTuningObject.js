var getSetupTuningObject = function getSetupTuningObject() {
  if (!this.hasTuning()) return null;
  return {
    pitchNotation: this.getTuningInputPitchNotation(),
    freqHz: this.getTuningFreqHz()
  };
};

module.exports = getSetupTuningObject;
