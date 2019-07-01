// Take a shallow copy of the algorithm index
var theResult = Object.assign({}, require('../../notation/algs/algIndex'));

// Return all valid algorithms.
// NUL is an invalid value for testing only,
// so remove it, don't expose it via API
delete theResult.NUL;

module.exports = theResult;
