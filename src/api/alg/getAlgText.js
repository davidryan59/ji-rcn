var getAlgText = function getAlgText() {
  // Return a string acronym, or description, of the algorithm used
  return (this.setup.alg && this.setup.alg.txt) ? this.setup.alg.txt : '';
};

module.exports = getAlgText;
