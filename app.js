var express = require('express');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// serve static files using built-in Express middleware - Express.static
app.use(express.static('./public'));

// listen to port
app.listen(3000);
console.log('You are listening to a port 3000');