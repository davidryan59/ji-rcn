// Return an identity Jinote, representing a Jinote on 1/1
var get1 = function() {
  var JinoteConstructor = this.constructor
  return new JinoteConstructor()
}

module.exports = get1
