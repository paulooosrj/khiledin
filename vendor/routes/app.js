var express = require('express');
var router = express.Router();
var prod = false;

router.get('/s/:sala', (req, res) => {
	let fullUrl = req.protocol + '://' + req.get('host');
	console.log('Redir: ' + fullUrl + '/room/' + req.params.sala);
	res.redirect(fullUrl + '/room/' + req.params.sala);
});

router.get('/room/:sala?', (req, res) => {
	  let protocol = (prod) ? 'https://' : 'http://';
	  let fullUrl = protocol + req.get('host');
	  let sala = req.params.sala || "global";
	  let session = req.session;
	  if(req.protocol === "https"){
	  	res.redirect('http://' + req.get('host'));
	  }
	  if(!req.session._id){
	  	if(sala !== "global") res.redirect(fullUrl + '/#/room/' + sala);
	  	res.redirect(fullUrl);
	  }
	  if(session.username && session.icon && session._id){
	  	  let user = {
			'nome': session.username,
			'user_id': session._id,
			'icon': session.icon
		  };
		  res.render('room', {
		    'bots': bots,
		    'user': JSON.stringify(user),
		    'sala': sala,
		    'url': fullUrl
		  });
	  }
});

module.exports = router;
