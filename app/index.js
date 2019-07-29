const express = require('express'),
      compression = require('compression'),
      app = express(),
      server = require('http').Server(app),
      path = require('path'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      minify = require('express-minify'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      db = require('./database/index'),
      used = (...u) => u.map(uu => Array.isArray(uu) ? app.use(...uu) : app.use(uu)),
      seted = (...s) => s.map(ss => app.set(...ss)),
      sessionn = session({
        secret: 'keyboard cat',
        resave: false,
        store: new MongoStore({ mongooseConnection: db.connection }),
        saveUninitialized: true,
        cookie: { expires: new Date(253402300000000) }
      });

global.log = require('signale');
global.fs = require('fs');
global.fileUpload = require('express-fileupload');
global.io = require('socket.io')(server);
global.bots = require('./public/src/js/modules/bots/bots');

seted(
  [ 'port', process.env.PORT || 3000 ],
  [ 'views', path.join(__dirname, 'views') ],
  [ 'view engine', 'ejs' ],
  [ 'trust proxy', 1 ]
);

used(
  cookieParser(),
  sessionn,
  fileUpload(),
  compression(),
  minify(),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
  [ '/', express.static(__dirname + '/public') ]
);

const routes = require('./routes/index')(app);
const sockets = require('./sockets')(io);

server.listen(app.get('port'), () =>
  log.success(`[Listening on]: ${ app.get('port') }`)
);
