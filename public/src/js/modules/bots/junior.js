const { 
    gen_id, 
    session, 
    clear_input,
    user_on_exists,
    to_scroll,
    get_user,
    get_horario,
	removerAcentos,
	bot_write
} = require('../utils');
const bot_filter = require('../bot_filter');
const filtros = require('../filtros');
const templates = require('../views');
const bot_neural_train = require('./intents/junior');

bot_filter.set('bot urls media embed', filtros.bot_urls_media);
bot_filter.set('embed youtube', filtros.bot_youtube);
bot_filter.set('url', filtros.bot_url);

const intents = require('./intents/junior');
const icon = "src/images/junior.png";



const build_bot = (data, receive) => {
	if(receive === "hello init") data.init = true;
	data.return = false;
	data.text = bot_filter.run(data.text);
	data.nome = "Junior Bot";
	data.icon = icon;
	data.is_bot = true;
	data.horario = get_horario();
	data.id = 'junior-bot-user';
	data.node = `[write-id="${data.id}"]`;
	return data;
};

const validate = (message, data, server, event) => {
	message = (event === "login") ? "hello init" : message;
	bot_neural_train.run(message, function(res){
		data.text = res(data);
		send(server, data, 1500);
	});
};

const send = (server, data, time = 1000) => {
	data = build_bot(data);
	server.emit('escrevendo', data);
	setTimeout(() => {
			server.emit('message', data);
			server.emit('clear', data.node);
	}, time);	
};

const callback = (event, data, server) => {
	if(!data.text) return false;
	var receive = removerAcentos(data.text.trim()); 
	validate(receive, data, server, event);
	if(event === 'on'){
		bot_write(document.querySelector('div#junior-bot-user .text-user'), [
			'Diz oi ai vai',
			'To esperando',
			'Me chama ai',
			'To aguardando',
			'Seja legal comigo'
		]);
	}
};

const events = ['on', 'message', 'login'];

const bot_junior = {
	'id': '1',
	'nome': 'junior bot',
	'desc': 'Robô feito para interagir com os usuarios pelo o chat.',
	'on': true,
	'code': 'src/js/modules/bots/junior.js',
	'icon': icon,
	'events': events,
	'call': callback
};

module.exports = bot_junior;
