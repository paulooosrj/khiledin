
class AppController {

  async redirectRoom(req, res) {
    let fullUrl = req.protocol + '://' + req.get('host');
    res.redirect(fullUrl + '/room/' + req.params.sala);
  }

  async room(req, res) {
    let fullUrl = req.protocol + "://" + req.get('host');
    let sala = req.params.sala || "global";
    let session = req.session;
    if(!session.user){
      if(sala !== "global") res.redirect(fullUrl + '/#/room/' + sala);
      res.redirect(fullUrl);
    }
    if(session.user){
      let { username: nome, _id: user_id, icon } = session.user;
      const user = JSON.stringify({ nome, user_id, icon });
      res.render('room', { bots, user, sala, url: fullUrl });
    }
  }

  async reRoom(req, res) {
      let fullUrl = req.protocol + "://" + req.get('host');
      let sala = req.params.sala || "global";
      let session = req.session;
      if(!req.session.user){
        if(sala !== "global") res.redirect(fullUrl + '/#/room/' + sala);
        res.redirect(fullUrl);
      }
      if(session.user){
        let user = {
          'nome': session.user.username,
          'user_id': session.user._id,
          'icon': session.user.icon
        };
        res.render('re-room', {
          'bots': bots,
          'user': JSON.stringify(user),
          'sala': sala,
          'url': fullUrl
        });
      }
  }

  async upload(req, res) {
    let data = {"msg": ''};
    if (!req.files) data.msg = 'No files were uploaded.';
    const getType = {
      video: () => 'src/uploads/video/',
      imagem: () => 'src/uploads/imagem/',
      audio: () => 'src/uploads/audio/',
      arquivo: () => 'src/uploads/arquivo/'
    };
    const { type } = req.params;
    let folder = getType[type]();
    let sampleFile = req.files.fileUpload;
    let new_name = Math.floor(Math.random() * 100000) + '-' + sampleFile.name;
    new_name = new_name.replace(/\s/g, '');
    const pathCode = path.resolve(__dirname, '../public/');
    sampleFile.mv("app/public/" + folder + new_name, function(err) {
      if (err){
        data.msg = err;
        log.error('[Upload Error]: ', JSON.stringify(data, null, 4));
      }else{
        data.msg = 'success';
        data.path = folder + new_name;
        log.success('[Upload Sucesso]: ', JSON.stringify(data, null, 4));
      }
      res.send(data);
    });
  }

  async logout(req, res) {
    req.session.destroy(function(err) {
        if(err) throw err;
        res.redirect('/');
    });
  }

}

module.exports = new AppController();
