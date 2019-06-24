var removeTuning = function removeTuning(jint) {
  if (jint && jint.set && jint.set.tn) delete jint.set.tn;
};

module.exports = removeTuning;
