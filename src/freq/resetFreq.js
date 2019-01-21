var resetFreq = function resetFreq(jint) {
  // .freq is a cache. It can be removed.
  delete jint.freq;
};

module.exports = resetFreq;
