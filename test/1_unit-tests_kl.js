/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

//FCC Unit Tests
suite('Unit Tests', function(){
  
  //Test numerical input
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '32.34L';
      assert.equal(convertHandler.getNum(input),32.34);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/2L';
      assert.equal(convertHandler.getNum(input),0.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.1/5L';
      assert.equal(convertHandler.getNum(input),0.62);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '1/2/4L';
      assert.equal(convertHandler.getNum(input),null);
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input),'none');
      done();
    }); 
    
  });
  
  //Test unit input
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      var expect = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expect[i]);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['gl','lt','m','k','lb','kgs','gslae', 'sexy'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase());
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [395, 'lbs'];
      var expected = 179.16884;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});

//Added Tests not in FCC Requirements
suite('Unit Tests Extended KL', function(){
  suite('Function convertHandler.validateNum(input)', function() {
    
    test('Whole number from getNum', function(done) {
      var input = 32;
      assert.isTrue(convertHandler.validateNum(input));
      done();
    });
    
    test('Decimal from getNum', function(done) {
      var input = 32.34;
      assert.isTrue(convertHandler.validateNum(input));
      done();
    });
    
    
    test('Fractional Decimal from getNum', function(done) {
      var input = 0.62;
      assert.isTrue(convertHandler.validateNum(input));
      done();
    });
    
    test('Invalid (null) fromgetNum', function(done) {
      var input = null;
      assert.isFalse(convertHandler.validateNum(input));
      done();
    });
    
  }); // end of sub-suite 'validateNum'
  
  suite('Function convertHandler.validateUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','L','mi','km','lbs','kg'];
      input.forEach(function(ele) {
        assert.isTrue(convertHandler.validateUnit(ele));
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = 'gse';
      assert.isFalse(convertHandler.validateUnit(input));
      done();
    });  
    
  }); // end of sub-suite 'validateUnit'
  
  
}); // end of Suite 'Unit Tests Extended KL'