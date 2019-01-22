var removeNotation = function removeNotation(jint) {
  // .notation is a cache. It can be removed.
  delete jint.notation;
};

module.exports = removeNotation;
