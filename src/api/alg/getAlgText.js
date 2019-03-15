var getAlgText = function getAlgText() {
  // Return a string acronym, or description, of the algorithm used
  return (this.set.alg && this.set.alg.txt) ? this.set.alg.txt : '';
};

module.exports = getAlgText;
