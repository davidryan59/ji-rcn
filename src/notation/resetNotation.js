var resetNotation = function resetNotation(jint) {
  // .notation is a cache. It can be removed.
  delete jint.notation;
};

module.exports = resetNotation;
