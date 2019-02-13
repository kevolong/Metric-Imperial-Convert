/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  //API convert request
  app.route('/api/convert')
    .get(function (req, res){
    
      //Check for input query
      if(req.query.hasOwnProperty('input')) { 
        
        var input = req.query.input;
        //Split up input request
        var initNum = convertHandler.getNum(input);
        var initUnit = convertHandler.getUnit(input);

        //Validate input request
        var validNum = convertHandler.validateNum(initNum);
        var validUnit = convertHandler.validateUnit(initUnit);

        //Input Error responses
        if(!validNum && !validUnit){ res.json({error: "Invalid Number and Invalid Unit"}); } //Both Invalid
        else if (!validNum){ // Invalid number or No Number
          if(initNum == null) { res.json({error: "Invalid Number"}); } // Invalid Number
          else if (initNum == 'none') { res.json({error: "No Number"}); } // No number input
        } 
        else if (!validUnit){ res.json({error: "Invalid Unit"}); }  // Invalid Unit
        //Valid Input
        else{
          var returnNum = convertHandler.convert(initNum, initUnit); // Convert number
          var returnUnit = convertHandler.getReturnUnit(initUnit);  // Converted unit
          var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit); // Convert to display string

          res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString});
        }
      }
      //No input query 
      else { res.json({error: "No [input] query submitted"});}
     
    });
    
};
