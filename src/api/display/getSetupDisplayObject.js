var getSetupDisplayObject = function getSetupDisplayObject() {
  if (!this.hasDisplay()) return null;
  var result = {};

  // Should syntonic commas be hidden?
  if (this.hideComma5Syntonic()) result.hide5 = true;

  // Should each type of 3-limit comma be used?
  // If so, above which 3-exponent?
  var lev12 = this.levelComma12Pythag();
  var lev57 = this.levelComma57Mercator();
  var lev665 = this.levelComma665Small();
  var lev190537 = this.levelComma190537Tiny();
  if (lev12) result.lev12 = lev12;
  if (lev57) result.lev57 = lev57;
  if (lev665) result.lev665 = lev665;
  if (lev190537) result.lev190537 = lev190537;

  return result;
};

module.exports = getSetupDisplayObject;
