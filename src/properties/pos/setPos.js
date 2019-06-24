/* eslint-disable no-nested-ternary */

var Peo = require('peo');

var getPoint = require('./getPoint');

var setPos = function setPos(jint, inputPeo) {
  const checkedPeo =
    inputPeo && inputPeo.constructor.name === Peo.name
      ? inputPeo
      : jint.pos && jint.pos.s && jint.pos.s.peo
        ? jint.pos.s.peo
        : new Peo(1);
  jint.pos = {};
  jint.pos.s = getPoint(jint, checkedPeo);
  jint.pos.e = getPoint(jint, checkedPeo.mult(jint.peo));
};

module.exports = setPos;
