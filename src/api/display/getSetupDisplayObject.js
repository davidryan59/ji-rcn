var getSetupDisplayObject = function getSetupDisplayObject() {
  if (!this.hasDisplay()) return null;
  var result = {};
  if (!this.useComma5Syntonic()) result.hide5 = true;
  if (this.useComma12Pythag()) result.show12 = true;
  if (this.useComma57Mercator()) result.show57 = true;
  if (this.useComma665Small()) result.show665 = true;
  if (this.useComma190137Tiny()) result.show190137 = true;
  return result;
};

module.exports = getSetupDisplayObject;
