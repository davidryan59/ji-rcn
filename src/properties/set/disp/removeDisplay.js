var removeDisplay = function removeDisplay(jint) {
  if (jint && jint.set && jint.set.ds) delete jint.set.ds;
};

module.exports = removeDisplay;
