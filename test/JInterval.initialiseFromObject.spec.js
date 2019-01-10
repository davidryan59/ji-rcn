/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('Peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;
var jint = null;
var theObject = null;

describe('Test general initialiser from object', function () {
  // Tests start

  it("Initialise interval from G4 -> E'5", function () {
    theObject = {
      startPitchNotation: 'G4',
      endPitchNotation: "E'5"
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '5/3');
  });

  it('Initialise interval from frequencies in Hz, 300 -> 380', function () {
    theObject = {
      startFreqHz: 300,
      endFreqHz: 380
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '19/15');
  });

  it('Initialise interval from another JInterval', function () {
    var jint2 = new JInterval(2 / 5);
    theObject = {
      jint: jint2
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '2/5');
    assert(jint !== jint2);
  });

  it('Initialise interval from a Peo', function () {
    var thePeo = new Peo(10 / 91);
    theObject = {
      peo: thePeo
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '10/91');
  });

  it('Initialise interval from an integer', function () {
    theObject = {
      num: 28
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '28');
  });

  it('Initialise interval from a reciprocal', function () {
    theObject = {
      denom: 13
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '1/13');
  });

  it('Initialise interval from a rational number', function () {
    theObject = {
      num: 125,
      denom: 39
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '125/39');
  });

  it('Initialise interval from a decimal number', function () {
    theObject = {
      width: 23.3927
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '233927/10000');
  });

  it('Invalid inputs result in JInterval for unison', function () {
    theObject = {
      startFreqHz: 'invalid value'
    };
    jint = new JInterval(theObject);
    assert.strictEqual(jint.toFractionText(), '1');
  });

  // Tests end
});
