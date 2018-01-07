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

const callback = (event, data, server) => {
	chat.messages_receive_user.map((people) => {
		if(!user_on_exists(people)){
			chat.peoples++;
			chat.peoples_add.push(people.nome);
			$('.peoples-timeline').append(templates().login(people));
			$('.users-on').html(chat.peoples);
		}
	});
};

const events = ['message', 'escrevendo'];

const bot_new_user = {
	'id': '0',
	'nome': 'new user bot',
	'on': true,
	'code': 'src/js/modules/bots/new_user.js',
	'events': events,
	'call': callback
};

module.exports = bot_new_user;