# Just Intonation - Rational Comma Notation
JI-RCN, `ji-rcn` module. Find [module on npm](https://www.npmjs.com/package/ji-rcn) and [code repo with examples on GitHub](https://github.com/davidryan59/ji-rcn).

[![npm version](https://badge.fury.io/js/ji-rcn.png)](https://badge.fury.io/js/ji-rcn)[![Build status](https://travis-ci.org/davidryan59/ji-rcn.svg?master)](https://travis-ci.org/davidryan59)

**Just Intonation** (JI) tunes musical instruments to have whole number frequency ratios between notes. This is the natural system of tuning for many important musical instruments, including the human voice, stringed instruments, and wind instruments. For such instruments, JI tuning sounds better than tempered tuning. A common example of tempered tuning is 12TET (12 tone equal temperament) which splits the octave into 12 equal semitones.

JI can also be called Rational Intonation (RI) since its interval ratios are rational numbers of the form `a/b`, or equivalently simple ratios of the form `a:b`. In JI chords with three or more notes make complex ratios of the form `a:b:c`, `a:b:c:d`, etc.
- Examples of intervals include: an octave (1:2), a perfect fifth (2:3), a perfect fourth (3:4), a major third (4:5)
- Examples of chords include: a major triad (4:5:6), a minor triad (10:12:15), an extended seventh chord (4:6:7:10)

The tempered tuning 12TET has only 12 notes in the octave. However, Just Intonation has an unlimited number of notes available in the octave. This gives more musical variety, but it poses a greater notational challenge. The whole of 12TET can be notated with less than 100 notations of the form `'C4'`, `'Bb7'`, `'E0'`, etc. However, how is it possible to notate the whole of JI, where there are a potentially infinite number of different notes and chords?

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. The primes used in the comma for `p` are usually `2`, `3` and `p` only (since limiting commas to these three prime components reduces computational complexity). Even with that constraint, algorithms tend to vary for higher primes. Three algorithms which have been developed are: `'DR'`, `'SAG'`, and `'KG2'`; these are each described in the paper above.

The purpose of the `ji-rcn` npm package is to help convert between:
- A musical interval with a frequency ratio expressed as a rational number
- Start and end points of the interval expressed as:
  - Notations from an RCN scheme
  - Frequencies in Hz

## Get started with JI-RCN
- `npm i ji-rcn` to install
- `npm test` to run all tests
- `npm run examples` to run examples, which can be found in the GitHub `examples` directory

## Contents of index
``` js
var ji = require('ji-rcn')
var JInterval = ji.JInterval        // The main JInterval class. Can also use ji.jinterval
var getComma = ji.getComma          // A function mapping primes to commas as Peo instances
var getCommaAlgs = ji.getCommaAlgs  // An object mapping acronym strings (DR, SAG, KG2) to algorithm functions
```

Note that the `JInterval` class is built upon the `Peo` class, which stands for 'Prime Exponent Object'. `Peo` allows exact representations of positive fractions with potentially large numerators and denominators. This is achieved by splitting both numerator and denominator into prime components, and keeping track of exponents of each prime separately using a JSON object. An example is the fraction `45/28` which can be represented as `{2:-2, 3:2, 5:1, 7:-1}`. The Peo class wraps this object, and provides it with a suitable set of methods, including multiplication. Use `require('peo')` to access the `Peo` class.

## Constructors for JInterval

### General constructors using objects
``` js
new JInterval({startPitchNotation:txt1, endPitchNotation:txt2}) // Create a new JInterval between two (RCN) notations txt1 and txt2
new JInterval({startFreqHz:freq1, endFreqHz:freq2})             // Create interval between two numeric frequencies freq1 and freq2 in Hz
new JInterval({jint:otherJint})                                 // Create interval using same interval ratio as otherJint
new JInterval({peo:peo})                                        // Create interval with ratio peo
new JInterval({num:num, denom:denom})                           // Create interval with ratio num/denom, where num, denom are positive integers
new JInterval({ratio:ratio})                                    // Create interval of size ratio (any positive number)
```

### Constructor object extra options
``` js
{alg: txt}                                    // Specify an comma algorithm by text acronym txt. Values include DR, SAG, KG2. Default is DR.
{alg: someFn}                                 // Specify a comma algorithm function directly. Function must return a Peo, given an inputted prime number p, and output peo must have highest prime p with exponent 1.
{alg: {txt: txt, fn: someFn}}                 // Both acronym and function can be specified together.
{tuning: {pitchNotation: txt1, freqHz: num1}} // Specifies that a notation txt1 maps to a frequency in Hz num1. Default is notation C4 maps to 256 Hz.
```

Add any options to the object, then pass into `new JInterval({...})`.

### Shorthand constructors
``` js
new JInterval(otherJint)        // Create a new JInterval with same ratio as otherJint
new JInterval(peo)              // Create interval with ratio peo
new JInterval(num, denom)       // Create interval with ratio num/denom, where num, denom are positive integers
new JInterval(integer)          // Create interval with integer ratio
new JInterval(decimal)          // Create interval with fractional ratio - the decimal value is automatically converted into a suitable fraction.
new JInterval(numericString)    // Create interval with integer or fractional ratio, from converting numericString into a number
new JInterval({p1:e1,p2:e2...}) // Create interval with fractional ratio specified as prime factors and exponents in an object
new JInterval()                 // Create unison interval with ratio 1/1
```

A `JInterval` instance stores its interval frequency ratio internally as a `Peo`, for exact representations of positive integers and fractions. All the different ratio formats available in the constructor will get converted into a suitable `Peo`.

The shorthand constructors above can have an extra argument to specify an algorithm, which may be given as a string acronym, a function, or an object combining these (as described above), e.g. `new JInterval(peo, algAcronym)`, `new JInterval(num, denom, algFn)` etc.

## JInterval API - Static or Class methods
``` js
JInterval.getComma     // Returns the getComma function, which calculates a comma in Peo format for each prime p. Uses either default or specified algorithm.
JInterval.getCommaAlgs // Returns an object which maps algorithm acronyms to algorithm functions, e.g. maps 'SAG' to the SAG comma algorithm function.
```

Examples for using `getComma` are given below. Format is either `getComma(p)` or `getComma(p, alg)`, which both return a `Peo`.

## JInterval API - Instance Methods

### General
``` js
// General methods
jint.compress()       // Remove all cached information on a JInterval. This includes: absolute position, cache on peo.
jint.copy()           // Returns a deep copy of a JInterval
jint.toString()       // Returns a text description of JInterval
jint.getSetupObject() // Returns an object describing the setup options of JInterval
```

### Interval Frequency Ratio

(Also known as interval width, size, relative position)

``` js
jint.ratio()             // Returns a positive number representing the frequency ratio or relative size of a JInterval
jint.ratioFractionText() // Returns the interval frequency ratio as a fraction in string format 'NN/NN'
jint.ratioPeo()          // Returns the Peo instance describing ratio of this JInterval.
                         // Returns the original Peo, not a copy, so can call jint.ratioPeo().someFunctionOnPeo()
                         // to access cached values on Peo, which are all calculated on the first call.
```

### Absolute Position

Every `JInterval` has a interval frequency ratio, its relative size. It is possible to add an absolute position, either by constructing using notations or frequencies, or by using the functions below. The absolute value, especially the frequency in Hz, is likely to be useful when using this `ji-rcn` module to create music apps featuring Just Intonation.

Absolute position means a `JInterval` starts at a certain frequency or notation, and ends at another frequency or notation. Since every `JInterval` has a tuning, by specifying either a start frequency or a start notation, the whole of the absolute position can be calculated. Each `JInterval` caches the last absolute position calculated, and reuses cached values if possible. Changing the start notation or frequency will recalculate absolute position and overwrite this cache.

In the functions below, `startFreqHz` and `startNotation` are optional, and default to either the previous value or the default value (`256` Hz and `'C4'` respectively).

``` js
jint.getEndFreqHz(startFreqHz)               // Returns numeric end frequency in Hz
jint.getEndFreqText(startFreqHz)             // Returns formatted string 'NNN.NN Hz' for end frequency
jint.getEndInputPitchNotation(startNotation) // Returns pitch notation for end of interval, as inputted
jint.getEndPitchNotation(startNotation)      // Returns pitch notation for end of interval in standard notation
jint.getEndPitchClassNotation(startNotation) // Returns pitch class of end of interval - pitch class is a notation without an octave value
jint.getStartFreqHz()                        // Returns numeric start frequency in Hz
jint.getStartFreqText()                      // Returns formatted string 'NNN.NN Hz' for start frequency
jint.getStartInputPitchNotation()            // Returns pitch notation for start of interval, as inputted
jint.getStartPitchNotation()                 // Returns pitch notation for start of interval in standard notation
jint.getStartPitchClassNotation()            // Returns pitch class of start of interval
jint.hasPos()                                // Returns boolean value: true if an absolute position has been calculated, false otherwise
```

### Maths

Create a new `JInterval` using mathematical operations on existing intervals. Any extra constructor options will be taken from `jint`.

``` js
jint.get1()              // Returns a new JInterval with unison interval of 1/1
jint.mult(jint2)         // Returns a new JInterval formed by multiplying ratios of jint and jint2
jint.mult(jint2, pow)    // Returns a new JInterval formed by multiplying ratios of jint and jint2^pow
jint.pow(pow)            // Returns a new JInterval with ratio of jint raised to power pow
```

### Algorithm

An algorithm can be specified on a `JInterval` during construction. Default algorithm is `{txt: 'DR', fn: getCommaDR}` where `getCommaDR(p)` is equivalent to `getComma(p)` or `getComma(p, 'DR')`.

``` js
jint.getAlgText()        // Returns text acronym for algorithm, or blank for default algorithm. (Custom algorithms supplied without a text acronym also return blank here.)
jint.getAlgFn()          // Returns the algorithm function which takes in a prime and outputs a comma in Peo format
jint.getSetupAlgObject() // Returns an object representing algorithm setup
jint.hasAlg()            // Returns boolean value: false for default comma algorithm, true otherwise
```

### Tuning

A tuning can be specified on a `JInterval` during construction. Default tuning is `{pitchNotation: 'C4', freqHz: 256}`.

``` js
jint.getTuningFreqHz()             // Tuning frequency, in Hz
jint.getTuningInputPitchNotation() // Tuning notation, as input
jint.getTuningPitchNotation()      // Tuning notation, in standard format
jint.getTuningMultHz()             // Multiplier representing frequency in  Hz for notation 'C4'
jint.getSetupTuningObject()        // Returns an object representing tuning setup
jint.hasTuning()                   // Returns boolean value: false for default tuning, true otherwise
```

## Examples

There are many more examples in the examples directory on GitHub. You can run these using `npm run examples`.

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

### JInterval - general
``` js
(new JInterval(3/2)).ratio()                   // returns 1.5
(new JInterval(3/2)).ratioFractionText()       // returns '3/2'
(new JInterval(3/2)).ratioPeo()                // returns a Peo on {2:-1, 3:1}
(new JInterval(5/4)).mult(new JInterval(6/5))  // returns a JInterval with ratio 5/4 x 6/5 = 6/4 = 3/2 = 1.5
(new JInterval(5/4)).pow(3)                    // returns a JInterval with ratio 125/64
```

### JInterval - frequency
``` js
(new JInterval()).getEndFreqHz()       // returns 256
(new JInterval()).getEndFreqText()     // returns '256.00 Hz'
(new JInterval(5/4)).getEndFreqText()  // returns '320.00 Hz'
```

### JInterval - notation
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

## Epilogue

These higher prime commas and notations are being made available to enable writing beautiful JI music that goes way outside the 12 notes of the standard scale. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/davidryan59/ryan-example-primenumberedblues) (which used the `'DR'` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/davidryan59/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
