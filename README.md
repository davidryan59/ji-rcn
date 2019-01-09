# Just Intonation - Rational Comma Notation
JI-RCN, `ji-rcn` module. Find [module on npm](https://www.npmjs.com/package/ji-rcn) and [code repo with examples on GitHub](https://github.com/davidryan59/ji-rcn).

[![npm version](https://badge.fury.io/js/ji-rcn.png)](https://badge.fury.io/js/ji-rcn)

**Just Intonation** (JI) is a system of musical tuning where intervals and chords can be expressed as ratios between whole numbers. It is also called Rational Intonation (RI) since it is based on rational numbers of the form `a/b`, or ratios of the form `a:b`, `a:b:c`, etc.
- Examples of intervals include: an octave (1:2), a perfect fifth (2:3), a perfect fourth (3:4), a major third (4:5)
- Examples of chords include: a major triad (4:5:6), a minor triad (10:12:15), an extended seventh chord (4:6:7:10)

One good reason to use Just Intonation is that it is the natural system of tuning for harmonic instruments such as stringed instruments, wind instruments, and the human voice itself.

The contemporary scale of 12-tone equal temperament (12TET) has only 12 notes in the octave. However, Just Intonation has a infinite number of notes in the octave. This makes it trickier to design a notation system that can cope with any possible interval and note in JI.

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. Algorithms tend to vary for higher primes. Three algorithms which are currently available are `"DR"`, `"SAG"`, and `"KG2"`; all three algorithms are described in the paper above.

The purpose of the `ji-rcn` npm package is to help convert between:
- An interval expressed as a single rational number
- Start and end points of the interval expressed as:
  - Notations from the RCN scheme
  - Frequencies in Hz

Currently the API contains two items: a class `JInterval` which automates all the RCN calculations, and a function `getComma` which provides direct access to the calculation of prime commas for each prime and algorithm.

There is a full test suite using Mocha (`mocha`) for testing and Istanbul (`nyc`) for coverage. Currently all tests pass and coverage is 100%.


## Install
`npm install ji-rcn`  

## Test
`npm test`  
`npm run examples`  

## API
``` js
var ji = require('ji-rcn')

var JInterval = ji.JInterval       // ji.jinterval also works
var getComma = ji.getComma

// getComma
getComma(p)          // Calculate a comma (in Peo format) for prime p under default ("DR") algorithm
getComma(p, alg)     // Calculate a comma for prime p under other algorithm, e.g. "SAG", "KG2"

// JInterval class

// Class methods
JInterval.getComma(p, alg)       // getComma is also provided as class method for JInterval

// Constructors
var jint = new JInterval()         // Can initialise with no args. JInterval for 1/1
var jint = new JInterval(7)        // Can initialise from an integer. JInterval for 7/1
var jint = new JInterval(14, 15)   // Can initialise from fraction specified as integers. JInterval for 14/15
var jint = new JInterval(0.75)     // Can initialise from a decimal number (this example is JInterval for 3/4)
var jint = new JInterval("14/15")  // Can initialise from fraction in text format
var jint2 = new JInterval(jint)    // Can initialise from another JInterval (equivalent to copying the JInterval)
var jint = new JInterval(peo)      // Can initialise from a Prime Exponent Object (Peo instance)
var jint = new JInterval(jint2)    // Can initialise from another JInterval
var jint = new JInterval(object)   // Can initialise from an object similar to {2:3, 7:-1} for 8/7

// Constructors with algorithm
// Currently algorithm should be one of "DR" (default), "SAG" or "KG2"
var jint = new JInterval(139, alg)    // Can initialise from an integer using specified algorithm alg
var jint = new JInterval(14, 15, alg)
var jint = new JInterval(0.75, alg)
var jint = new JInterval("14/15", alg)
var jint2 = new JInterval(jint, alg)    // This is equivalent to copying the JInterval, but switching the algorithm
var jint = new JInterval(peo, alg)
var jint = new JInterval(object, alg)

// Frequency calculations
jint.getEndFreqHz(startFreqHz) // Given positive number startFreqHz, calculate the end frequency of this interval
jint.getEndFreqHz()      // If startFreqHz omitted, use either previously supplied value or global default (256 Hz)
jint.getEndFreqText()    // Return text description of end frequency in format like "300 Hz" (integer) or "123.45 Hz" (decimal)
jint.getStartFreqHz()    // Return previous or default start frequency
jint.getStartFreqText()  // Return text description of start frequency

// General methods
jint.copy()              // Return a deep copy of a JInterval
jint.getPeo()            // Returns the underlying Peo for this JInterval
jint.toDecimal()         // Return a positive number representing relative frequency of JInterval
jint.toFractionText()    // Returns a text representation of fraction for this JInterval
jint.toString()          // Returns text description of JInterval

// Maths methods
jint.get1()              // Return a new identity JInterval (from any JInterval)
jint.mult(jint2)         // Returns new JInterval based on peo of jint multiplied by peo of jint2
jint.mult(jint2, pow)    // Same as previous, but jint2 is first raised to power 'pow'
jint.pow(pow)            // Return new JInterval based on its peo being raised to power 'pow'

// Notation methods
jint.getAlg()            // Return algorithm for the JInterval
jint.getEndPitchNotation(startPitchNotation) // If this interval starts at inputted notation, calculate the end notation
jint.getEndPitchNotation()        // Calculate end notation based on default or previous start notation
jint.getEndPitchClassNotation()   // Return the end notation, minus its octave information
jint.getStartPitchNotation()      // Return previous starting pitch notation (parsed, standard format), or default
jint.getStartPitchInputNotation() // Return previous starting pitch notation (as input), or default
jint.getStartPitchClassNotation() // Return the start notation, minus its octave information
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

### JInterval
``` js
// Simpler examples
(new JInterval(1)).getEndPitchNotation()           // returns "C4"
(new JInterval(8)).getEndPitchNotation()           // returns "C7"
(new JInterval(3, 2)).getEndPitchNotation()        // returns "G4"
(new JInterval(6)).getEndPitchNotation()           // returns "G6"
(new JInterval(7)).getEndPitchNotation()           // returns "Bb[7]6"
(new JInterval(35/36)).getEndPitchNotation()       // returns "C'[7]4"
(new JInterval(91, 90)).getEndPitchNotation()      // returns "Db.[91]4", now 91 = 7*13 and commas with num & denom under 4 digits stay in this simple form
(new JInterval(1925, 247)).getEndPitchNotation()   // returns "B''[77/247]6"
(new JInterval(1001, 1000)).getEndPitchNotation()  // returns "Dbb...4 [7 11 13]" - more complex commas get moved to the end of the notation

// More complex examples
(new JInterval(65536)).getEndPitchNotation()            // returns "C(o+20)" which is 16 octaves above "C4"
(new JInterval(1, 65536)).getEndPitchNotation()         // returns "C(o-12)" which is 16 octaves below "C4"
(new JInterval(531441)).getEndPitchNotation()           // returns "B#(o+22)" which is 12 perfect fifths and 12 octaves above "C4" (531441 = 3^12)
(new JInterval(1000001, 1000000)).getEndPitchNotation() // returns "Cb(.6)4 [101 9901]" where 5-commas are gathered; (.6) is equivalent to ......

// More complex examples using object notation to specify (large) input integers
(new JInterval({2:19, 3:-12})).getEndPitchNotation()       // returns "Dbb4" which is notation for a small comma
(new JInterval({3:665, 2:-1054})).getEndPitchNotation()    // returns "C(#95)(o-5)" which is fact a tiny comma of around 0.076 cents. This has 95 sharps!
(new JInterval({2:66, 5:40, 7:-40, 11:20, 13:-30})).getEndPitchNotation() // returns "E(#18)('40)4 [11^20 / 7^40 13^30]" which is in octave 4
```

These higher prime commas and notations are being made available to enable writing beautiful JI music that goes way outside the 12 notes of the standard scale. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/davidryan59/ryan-example-primenumberedblues) (which used the `"DR"` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/davidryan59/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
