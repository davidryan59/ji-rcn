var getPoint = require('./getPoint');

var setPos = function setPos(jint, theStartPeo) {
  jint.pos = {};
  jint.pos.s = getPoint(jint, theStartPeo);
  jint.pos.e = getPoint(jint, theStartPeo.mult(jint.peo));
};

module.exports = setPos;
