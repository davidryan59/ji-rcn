var removePos = function removePos(jint) {
  // jint.pos is a cache. It can be removed.
  delete jint.pos;
};

module.exports = removePos;
