var setDisplay = function setDisplay(jint, theDisplay) {
  // Format:
  // {
  //   hide5: true,
  //   show12: true,
  //   show57: true,
  //   show665: true,
  //   show190137: true,
  // }

  // Return if no options supplied
  if (!theDisplay) return;

  var hide5 = theDisplay.hide5
  var show12 = theDisplay.show12
  var show57 = theDisplay.show57
  var show665 = theDisplay.show665
  var show190137 = theDisplay.show190137

  // Return if none of the switches are on
  if (!(hide5 || show12 || show57 || show665 || show190137)) return

  // We've got at least one non-default display option.
  // Store them here.
  jint.setup.disp = {}

  if (hide5) jint.setup.disp.hide5 = true
  if (show12) jint.setup.disp.show12 = true
  if (show57) jint.setup.disp.show57 = true
  if (show665) jint.setup.disp.show665 = true
  if (show190137) jint.setup.disp.show190137 = true
};

module.exports = setDisplay;
