var removePos = function removePos(jint) {
  if (jint && jint.pos) delete jint.pos;
};

module.exports = removePos;
