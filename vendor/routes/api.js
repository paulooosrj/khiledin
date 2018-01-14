var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.post('/users/new', function(req, res) {
	var Schema = mongoose.Schema;
  	var userSchema = new Schema({
	  email: { type: String, required: true, unique: true },
	  username: { type: String, unique: true },
	  password: { type: String, required: true },
	  icon: String,
	  admin: Boolean,
	  location: { type: String},
	  created_at: Date,
	  updated_at: Date
	});
	var Cadastro = database.model('Cadastro', userSchema);
  	var Pessoa = new Cadastro(req.body);
  	Pessoa.save(function(err){
  		if(err){
  			res.send(JSON.stringify({
  				"msg": err
  			}))
  		}else{
  			res.send(JSON.stringify({
  				"msg": "success"
  			}))
  		}
  	});
});

router.post('/users/auth', function(req, res){

	let $post = req.body;
	let session = req.session;
	let data = {msg: 'error'};

	if($post.email && $post.password){

		var Pessoa = database.collection('cadastros');
		Pessoa.findOne($post, function(err, user){
			if(err){
				data.msg = err;
				res.send(JSON.stringify(data));
			}else{
				session.cookie.maxAge = 604800000;
				Object.keys(user).map((key) => session[key] = user[key]);
				data.msg = "success";
				res.send(JSON.stringify(data));
			}
		});
	}

});

module.exports = router;
