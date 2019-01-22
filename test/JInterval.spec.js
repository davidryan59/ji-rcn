/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;

var identityFn = function identityFn(p) {return new Peo(p);};

var fnName = 'JInterval';
describe(fnName, function () {
  it('can initialise from new JInterval(new Peo(14, 15)), and objects get copied correctly', function () {
    var origPeo = new Peo(14, 15);
    var jint = new JInterval(origPeo, 'KG2');
    var jintPeoPrivate = jint.peo;
    var jintPeoPublicCopy = jint.getPeo();
    var origPrimeExps = origPeo.getPrimeExps();
    var jintPrimeExps = jintPeoPrivate.getPrimeExps();
    // Different object identities
    assert(jintPrimeExps !== origPrimeExps, 'Different Peo inner objects');
    assert(jintPeoPrivate !== origPeo, 'Different Peo outer objects');
    assert(jintPeoPrivate !== jintPeoPublicCopy, 'Different private and public objects');
    // Same contents
    assert.deepStrictEqual(jintPeoPrivate, jintPeoPublicCopy);
    assert.deepStrictEqual(jintPeoPrivate, origPeo);
    assert.deepStrictEqual(jintPrimeExps, origPrimeExps);
    assert.strictEqual(jint.toFractionText(), '14/15');
    assert.strictEqual(jint.getAlgText(), 'KG2');
  });

  it('can initialise from new JInterval(<another JInterval>)', function () {
    var peo = new Peo(14, 15);
    var jint1 = new JInterval(peo, 'SAG');
    var jint2 = new JInterval(jint1);
    var ob1 = jint1.getPeo().getPrimeExps();
    var ob2 = jint2.getPeo().getPrimeExps();
    assert(jint1 !== jint2, 'Different JInterval objects');
    assert.deepStrictEqual(ob1, ob2, 'Represent same note');
    assert.strictEqual(jint2.getAlgText(), 'SAG');
  });

  it('can initialise from new JInterval(14)', function () {
    var jint = new JInterval(14, 'SAG');
    var txt = jint.toFractionText();
    assert.strictEqual(txt, '14');
    assert.strictEqual(jint.getAlgText(), 'SAG');
  });

  it('can initialise from new JInterval(14, 15)', function () {
    var jint = new JInterval(14, 15, 'KG2');
    var txt = jint.toFractionText();
    assert.strictEqual(txt, '14/15');
    assert.strictEqual(jint.getAlgText(), 'KG2');
  });

  it('can initialise from new JInterval({2:1, 3:1, 5:-2, 13:-4})', function () {
    var jint = new JInterval({2: 1, 3: 1, 5: -2, 13: -4}, 'SAG');
    var txt = jint.toFractionText();
    assert.strictEqual(txt, '6/714025');
    assert.strictEqual(jint.getAlgText(), 'SAG');
  });

  it('can initialise from new JInterval()', function () {
    var jint = new JInterval();
    var txt = jint.toFractionText();
    assert.strictEqual(jint.getAlgText(), '');
    assert.strictEqual(txt, '1');
  });

  it('can initialise from new JInterval("3/4", "SAG")', function () {
    var jint = new JInterval('3/4', 'SAG');
    assert.strictEqual(jint.getAlgText(), 'SAG');
    assert.deepStrictEqual(jint.peo.getPrimeExps(), {2: -2, 3: 1});
  });

  it('can initialise from new JInterval(0.75, "KG2")', function () {
    var jint = new JInterval(0.75, 'KG2');
    assert.strictEqual(jint.getAlgText(), 'KG2');
    assert.deepStrictEqual(jint.peo.getPrimeExps(), {2: -2, 3: 1});
  });

  it('can provide a deep copy', function () {
    var jint = new JInterval('7/2');
    var jintc = jint.copy();
    var jintp = jint.getEndPitchNotation();
    var jintcp = jintc.getEndPitchNotation();
    assert(jint !== jintc);                  // Objects different
    assert(jint.peo !== jintc.peo);
    assert.strictEqual(jintp, 'Bb[7]5');   // Represents same JInterval
    assert.strictEqual(jintcp, 'Bb[7]5');
  });

  it('can return an identity JInterval', function () {
    var jint = new JInterval('7/2');
    var jint1 = jint.get1();
    var jintp = jint.getEndPitchNotation();
    var jint1p = jint1.getEndPitchNotation();
    assert(jint !== jint1);
    assert.strictEqual(jintp, 'Bb[7]5');
    assert.strictEqual(jint1p, 'C4');
  });

  it('can provide a pitch', function () {
    var jint = new JInterval(35, 12);
    assert.strictEqual(jint.getEndPitchNotation(), "G'[7]5");
  });

  it('check default (starting) pitch class is C', function () {
    var jint = new JInterval(2, 1);
    assert.strictEqual(jint.getStartPitchClassNotation(), 'C');
  });

  it('check default (starting) frequency is 256.00 Hz', function () {
    var jint = new JInterval(13, 8);
    assert.strictEqual(jint.getStartFreqText(), '256.00 Hz');
  });

  it('cover three branches on recalc notation', function () {
    var jint = new JInterval(2, 1);
    var endNotation = jint.getEndPitchNotation('G4');
    assert.strictEqual(endNotation, 'G5');
    endNotation = jint.getEndPitchNotation('G4'); // Cover case of repeated input hitting cache
    assert.strictEqual(endNotation, 'G5');
    endNotation = jint.getEndPitchNotation();     // Cover case of empty input hitting cache
    assert.strictEqual(endNotation, 'G5');
    endNotation = jint.getEndPitchNotation('F4'); // Cover case of different input not hitting cache
    assert.strictEqual(endNotation, 'F5');
  });

  it('can provide a text description via toString', function () {
    var jint = new JInterval(35, 12);
    var endNotation = jint.getEndPitchNotation();
    var startNotation = jint.getStartPitchNotation();
    var toStringText = jint.toString();
    assert(toStringText.includes(startNotation));
    assert(toStringText.includes(endNotation));
  });

  it('can raise to a power', function () {
    var jint = new JInterval(3, 2);              // G4
    assert.strictEqual(jint.pow(3).getEndPitchNotation(), 'A5');   // 27/8
  });

  it('can multiply', function () {
    var jint1 = new JInterval(5, 3);              // A'5
    var jint2 = new JInterval(9, 4);              // D5
    assert.strictEqual(jint1.mult(jint2).getEndPitchNotation(), "B'5");   // 15/4
  });

  it('can multiply by a power', function () {
    var jint1 = new JInterval(5, 4);              // E'4
    var jint2 = new JInterval(3, 2);              // G4
    assert.strictEqual(jint1.mult(jint2, 2).getEndPitchNotation(), "F#'5");   // 45/16
  });

  it('default JInterval has frequency Hz and text of 256.00 Hz', function () {
    var jint = new JInterval();
    assert.strictEqual(jint.getEndFreqHz(), 256);
    assert.strictEqual(jint.getEndFreqText(), '256.00 Hz');
  });

  it('new JInterval(5, 4) is 320.00 Hz', function () {
    var jint = new JInterval(5, 4);
    assert.strictEqual(jint.getEndFreqHz(), 320);
    assert.strictEqual(jint.getEndFreqText(), '320.00 Hz');
  });

  it('new JInterval("42") is 10752.00 Hz', function () {
    var jint = new JInterval('42');
    assert.strictEqual(jint.getEndFreqHz(), 10752);
    assert.strictEqual(jint.getEndFreqText(), '10752.00 Hz');
  });

  it('new JInterval("6/7") has correct frequency Hz and text approx 219.43 Hz', function () {
    var jint = new JInterval('6/7');       // 256 * 6 / 7 = 219.42857143
    assert(jint.getEndFreqHz() > 219.428570);
    assert(jint.getEndFreqHz() < 219.428572);
    assert.strictEqual(jint.getEndFreqText(), '219.43 Hz');
  });

  it('new JInterval("9/8") gives 256->288 and 248->279 Hz', function () {
    var jint = new JInterval('9/8');
    assert.strictEqual(jint.getEndFreqHz(), 288);     // Default of 256 used. 256 * 9/8 = 288
    assert.strictEqual(jint.getEndFreqHz(248), 279);  // 248 * 9/8 = 279
    assert.strictEqual(jint.getEndFreqHz(248), 279);  // Coverage of caching values
    assert.strictEqual(jint.getEndFreqHz(), 279);     // Previous start value is cached
    assert.strictEqual(jint.getEndFreqText(), '279.00 Hz');
    assert.strictEqual(jint.getEndFreqText(256), '288.00 Hz');
  });

  it('new JInterval("42") and global default start freq of 256 Hz gives 10752 Hz', function () {
    var jint = new JInterval('42');
    assert.strictEqual(jint.getEndFreqHz(), 10752);     // 256 Hz in defaults
    assert.strictEqual(jint.getEndFreqText(), '10752.00 Hz');
  });

  it('new JInterval("C4", "Eb.5") agrees with new Peo(12, 5)', function () {
    var jint = new JInterval('C4', 'Eb.5');
    assert.strictEqual(jint.toFractionText(), '12/5');
  });

  it('new JInterval(\'Bb[7]5\', "E\'4", "SAG") gives value of 5/14', function () {
    var jint = new JInterval('Bb[7]5', "E'4", 'SAG');
    assert.strictEqual(jint.toFractionText(), '5/14');
    assert.strictEqual(jint.getAlgText(), 'SAG');
  });

  // FIVE CHECKS ON INITIALISATION FROM NOTATIONS WITH ALGORITHM

  it('new JInterval("D5", "F[11]5") gives value of 11/9', function () {
    var jint = new JInterval('D5', 'F[11]5');
    assert.strictEqual(jint.toFractionText(), '11/9');
    assert.strictEqual(jint.getAlgText(), '');
  });

  it('new JInterval("D5", "F[11]5", "DR") gives value of 11/9', function () {
    var jint = new JInterval('D5', 'F[11]5', 'DR');
    assert.strictEqual(jint.toFractionText(), '11/9');
    assert.strictEqual(jint.getAlgText(), 'DR');
  });

  it('new JInterval("D5", "F[11]5", "KG") gives value of 22528/19683', function () {
    var jint = new JInterval('D5', 'F[11]5', 'KG');
    assert.strictEqual(jint.toFractionText(), '22528/19683');
    assert.strictEqual(jint.getAlgText(), 'KG2');
  });

  it('new JInterval("D5", "F[11]5", identityFn) gives value of 352/27', function () {
    var jint = new JInterval('D5', 'F[11]5', identityFn);
    assert.strictEqual(identityFn(19).toString(), '{"19":1}');
    assert.strictEqual(jint.toFractionText(), '352/27');
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
  });

  it('new JInterval("D5", "F[11]5", {txt:"ID",fn:identityFn}) gives value of 352/27', function () {
    var jint = new JInterval('D5', 'F[11]5', {txt: 'ID', fn: identityFn});
    assert.strictEqual(jint.toFractionText(), '352/27');
    assert.strictEqual(jint.getAlgText(), 'ID');
  });

  // FIVE CHECKS ON INITIALISATION FROM ONE OBJECT CONTAINING NOTATIONS WITH ALGORITHM

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5"}) gives value of 11/9', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5'});
    assert.strictEqual(jint.toFractionText(), '11/9');
    assert.strictEqual(jint.getAlgText(), '');
  });

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5", alg:"DR"}) gives value of 11/9', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5', alg: 'DR'});
    assert.strictEqual(jint.toFractionText(), '11/9');
    assert.strictEqual(jint.getAlgText(), 'DR');
  });

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5", alg:"KG"}) gives value of 22528/19683', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5', alg: 'KG'});
    assert.strictEqual(jint.toFractionText(), '22528/19683');
    assert.strictEqual(jint.getAlgText(), 'KG2');
  });

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5", alg:identityFn}) gives value of 352/27', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5', alg: identityFn});
    assert.strictEqual(jint.toFractionText(), '352/27');
    assert.strictEqual(jint.getAlgText(), 'CUSTOM');
  });

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5", alg:{txt:"ID",fn:identityFn}) gives value of 352/27', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5', alg: {txt: 'ID', fn: identityFn}});
    assert.strictEqual(jint.toFractionText(), '352/27');
    assert.strictEqual(jint.getAlgText(), 'ID');
  });

  it('new JInterval({startPitchNotation:"D5", endPitchNotation:"F[11]5", alg:{txt:"KG",fn:identityFn}) overrides fn, uses KG, and gives value of 22528/19683', function () {
    var jint = new JInterval({startPitchNotation: 'D5', endPitchNotation: 'F[11]5', alg: {txt: 'KG', fn: identityFn}});
    assert.strictEqual(jint.toFractionText(), '22528/19683');
    assert.strictEqual(jint.getAlgText(), 'KG2');
  });
});
