/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var identityFn = function identityFn(p) {return new Peo(p);};

var fnName = 'setAlgPrivate works';
describe(fnName, function () {
  it('sets alg correctly using a jint from empty arguments', function () {
    var jint = new JInterval();
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint from another jint from empty arguments', function () {
    var jint = new JInterval();
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
    assert.strictEqual(jint2.getAlgText(), '');
    assert.strictEqual(jint2.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint from another jint with alg set by name', function () {
    var jint = new JInterval(1, 'SAG');
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaSAG');
    assert.strictEqual(jint2.getAlgText(), 'SAG');
    assert.strictEqual(jint2.getAlgFn().name, 'getCommaSAG');
  });

  it('sets alg correctly using a jint with alg set by named function', function () {
    var jint = new JInterval(1, identityFn);
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint from another jint with alg set by object with fn, name', function () {
    var jint = new JInterval(1, {txt: 'ID', fn: identityFn});
    var jint2 = new JInterval(jint);
    assert.strictEqual(jint.getAlgText(), 'ID');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
    assert.strictEqual(jint2.getAlgText(), 'ID');
    assert.strictEqual(jint2.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint with alg set by object with fn only', function () {
    var jint = new JInterval(1, {fn: identityFn});
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
  });

  it('sets alg correctly using a jint with alg set by object with name, wrong fn', function () {
    var jint = new JInterval(1, {txt: 'Kg', fn: identityFn});
    assert.strictEqual(jint.getAlgText(), 'KG2');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaKG2');
  });

  it('sets alg correctly using a jint with invalid alg true (boolean)', function () {
    var jint = new JInterval(1, true);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with invalid alg /a/g (regex)', function () {
    var jint = new JInterval(1, /a/g);
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with alg acronym that produces invalid alg fn', function () {
    var jint = new JInterval(1, 'EMP');
    assert.strictEqual(jint.getAlgText(), 'EMP');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint with alg object with txt acronym that produces invalid alg fn', function () {
    var jint = new JInterval(1, {txt: 'EMP'});
    assert.strictEqual(jint.getAlgText(), 'EMP');
    assert.strictEqual(jint.getAlgFn().name, 'getCommaDR');
  });

  it('sets alg correctly using a jint copied from a jint with alg set by object with fn, name', function () {
    var jint = new JInterval(1, {txt: 'ID', fn: identityFn});
    var jint2 = jint.copy();
    assert.strictEqual(jint.getAlgText(), 'ID');
    assert.strictEqual(jint.getAlgFn().name, 'identityFn');
    assert.strictEqual(jint2.getAlgText(), 'ID');
    assert.strictEqual(jint2.getAlgFn().name, 'identityFn');
  });
});
