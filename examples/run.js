/* eslint-disable no-console, no-redeclare*/

var Peo = require('peo');
// var ji = require('ji-rcn')           // via npm
var ji = require('../src/index.js');       // locally
var JInterval = ji.jinterval;
var jint = null;

// console.log('');
// console.log('Example of newly created empty JInterval:');
// console.log('`new JInterval()`');
// console.log('');
// console.log(new JInterval());
// console.log('');
// 
// console.log('');
// console.log('Example of newly created JInterval:');
// console.log('`new JInterval(7, 5)`');
// console.log('');
// console.log(new JInterval(7, 5));
// console.log('');
// 
// console.log('');
// console.log('Same JInterval, with frequency and notation calculated:');
// console.log("`new JInterval(7, 5), starting at 240 Hz for notation B'3`");
// console.log('');
// jint = new JInterval(7, 5);
// jint.getEndFreqHz(240);
// jint.getEndPitchNotation("B'3");
// console.log(jint);
// console.log('');
// 
// console.log('');
// console.log('Example of DR algorithm:');
// console.log('`new JInterval("13/8", "DR")`');
// console.log('');
// jint = new JInterval('13/8', 'DR');
// console.log(jint.getEndPitchNotation());
// console.log('');
// console.log(jint);
// console.log('');
// 
// console.log('');
// console.log('Example of KG2 algorithm:');
// console.log('`new JInterval("13/8", "KG2")`');
// console.log('');
// jint = new JInterval('13/8', 'KG2');
// console.log(jint.getEndPitchNotation());
// console.log('');
// console.log(jint);
// console.log('');
// 
// console.log('');
// console.log('Example of getting a comma:');
// console.log('`JInterval.getComma(7)`');
// console.log('');
// console.log(JInterval.getComma(7));
// console.log('');
// 
// console.log('');
// console.log('Creation of JInterval on same notation text:');
// console.log("`new JInterval(\"D'[7]6\")`");
// console.log('');
// jint = new JInterval("D'[7]6");
// console.log(jint);
// console.log('');
// console.log(jint.ratioFractionText());
// console.log('');
// 
// console.log('');
// console.log('Alternative notations using Pythagorean commas:');
// console.log('`new JInterval("Cp4")`');
// console.log('`new JInterval("B#3")`');
// console.log('');
// var jint1 = new JInterval('Cp4');
// var jint2 = new JInterval('B#3');
// console.log(jint1);
// console.log(jint2);
// console.log('');
// console.log(jint1.ratioFractionText());
// console.log(jint2.ratioFractionText());
// console.log('');
// 
// console.log('In the examples below, it is assumed 1/1 is notated C4, e.g. C4 is the base notation:');
// 
// console.log('');
// for (var i = 1; i <= 32; i++) {
//   var jint = new JInterval(i);
//   console.log(`${i}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 1; i <= 32; i++) {
//   var jint = new JInterval(1, i);
//   console.log(`1/${i}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 1; i <= 32; i++) {
//   var jint = new JInterval(i + 1, i);
//   console.log(`${i + 1}/${i}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 512; i <= 540; i++) {
//   var jint = new JInterval(i, 32);
//   console.log(`${i}/32  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 1; i <= 49; i++) {
//   var num = Math.pow(2, i);
//   var jint = new JInterval(num + 1, num);
//   console.log(`${num + 1}/${num}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 60; i <= 90; i++) {
//   var jint = new JInterval(i, 60);
//   var fract = '' + jint.ratioFractionText();
//   var fractText = fract + ' '.repeat(5 - fract.length);
//   console.log(`${i}/60 = ${fractText}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 65536; i <= 65536 + 15; i++) {
//   var jint = new JInterval(i, 65536);
//   var fract = '' + jint.ratioFractionText();
//   var fractText = fract + ' '.repeat(11 - fract.length);
//   console.log(`${i}/65536 = ${fractText}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// for (var i = 1e14 - 4; i <= 1e14 + 4; i++) {
//   var jint = new JInterval(i);
//   console.log(`${i}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// var num = 1;
// var denom = 0;
// var temp = null;
// for (var i = 1; i <= 20; i++) {
//   temp = num + denom;
//   denom = num;
//   num = temp;
//   var jint = new JInterval(num, denom);
//   console.log(`${num}/${denom}  ->  ${jint.getEndPitchNotation()}`);
// }
// 
// console.log('');
// var mid = 34650;
// var count = 15;
// var denom = 6930;
// for (var i = mid - count; i <= mid + count; i++) {
//   var jint = new JInterval(i, denom);
//   var fract = '' + jint.ratioFractionText();
//   var fractText = fract + ' '.repeat(11 - fract.length);
//   console.log(`${i}/${denom} = ${fractText}  ->  ${jint.getEndPitchNotation()}`);
// }
// console.log('');
// for (var j = 0; j <= 20; j += 2) {
//   for (var i = -5; i <= 5; i++) {
//     var mult = Math.pow(2, j);
//     var num = i + 8 * mult;
//     var jint = new JInterval(num, mult);
//     console.log(`${num}/${mult}  ->  ${jint.getEndPitchNotation()}`);
//   }
//   console.log('');
// }
// 
// var len3 = 15;
// var len5 = 3;
// var array3 = [];
// var array5 = [];
// var array = [];
// for (var i = 0; i < len3; i++) {array3.push(Math.pow(3, i));}
// for (var i = 0; i < len5; i++) {array5.push(Math.pow(5, i));}
// for (var i = 0; i < len3; i++) {
//   for (var j = 0; j < len5; j++) {
//     array.push(array3[i] * array5[j]);
//   }
// }
// array.filter(function f1(elt) {return ((elt > 10000) && (elt < 100000));});
// array.sort(function f2(elt1, elt2) {return elt1 - elt2;});
// for (var i = 0; i < array.length; i++) {
//   var num = array[i];
//   var denom = Math.pow(2, Math.floor(Math.log(num) / Math.log(2)));
//   var jint = new JInterval(num, denom);
//   console.log(`${num}/${denom}  ->  ${jint.getEndPitchNotation()}`);
// }
// console.log('');
// 
// console.log('');
// console.log('Giving Pythagorean notations for circle of fifths using higher Pythagorean commas:');
// console.log('Pythagorean comma (12) switched on at 11');
// console.log('Mercator comma (53) switched on at 42');
// var log32 = Math.log(3) / Math.log(2);
// for (var exp3 = 0; exp3 < 100; exp3++) {
//   var exp2 = -Math.floor(exp3 * log32);
//   var jint = new JInterval({
//     display: {lev12: 11, lev53: 42},
//     peo: new Peo({2: exp2, 3: exp3})
//   });
//   var note = jint.getEndPitchNotation();
//   var ratio = jint.ratio().toString().substr(0, 8);
//   var fract = jint.ratioFractionText();
//   if (fract === 'NA') fract = '';
//   console.log(`3^${exp3}:  ${note}  ${ratio}  ${fract}`);
// }
// console.log('');
// 
// console.log('');
// console.log('CSV table of notations from 1/1 to 275/1 with various options, where 1/1 is C(o-4)');
// console.log('');
// console.log('i,DR,SAG,KG2,ADJ,Hide5,Lev12=11,Reps=1,ComMax=1');
// for (var i = 1; i <= 275; i++) {
//   var num = i / 256;
//   var jintDR = new JInterval({ratio: num});
//   var jintSAG = new JInterval({ratio: num, alg: 'SAG'});
//   var jintKG2 = new JInterval({ratio: num, alg: 'KG2'});
//   var jintADJ = new JInterval({ratio: num, alg: 'ADJ'});
//   var jintH5 = new JInterval({ratio: num, display: {hide5: true}});
//   var jintP12 = new JInterval({ratio: num, display: {lev12: 11}});
//   var jintR1 = new JInterval({ratio: num, display: {reps: 1}});
//   var jintCM1 = new JInterval({ratio: num, display: {comMax: 1}});
//   console.log(`${i},${jintDR.getEndPitchNotation()},${jintSAG.getEndPitchNotation()},${jintKG2.getEndPitchNotation()},${jintADJ.getEndPitchNotation()},${jintH5.getEndPitchNotation()},${jintP12.getEndPitchNotation()},${jintR1.getEndPitchNotation()},${jintCM1.getEndPitchNotation()}`);
// }
// console.log('');
// console.log('Constructing a JInterval for small number "77/65"');
// jint = new JInterval(77 / 65);
// jint.getEndPitchNotation();
// jint.getEndFreqHz();
// console.log(jint);
// console.log('');
// 
// console.log('');
// console.log('Constructing a JInterval for factorial of 60 (big number)');
// jint = new JInterval(Peo.fact(60));
// jint.getEndPitchNotation();
// jint.getEndFreqHz();
// console.log(jint);
// console.log('');
// console.log('JInterval can go much higher than this - factorial of 1000000 should be fine to calculate, but take a while to print!');
// console.log('');

jint = new JInterval({
  startPitchNotation: 'G4',
  endPitchNotation: 'Bb[7]5',
  tuning: {
    freqHz: 381,
    pitchNotation: "Ab'4"
  },
  alg: 'SAG',
  display: {
    hide5: true
  }
})
console.log(jint)
