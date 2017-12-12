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
			$('.peoples-timeline').innerHTML += templates().login(people);
			$('.users-on').innerHTML = chat.peoples;
		}
	});
};

const events = ['new emit message', 'new escrevendo'];

const bot_new_user = {
	'events': events,
	'call': callback
};

module.exports = bot_new_user;