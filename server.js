'use strict';

var express         = require('express');
var bodyParser      = require('body-parser');
var expect          = require('chai').expect;
var cors            = require('cors');
var sassMiddleware  = require('node-sass-middleware');
var helmet          = require('helmet');

var apiRoutes         = require('./routes/api.js');
var fccTestingRoutes  = require('./routes/fcctesting.js');
var runner            = require('./test-runner');

var app = express();

//Use Sass Middleware to compile sass to css
app.use(sassMiddleware({
    src: __dirname + '/scss',
    dest: __dirname + '/public',
    debug: true,
    outputStyle: 'nested'
}));

app.use(express.static('public'));

app.use(cors({origin: '*'})); //For FCC testing purposes only

//Use default Helmet security: dnsPrefetchControl, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff, xssFilter
app.use(helmet());
// Prevent malicious script/css/plugin injections
/*app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'fonts.googleapis.com', 'cdnjs.cloudflare.com'],
      scriptSrc: ["'self'", 'code.jquery.com']
  }
}));*/

//Use Body Parser to add body to json requests;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/home.html');
});

//API Doc page (static HTML)
app.route('/api-info')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/api-info.html');
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);  
    
//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

//Start our server and tests!
if(!module.parent){ 
  app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port " + process.env.PORT);
    if(process.env.NODE_ENV==='test') {
      console.log('Running Tests...');
      setTimeout(function () {
        try {
          runner.run();
        } catch(e) {
          var error = e;
            console.log('Tests are not valid:');
            console.log(error);
        }
      }, 1500);
    }
  });
}
module.exports = app; //for testing
