var algIndex = require('../../commas/algIndex');

var getAlgFn = function getAlgFn() {
  // Return the actual function used to calculate the commas
  return (this.alg && this.alg.fn ) ? this.alg.fn : algIndex.DEFAULT_ALG;
};

module.exports = getAlgFn;
