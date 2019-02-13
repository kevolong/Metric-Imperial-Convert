/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  //Get number from input
  this.getNum = function(input) {
    
    let number; // Number to return
    
    const chars = input.match(/[a-z]/gi); // Get characters
    const nums = input.match(/[0-9]/g); // Get numbers
    
    //No numbers, send back 'none' string
    if(nums == null){ number = 'none'; } 
    //Use full input if no letter characters found
    else if(chars == null){ number = makeNum(input); }
    //Letters found, break out all input before first letter
    else{
      const firstChar = input.indexOf(chars[0]); // Get index of first character
      number = makeNum(input.slice(0, firstChar)); // Split and return the numbers
    }
    
    //Convert string to number. Test for evaluability
    function makeNum(numString) {
      
      let num; // Number to return to caller variable
       
      // Unallowed characaters
      if (numString.match(/[^0-9\/\.]/g) != null){ num = null; } 
      // More than one "/"
      else if (numString.match(/\//g) != null && numString.match(/\//g).length > 1){ num = null; }
      // More than one "."
      else if (numString.match(/\./g) != null && numString.match(/\./g).length > 1){ num = null; }
      //Evaluable number
      else{ num = eval(numString); }
    
      return num;
    }
    return number;
  };
  
  //Get units from input
  this.getUnit = function(input) {
    const chars = input.match(/[a-z]/gi); // Get characters
    //No letters found
    if(chars == null){
      return null;
    }
    //Return letters
    else{
      const firstChar = input.indexOf(chars[0]); // Get index of first character
      let unitInput = input.slice(firstChar).toLowerCase(); // Split input into unit string
      if(unitInput == 'l') { return 'L'; } // l to L for liter
      else { return unitInput; } // otherwise return lowercase input
    } 
  };
  
  //Validate number input
  this.validateNum = function(initNum) {
    
    if(isNaN(initNum) || initNum == null){ return false; } // Not a number
    else{ return true; } // Number
  };
  
  //Validate unit input
  this.validateUnit = function(initUnit) {
    const acceptedUnits = ['gal','L','mi','km','lbs','kg'];
    let validUnit = false;
    if(acceptedUnits.indexOf(initUnit) != -1) { validUnit = true; }
    return validUnit;
  };
  
  //Get converted unit
  this.getReturnUnit = function(initUnit) {
    const inputUnits = ['gal','L','mi','km','lbs','kg'];
    const returnUnits = ['L','gal','km','mi','kg','lbs']
    let index = inputUnits.indexOf(initUnit);
    return returnUnits[index];
  };

  //Get spelled out unit name
  this.spellOutUnit = function(unit) {
    const inputUnits = ['gal','L','mi','km','lbs','kg'];
    const returnUnits = ['gallons','liters','miles','kilometers','pounds','kilograms']
    let index = inputUnits.indexOf(unit);
    return returnUnits[index];
  };
  
  //Convert number between metric/imperial
  this.convert = function(initNum, initUnit) {
    //Convert rations
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result; // Number to return
    
    //Equation based on unit
    if(initUnit == 'gal') {result = initNum * galToL}
    else if(initUnit == 'L') {result = initNum / galToL}
    else if(initUnit == 'lbs') {result = initNum * lbsToKg}
    else if(initUnit == 'kg') {result = initNum / lbsToKg}
    else if(initUnit == 'mi') {result = initNum * miToKm}
    else if(initUnit == 'km') {result = initNum / miToKm}
    
    //Return result fixed to 5 decimals converted back into a number
    return Number(result.toFixed(5)); 
  };
  
  //Get string sentance (Number unit coverts to Number unit)
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
