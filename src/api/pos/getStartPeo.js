var setPos = require('../../properties/pos/setPos');

var getStartPeo = function getStartPeo() {
  setPos(this);
  return this.pos.s.peo;
};

module.exports = getStartPeo;
