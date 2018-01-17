const express = require('express');
const compression = require('compression');
const app = express();
const server = require('http').Server(app);
global.io = require('socket.io')(server);
const path = require('path');
global.fs = require('fs')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
global.fileUpload = require('express-fileupload');
const session = require('express-session');
const minify = require('express-minify');
global.bots = require('./public/src/js/modules/bots/bots');
global.Crawler = require("crawler");

app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(compression());
app.use(minify());
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	'secret': 'chat-do-paulao',
	'resave': false,
	'saveUninitialized': true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require('./vendor/routes')(app, __dirname);
const sockets = require('./vendor/sockets')(io);

server.listen(app.get('port'), () => console.log(`Listening on ${ app.get('port') }`));
