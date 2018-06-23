var privateGetPeo = require('../private/privateGetPeo')
var getCommaP = require('../commas/getCommaP')

var getHigherPrimesArray = require('../notation/getHigherPrimesArray')
var get5Label = require('../notation/get5Label')
var getSharpFlatArray = require('../notation/getSharpFlatArray')
var getDiatonicArray = require('../notation/getDiatonicArray')
var getOctaveArray = require('../notation/getOctaveArray')

var setNotation = function(jn) {

  if (jn.txt && jn.comp) return

  var alg = jn.alg

  // Split up Peo of this Jinote into components:  2,3  ;  5  ;  primes 7+
  var myPeo = privateGetPeo(jn)
  var splitArray = myPeo.split([2, 3], 5)  // [Peo({2:a,3:b}), Peo({5:c}), Peo(the rest)]
  var pythagPeo = splitArray[0]            // Pythagorean = primes 2 and 3 only
  var prime5Peo = splitArray[1]
  var primes7PlusPeo = splitArray[2]

  // Calculate comma5PlusPeo from 1/1 based on primes5PlusPeo and alg
  var primes5PlusPeo = primes7PlusPeo.mult(prime5Peo)
  var comma5PlusPeo = myPeo.get1()     // Use .get1 to get id=1 from any Peo
  var obj = primes5PlusPeo.getPrimeExps()
  var keys = Object.keys(obj)
  for (var i=0; i<keys.length; i++) {
    var key = keys[i]
    var val = obj[key]
    var prime = Number.parseInt(key)
    var exp = Number.parseInt(val)
    var thisComma = getCommaP(prime, alg)
    comma5PlusPeo = comma5PlusPeo.mult(thisComma, exp)
  }
  // Divide comma5PlusPeo out of original Peo
  // to get a Pythagorean component
  pythagPeo = myPeo.mult(comma5PlusPeo, -1)

  // Get labels for the prime components 5+
  var prime5Text = get5Label(prime5Peo.getPrimeExp(5))
  var primes7PlusArray = getHigherPrimesArray(primes7PlusPeo)
  var primes7PlusText = primes7PlusArray[0]
  var commaSpacer = primes7PlusArray[1]

  // The Pythagorean component has a 3-exponent.
  // Use it first to get sharps and flats.
  var exp3 = pythagPeo.getPrimeExp(3)
  var safArray = getSharpFlatArray(exp3)
  var safText = safArray[0]
  var safPeo = safArray[1]
  var sharps = safArray[2]
  var exp3D = exp3 - 7 * sharps
  pythagPeo = pythagPeo.mult(safPeo, -1)

  var diatonicArray = getDiatonicArray(exp3D)
  var diatonicText = diatonicArray[0]
  var diatonicPeo = diatonicArray[1]
  pythagPeo = pythagPeo.mult(diatonicPeo, -1)

  var exp2 = pythagPeo.getPrimeExp(2)
  var octaveArray = getOctaveArray(exp2)
  var octaveText = octaveArray[0]
  var octavePeo = octaveArray[1]
  pythagPeo = pythagPeo.mult(octavePeo, -1)

  // Should be down to 1 on the pythagPeo
  // Set the text labels that comprise the notation
  jn.txt = {}
  jn.txt.oct = octaveText
  jn.txt.dia = diatonicText
  jn.txt.saf = safText
  jn.txt.pr5 = prime5Text
  jn.txt.prHi = primes7PlusText
  jn.txt.spc = commaSpacer

  // Put all these text components together for a final notation
  var pitchText = ""
  var pitchClassText = ""
  if (commaSpacer) {
    pitchText = diatonicText + safText + prime5Text + octaveText + commaSpacer + primes7PlusText
    pitchClassText = diatonicText + safText + prime5Text + commaSpacer + primes7PlusText
  } else {
    pitchText = diatonicText + safText + prime5Text + primes7PlusText + octaveText
    pitchClassText = diatonicText + safText + prime5Text + primes7PlusText
  }
  jn.txt.pitch = pitchText
  jn.txt.pclass = pitchClassText

  // Set the Peos that multiply to original myPeo
  jn.comp = {}
  jn.comp.oct = octavePeo
  jn.comp.dia = diatonicPeo
  jn.comp.saf = safPeo
  jn.comp.pr5 = prime5Peo
  jn.comp.prHi = primes7PlusPeo

}

module.exports = setNotation
