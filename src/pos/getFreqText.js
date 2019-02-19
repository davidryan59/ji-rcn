var getFreqText = function getFreqText(freqHz) {
  var roundedFreqText = '' + Math.round(freqHz * 100);  // Will be 2 dps
  var len = roundedFreqText.length;
  if (len < 3) return '0.' + roundedFreqText + ' Hz';
  return roundedFreqText.slice(0, len - 2) + '.' + roundedFreqText.slice(len - 2) + ' Hz';
};

module.exports = getFreqText;
