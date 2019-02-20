# Just Intonation - Rational Comma Notation
JI-RCN, `ji-rcn` module. Find [module on npm](https://www.npmjs.com/package/ji-rcn) and [code repo with examples on GitHub](https://github.com/davidryan59/ji-rcn).

[![npm version](https://badge.fury.io/js/ji-rcn.png)](https://badge.fury.io/js/ji-rcn)[![Build status](https://travis-ci.org/davidryan59/ji-rcn.svg?master)](https://travis-ci.org/davidryan59)

**Just Intonation** (JI) tunes musical instruments to have whole number ratios between frequencies of different notes. This is the natural system of tuning for many important musical instruments, including the human voice, stringed instruments, and wind instruments. For such instruments, JI tuning sounds better than tempered tuning (e.g. the contemporary scale of splitting an octave into 12 equal semitones, which is 12TET).

JI can also be called Rational Intonation (RI) since it is based on rational numbers of the form `a/b`, or ratios of the form `a:b`, `a:b:c`, etc.
- Examples of intervals include: an octave (1:2), a perfect fifth (2:3), a perfect fourth (3:4), a major third (4:5)
- Examples of chords include: a major triad (4:5:6), a minor triad (10:12:15), an extended seventh chord (4:6:7:10)

The tempered tuning 12TET has only 12 notes in the octave. However, Just Intonation has an infinite number of notes in the octave. This both gives more musical variety, and poses a greater challenge to design a notation system that can cope with any possible interval and note in JI.

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. Algorithms tend to vary for higher primes. Three algorithms which are currently available are `'DR'`, `'SAG'`, and `'KG2'`; all three algorithms are described in the paper above.

The purpose of the `ji-rcn` npm package is to help convert between:
- A musical interval with a width/size expressed as a rational number
- Start and end points of the interval expressed as:
  - Notations from the RCN scheme
  - Frequencies in Hz

## Get started with JI-RCN
- To install, use `npm i ji-rcn`
- To test, `npm test`
- To run examples, `npm run examples` which are in the GitHub `examples` directory

## Contents of index
``` js
var ji = require('ji-rcn')
var JInterval = ji.JInterval        // The main JInterval class. Can also use ji.jinterval
var getComma = ji.getComma          // A function mapping primes to commas as Peo instances
var getCommaAlgs = ji.getCommaAlgs  // An object mapping acronym strings (DR, SAG, KG2) to algorithm functions
```

Note that the `JInterval` class is built upon the `Peo` class, which stands for 'Prime Exponent Object'. It allows exact representations of positive fractions with potentially large numerators and denominators, by splitting them up into prime components. An example is the fraction `45/28` which can be represented as `{2:-2, 3:2, 5:1, 7:-1}`. The Peo class wraps this object, providing it with methods such as object multiplication. Use `require('peo')` to access the `Peo` class.

## Constructors

### General constructors using objects
``` js
new JInterval({startPitchNotation:txt1, endPitchNotation:txt2})  // Create new interval from txt1 to txt2
new JInterval({startFreqHz:freq1, endFreqHz:freq2})  // Create new interval from freq1 to freq2 (numbers)
new JInterval({jint:otherJint})  // Create new interval based on another interval otherJint
new JInterval({peo:inputPeo})  // Create new interval based on an inputted peo
new JInterval({num:num, denom:denom})  // Create an interval based on integers num, denom, e.g. rational number num/denom
new JInterval({width:width})  // Create an interval of size width (numeric)
```

### Constructor object extra options
``` js
{alg: txt}                                    // Specify an comma algorithm by text acronym txt. Values include DR, SAG, KG2. Default is DR.
{alg: someFn}                                 // Specify a comma algorithm function directly. Function must return a Peo, given an inputted prime number p, and output peo must have highest prime p with exponent 1.
{alg: {txt: txt, fn: someFn}}                 // Both acronym and function can be specified together.
{tuning: {pitchNotation: txt1, freqHz: num1}} // Specifies that a notation txt1 maps to a frequency in Hz num1. Default is notation C4 maps to 256 Hz.
```

### Shorthand constructors
``` js
new JInterval(otherJint)        // Create new JInterval with same width as otherJint
new JInterval(peo)              // Create new interval with width described by a Peo instance
new JInterval(num, denom)       // Create new interval with fractional width num/denom from two integers num, denom
new JInterval(integer)          // Create new interval with integer width
new JInterval(decimal)          // Create new interval with fractional width - the decimal value is automatically converted into a suitable fraction.
new JInterval(numericString)    // Create new interval with integer or fractional width, from converting numericString into a number
new JInterval({p1:e1,p2:e2...}) // Create new interval with fractional width specified as prime factors and exponents in an object
new JInterval()                 // Create new unison interval with width 1/1
```

JIntervals store their interval width as a Peo, which give exact representations of positive integers and fractions. Any width used in the constructor gets converted into a suitable Peo.

All of the shorthand versions above can have an extra argument to specify an algorithm, which may be given in any of the three formats in the previous section, e.g. `new JInterval(width, algAcronym)` etc.

## JInterval API - Static or Class methods
``` js
JInterval.getComma(p)             // Calculate a Peo which represents the prime comma for p under default algorithm (DR)
JInterval.getComma(p, algAcronym) // Use a text acronym (SAG, KG2) to access alternative comma functions
JInterval.getComma(p, algFn)      // Calculate comma using a specified function that inputs a prime p and outputs a Peo with highest prime p, exponent of 1.
JInterval.getCommaAlgs            // Returns an object which maps algorithm acronyms to algorithm functions.
```

## JInterval API - Instance Methods

### General
``` js
// General methods
jint.compress()  // Remove anything on a JInterval that is cached, including absolute position and the peo cache
jint.copy()      // Returns a deep copy of a JInterval
jint.toString()  // Returns a text description of JInterval
```

### Interval Width (Relative Position, Relative Size)
``` js
jint.width()             // Returns a positive number representing the width or relative size of a JInterval
jint.widthFractionText() // Returns the interval width as a fraction, in string format 'NN/NN'
jint.widthPeo()          // Returns the interval width as a Peo - this is a copy of the underlying Peo of the JInterval
```

### Absolute Position
Absolute position means a JInterval starts at a certain frequency or notation, and ends at another frequency or notation. Since every JInterval has a tuning, by specifying either a start frequency or a start notation, the whole of the Absolute Position will be reset. In the functions below, `startFreqHz` and `startNotation` are optional, and default to either the previous value or the default value (`'C4'`, `256` Hz). Recalculation is minimised by caching values after they have been calculated.
``` js
jint.getEndFreqHz(startFreqHz)               // Returns numeric end frequency in Hz
jint.getEndFreqText(startFreqHz)             // Returns formatted string 'NNN.NN Hz' for end frequency
jint.getEndPitchNotation(startNotation)      // Returns pitch notation for end of interval in standard notation
jint.getEndPitchInputNotation(startNotation) // Returns pitch notation for end of interval, as inputted
jint.getEndPitchClassNotation(startNotation) // Returns pitch class of end of interval - pitch class is a notation without an octave value
jint.getStartFreqHz()                        // Returns numeric start frequency in Hz
jint.getStartFreqText()                      // Returns formatted string 'NNN.NN Hz' for start frequency
jint.getStartPitchNotation()                 // Returns pitch notation for start of interval in standard notation
jint.getStartPitchInputNotation()            // Returns pitch notation for start of interval, as inputted
jint.getStartPitchClassNotation()            // Returns pitch class of start of interval
jint.hasPos()                                // Returns boolean value - true if an absolute position has been calculated, false otherwise
```

### Maths
Create new JIntervals using mathematical operations on existing JIntervals. (Any extra constructor options will be taken from `jint`.)
``` js
jint.get1()              // Returns a new JInterval with unison interval of 1/1
jint.mult(jint2)         // Returns a new JInterval formed by multiplying widths of jint and jint2
jint.mult(jint2, pow)    // Returns a new JInterval formed by multiplying widths of jint and jint2^pow
jint.pow(pow)            // Returns a new JInterval with width of jint raised to power pow
```

### Algorithm
Algorithm can only be specified on JInterval construction. Default algorithm is `'DR'`.
``` js
jint.getAlgText()        // Returns text acronym for algorithm, if it has been specified. Both default algorithm and custom algorithm functions return empty string.
jint.getAlgFn()          // Returns the algorithm function which takes in a prime and outputs a comma Peo instance.
jint.getAlgSetupObject() // Returns an object representing setup of algorithm
jint.hasAlg()            // Returns boolean value - false for default comma algorithm, true otherwise
```

### Tuning
Tuning can only be specified on JInterval construction. Default tuning is `{pitchNotation: 'C4', freqHz: 256}`.
``` js
jint.getTuningFreqHz()             // Tuning frequency, in Hz
jint.getTuningInputPitchNotation() // Tuning notation, as input
jint.getTuningPitchNotation()      // Tuning notation, in standard format
jint.getTuningMultHz()             // Multiplier representing Hz for notation 'C4'
jint.getTuningSetupObject()        // Returns an object representing setup of tuning
jint.hasTuning()                   // Returns boolean value - false for default tuning, true otherwise
```

## Examples
Also see the examples directory on GitHub, use `npm run examples`.

### getComma
``` js
var ji = require('ji-rcn')
var getComma = ji.getComma
getComma(5)                // returns (a Peo for) 80/81
getComma(7)                // returns 63/64
getComma(11)               // returns 33/32
getComma(11, 'DR')         // returns 33/32
getComma(11, 'SAG')        // returns 33/32
getComma(11, 'KG2')        // returns 704/729
getComma(11,p=>new Peo(p)) // returns 11/1 using a custom algorithm which maps each prime to a Peo on that prime
getComma(13)               // returns 26/27
getComma(59)               // returns 236/243
getComma(59, 'DR')         // returns 236/243
getComma(59, 'SAG')        // returns 531/512
getComma(59, 'KG2')        // returns 236/243
getComma(139, 'DR')        // returns 2224/2187
getComma(139, 'SAG')       // returns 139/144
getComma(139, 'KG2')       // returns 33777/32768
getComma(139, p => new Peo(p/2)) // returns 139/2 using a custom algorithm
getComma(59051, 'DR')      // returns 59051/59049
getComma(59051, 'SAG')     // returns 531459/524288
getComma(59051, 'KG2')     // returns 531459/524288
getComma(65537, 'DR')      // returns 65537/65536
getComma(65537, 'SAG')     // returns 65537/65536
getComma(65537, 'KG2')     // returns 65537/65536
getComma(2499949, 'DR')    // returns 2499949/2519424
getComma(2499949, 'SAG')   // returns 67498623/67108864
getComma(2499949, 'KG2')   // returns 67498623/67108864
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

These higher prime commas and notations are being made available to enable writing beautiful JI music that goes way outside the 12 notes of the standard scale. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/davidryan59/ryan-example-primenumberedblues) (which used the `'DR'` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/davidryan59/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
