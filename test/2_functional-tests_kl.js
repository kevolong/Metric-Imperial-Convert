/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server.js');
var Browser = require('zombie');

  
chai.use(chaiHttp);
Browser.site = 'https://fcc-metimp-convert-kl.glitch.me'; 

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid Unit");
          done();
        });
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid Number");
          done();
        });
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "Invalid Number and Invalid Unit");
          done();
        });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, "No Number");
          done();
        });
      });
      
    });

  });
  
  //Test user interaction with front end
  suite('User Browser Interaction Tests', function(){
    
    const browser = new Browser();
    suiteSetup(function(done) { 
      return browser.visit('/', done);  
    });
    
    suite('"Metric/Imperial Convert" form', function() {
      
      test('#example - submit the input "3gal"', function(done) {
        browser
          .fill('number', '3')
          .select('unit', 'gal')
          .pressButton('#submit-convert', function(){
            browser.assert.success();
            browser.assert.text('h3#data-message', '3 gallons converts to 11.35623 liters');
            done();
          });
      });
      
      test('#example - submit the input "3.95/2/2gal"', function(done) {
        browser
          .fill('number', '3.95/2/2')
          .select('unit', 'gal')
          .pressButton('#submit-convert', function(){
            browser.assert.success();
            browser.assert.text('h3#error-message', 'Invalid Number');
            done();
          });
      });
      
    }); // end sub-suitesuite Metric/Imperial Convert form
  }); // end sub-suite User Browser Interaction Tests

});