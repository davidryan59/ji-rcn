var privateGetPeo = require('../private/privateGetPeo')
var getCommaP = require('../commas/getCommaP')

var setComma = function(jn) {

  var myPeo = privateGetPeo(jn)
  var splitArray = myPeo.split([2, 3])
  // var originalPythagInfo = splitArray[0]
  var higherPrimesPeo = splitArray[1]

  // Start comma construction with 1/1
  var comma = higherPrimesPeo.get1()

  // Iterate over higher primes
  var obj = higherPrimesPeo.getPrimeExps()
  var keys = Object.keys(obj)
  for (var i=0; i<keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var prime = Number.parseInt(key)
    var exp = Number.parseInt(val)
    var thisComma = getCommaP(prime, jn.alg)
    comma = comma.mult(thisComma, exp)
  }

  // Set the results
  jn.pythag = myPeo.mult(comma, -1)  // Divide out the comma!
  jn.comma = {}
  jn.comma.from = higherPrimesPeo
  jn.comma.to = comma
}

module.exports = setComma
