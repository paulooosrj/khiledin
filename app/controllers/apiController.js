var User = require('../models/user');
var Isemail = require('isemail');

class ApiController {

  async newUser(req, res) {

      const model = req.body;
      let response = { "msg": "success" };

      try{

        log.success('[Create User]: ' + JSON.stringify(model, null, 4));

        if(Isemail.validate(model.email) === false){
          throw new Error('Email invalido!');
        }

        const request = await User.criarUsuario(model);

      } catch(e){
        log.error('[Error Create User]: ' + e);
        response.msg = e;
      }

      let code = response.msg !== "success" ? 401 : 200;
      res.status(code).json(response);

  }

  async auth(req, res) {

      const model = new User(req.body);
      let response = { "msg": "success" };
      let responseSend = (code) => res.status(code).json(response);
      let user = null;

      if(Isemail.validate(model.email) === false){
        response.msg = "error";
        responseSend(401);
      }

      let find = await User.userExists(model)
          .then(data => data)
          .catch(err => {
            response.msg = err
            return null;
          });

      if(find !== null){
        log.success('[Autenticado]: ' + JSON.stringify(find, null, 4));
        req.session.user = find;
        req.session.save(function(){
          responseSend(200);
        });
      }else{
        log.error('[Nao Autenticado]: ' + find);
        response.msg = "error";
        responseSend(401);
      }

  }

}

module.exports = new ApiController();
