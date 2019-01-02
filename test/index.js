// Comment out right lines to test either src or build:

var testDir = 'src';
// var testDir = 'build';

module.exports = {
  ji: require('../' + testDir + '/index'),
  Jinote: require('../' + testDir + '/Jinote'),
  get5Label: require('../' + testDir + '/notation/get5Label'),
  getComma: require('../' + testDir + '/api/class/getComma'),
  getDiatonicArray: require('../' + testDir + '/notation/getDiatonicArray'),
  getOctaveArray: require('../' + testDir + '/notation/getOctaveArray'),
  getSharpFlatArray: require('../' + testDir + '/notation/getSharpFlatArray'),
  privateGetPeo: require('../' + testDir + '/private/privateGetPeo')
};
