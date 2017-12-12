const { 
    gen_id, 
    session, 
    clear_input,
    user_on_exists,
    to_scroll,
    get_user,
    get_horario
} = require('./utils');

const templates = require('./views');

const bot_remove = (e) => {
	var bot = setInterval(() => {
		if($(e)){
			$(e).parentNode.removeChild($(e));
			clearInterval(bot);
		}
	}, 100);
};
const remove = (e) => {
	console.log(e);
	return $(e).parentNode.removeChild($(e));
};

const get_bg = (domain) => {

	const colors = {
		'google': '#0057e7',
		'youtube': '#cc181e',
		'facebook': '#3b5998',
		'github': '#333',
		'default': '#3498db'
	};

	return (colors[domain]) ? colors[domain] : colors['default']; 

};

const is_spam = () => {
	clear_input();
	$('.emit-message').setAttribute('placeholder', `Sem spam ${get_user()['nome']}`);
	return '';
};

const is_message = (message) => typeof message === "string" && message.length > 3; 

const bot_spam = (message) => {

	if(!bot_spam.buffer) bot_spam.buffer = '';
	
	if(message !== bot_spam.buffer){
		bot_spam.buffer = message;
		return false;
    }else{
		return true;
	}

};

const run_bot_spam = (message, filter_name = 'Bot Spam Filter') => {
	if(bot_spam(message)){
		return is_spam();
	}
	return message.trim();
};

const bot_strip_tags = (message) => {
	var strip = document.createElement('div');
	strip.innerHTML = message;
	return strip.textContent.trim();
};

const run_strip_tags = (message, filter_name = 'Bot Strip Tags Filter') => {
	return bot_strip_tags(message).trim();
};

const validateUrl = (value) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

const bot_url = (message) => {
	if(validateUrl(message)){
		var a = document.createElement('a');
    	a.href = message;
		var explode = a.hostname.split('.');
		var domain = (explode[0] === 'www') ? explode[1] : explode[0];
		var bg = get_bg(domain);
  		message = `
			<a href="${message}" style="background:${bg}" class="btn-link" target="__blank">
				${domain}
			</a>
  		`;
	}
	return message.trim();
};

const run_bot_url = (message) => {
	var m = '';
	message.split(' ').map((str) => m += bot_url(str) + ' ');
	return m.trim();
};

const bot_youtube = (message) => {
	const is_youtube = (url) => {
		var pattern1 = 'https://youtu.be/';
		var pattern2 = 'youtube.com/watch?v=';
		if(url.includes(pattern1)) return pattern1;
		if(url.includes(pattern2)) return pattern2;
		return false;
	};
	var pattern = is_youtube(message);
	if(validateUrl(message) && pattern){
		var id_video = message.split(pattern).pop();
		message = `
			<iframe width="350" height="315" style="margin-top:15px" src="https://www.youtube.com/embed/${id_video}" 
			frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
		`;
	}
	return message.trim();
};

const run_bot_youtube = (message) => {
	var m = '';
	message.split(' ').map((str) => m += bot_youtube(str) + ' ');
	return m.trim();
};

module.exports = {
	'bot_url': run_bot_url,
	'bot_spam': run_bot_spam,
	'bot_remove': bot_remove,
	'bot_strip_tags': run_strip_tags,
	'bot_youtube': run_bot_youtube
};