// Multiply one JInterval by another, optionally to a power (repeated that many times)
var mathsFnJIntervalCreator = function mathsFnJIntervalCreator(jint, extraOptions) {
  var originalOptions = jint.getSetupObject();
  var useTheseOptions = {};

  // Retain the setup options of the current JInterval
  Object.assign(useTheseOptions, originalOptions, extraOptions);

  // Use these setup options to complete construction of new JInterval
  var JIntervalConstructor = jint.constructor;
  var newJInterval = new JIntervalConstructor(useTheseOptions);

  // If a start position was originally provided, make sure jint is on the result
  if (jint.hasPos()) newJInterval.getEndPitchNotation(jint.getStartInputPitchNotation());

  return newJInterval;
};

module.exports = mathsFnJIntervalCreator;
