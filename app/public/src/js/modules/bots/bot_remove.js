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

const make_date = (d) => {
	let da = new Date();
	var explode = d.split(':');
	var hora = explode[0];
	var minuto = explode[1];
	var segundo = explode[2];
	da.setHours(hora);
	da.setMinutes(minuto);
	da.setSeconds(segundo);
	return da;
};

const get_end = (id) => {
	var end_message = Array.from(document.querySelectorAll('.message[id="'+id+'"]')).pop();
	end_message = end_message;
	if($(end_message).attr('data-user')){
		let end = JSON.parse(end_message.dataset.user);
		let ultima_hora = new Date() - make_date(end.horario);
		return ultima_hora;
	}
};

const logout = () => {
	var rm = (i) => sessionStorage.removeItem(i);
	socket.emit('desconectou', get_user());
	rm('icone');
	rm('nome');
	rm('id');
	rm('status');
	rm('my_id');
	setTimeout(() => location.href = './', 500);
};

const callback = (event, data, server) => {
	Array.from(document.querySelectorAll('.people')).map((people) => {
		var id = $(people).attr('id');
		var end = get_end(id);
		var max_time_off = 30 * 60000;
		if(end >= max_time_off && !id.includes('bot')){
			var p = $('.people[id="'+id+'"]');
			p.remove();
			if(id === get_user()['id']) logout();
		}
	});
};

const events = ['on', 'write', 'message', 'login'];
const icon = "src/images/bot-remove.png";

const bot_remove = {
	'id': '2',
	'nome': 'bot remove',
	'desc': 'Robô feito para remover usuarios inativos do chat.',
	'on': true,
	'code': 'src/js/modules/bots/bot_remove.js',
	'icon': icon,
	'events': events,
	'call': callback
};

module.exports = bot_remove;