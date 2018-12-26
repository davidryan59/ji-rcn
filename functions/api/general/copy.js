var copy = function() {
  // The constructor initialised from a Jinote copies the Jinote
  var copyJinote = new this.constructor(this)
  return copyJinote
}

module.exports = copy
