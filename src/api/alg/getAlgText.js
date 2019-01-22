var getAlgText = function getAlgText() {
  // Return a string acronym, or description, of the algorithm used
  return (this.alg && this.alg.txt) ? this.alg.txt : '';
};

module.exports = getAlgText;
