var getSetupDisplayObject = function getSetupDisplayObject() {
  if (!this.hasDisplay()) return null;
  var result = {};

  // Should syntonic commas be hidden?
  if (this.hideComma5Syntonic()) result.hide5 = true;

  // Should each type of 3-limit comma be used?
  // If so, above which 3-exponent?
  // (Object describes answers to those questions)

  var lev12 = this.levelComma12Pythag();
  if (lev12) result.lev12 = lev12;

  var lev53 = this.levelComma53Mercator();
  if (lev53) result.lev53 = lev53;

  var lev665 = this.levelComma665Small();
  if (lev665) result.lev665 = lev665;

  var lev190537 = this.levelComma190537Tiny();
  if (lev190537) result.lev190537 = lev190537;

  var comMax = this.getCommaMaxUnsplit();
  if (comMax) result.comMax = comMax;

  var reps = this.getMaxRepeatChars();
  if (reps) result.reps = reps;

  return result;
};

module.exports = getSetupDisplayObject;
