var Fraction = require('fraction.js')

// var ji = require('ji-rcn')           // via npm
var ji = require('../index.js')      // Locally

var getComma = ji.getComma
var getPythag = ji.getPythag

for (var i=1; i<100; i++) {
  console.log("")
  console.log(i + "\t" + getComma(i).toFraction() + "\t" + getPythag(i).toFraction())
}
