module.exports = (io) => {

      io.on('connection', function (socket) {

        socket.on('login', function (data) {
          let e = Object.assign({}, data, {
              'my_id': socket.id
          });
          io.emit('new login', e);
        });

        socket.on('clear', function (data) {
          io.emit('new clear', data);
        });

        socket.on('banido', function (data) {
          io.emit('new banido', data);
        });

        socket.on('escrevendo', function (data) {
          io.emit('new escrevendo', data);
        });

        socket.on('emit message', function (data) {
          io.emit('new emit message', data);
        });

        socket.on('chat', function (data) {
          const channels = Object.keys(data);
          channels.map((channel) => {
            io.emit(channel, data[channel]);
          });
        });

        socket.on('desconectou', (data) => {
          io.emit('logout', data);
        });
      
    });
      
};