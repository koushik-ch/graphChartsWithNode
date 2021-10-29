const multer = require('multer');
var express = require('express');


var upload = multer({ dest: 'uploads/' });

//routes handler
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


var app = express();

//bodyparser middlewaare url encoded  
app.use(bodyParser.urlencoded({ extended: false }));

//static files
app.use(express.static('public'));
//ejs
app.set('view engine', 'ejs');

//HomeRoute
app.get('/', routes.homeRoute);

//Upload File
app.post('/upload', upload.single('file'), routes.upload);

//get request for chart
app.get('/chart', routes.drawChart);


//listen at 3000
app.listen(3000, function () {
    console.log('listening on port 3000');
});


