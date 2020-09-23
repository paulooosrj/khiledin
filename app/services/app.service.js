const path = require('path');

class AppService {

  getFullUrl(req) {

    const {
      protocol = 'http'
    } = req;

    let fullUrl = protocol + '://' + req.get('host');

    return process.env.URL || fullUrl;

  }

  getSalaUrl(req) {

    const {
      params: {
        sala = 'global'
      }
    } = req;

    let fullUrl = this.getFullUrl(req);

    return {
      fullUrl,
      sala
    };

  }

  async redirectRoom(req, res) {

    let {
      fullUrl,
      sala
    } = this.getSalaUrl(req);
    res.redirect(fullUrl + '/room/' + sala);

  }

  async room(req, res) {

    let {
      fullUrl,
      sala = 'global'
    } = this.getSalaUrl(req);
    let {
      session: {
        user = null
      }
    } = req;

    console.log({ user, sala, fullUrl })
 
    if (user) {

      console.log("AQUI!!")

      let {
        username: nome,
        _id: user_id,
        icon
      } = user;

      const userRender = JSON.stringify({
        nome,
        user_id,
        icon
      });

      res.render('room', {
        bots,
        user: userRender,
        sala,
        url: fullUrl
      });

    } else {

      if (sala !== "global") {
        res.redirect(fullUrl + '/#/room/' + sala);
      }

      res.redirect(fullUrl);

    }

  }

  async reRoom(req, res) {

    let {
      fullUrl,
      sala = 'global'
    } = this.getSalaUrl(req);
    let {
      session: {
        user = null
      }
    } = req;

    if (user) {

      let userRender = {
        'nome': user.username,
        'user_id': user._id,
        'icon': user.icon
      };

      res.render('re-room', {
        'bots': bots,
        'user': JSON.stringify(userRender),
        'sala': sala,
        'url': fullUrl
      });

    } else {

      if (sala !== "global") {
        res.redirect(fullUrl + '/#/room/' + sala);
      }

      res.redirect(fullUrl);

    }

  }

  async upload(req, res) {

    const {
      files = null, params: {
        type = ''
      }
    } = req;

    let data = {
      "msg": ''
    };

    if (!files) {
      data.msg = 'No files were uploaded.';
    }

    const getType = {
      video: () => 'src/uploads/video/',
      imagem: () => 'src/uploads/imagem/',
      audio: () => 'src/uploads/audio/',
      arquivo: () => 'src/uploads/arquivo/'
    };

    let folder = getType[type]();
    let {
      fileUpload: sampleFile
    } = files;

    let new_name = Math.floor(Math.random() * 100000) + '-' + sampleFile.name;
    new_name = new_name.replace(/\s/g, '');

    sampleFile.mv("app/public/" + folder + new_name, function (err) {

      data.msg = err ? err : 'success';
      data.path = err ? '' : folder + new_name;
      log[err ? 'error' : 'success']('[Upload Sucesso]: ', JSON.stringify(data, null, 4));

      res.send(data);

    });

  }

  async logout(req, res) {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.redirect('/');
    });
  }

}

module.exports = new AppService();
