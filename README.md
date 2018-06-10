# Just Intonation - Rational Comma Notation
## (JI-RCN, `ji-rcn`)

**Just Intonation** (JI) is a system of musical tuning where intervals can be expressed as ratios between whole numbers.

Examples include: an octave (1:2), a major fourth (3:4), a major triad (4:5:6).

The reason to use Just Intonation is that it is the natural system of tuning for harmonic instruments such as stringed instruments, wind instruments, and the human voice itself.

Unlike the contemporary scale of 12-tone equal temperament (12TET), there are an infinite number of notes available in JI. This is why a notation system is important to have, that can cope with any possible ratio between whole numbers.

**Rational Comma Notation** is such a system. It was developed by David Ryan between 2015 and 2017, and [is documented in this paper](https://arxiv.org/abs/1612.01860).

The purpose of the `ji-rcn` npm package is to make available calculations related to converting between rational numbers and these notations from RCN.

## API
- `_.getComma(p, type)` returns `Fraction(n, m)` where `n/m` is the comma for `p`, under the algorithm `type` which is one of `"DR"`, `"SAG"`, `"KG2"`; `type` is optional, and if omitted, defaults to `"DR"`

## To use `ji-rcn` package
- `npm i ji-rcn` in your JavaScript project directory to install this package
- `var ji = require("ji-rcn")` at top of each JavaScript file to access the functions
- `ji.getComma` to access the function in your scripts

## Examples
- `_.getComma(5)` returns `[80, 81]`
- `_.getComma(7)` returns `[63, 64]`
