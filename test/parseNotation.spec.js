/* eslint-disable func-names */

var assert = require('assert');
var Peo = require('peo');

var testIndex = require('./_test_index');
var JInterval = testIndex.JInterval;
var parseNotation = testIndex.parseNotation;

describe('parseNotation measures intervals correctly from C4', function () {
  var testArray = [
    ['', '', '', 'empty string'],

    ['F', '4/3', '', 'Test parsing single characters'],
    ['C', '1'],
    ['G', '3/2'],
    ['D', '9/8'],
    ['A', '27/16'],
    ['E', '81/64'],
    ['B', '243/128'],
    ['0', '1/16', '', 'Octave numbers'],
    ['1', '1/8'],
    ['2', '1/4'],
    ['3', '1/2'],
    ['4', '1/1'],
    ['5', '2/1'],
    ['6', '4/1'],
    ['7', '8/1'],
    ['8', '16/1'],
    ['9', '32/1'],
    ['#', {3: 7, 2: -11}, '', 'Sharp and flat'],
    ['b', {3: -7, 2: 11}],
    ['p', {3: 12, 2: -19}, '', 'Pythagorean commas'],
    ['d', {3: -12, 2: 19}],
    ['m', {3: 53, 2: -84}, '', 'Mercator (Pythagorean) commas'],
    ['w', {3: -53, 2: 84}],
    ['s', {3: 665, 2: -1054}, '', 'Small Pythagorean commas'],
    ['r', {3: -665, 2: 1054}],
    ['t', {3: 190537, 2: -301994}, '', 'Tiny Pythagorean commas'],
    ['y', {3: -190537, 2: 301994}],
    ["'", '80/81', '', 'Syntonic commas'],
    ["'", '80/81', 'SAG'],
    ["'", '80/81', 'KG2'],
    ["'", {2: -15, 3: 8, 5: 1}, 'BAD', 'Test bad algorithm with different getComma(5)'],
    ['.', '81/80'],
    ['(o-5)', {2: -9}, '', 'Bracketed items'],
    ['(o+4)', '1'],
    ['(o+10)', {2: 6}],
    ['(#15)', {3: (7 * 15), 2: (-11 * 15)}],
    ['(b240)', {3: (7 * -240), 2: (-11 * -240)}],
    ['(p4367)', {3: (12 * 4367), 2: (-19 * 4367)}],
    ['(d192811)', {3: (12 * -192811), 2: (-19 * -192811)}],
    ['(m17)', {3: (53 * 17), 2: (-84 * 17)}],
    ['(w23)', {3: (-53 * 23), 2: (84 * 23)}],
    ['(s29)', {3: (665 * 29), 2: (-1054 * 29)}],
    ['(r31)', {3: (-665 * 31), 2: (1054 * 31)}],
    ['(t37)', {3: (190537 * 37), 2: (-301994 * 37)}],
    ['(y41)', {3: (-190537 * 41), 2: (301994 * 41)}],
    ["('165432)", {2: (4 * 165432), 3: (-4 * 165432), 5: (1 * 165432)}],
    ['(.42)', {2: (4 * -42), 3: (-4 * -42), 5: (1 * -42)}],

    ['GG', '9/4', '', 'Test parsing repeated notations'],
    ['FA', '9/4'],
    ['44', '1/1'],
    ['55', '4/1'],
    ['33', '1/4'],
    ['######', {3: (7 * 6), 2: (-11 * 6)}],
    ['bbbb', {3: (7 * -4), 2: (-11 * -4)}],
    ['ppp', {3: (12 * 3), 2: (-19 * 3)}],
    ['dddddddddd', {3: (12 * -10), 2: (-19 * -10)}],
    ["''''''''''", {2: (4 * 10), 3: (-4 * 10), 5: (1 * 10)}],
    ['......', {2: (4 * -6), 3: (-4 * -6), 5: (1 * -6)}],

    ['Eb.4', '6/5', '', 'Test parsing compound notations'],
    ["F#'4", '45/32'],
    ['A(b3)(.2)(o+8)', {2: 25, 3: -10, 5: -2}],

    ['(oERR)(3ERR)(5ERR)(#ERR)', '1/1', '', 'Test some error inputs'],

    ['[2]', '1/1', '', 'Test parsing of integer commas using default and other algorithms'],
    ['[2]', '1/1', 'DR'],
    ['[2]', '1/1', 'SAG'],
    ['[3]', '1/1'],
    ['[3]', '1/1', 'KG2'],
    ['[5]', '80/81'],
    ['[5]', '80/81', 'SAG', 'Test parsing of some other algorithms'],
    ['[5]', '80/81', 'KG2'],
    ['[5]', {2: -15, 3: 8, 5: 1}, 'BAD'],
    ['[7]', '63/64'],
    ['[7]', '63/64', 'DR'],
    ['[7]', '63/64', 'SAG'],
    ['[7]', '63/64', 'KG2'],
    ['[11]', '33/32'],
    ['[11]', '33/32', 'SAG'],
    ['[11]', '704/729', 'KG2'],
    ['[13]', '26/27'],
    ['[17]', '2176/2187'],
    ['[17]', '4131/4096', 'SAG'],
    ['[17]', '4131/4096', 'KG2'],
    ['[59]', '236/243'],
    ['[59]', '236/243', 'DR'],
    ['[59]', '531/512', 'SAG'],
    ['[59]', '236/243', 'KG2'],
    ['[139]', {2: 4, 3: -7, 139: 1}, '', '139 is first prime all commas are different'],
    ['[139]', {2: 4, 3: -7, 139: 1}, 'DR'],
    ['[139]', {2: -4, 3: -2, 139: 1}, 'SAG'],
    ['[139]', {2: -15, 3: 5, 139: 1}, 'KG2'],
    ['[139]', {2: 23, 3: -19, 139: 1}, 'BAD'],
    ['[1249]', {2: 4, 3: -9, 1249: 1}],
    ['[1249]', {2: -15, 3: 3, 1249: 1}, 'SAG'],
    ['[1249]', {2: -15, 3: 3, 1249: 1}, 'KG2'],
    ['[59051]', {3: -10, 59051: 1}, '', '59049 is first A# under DR algorithm'],
    ['[59051]', {2: -19, 3: 2, 59051: 1}, 'SAG', "Other algorithms don't allow any A#"],
    ['[59051]', {2: -19, 3: 2, 59051: 1}, 'KG2'],
    ['[65537]', {2: -16, 65537: 1}],

    ['[1/5]', '81/80', '', 'Reciprocal commas'],
    ['[1/7]', '64/63'],

    ['[7/11]', '21/22', '', 'Rational commas'],
    ['[7 / 11]', '21/22'],
    ['[11 13]', '143/144'],
    ['[7^2]', '3969/4096'],
    ['[7 7 7/7]', '3969/4096'],
    ['[  7 ^ 2  ]', '3969/4096'],
    ['[]', '1/1'],
    ['[/]', '1/1'],
    ['[5/]', '80/81'],
    ['[/7]', '64/63'],
    ['[7/]', '63/64'],
    ['[7/0]', '63/64'],
    ['[7/1]', '63/64'],
    ['[0/7]', '64/63'],
    ['[7^3/11^3 13]', '250047/276848'],

    ['[77]', {2: -11, 3: 3, 7: 1, 11: 1}, 'Composite numbers inside commas work'],
    ['[1050703/2310]', {2: 25, 3: -23, 5: -1, 7: -1, 11: -1, 101: 2, 103: 1}],
    ['[119 143^2]', {2: -7, 3: -9, 7: 1, 11: 2, 13: 2, 17: 1}],

    ["E'4", '5/4', '', 'Full notations'],
    ['Bb[7]4', '7/4'],
    ["F#'4", '45/32'],
    ['F[11]5', '11/4'],
    ['A[13]5', '13/4'],
    ['Fp8', '177147/8192'],

    ["G5E'6", '15/1', '', 'Concatenation of full notations multiplies them'],
    ['C(o+14)(o+15)', {2: 21}, '', 'Concatenation of separated brackets parses'],
    ['C(o+14)(#2)', {2: -12, 3: 14}],
    ['C((o+14)#2)', {2: (8 - 11), 3: 7}, '', 'Nesting of brackets only parses the inner bracket']  // Parses as C(o+14)#2 = C#(o+12)
  ];

  var runTest = function (notationToParse, peoConstructorData, algAcronym, comment) {
    var obj = (algAcronym) ? {ratio: 1, alg: algAcronym} : {};
    var jintWithAlg = new JInterval(obj);
    var peoFromParsing = parseNotation(jintWithAlg, notationToParse);
    var peoFromSpec = new Peo(peoConstructorData);
    var parseText = JSON.stringify(peoFromParsing.getPrimeExps());
    var specText = JSON.stringify(peoFromSpec.getPrimeExps());
    var algText = (algAcronym) ? ', ' + algAcronym + ' alg' : '';
    var commentText = (comment) ? ' (' + comment + ')' : '';
    var label = 'parseNotation("' + notationToParse + '") has prime exponents ' + specText + algText + commentText;
    it(label, function () {assert.strictEqual(parseText, specText);});
  };

  for (var i = 0; i < testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3]);
  }
});
