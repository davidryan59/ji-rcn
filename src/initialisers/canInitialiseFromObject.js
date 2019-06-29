var canInitialiseFromObject = function canInitialiseFromObject(obj) {
  return obj.startPitchNotation || obj.endPitchNotation ||
         obj.startFreqHz || obj.endFreqHz ||
         obj.jint || obj.peo || obj.num || obj.denom || obj.ratio;
};

module.exports = canInitialiseFromObject;
