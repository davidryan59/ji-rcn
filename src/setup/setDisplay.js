var checkLevel = function checkLevel(input, defaultLevel) {
  // Going to assume that defaultLevel is a positive number
  // representing the 3-exponent of the comma
  if (!Number.isInteger(input)) return defaultLevel;
  // Each Pythagorean comma should start being used for 3-exponents
  // approximately at the same level as it.
  // Fine tune that using the input.
  var minLevel = Math.round(0.5 * defaultLevel);
  var maxLevel = 2 * defaultLevel;
  if (minLevel <= input && input <= maxLevel) return input;
  return defaultLevel;
};

var setDisplay = function setDisplay(jint, theDisplay) {
  // Format:
  // {
  //   hide5: boolean,
  //   lev12: integer,
  //   lev57: integer,
  //   lev665: integer,
  //   lev190537: integer,
  // }

  // Return if no options supplied
  if (!theDisplay) return;

  var hide5 = theDisplay.hide5;
  var lev12 = theDisplay.lev12;
  var lev57 = theDisplay.lev57;
  var lev665 = theDisplay.lev665;
  var lev190537 = theDisplay.lev190537;

  // Return if none of the switches are on
  if (!(hide5 || lev12 || lev57 || lev665 || lev190537)) return;

  // We've got at least one non-default display option.
  // Store them here.
  jint.setup.disp = {};
  var disp = jint.setup.disp

  // Should syntonic commas be hidden from display?
  if (hide5) disp.hide5 = true;

  // Should each type of Pythagorean comma be used? If so, above which level?
  if (lev12) disp.lev12 = checkLevel(lev12, 12);
  if (lev57) disp.lev57 = checkLevel(lev57, 57);
  if (lev665) disp.lev665 = checkLevel(lev665, 665);
  if (lev190537) disp.lev190537 = checkLevel(lev190537, 190537);
};

module.exports = setDisplay;
