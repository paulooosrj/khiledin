const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const fs = require('fs')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const minify = require('express-minify');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(minify());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.render('index', {
    'title': 'Meu Titulo'
  });
});

app.get('/room', (req, res) => {
  res.render('room');
});

io.on('connection', function (socket) {


  //socket.emit('news', { hello: 'world' });
  socket.on('login', function (data) {
    console.log(data.nome + " entrou na sala.");
    let e = Object.assign({}, data, {
        'my_id': socket.id
    });
    io.emit('new login', e);
  });

  socket.on('clear', function (data) {
    console.log(data + " limpou a mensagem.");
    io.emit('new clear', data);
  });

  socket.on('escrevendo', function (data) {
    console.log(data.nome + " esta escrevendo.");
    io.emit('new escrevendo', data);
  });

  socket.on('emit message', function (data) {
    console.log('Emit message: ' + data.text);
    io.emit('new emit message', data);
  });

  socket.on('chat', function (data) {
    const channels = Object.keys(data);
    channels.map((channel) => {
      console.log('Emit channel ' + channel);
      console.log(data[channel]);
      io.emit(channel, data[channel]);
    });
  });

  socket.on('desconectou', (data) => {
    io.emit('logout', data);
  });

});

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

/**/