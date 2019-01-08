// Comment out right lines to test either src or build:

var testDir = 'src';
// var testDir = 'build';

module.exports = {
  ji: require('../' + testDir + '/index'),
  JInterval: require('../' + testDir + '/JInterval'),
  get5Label: require('../' + testDir + '/notation/get5Label'),
  getComma: require('../' + testDir + '/api/class/getComma'),
  getDiatonicArray: require('../' + testDir + '/notation/getDiatonicArray'),
  getOctaveArray: require('../' + testDir + '/notation/getOctaveArray'),
  getSharpFlatArray: require('../' + testDir + '/notation/getSharpFlatArray'),
  parseNotation: require('../' + testDir + '/notation/parseNotation')
};
