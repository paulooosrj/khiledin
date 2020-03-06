const AppService = require("../services/app.service");

class AppController {

  async redirectRoom(req, res) {

    log.pending('[ AppController -> redirectRoom(req, res) ] iniciando metodo de redirecionar para sala');

    return await AppService.redirectRoom(req, res);

  }

  async room(req, res) {

    log.pending('[ AppController -> room(req, res) ] iniciando metodo de ir para sala');

    return await AppService.room(req, res);

  }

  async reRoom(req, res) {

    log.pending('[ AppController -> reRoom(req, res) ] iniciando metodo de ir para sala');

    return await AppService.reRoom(req, res);

  }

  async upload(req, res) {

    log.pending('[ AppController -> upload(req, res) ] iniciando metodo de upload');

    return await AppService.upload(req, res);

  }

  async logout(req, res) {

    log.pending('[ AppController -> logout(req, res) ] iniciando metodo de logout');

    return await AppService.logout(req, res);

  }

}

module.exports = new AppController();
