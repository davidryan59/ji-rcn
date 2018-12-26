# Just Intonation - Rational Comma Notation
## (JI-RCN, `ji-rcn`)

[![npm version](https://badge.fury.io/js/ji-rcn.png)](https://badge.fury.io/js/ji-rcn)

**Just Intonation** (JI) is a system of musical tuning where intervals can be expressed as ratios between whole numbers.

Examples include: an octave (1:2), a major fourth (3:4), a major triad (4:5:6).

The reason to use Just Intonation is that it is the natural system of tuning for harmonic instruments such as stringed instruments, wind instruments, and the human voice itself.

The contemporary scale of 12-tone equal temperament (12TET) has only 12 notes in the octave. However, Just Intonation has a infinite number of notes in the octave. This makes it trickier to design a notation system that can cope with any possible note in JI.

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. Algorithms tend to vary for higher primes. Three algorithms which are currently available are `"DR"`, `"SAG"`, and `"KG2"`; all three algorithms are described in the paper above.

The purpose of the `ji-rcn` npm package is to help convert between rational numbers and their RCN representations under each algorithm.

Currently the API contains two items: a class `Jinote` which automates all the RCN calculations, and a function `getComma` which provides direct access to the calculation of prime commas for each prime and algorithm.

There is a full test suite using Mocha (`mocha`) for testing and Istanbul (`nyc`) for coverage. Currently all tests pass and coverage is 100%.



## Install
`npm install ji-rcn`  

## Test
`npm test`  
`npm run examples`  

## API
``` js
var ji = require('ji-rcn')

var Jinote = ji.jinote
var getComma = ji.getComma

// getComma
getComma(p)          // Calculate a comma (in Peo format) for prime p under default ("DR") algorithm
getComma(p, alg)     // Calculate a comma for prime p under other algorithm, e.g. "SAG", "KG2"

// Jinote class

// Class methods
Jinote.getComma(p, alg)       // getComma is also provided as class method for Jinote

// Constructors
var jn = new Jinote()         // Can initialise with no args. Jinote for 1/1
var jn = new Jinote(7)        // Can initialise from an integer. Jinote for 7/1
var jn = new Jinote(14, 15)   // Can initialise from fraction specified as integers. Jinote for 14/15
var jn = new Jinote(0.75)     // Can initialise from a decimal number (this example is Jinote for 3/4)
var jn = new Jinote("14/15")  // Can initialise from fraction specified as text
var jn2 = new Jinote(jn)      // Can initialise from another Jinote (equivalent to copying the Jinote)
var jn = new Jinote(peo)      // Can initialise from a Prime Exponent Object (Peo instance)
var jn = new Jinote(fraction) // Can initialise from a Fraction (fraction.js package)
var jn = new Jinote(object)   // Can initialise from an object similar to {2:3, 7:-1} for 8/7

// Constructors with algorithm
// Currently algorithm should be one of "DR" (default), "SAG" or "KG2"
var jn = new Jinote(139, alg)    // Can initialise from an integer using specified algorithm alg
var jn = new Jinote(14, 15, alg)
var jn = new Jinote(0.75, alg)
var jn = new Jinote("14/15", alg)
var jn2 = new Jinote(jn, alg)    // This is equivalent to copying the Jinote, but switching the algorithm
var jn = new Jinote(peo, alg)
var jn = new Jinote(fraction, alg)
var jn = new Jinote(object, alg)

// General methods
jn.copy()              // Return a deep copy of a Jinote
jn.getAlg()            // Return algorithm for the Jinote
jn.getBaseFreqHz()     // Returns the base frequency for Jinote on 1/1, defaults to 256 Hz
jn.getFreqHz()         // Returns the frequency of a specific Jinote, e.g. 320 for Jinote on 5/4
jn.getFreqText()       // Returns the frequency text of a specific Jinote, e.g. "320 Hz" for Jinote on 5/4
jn.getNotation()       // Equivalent to getPitch
jn.getPitch()          // Return a pitch notation for the Jinote, e.g. "E'4" for new Jinote(5/4)
jn.getPitchClass()     // Return a pitch class for the Jinote, e.g. "E'" for new Jinote(5/4). Octave information is discarded.
jn.getPeo()            // Returns the underlying Peo for this Jinote
jn.setBaseFreqHz(num)  // Sets the base frequency for a Jinote
jn.toString()          // Equivalent to getPitch

// Maths methods
jn.get1()              // Return a new identity Jinote (from any Jinote)
jn.mult(jn2)           // Returns new Jinote based on peo of jn multiplied by peo of jn2
jn.mult(jn2, pow)      // Same as previous, but jn2 is first raised to power 'pow'
jn.pow(pow)            // Return new Jinote based on its peo being raised to power 'pow'
```

## Examples

### getComma
``` js
getComma(5)               // returns (a Peo for) 80/81
getComma(7)               // returns 63/64
getComma(11)              // returns 33/32
getComma(11, "DR")        // returns 33/32
getComma(11, "SAG")       // returns 33/32
getComma(11, "KG2")       // returns 704/729
getComma(13)              // returns 26/27
getComma(59)              // returns 236/243
getComma(59, "DR")        // returns 236/243
getComma(59, "SAG")       // returns 531/512
getComma(59, "KG2")       // returns 236/243
getComma(139, "DR")       // returns 2224/2187
getComma(139, "SAG")      // returns 139/144
getComma(139, "KG2")      // returns 33777/32768
getComma(59051, "DR")     // returns 59051/59049
getComma(59051, "SAG")    // returns 531459/524288
getComma(59051, "KG2")    // returns 531459/524288
getComma(65537, "DR")     // returns 65537/65536
getComma(65537, "SAG")    // returns 65537/65536
getComma(65537, "KG2")    // returns 65537/65536
getComma(2499949, "DR")   // returns 2499949/2519424
getComma(2499949, "SAG")  // returns 67498623/67108864
getComma(2499949, "KG2")  // returns 67498623/67108864
```

### Jinote
``` js
// Simpler examples
(new Jinote(1)).getNotation()           // returns "C4"
(new Jinote(8)).getNotation()           // returns "C7"
(new Jinote(3, 2)).getNotation()        // returns "G4"
(new Jinote(6)).getNotation()           // returns "G6"
(new Jinote(7)).getNotation()           // returns "Bb[7]6"
(new Jinote(35/36)).getNotation()       // returns "C'[7]4"
(new Jinote(91, 90)).getNotation()      // returns "Db.[91]4", now 91 = 7*13 and commas with num & denom under 4 digits stay in this simple form
(new Jinote(1925, 247)).getNotation()   // returns "B''[77/247]6"
(new Jinote(1001, 1000)).getNotation()  // returns "Dbb...4 [7 11 13]" - more complex commas get moved to the end of the notation

// More complex examples
(new Jinote(65536)).getNotation()            // returns "C(o+20)" which is 16 octaves above "C4"
(new Jinote(1, 65536)).getNotation()         // returns "C(o-12)" which is 16 octaves below "C4"
(new Jinote(531441)).getNotation()           // returns "B#(o+22)" which is 12 perfect fifths and 12 octaves above "C4" (531441 = 3^12)
(new Jinote(1000001, 1000000)).getNotation() // returns "Cb(.6)4 [101 9901]" where 5-commas are gathered; (.6) is equivalent to ......

// More complex examples using object notation to specify (large) input integers
(new Jinote({2:19, 3:-12})).getNotation()       // returns "Dbb4" which is notation for a small comma
(new Jinote({3:665, 2:-1054})).getNotation()    // returns "C(#95)(o-5)" which is fact a tiny comma of around 0.076 cents. This has 95 sharps!
(new Jinote({2:66, 5:40, 7:-40, 11:20, 13:-30})).getNotation() // returns "E(#18)('40)4 [11^20 / 7^40 13^30]" which is in octave 4
```

These higher prime commas and notations are being made available to enable writing beautiful JI music that goes way outside the 12 notes of the standard scale. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/davidryan59/ryan-example-primenumberedblues) (which used the `"DR"` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/davidryan59/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
