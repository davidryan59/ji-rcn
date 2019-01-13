// Comment out right lines to test either src or build:

var testDir = 'src';
// var testDir = 'build';

module.exports = {
  ji: require('../' + testDir + '/index'),
  JInterval: require('../' + testDir + '/JInterval'),
  getComma: require('../' + testDir + '/api/class/getComma'),
  get5Label: require('../' + testDir + '/notation/get5Label'),
  getDiatonicArray: require('../' + testDir + '/notation/getDiatonicArray'),
  getOctaveArray: require('../' + testDir + '/notation/getOctaveArray'),
  getSharpFlatArray: require('../' + testDir + '/notation/getSharpFlatArray'),
  parseNotation: require('../' + testDir + '/notation/parseNotation'),
  parseCommaAlgText: require('../' + testDir + '/commas/parseCommaAlgText'),
  initialiseFromObject: require('../' + testDir + '/initialisers/initialiseFromObject')
};
