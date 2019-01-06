JInterval

A JInterval fundamentally represents a *musical interval*.
This fundamental representation is as a rational number, stored as a Peo.

A JInterval has associated:
- Notation
- Frequency (Hz)
These give *secondary representations* which are relative to base terms.
- Complication - specifying 440 Hz = A4 (or A'4) if the base notation is still C4!

We can set a:
- Base Notation
- Base Frequency

Initialisation
- From a number - set the interval (Peo) directly from number
- From a notation - assume a base notation of C4 unless otherwise specified - calculate the interval
- From a frequency - assume a base frequency of 256 Hz unless otherwise specified.
- Add general case to Peo to initialize from a set of options
- Add general case to JInterval to initialse from a set of options
- Check if Fraction.js npm has been updated?

Move all options to a sub-object. Have them undefined by default. Have getters and setters on them, they can be changed for an existing JInterval. If any setters are changed, want an invalidation mechanism for recalculation.

Options
- alg (text) - empty (undefined) = DR, SAG, KG2
- baseNotation (text, parses to interval)
- baseFrequency (positive decimal)
- printInputNotation (boolean) - empty/false, print calculated notation; true, print inputted notation, if initialised from a notation.
- useComma12 - whether to extract this comma in notation construction - EMPTY(UNDEFINED/FALSE) by default
- useComma57 - same
- useComma665 - same
- useComma190137 - same
- useComma5 - whether to separate out syntonic commas in notation construction - TRUE by default
