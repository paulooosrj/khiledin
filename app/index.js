const express = require('express');
const compression = require('compression');
const server = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const minify = require('express-minify');
const session = require('express-session');
let MongoStore = require('connect-mongo');
const db = require('./database/index');

global.log = require('signale');
global.fs = require('fs');
global.fileUpload = require('express-fileupload');
global.io = require('socket.io');
global.bots = require('./public/src/js/modules/bots/bots');

class App {

  constructor(){

    this.app = express();
    this.config();
    this.listen();

  }

  config(){

    this.httpServer = this.httpServer();

    // insere sessao no mongodb
    MongoStore = MongoStore(session);

    const sessionInit = session({
      secret: 'keyboard cat',
      resave: false,
      store: new MongoStore({ mongooseConnection: db.connection }),
      saveUninitialized: true,
      cookie: { expires: new Date(253402300000000) }
    });

    // setar metodos essenciais
    this.set(
      [ 'port', process.env.PORT || 3000 ],
      [ 'views', path.join(__dirname, 'views') ],
      [ 'view engine', 'ejs' ],
      [ 'trust proxy', 1 ]
    );

    this.use(
      cookieParser(),
      sessionInit,
      fileUpload(),
      compression(),
      minify(),
      bodyParser.urlencoded({ extended: false }),
      bodyParser.json(),
      [ '/', express.static(__dirname + '/public') ]
    );

    io = io(this.httpServer);

    const routes = require('./routes/index')(this.app);
    const sockets = require('./sockets')(io);

  }

  httpServer(){
    return server.Server(this.app);
  }

  use(...uses){
    return uses.map((useConfig) => Array.isArray(useConfig) ? this.app.use(...useConfig) : this.app.use(useConfig));
  }

  set(...seteds){
    return seteds.map((setConfig) => this.app.set(...setConfig));
  }

  listen(){
    this.httpServer.listen(this.app.get('port'), () =>
      log.success(`[Listening on]: ${ this.app.get('port') }`)
    );
  }

}

module.exports = new App();
