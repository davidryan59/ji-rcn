# Just Intonation - Rational Comma Notation
JI-RCN, `ji-rcn` module. Find [module on npm](https://www.npmjs.com/package/ji-rcn) and [code repo with examples on GitHub](https://github.com/davidryan59/ji-rcn).

[![npm version](https://badge.fury.io/js/ji-rcn.png)](https://badge.fury.io/js/ji-rcn)[![Build status](https://travis-ci.org/davidryan59/ji-rcn.svg?master)](https://travis-ci.org/davidryan59)

**Just Intonation** (JI) tunes musical instruments to have whole number frequency ratios between notes. This is the natural system of tuning for many important musical instruments, including the human voice, stringed instruments, and wind instruments. For such instruments, JI tuning sounds better, more natural, more 'in tune' than tempered tuning. A common example of tempered tuning is 12TET (12 tone equal temperament) which splits the octave into 12 equal semitones; this is the default modern tuning, used for many instruments such as pianos, but noticeably out of tune from pure JI intervals.

JI can also be called Rational Intonation (RI) since its interval ratios are rational numbers of the form `a/b`, or equivalently simple ratios of the form `a:b`. In JI chords with three or more notes make complex ratios of the form `a:b:c`, `a:b:c:d`, etc.
- Examples of intervals include: an octave (1:2), a perfect fifth (2:3), a perfect fourth (3:4), a major third (4:5)
- Examples of chords include: a major triad (4:5:6), a minor triad (10:12:15), an extended seventh chord (4:6:7:10)

The tempered tuning 12TET has only 12 notes in the octave. However, Just Intonation has an unlimited number of notes available in the octave. This gives more musical variety, but it poses a greater notational challenge. The whole of 12TET can be notated with less than 100 notations of the form `C4`, `Bb7`, `E0`, etc. However, how is it possible to notate the whole of JI, where there are a potentially infinite number of different notes and chords?

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. The primes used in the comma for `p` are usually `2`, `3` and `p` only (since limiting commas to these three prime components reduces computational complexity). Even with that constraint, algorithms tend to vary for higher primes. Three algorithms which have been developed are: `DR`, `SAG`, and `KG2`; these are each described in the paper above.

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

Two types of constructors are available: shorthand constructors taking parameters in separate arguments, and the general constructor which takes all parameters inside one argument which is an object:

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

### General constructors using objects
``` js
new JInterval({startPitchNotation:txt1, endPitchNotation:txt2}) // Create a new JInterval between two (RCN) notations txt1 and txt2
new JInterval({startFreqHz:freq1, endFreqHz:freq2})             // Create interval between two numeric frequencies freq1 and freq2 in Hz
new JInterval({jint:otherJint})                                 // Create interval using same interval ratio as otherJint
new JInterval({peo:peo})                                        // Create interval with ratio peo
new JInterval({num:num, denom:denom})                           // Create interval with ratio num/denom, where num, denom are positive integers
new JInterval({ratio:ratio})                                    // Create interval of size ratio (any positive number)
```

### Extra options inside constructor object
``` js
{alg: txt}                                    // Specify an comma algorithm by text acronym txt. Values include DR, SAG, KG2. Default is DR.
{alg: someFn}                                 // Specify a comma algorithm function directly. Function must return a Peo, given an inputted prime number p, and output peo must have highest prime p with exponent 1.
{alg: {txt: txt, fn: someFn}}                 // Both acronym and function can be specified together.
{tuning: {pitchNotation: txt1, freqHz: num1}} // Specifies that a notation txt1 maps to a frequency in Hz num1. Default is notation C4 maps to 256 Hz.
{display: {...options}}                       // Specify display options for notation, if varying from defaults
```

Example of using an extra option: `var jint = new JInterval({ratio: 7/3, alg: 'SAG'})`.

For `display` above, you need a sub-object with any or all of these options set:

|Option|Format|Default|Description|
|-|-|-|-|
|hide5|boolean|false|Syntonic comma 80/81 displayed as ' if false or [5] if true. Inverse syntonic comma 81/80 displayed as . if false or [1/5] if true.|
|lev12|positive integer|undefined|Pythagorean comma 531441/524288 = 3^12/2^19 (23.46 cents) displayed as p, its inverse as d, if this option is set with a positive integer. The integer is the minimum 3-exponent which gets p or d in its notation. Default (undefined) is to not use p or d notation.|
|lev53|positive integer|undefined|Mercator comma 3^53/2^84 (3.615 cents) displayed as m, its inverse as w|
|lev665|positive integer|undefined|Small comma 3^665/2^1054 (0.07558 cents) displayed as s, its inverse as r|
|lev190537|positive integer|undefined|Tiny comma 3^190537/2^301994 (0.0001117 cents) displayed as t, its inverse as y|
|comMax|positive integer|1000|Max number in comma that displays as-is, without factorisation. For example, [1001] is displayed as [7 11 13] if comMax is set lower than 1001. To fully factorise every comma, set comMax to 1.|
|reps|positive integer|4|Max times a character is repeated, without using bracket notation. For example, #### and (#5) are default notations for 4 and 5 sharps respectively.|

Another example of using general constructor, including display options:

``` js
var ji = new JInterval({
  num: 6,
  denom: 5,
  alg: 'SAG',
  tuning: {
    pitchNotation: 'G4',
    freqHz: 385
  },
  display: {
    hide5: true, 
    lev53: 40, 
    comMax: 360
  }
})
```

## JInterval API - Static or Class methods
``` js
JInterval.getComma     // Returns the getComma function, which calculates a comma in Peo format for each prime p. Uses either default or specified algorithm.
JInterval.getCommaAlgs // Returns an object which maps algorithm acronyms to algorithm functions, e.g. maps 'SAG' to the SAG comma algorithm function.
```

Some examples of using `getComma` are given below. Format is either `getComma(p)` or `getComma(p, alg)`, which both return a `Peo`; alg can be a valid text acronym or a function.

## JInterval API - Instance Methods

### General
``` js
// General methods
jint.compress()       // Remove all cached information on a JInterval. This includes: absolute position, cache on peo.
jint.copy()           // Returns a deep copy of a JInterval
jint.toString()       // Returns a text description of a JInterval
jint.getSetupObject() // Returns an object describing the setup options of JInterval: algorithm, tuning, display options.
```

### Interval Frequency Ratio

(Also known as interval width, size, relative size, relative position)

``` js
jint.ratioPeo()          // Returns the Peo instance describing ratio of this JInterval.
                         // Returns the original Peo, not a copy, so can call jint.ratioPeo().someFunctionOnPeo()
                         // to access cached values on Peo, which are all calculated on the first call.

jint.ratio()             // Returns a positive number representing the frequency ratio or relative size of a JInterval
                         // Shortcut for jint.ratioPeo().getAsDecimal()

jint.ratioFractionText() // Returns the interval frequency ratio as a fraction in string format 'NN/NN'
                         // Shortcut for jint.ratioPeo().getAsFractionText()
```

### Absolute Position

Every `JInterval` has a relative size, which a rational number describing the interval's frequency ratio; this is stored as a `Peo`. Each `JInterval` may also store a cache of its absolute position, including start and end frequencies in Hz, and start and end notations in RCN. Each `JInterval` uses either the default tuning `{pitchNotation: 'C4', freqHz: 256}` or a custom tuning, to convert between frequency and notation. The tuning allows calculating frequency from notation, and notation from frequency.

The set of functions below generate frequency and notation for absolute position. Since parsing notation is slow, and generating notation may be slow, for efficiency the last generated values are cached. When calling the functions below, they return the cached value if it is still available. Any change to the `JInterval` which might change the absolute position should thus wipe the cache.

``` js
jint.hasPos()    // Return true if cached values are available, false otherwise

jint.setStartFreqHz(startFreqHz)          // Calculate absolute position based on a start frequency in Hz (and the current tuning)
jint.setStartPitchNotation(startNotation) // Calculate based on a starting notation

jint.getStartFreqHz()             // Return the start frequency in Hz (and recalculate if necessary, same for functions below)
jint.getStartFreqText()           // Return the start frequency as text, e.g. `256.00 Hz`
jint.getStartInputPitchNotation() // Return the start notation, as previously input
jint.getStartPitchNotation()      // Return the start notation, after checking (e.g. parse and recalculate)
jint.getStartPitchClassNotation() // Return the start pitch class notation, which is the notation minus octave information

jint.getEndFreqHz()             // Return the end frequency in Hz. (Start frequency is either from the cache, or the default value of 256 Hz.)
jint.getEndFreqText()           // Return the end frequency in text format, e.g. '384.00 Hz'
jint.getEndInputPitchNotation() // Return the end notation, as previously input (e.g. when initialising a JInterval from two notations)
jint.getEndPitchNotation()      // Return the end notation, after checking
jint.getEndPitchClassNotation() // Return the end pitch class notation

// These five functions are also available with a parameter specifying the start frequency or notation,
// and if the start value has changed, the cache will recalculate.
jint.getEndFreqHz(startFreqHz)
jint.getEndFreqText(startFreqHz)
jint.getEndInputPitchNotation(startNotation)
jint.getEndPitchNotation(startNotation)
jint.getEndPitchClassNotation(startNotation)
```

Parsing notation is slow. In the situation where you have many instances of `JInterval` with 1) the same setup options (in particular, tuning), and 2) the same start notation; there is a more efficient method to recalculate the absolute position:

```js
var jint = new JInterval(1)        // Use a single JInterval...
jint.setStartPitchNotation('B#6')  // ...to parse the shared start notation
var peo = jint.getStartPeo()       // Obtain internal format from output of parsing

// Suppose there are now lots of otherPeo with shared startNotation,
// do this for each otherPeo:
otherPeo.setStartPeo(peo)
```

Here are the relevant API calls:

``` js
jint.getStartPeo()    // Get internal format for start of JInterval
jint.getEndPeo()      // Get internal format for end of JInterval
jint.getEndPeo(peo)   // Get internal format for end of JInterval (changing the start value)

jint.setStartPeo(peo) // Set start of JInterval using internal format (obtained from getStartPeo)
```

For this internal format, `C4` is represented by `1/1`, so with `jint.setStartPeo(new Peo(1/1))` you are working in the key of C. However the other API calls allow you to work in any key signature, e.g. with `jint.getEndNotation('G4')` you are working in the key of G. Afterwards you can use `var peoG = jint.getStartPeo()` and then `jint2.setStartPeo(peoG)` to continue working in the key of G.

### Maths

Create a new `JInterval` using mathematical operations on existing intervals. Can be used to quickly generate new JIntervals with same setup as `jint`:

``` js
jint.get1()            // Returns a new JInterval with unison interval of 1/1
jint.mult(jint2)       // Returns a new JInterval formed by multiplying ratios of jint and jint2
jint.mult(jint2, pow)  // Returns a new JInterval formed by multiplying ratios of jint and jint2^pow
jint.pow(pow)          // Returns a new JInterval with ratio of jint raised to power pow
```

### Algorithm

An algorithm can be specified on a `JInterval` during construction, or later on. In `ji-rcn`, the default algorithm has text acronym `DR`, and has an associated (internal) comma function `getCommaDR`. The format for specifying an algorithm as an object is `{txt: txt, fn: getCommaFn}`, and this format can be obtained from a `JInterval` using `getSetupAlgObject`. If `txt` is one of `DR`, `SAG`, `KG2` then the function can be omitted since three functions are already internally available for these comma algorithms.

``` js
jint.hasAlg()            // Return true if a custom algorithm has been set, false if using default

jint.getAlgText()        // Return text acronym for algorithm.
                         // Return blank for either default algorithm or custom algorithm supplied without a text acronym.
jint.getAlgFn()          // Return the algorithm function, which takes in a prime and outputs a comma in Peo format
jint.getSetupAlgObject() // Return an object {txt: txt, fn: getCommaFn} representing algorithm setup

jint.setAlg()            // Remove the algorithm for this JInterval, use default
jint.setAlg(txt)         // Change the algorithm, using recognised text acronym such as 'SAG' or 'KG2'
jint.setAlg(fn)          // Change the algorithm, using function such as {p => p/2}
jint.setAlg(obj)         // Change the algorithm, specifying text acronym and function via obj = {txt: txt, fn: getCommaFn}
```

### Tuning

A tuning can be specified on a `JInterval` during construction, or later on. Default tuning is `{pitchNotation: 'C4', freqHz: 256}`.

``` js
jint.hasTuning()                   // Return true if a custom tuning is set, false if using default tuning

jint.getTuningFreqHz()             // Tuning frequency, in Hz
jint.getTuningInputPitchNotation() // Tuning notation, as input
jint.getTuningPitchNotation()      // Tuning notation, in standard format
jint.getTuningMultHz()             // Multiplier representing frequency in Hz for notation 'C4'
jint.getSetupTuningObject()        // Returns an object {pitchNotation:'X4', freqHz:NNN} representing tuning setup

jint.setTuning()                   // Remove the tuning for this JInterval, use default
jint.setTuning(obj)                // Change the tuning via obj = {pitchNotation:'X4', freqHz:NNN}
```

### Display

``` js
jint.hasDisplay()            // Return true if custom display options are supplied, false if using defaults
jint.getSetupDisplayObject() // Returns an object representing display setup, see table in constructor setup above

// Each of these returns false if options is not specified:
jint.getCommaMaxUnsplit()   // Return integer, largest comma numerator or denominator that is not factorised
jint.getMaxRepeatChars()    // Return integer, maximum number of repeated characters in notation
jint.hideComma5Syntonic()   // Return true if format [5] and [1/5] is used for syntonic commas
jint.levelComma12Pythag()   // Return integer, 3-exponent at which p and d are used for Pythagorean commas
jint.levelComma53Mercator() // Return integer, 3-exponent at which m and w are used for Mercator commas
jint.levelComma665Small()   // Return integer, 3-exponent at which s and r are used for small commas
jint.levelComma190537Tiny() // Return integer, 3-exponent at which t and y are used for tiny commas

jint.setDisplay()    // Remove the display options for this JInterval, use defaults
jint.setDisplay(obj) // Change the output display format according to supplied options
                     // Can use object from getSetupDisplayObject as a template
```

## Examples

There are many more examples in the examples directory on GitHub, you can run them using `npm run examples`.

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
getComma(11, p=>new Peo(p))  // returns 11/1 using a custom algorithm, mapping p to a Peo on p
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
(new JInterval(3/2)).ratioPeo()                // returns the Peo on {2:-1, 3:1} for this JInterval
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

These higher prime commas and notations are being made available to enable writing beautiful JI music that goes way outside the 12 notes of the standard scale. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/davidryan59/ryan-example-primenumberedblues) (which used the `DR` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/davidryan59/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
