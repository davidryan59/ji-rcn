var algIndex = require('../../commas/algIndex');

var getAlgFn = function getAlgFn() {
  // Return the actual function used to calculate the commas
  return (this.setup.alg && this.setup.alg.fn ) ? this.setup.alg.fn : algIndex.DEFAULT_ALG;
};

module.exports = getAlgFn;
