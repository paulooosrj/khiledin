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

bot_filter.set('bot urls media embed', filtros.bot_urls_media);
bot_filter.set('embed youtube', filtros.bot_youtube);
bot_filter.set('url', filtros.bot_url);

const intents = require('./intents/junior');
const icon = "src/images/junior.png";

const build_bot = (data, receive) => {
	var test = validate(receive, data);
	if(receive === "hello init") data.init = true;
	data.return = false;
	if(test){
		data.return = true;
		data.text = test.trim();
	}
	data.text = bot_filter.run(data.text);
	data.nome = "Junior Bot";
	data.icon = icon;
	data.is_bot = true;
	data.horario = get_horario();
	data.id = 'junior-bot-user';
	data.node = `[write-id="${data.id}"]`;
	return data;
};

const validate = (message, data) => {
	let is_intent = (i, m) => i.test(m);
	var find = false;
	Object.keys(intents).map((intent) => {
		var intent_text = intent;
		intent = new RegExp(intent, 'i');
		if(is_intent(intent, message) && !find){
			var extract = '';
			if(intent_text.includes('(.*')){
				extract = message.match(intent);
				if(Array.isArray(extract)){
					var [,...r] = extract;
					extract = r;
				}
			}
			find = intents[intent_text](data, extract);
		}
	});
	return find;
};

const callback = (event, data, server) => {
	var receive = '';
	if(data.text){
		receive = removerAcentos(data.text.trim().toLowerCase());
	}
	if(Object.keys(data).includes('is_bot') === false && event === 'message'){
		data = build_bot(data, receive);
		if(data.text !== '' && data.return){
			server.emit('escrevendo', data);
			setTimeout(() => {
					server.emit('message', data);
					server.emit('clear', data.node);
			}, 1000);
		}
	}
	if(Object.keys(data).includes('is_bot') === false && event === 'login'){
		data = build_bot(data, 'hello init');
		if(data.text !== '' && data.return){
			server.emit('escrevendo', data);
			setTimeout(() => {
					server.emit('message', data);
					server.emit('clear', data.node);
			}, 1000);
		}
	}
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