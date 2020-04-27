const path = require('path');

class BotsService {

  bots(req, res) {
    res.render('bots');
  }

  botFind(req, res) {

    const {
      params: {
        id: paramsId = ''
      }
    } = req;

    let bot = bots.find(({
      id
    }) => id === paramsId);

    if (typeof bot === "object") {

      log.success('[Find Bot]: ' + JSON.stringify(bot, null, 4));
      const botFolder = path.resolve(__dirname, '../public/');

      fs.readFile(botFolder + '/' + bot.code, function read(err, data) {
        if (err) res.redirect('../bots');
        if (data === "undefined") res.redirect('../bots');
        res.render('includes/viewbot', {
          'id': bot.id,
          'code': data
        });
      });

    } else {
      res.send('Não existe!!');
    }

  }

  code(req, res) {

    const {
      params: {
        file = ''
      }
    } = req;

    const codeFolder = path.resolve(__dirname, '../public/src/uploads/arquivo/' + file);
    const code = fs.readFileSync(codeFolder, {
      encoding: 'utf8'
    });

    res.render('code', {
      code
    });

  }

}

module.exports = new BotsService();
