const { 
	gen_id, 
	session, 
	clear_input,
	user_on_exists,
	to_scroll,
	get_user,
	get_horario
} = require('./modules/utils');
const templates = require('./modules/views');
const filtros = require('./modules/filtros');
const polyfill = require('./modules/polyfill');
const bot_filter = require('./modules/bot_filter');
const $ = require('./modules/selector');
const websockets = require('./modules/sockets')(socket);
const bots = require('./modules/bots/bots');
const ChatCore = require('./modules/chat');
const Chat = new ChatCore(socket);

Chat.use(bots);

Chat.run([
	'new login', 
	'new emit message', 
	'new clear', 
	'new escrevendo', 
	'logout'
]);

if(!session('status')) location.href = './';

bot_filter.set('strip tags', filtros.bot_strip_tags);
bot_filter.set('embed youtube', filtros.bot_youtube);
bot_filter.set('url', filtros.bot_url);
bot_filter.set('anti spam', filtros.bot_spam);

$(".emit-message").addEventListener('keypress', (e) => {
	var node = `[write-id="${get_user()['id']}"]`;
	var message = $(".emit-message").value;
	if(message.length < 2) socket.emit('clear', node);
	if(message.length > 2){
		socket.emit('escrevendo', Object.assign({}, get_user(), {
			'text': get_user()['nome'] + ' está escrevendo.',
			'horario': get_horario(),
			'node': node
		}));
	}
	if(e.keyCode === 13 && message.length > 3 && message.length < 250){
		socket.emit('clear', node);
		message = bot_filter.run(message);
		if(message !== ''){
			console.log(message);
			socket.emit('emit message', Object.assign({}, get_user(), {
				'text': message,
				'horario': get_horario()
			}));
			clear_input();
		}
	}
});

$('.logout').addEventListener('click', () => {
	var rm = (i) => sessionStorage.removeItem(i);
	socket.emit('desconectou', get_user());
	rm('icone');
	rm('nome');
	rm('id');
	rm('status');
	rm('my_id');
	setTimeout(() => location.href = './', 500);
});