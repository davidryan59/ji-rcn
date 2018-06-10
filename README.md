# Just Intonation - Rational Comma Notation
## (JI-RCN, `ji-rcn`)

**Just Intonation** (JI) is a system of musical tuning where intervals can be expressed as ratios between whole numbers.

Examples include: an octave (1:2), a major fourth (3:4), a major triad (4:5:6).

The reason to use Just Intonation is that it is the natural system of tuning for harmonic instruments such as stringed instruments, wind instruments, and the human voice itself.

The contemporary scale of 12-tone equal temperament (12TET) has only 12 notes in the octave. However, Just Intonation has a infinite number of notes in the octave. This makes it trickier to design a notation system that can cope with any possible note in JI.

**Rational Comma Notation** (RCN) was designed to solve this problem. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

For RCN it is necessary to specify an algorithm which maps any prime `p` to its prime comma `n/m`. For example, primes `5` and `7` are usually given commas `80/81` and `63/64` respectively. Algorithms tend to vary for higher primes. Three algorithms which are available are `"DR"`, `"SAG"`, and `"KG2"`; all three algorithms are described in the paper above.

The purpose of the `ji-rcn` npm package is to make calculations available related to converting between rational numbers and these notations from RCN.

Currently the API only contains one function, for calculating the prime comma for a specified prime, however the plan is to expand this in future.

There is a full test suite using Mocha (`mocha`) for testing and Istanbul (`nyc`) for coverage. Currently all tests pass and coverage is 100%.

## To use `ji-rcn` package
- `npm i ji-rcn` in your JavaScript project directory to install this package in `package.json`
- `var ji = require("ji-rcn")` at top of each JavaScript file to access the API
- `ji.eachFunction` to access each function (e.g. `getComma`) in your scripts
- `_.eachFunction` where `_` represents your name for the require, if varying from `ji`

## API
- `_.getComma(p, alg)` returns `n/m` (a `Fraction` object from `Fraction.js`) where:
  - `n/m` is the comma for `p`, calculated using the algorithm `alg`
  - `alg` is one of `"DR"`, `"SAG"`, `"KG2"`
  - `alg` defaults to `"DR"` if omitted

Currently the API only contains one function. There are plans to expand this in future.

## Examples
- `_.getComma`
  - `_.getComma(5)` returns `80/81` (a `Fraction` object from `Fraction.js`)
  - `_.getComma(7)` returns `63/64`
  - `_.getComma(11)` returns `33/32`
  - `_.getComma(11, "DR")` returns `33/32`
  - `_.getComma(11, "SAG")` returns `33/32`
  - `_.getComma(11, "KG2")` returns `704/729`
  - `_.getComma(13)` returns `26/27`
  - `_.getComma(59)` returns `236/243`
  - `_.getComma(59, "DR")` returns `236/243`
  - `_.getComma(59, "SAG")` returns `531/512`
  - `_.getComma(59, "KG2")` returns `236/243`
  - `_.getComma(139, "DR")` returns `2224/2187`
  - `_.getComma(139, "SAG")` returns `139/144`
  - `_.getComma(139, "KG2")` returns `33777/32768`
  - `_.getComma(59051, "DR")` returns `59051/59049`
  - `_.getComma(59051, "SAG")` returns `531459/524288`
  - `_.getComma(59051, "KG2")` returns `531459/524288`
  - `_.getComma(65537, "DR")` returns `65537/65536`
  - `_.getComma(65537, "SAG")` returns `65537/65536`
  - `_.getComma(65537, "KG2")` returns `65537/65536`
  - `_.getComma(2499949, "DR")` returns `2499949/2519424`
  - `_.getComma(2499949, "SAG")` returns `67498623/67108864`
  - `_.getComma(2499949, "KG2")` returns `67498623/67108864`

These commas are now available to make beautiful music from. A piece of music written at the prime limit of 2499949 is available [here](https://soundcloud.com/daveryan23/ryan-example-primenumberedblues) (which used the `"DR"` comma given above), and the rest of the author's music is available [here](https://soundcloud.com/daveryan23/tracks).

*Hope you will enjoy the infinite possibilities of justly intoned music!*
