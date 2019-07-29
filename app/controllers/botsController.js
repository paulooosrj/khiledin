const path = require('path');

class BotsController {

    bots(req, res) {
      res.render('bots');
    }

    botFind(req, res) {
      let bot = bots.find(bot => bot.id === req.params.id);
      if(typeof bot === "object"){
        log.success('[Find Bot]: ' + JSON.stringify(bot, null, 4));
        const botFolder = path.resolve(__dirname, '../public/');
        fs.readFile(botFolder + '/' + bot.code, function read(err, data) {
            if (err) res.redirect('../bots');
            if(data === "undefined") res.redirect('../bots');
            res.render('includes/viewbot', {
              'id': bot.id,
              'code': data
            });
        });
      }else{
        res.send('Não existe!!');
      }
    }

    code(req, res) {
      const codeFolder = path.resolve(__dirname, '../public/src/uploads/arquivo/' + req.params.file);
      const code = fs.readFileSync(codeFolder, {
        encoding: 'utf8'
      });
      res.render('code', { code });
    }

}

module.exports = new BotsController();
