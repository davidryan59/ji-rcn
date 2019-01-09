/* eslint-disable func-names */

var assert = require('assert');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;
var jint = null;

var fnName = 'Test interval notation parsing';
describe(fnName, function () {
  // Tests start

  it('Deals with non-standard start pitch notation G#b5 (equivalent to G5)', function () {
    jint = new JInterval(5 / 6);
    assert.strictEqual(jint.getStartPitchInputNotation(), 'C4'); // Test the default notation start value
    jint.getEndPitchNotation('G#b5');                            // Sets all notation start and end values
    assert.strictEqual(jint.getStartPitchInputNotation(), 'G#b5');
    assert.strictEqual(jint.getStartPitchNotation(), 'G5');
    assert.strictEqual(jint.getEndPitchNotation(), "E'5");
  });

  it("Deals with non-standard start pitch notation '.. (equivalent to C.4)", function () {
    jint = new JInterval('9/8');
    jint.getEndPitchNotation("'..");
    assert.strictEqual(jint.getStartPitchInputNotation(), "'..");
    assert.strictEqual(jint.getStartPitchNotation(), 'C.4');
    assert.strictEqual(jint.getEndPitchNotation(), 'D.4');
  });

  it('Deals with non-standard start pitch notation Bb[49/7]5 (equivalent to Bb[7]5)', function () {
    jint = new JInterval(8 / 7);
    jint.getEndPitchNotation('Bb[49/7]5');
    assert.strictEqual(jint.getStartPitchInputNotation(), 'Bb[49/7]5');
    assert.strictEqual(jint.getStartPitchNotation(), 'Bb[7]5');
    assert.strictEqual(jint.getEndPitchNotation(), 'C6');
  });

  // Tests end
});
