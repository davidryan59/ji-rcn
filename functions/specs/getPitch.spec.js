var assert = require('assert')
// var Peo = require('peo')

var Jinote = require('../Jinote')

var fnName = 'getPitch'
describe(fnName, function() {

  var testArray = [
    [{}, "C4"]
  , ["1/1", "C4"]
  , ["2/1", "C5"]
  , ["1/2", "C3"]
  , ["32/1", "C9"]
  , ["64/1", "C(o+10)"]
  , ["1/16", "C0"]
  , ["1/32", "C(o-1)"]
  , ["10/9", "D'4"]
  , ["9/8", "D4"]
  , ["6/5", "Eb.4"]
  , ["5/4", "E'4"]
  , ["81/64", "E4"]
  , ["4/3", "F4"]
  , ["45/32", "F#'4"]
  , ["64/45", "Gb.4"]
  , ["3/2", "G4"]
  , ["8/5", "Ab.4"]
  , ["5/3", "A'4"]
  , ["27/16", "A4"]
  , ["16/9", "Bb4"]
  , ["9/5", "Bb.4"]
  , ["15/8", "B'4"]
  , [{3:1}, "G5"]
  , [{3:33}, "B####(o+55)"]
  , [{3:34}, "F(#5)(o+57)"]
  , [{3:6999998}, "B(#999999)(o+LOTS)"]
  , [{3:6999999}, "F(#LOTS)(o+LOTS)"]
  , [{3:-2}, "Bb0"]
  , [{3:-29}, "Fbbbb(o-42)"]
  , [{3:-30}, "B(b5)(o-44)"]
  , [{3:-6999994}, "F(b999999)(o-LOTS)"]
  , [{3:-6999995}, "B(bLOTS)(o-LOTS)"]
  , [{5:1}, "E'6"]
  , [{5:1}, "E'6", "DR"]
  , [{5:1}, "E'6", "SAG"]
  , [{5:1}, "E'6", "DK"]
  , [{5:1}, "E'6", "KG2"]
  , [{5:4}, "D##''''(o+13)"]
  , [{5:5}, "F###('5)(o+15)"]
  , [{5:999999}, "C(#571428)('999999)(o+LOTS)"]
  , [{5:1000000}, "E(#571428)('LOTS)(o+LOTS)"]
  , [{5:-1}, "Ab.1"]
  , [{5:-4}, "Bbbb....(o-6)"]
  , [{5:-5}, "Gbbb(.5)(o-8)"]
  , [{5:-999999}, "C(b571428)(.999999)(o-LOTS)"]
  , [{5:-1000000}, "A(b571429)(.LOTS)(o-LOTS)"]
  , ["7/4", "Bb[7]4"]
  , ["8/7", "D[1/7]4"]
  , [{7:2, 2:-5}, "Ab[49]4"]
  , [{7:3, 2:-8}, "Gb[343]4"]
  , [{7:4, 2:-11}, "Fb[7^4]4"]
  , ["11/8", "F[11]4"]
  , ["16/11", "G[1/11]4"]
  , ["121/64", "Bb[121]4"]
  , [{11:2, 2:-6}, "Bb[121]4"]
  , [{11:3, 2:-10}, "Eb[11^3]4"]
  , [{11:4, 2:-13}, "Ab[11^4]4"]
  , ["13/11", "E[13/11]4"]
  , ["77/64", "Eb4 [7 11]"]
  , ["539/512", "Db4 [49 11]"]
  , [{7:1, 11:-2, 13:-4}, "Dbb(o-15) [7 / 121 13^4]"]
  , [{7:4, 11:-2, 13:-4}, "Abbb(o-7) [7^4 / 121 13^4]"]
  , [{7:4, 11:2, 13:-1}, "Gbb(o+18) [7^4 121 / 13]"]
  , [{7:4, 11:2, 13:-4}, "Fbbb7 [7^4 121 / 13^4]"]
  , [{7:1, 11:-2, 13:-4, 17:3}, "D#(o-3) [7 17^3 / 121 13^4]"]
  , [{7:-1, 11:-2, 13:-4, 17:-3}, "Fbbbb(o-33) [1 / 7 121 13^4 17^3]"]
  , [{7:1, 11:2, 13:4, 17:3}, "G####(o+40) [7 121 13^4 17^3]"]
  , [139, "C#[139](o+11)", "DR"]
  , [139, "Db[139](o+11)", "KG2"]
  , [139, "D[139](o+11)", "SAG"]
  , [59, "Bb[59]9", "SAG"]
  ]

  var runTest = function(jnInput, expectText, alg, comment) {
    var jn = new Jinote(jnInput, alg)
    var actualText = jn.getPitch()
    var algText = (alg) ? ", " + alg : ""
    var commentText = (comment) ? ", " + comment : ""
    var label = "(new Jinote(" + JSON.stringify(jnInput) + algText + "))." + fnName + "() = " + expectText + commentText
    it(label, function() {
      assert.strictEqual(actualText, expectText)
    })
  }

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3])
  }



  // it("can calculate notation for new Jinote() as C4", function() {
  //   var jn = new Jinote()
  //   assert.deepStrictEqual(jn.getPitch(), "C4")
  // })
  //
  // it("can calculate notation for new Jinote(5, 2) as E'5", function() {
  //   var jn = new Jinote(5, 2)
  //   assert.deepStrictEqual(jn.getPitch(), "E'5")
  // })
  //
  // it('can calculate notation for new Jinote("1/9") as Bb0', function() {
  //   var jn = new Jinote("1/9")
  //   assert.deepStrictEqual(jn.getPitch(), "Bb0")
  // })
  //
  // it('can calculate notation for new Jinote({3:12, 5:-8}) as Gbbb(.8)4', function() {
  //   var jn = new Jinote({3:12, 5:-8})
  //   assert.deepStrictEqual(jn.getPitch(), "Gbbb(.8)4")
  // })

})
