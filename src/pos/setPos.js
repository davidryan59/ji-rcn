var getPoint = require('./getPoint');

var setPos = function setPos(jint, theStartPeo) {
  jint.pos = {};
  jint.pos.start = getPoint(jint, theStartPeo);
  jint.pos.end = getPoint(jint, theStartPeo.mult(jint.peo));
};

module.exports = setPos;
