//Submit convert request and display esult
function submitConvert() {
  event.preventDefault();
  
  //Define query for data object
  let query = { input: $("#number-input").val() + $("#unit-select").val() };
  console.log(query);

  $.ajax({
      url: "https://fcc-metimp-convert-kl.glitch.me/api/convert",
      dataType: 'json',
      type: 'GET',
      data: query,
      processData: true,
      error: (function(err) {
        $("#api-output").html("Error: " + err);  
      }),
      success: (function(data) {

        let html = '';

        if(data.hasOwnProperty('error')) {
          html += "<div class='error-display' animated fadeIn>";
            html += "<h4 id='error-heading'>Error</h4>";
            html += "<h3 id='error-message'>" + data.error + "</h3>";
          html += "</div>";
        }
        else{
          
          
          html += "<div class='data-display animated fadeIn'>";
            html += "<div>";
              html += "<h3>" + data.initNum + " " + data.initUnit + "<i class='blank-spacer'></i><i class='fas fa-exchange-alt'></i>" + data.returnNum + " " + data.returnUnit + "</h3>";
            html += "</div>";
            html += "<div class='spacer-block'></div>";
            html += "<div>";
              html += "<h4 id='data-message'>" + data.string + "</h4>";
            html += "</div>";
          
          html += "</div>";
        }
        $("#api-output").html(html);            
      }) // end of success
    }); //end of Ajax 
} // end of submit convert