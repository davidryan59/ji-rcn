var checkLevel = function checkLevel(input, defaultLevel) {
  // Going to assume that defaultLevel is a positive number
  // representing the 3-exponent of the comma
  if (!Number.isInteger(input)) return defaultLevel;
  // Each Pythagorean comma should start being used for 3-exponents
  // approximately at the same level as it.
  // Fine tune that using the input.
  var minLevel = Math.round(0.5 * defaultLevel);
  var maxLevel = 2 * defaultLevel;
  var checkedInput = Math.abs(input);
  if (minLevel <= checkedInput && checkedInput <= maxLevel) return checkedInput;
  return defaultLevel;
};

var setDisplay = function setDisplay(jint, theDisplay) {
  // Format:
  // {
  //   hide5: boolean,
  //   lev12: integer,
  //   lev53: integer,
  //   lev665: integer,
  //   lev190537: integer,
  // }

  // Return if no options supplied
  if (!theDisplay) return;

  var hide5 = theDisplay.hide5;
  var lev12 = theDisplay.lev12;
  var lev53 = theDisplay.lev53;
  var lev665 = theDisplay.lev665;
  var lev190537 = theDisplay.lev190537;
  var comMax = theDisplay.comMax;
  var reps = theDisplay.reps;

  // Return if none of the switches are on
  if (!(hide5 || lev12 || lev53 || lev665 || lev190537 || comMax || reps)) return;

  // We've got at least one non-default display option.
  // Store them here.
  jint.setup.disp = {};
  var disp = jint.setup.disp;

  // Should syntonic commas be hidden from display?
  if (hide5) disp.hide5 = true;

  // Should each type of Pythagorean comma be used? If so, above which level?
  if (lev12) disp.lev12 = checkLevel(lev12, 12);
  if (lev53) disp.lev53 = checkLevel(lev53, 53);
  if (lev665) disp.lev665 = checkLevel(lev665, 665);
  if (lev190537) disp.lev190537 = checkLevel(lev190537, 190537);

  // Maximum number in comma that doesn't get split.
  // E.g. if set to 1000, [1001] becomes [7 11 13].
  if (Number.isInteger(comMax) && comMax >= 0) disp.comMax = comMax;

  // Maximum number of repeated characters before it gets bracketed
  // E.g. if set to 1000, [1001] becomes [7 11 13].
  if (Number.isInteger(reps) && reps >= 2) disp.reps = reps;
};

module.exports = setDisplay;
