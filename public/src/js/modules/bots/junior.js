const { 
    gen_id, 
    session, 
    clear_input,
    user_on_exists,
    to_scroll,
    get_user,
    get_horario
} = require('../utils');

const templates = require('../views');

const intents = {
	"hello init": (data) => `Olá ${data.nome} seja bem vindo ao chat, meu nome é Junior e estou aqui sempre que Precisar!!`,
	"voce ta bem?": (data) => `To sim e você ${data.nome}?`,
	"oi junior": (data) => `Oie ${data.nome}, tudo bem com você?`
};

const build_bot = (data, receive) => {
	data.text = intents[receive](data);
	data.nome = "Junior Bot";
	data.icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Logo_wikibot.svg/1024px-Logo_wikibot.svg.png";
	data.is_bot = true;
	data.horario = get_horario();
	return data;
};

const callback = (event, data, server) => {
	console.log(event);
	var receive = data.text.trim().toLowerCase();
	if(intents[receive] && !data.is_bot && event === 'new emit message'){
		data = build_bot(data, receive);
		server.emit('emit message', data);
	}
	if(!data.is_bot && event === 'new login'){
		data = build_bot(data, 'hello init');
		server.emit('emit message', data);
	}
};

const events = ['new emit message', 'new login'];

const bot_junior = {
	'events': events,
	'call': callback
};

module.exports = bot_junior;