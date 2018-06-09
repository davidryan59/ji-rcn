var primeToCommaDR = function(p) {
  // This function maps a prime number
  // to a 2-element array containing its prime comma

  // DR algorithm implemented here

  var log3 = Math.log(3)
  var log2 = Math.log(2)
  var log23 = log3/log2
  var logp = Math.log(p)
  var log3p = logp/log3
  var log2p = logp/log2

  var bmid = -0.5 * log3p
  var bmin1 = Math.round(bmid - 5.5)
  var bmax1 = Math.round(bmid + 5.5)
  var bmin2 = Math.ceil(-log3p - 1/(2*log23))
  var bmax2 = 0
  var bmin = Math.min(bmin1, bmin2)
  var bmax = Math.max(bmax1, bmax2)

  var cmmin = 1e20                // Unrealisticly high number
  var result = [0, 0]
  for (var b=bmin; b<=bmax; b++) {
    var a = Math.round(-log2p - b*log23)
    var exp2a = Math.pow(2, a)
    var exp3b = Math.pow(3, b)
    var pcand =  exp2a * exp3b * p
    var ao = Math.abs(a + b * log23 + log2p)
    var lcy = Math.abs(a) + Math.abs(b) * log23 + log2p
    var cm = ao * lcy
    // console.log(b + ", " + a + ", " + pcand + ", " + ao + ", " + lcy + ", " + cm)
    if (cm<cmmin) {
      cmmin = cm
      var num = p * Math.pow(2, Math.max(0, a)) * Math.pow(3, Math.max(0, b))
      var denom = Math.pow(2, Math.max(0, -a)) * Math.pow(3, Math.max(0, -b))
      result = [num, denom]
    }
  }
  return result
}

module.exports = primeToCommaDR
