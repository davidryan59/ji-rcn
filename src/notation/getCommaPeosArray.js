var getComma = require('../api/class/getComma');

var getCommaPeosArray = function getCommaPeosArray(jint, minPrimeToRemove, peoToReduce, peoBuildCommaInput) {
  // Last argument optional, if not supplied, use identity Peo
  var thePeoBuildComma = peoBuildCommaInput || peoToReduce.get1();

  var hiPrime = peoToReduce.getHighestPrime();  // Either a prime, or null (if peo is 1)

  // Exit iterative function if there is no prime at least minPrimeToRemove
  if (!hiPrime || hiPrime < minPrimeToRemove) return [peoToReduce, thePeoBuildComma];

  // Going to divide out by an appropriate comma to eliminate hiPrime from peoToReduce
  var theCommaPeo = getComma(hiPrime, jint.getAlgFn());
  // Note - getComma(...) MUST have highest prime hiPrime, with exponent 1,
  // for this algorithm to work

  // Remove theCommaPeo^hiExp from peoToReduce, add hiPrime^hiExp to thePeoBuildComma
  var hiExp = peoToReduce.getPrimeExp(hiPrime);
  var nextPeoToReduce = peoToReduce.mult(theCommaPeo, -hiExp);
  var nextPeoBuildComma = thePeoBuildComma.mult(hiPrime, hiExp);  // Peo .mult works with integer input. Multiply by prime^exp.

  // Iterate on the next highest prime in nextPeoToReduce
  return getCommaPeosArray(jint, minPrimeToRemove, nextPeoToReduce, nextPeoBuildComma);
};

module.exports = getCommaPeosArray;
