var removeFrequency = function removeFrequency(jint) {
  // .freq is a cache. It can be removed.
  delete jint.freq;
};

module.exports = removeFrequency;
