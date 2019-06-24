var removeAlg = function removeAlg(jint) {
  if (jint && jint.set && jint.set.alg) delete jint.set.alg;
};

module.exports = removeAlg;
