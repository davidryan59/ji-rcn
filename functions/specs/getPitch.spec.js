var assert = require('assert')
// var Peo = require('peo')

var Jinote = require('../Jinote')

describe('pitch and pitch class API', function() {

  var testArray = [
    [{}, "C4", "C",,"Testing with empty object"]
  , ["1/1", "C4", "C"]
  , ["2/1", "C5", "C"]
  , ["1/2", "C3", "C"]
  , ["32/1", "C9", "C"]
  , ["64/1", "C(o+10)", "C"]
  , ["1/16", "C0", "C"]
  , ["1/32", "C(o-1)", "C"]
  , ["10/9", "D'4", "D'"]
  , ["9/8", "D4", "D"]
  , ["6/5", "Eb.4", "Eb."]
  , ["5/4", "E'4", "E'"]
  , ["81/64", "E4", "E"]
  , ["4/3", "F4", "F"]
  , ["45/32", "F#'4", "F#'"]
  , ["64/45", "Gb.4", "Gb."]
  , ["3/2", "G4", "G"]
  , ["8/5", "Ab.4", "Ab."]
  , ["5/3", "A'4", "A'"]
  , ["27/16", "A4", "A"]
  , ["16/9", "Bb4", "Bb"]
  , ["9/5", "Bb.4", "Bb."]
  , ["15/8", "B'4", "B'"]
  , [{3:1}, "G5", "G"]
  , [{3:33}, "B####(o+55)", "B####"]
  , [{3:34}, "F(#5)(o+57)", "F(#5)"]
  , [{3:6999998}, "B(#999999)(o+LOTS)", "B(#999999)"]
  , [{3:6999999}, "F(#LOTS)(o+LOTS)", "F(#LOTS)"]
  , [{3:-2}, "Bb0", "Bb"]
  , [{3:-29}, "Fbbbb(o-42)", "Fbbbb"]
  , [{3:-30}, "B(b5)(o-44)", "B(b5)"]
  , [{3:-6999994}, "F(b999999)(o-LOTS)", "F(b999999)"]
  , [{3:-6999995}, "B(bLOTS)(o-LOTS)", "B(bLOTS)"]
  , [{5:1}, "E'6", "E'"]
  , [{5:1}, "E'6", "E'", "DR"]
  , [{5:1}, "E'6", "E'", "SAG"]
  , [{5:1}, "E'6", "E'", "DK"]
  , [{5:1}, "E'6", "E'", "KG2"]
  , [{5:4}, "D##''''(o+13)", "D##''''"]
  , [{5:5}, "F###('5)(o+15)", "F###('5)"]
  , [{5:999999}, "C(#571428)('999999)(o+LOTS)", "C(#571428)('999999)"]
  , [{5:1000000}, "E(#571428)('LOTS)(o+LOTS)", "E(#571428)('LOTS)"]
  , [{5:-1}, "Ab.1", "Ab."]
  , [{5:-4}, "Bbbb....(o-6)", "Bbbb...."]
  , [{5:-5}, "Gbbb(.5)(o-8)", "Gbbb(.5)"]
  , [{5:-999999}, "C(b571428)(.999999)(o-LOTS)", "C(b571428)(.999999)"]
  , [{5:-1000000}, "A(b571429)(.LOTS)(o-LOTS)", "A(b571429)(.LOTS)"]
  , ["7/4", "Bb[7]4", "Bb[7]"]
  , ["8/7", "D[1/7]4", "D[1/7]"]
  , [{7:2, 2:-5}, "Ab[49]4", "Ab[49]"]
  , [{7:3, 2:-8}, "Gb[343]4", "Gb[343]"]
  , [{7:4, 2:-11}, "Fb[7^4]4", "Fb[7^4]"]
  , ["11/8", "F[11]4", "F[11]"]
  , ["16/11", "G[1/11]4", "G[1/11]"]
  , ["121/64", "Bb[121]4", "Bb[121]"]
  , [{11:2, 2:-6}, "Bb[121]4", "Bb[121]"]
  , [{11:3, 2:-10}, "Eb[11^3]4", "Eb[11^3]"]
  , [{11:4, 2:-13}, "Ab[11^4]4", "Ab[11^4]"]
  , ["13/11", "E[13/11]4", "E[13/11]"]
  , ["77/64", "Eb4 [7 11]", "Eb [7 11]"]
  , ["539/512", "Db4 [49 11]", "Db [49 11]"]
  , [{7:1, 11:-2, 13:-4}, "Dbb(o-15) [7 / 121 13^4]", "Dbb [7 / 121 13^4]"]
  , [{7:4, 11:-2, 13:-4}, "Abbb(o-7) [7^4 / 121 13^4]", "Abbb [7^4 / 121 13^4]"]
  , [{7:4, 11:2, 13:-1}, "Gbb(o+18) [7^4 121 / 13]", "Gbb [7^4 121 / 13]"]
  , [{7:4, 11:2, 13:-4}, "Fbbb7 [7^4 121 / 13^4]", "Fbbb [7^4 121 / 13^4]"]
  , [{7:1, 11:-2, 13:-4, 17:3}, "D#(o-3) [7 17^3 / 121 13^4]", "D# [7 17^3 / 121 13^4]"]
  , [{7:-1, 11:-2, 13:-4, 17:-3}, "Fbbbb(o-33) [1 / 7 121 13^4 17^3]", "Fbbbb [1 / 7 121 13^4 17^3]"]
  , [{7:1, 11:2, 13:4, 17:3}, "G####(o+40) [7 121 13^4 17^3]", "G#### [7 121 13^4 17^3]"]
  , [139, "C#[139](o+11)", "C#[139]", "DR"]
  , [139, "Db[139](o+11)", "Db[139]", "KG2"]
  , [139, "D[139](o+11)", "D[139]", "SAG"]
  , [59, "Bb[59]9", "Bb[59]", "SAG"]
  ]

  var runTest = function(jnInput, expectPitchText, expectPitchClassText, alg, comment) {
    var jn = new Jinote(jnInput, alg)
    var actualNotationText = jn.getNotation()
    var actualPitchText = jn.getPitch()
    var actualPitchClassText = jn.getPitchClass()
    var algText = (alg) ? ", " + alg : ""
    var commentText = (comment) ? ", " + comment : ""
    var labelPitch = "(new Jinote(" + JSON.stringify(jnInput) + algText + ")).getPitch() = " + expectPitchText + commentText
    it(labelPitch, function() {
      assert.strictEqual(actualPitchText, expectPitchText)
      assert.strictEqual(actualNotationText, expectPitchText)
    })
    var labelPitchClass = "(new Jinote(" + JSON.stringify(jnInput) + algText + ")).getPitchClass() = " + expectPitchClassText + commentText
    it(labelPitchClass, function() {
      assert.strictEqual(actualPitchClassText, expectPitchClassText)
    })
  }

  for (var i=0; i<testArray.length; i++) {
    runTest(testArray[i][0], testArray[i][1], testArray[i][2], testArray[i][3], testArray[i][4])
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
