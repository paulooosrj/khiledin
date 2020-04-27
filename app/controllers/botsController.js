const BotsService = require('../services/bots.service');

class BotsController {

  bots(req, res) {

    log.pending('[ BotsController -> bots(req, res) ] listar os robos');

    return BotsService.bots(req, res);

  }

  botFind(req, res) {

    log.pending('[ BotsController -> botFind(req, res) ] iniciando metodo de buscar robo');

    return BotsService.botFind(req, res);

  }

  code(req, res) {

    log.pending('[ BotsController -> code(req, res) ] iniciando metodo de renderizar codigo do robo');

    return BotsService.code(req, res);

  }

}

module.exports = new BotsController();
