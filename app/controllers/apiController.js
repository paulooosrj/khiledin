var UserService = require('../services/user.service');

class ApiController {

  async newUser(req, res) {

    log.pending('[ ApiController -> newUser(req, res) ] iniciando metodo de criar usuario');

    const {
      body: model = {}
    } = req;
    return await UserService.newUser(model, req, res);

  }

  async auth(req, res) {

    log.pending('[ ApiController -> auth(req, res) ] iniciando metodo de criar autenticacao');

    const {
      body: model = {}
    } = req;
    return await UserService.auth(model, req, res);

  }

  async logout(req, res) {

    log.pending('[ ApiController -> logout(req, res) ] iniciando metodo de logout');

    const {
      body: model = {}
    } = req;

    const socket = req.app.get('socketio');
    socket.emit(model.sala + 'logout', model.data);

  }

}

module.exports = new ApiController();
