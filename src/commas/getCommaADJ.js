var Peo = require('peo');
var pf = require('primes-and-factors');
var getCommaDR = require('./getCommaDR');

// Adjacent algorithm
// For primes 47 and above, return p/k
// where k is a number adjacent to p
// Otherwise, use DR algorithm

// This comma was written to test what happens
// if comma has some prime factors other than 2, 3, p

var getCommaADJ = function getCommaADJ(p) {
  if (!pf.isPrime(p)) return new Peo();
  if (p < 47) return getCommaDR(p);
  if (p % 6 === 1) return new Peo(p, p - 1);
  return new Peo(p, p + 1);
};

module.exports = getCommaADJ;
