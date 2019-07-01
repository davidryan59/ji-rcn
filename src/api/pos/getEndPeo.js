var setPos = require('../../properties/pos/setPos');

var getEndPeo = function getEndPeo(thePeo) {
  setPos(this, thePeo);
  return this.pos.e.peo;
};

module.exports = getEndPeo;
