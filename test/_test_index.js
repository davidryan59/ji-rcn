var testDir = 'src';

module.exports = {
  ji: require('../' + testDir + '/index'),
  JInterval: require('../' + testDir + '/JInterval'),
  getComma: require('../' + testDir + '/api/class/getComma'),
  get5Label: require('../' + testDir + '/notation/get5Label'),
  getDiatonicArray: require('../' + testDir + '/notation/getDiatonicArray'),
  getOctaveArray: require('../' + testDir + '/notation/getOctaveArray'),
  getSharpFlatArray: require('../' + testDir + '/notation/getSharpFlatArray'),
  getHigherPythagCommaArray: require('../' + testDir + '/notation/getHigherPythagCommaArray'),
  consts: require('../' + testDir + '/constants/consts'),
  peos: require('../' + testDir + '/constants/peos'),
  parseNotation: require('../' + testDir + '/notation/parseNotation'),
  parseAlgText: require('../' + testDir + '/notation/algs/parseAlgText')
};
