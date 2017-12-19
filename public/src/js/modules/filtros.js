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
const intents = require('./bots/intents/bot_input');

const bot_remove = (e) => {
	if($(e)){
		$(e).remove();
	}
};

const remove = (e) => {
	return $(e).remove();
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
	return '';
};

const is_message = (message) => typeof message === "string" && message.length > 3; 

var bot_spam_buffer = '';

const bot_spam = (message) => {
	if(message !== bot_spam_buffer){
		bot_spam_buffer = message;
		return false;
    }else{
		return true;
	}
};

const run_bot_spam = (message, filter_name = 'Bot Spam Filter') => {
	var sp = bot_spam(message);
	if(sp){
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
		if(/(.*)\&(.*)/.test(id_video)) id_video = id_video.replace('&', '?');
		message = `
			<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
			<iframe class="upload" width="450" height="315" style="margin-top:15px" src="https://www.youtube.com/embed/${id_video}" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
		`;
		console.log(message);
	}
	return message.trim();
};

const run_bot_youtube = (message) => {
	var m = '';
	message.split(' ').map((str) => m += bot_youtube(str) + ' ');
	return m.trim();
};

const bot_urls_media = (message) => {
	const is_video = (video) => `
		<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
		<video width="350" height="315" controls class="upload">
		  <source src="${video.url}" type="video/${video.ext}">
		</video>
	`;
	const is_audio = (audio) => `
		<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
		<audio controls class="upload">
		  <source src="${audio.url}" type="audio/${audio.ext}">
		</audio>
	`;	
	const videos = ['mp4', 'webm', 'mpg', 'wmv', 'mov', 'avi'];
	const audios = ['mp3', 'wav', 'pcm', 'acc', 'ogg', 'wma'];
	if(validateUrl(message)){	
		var ext = '';
		if(message.includes('?')) ext = message.split('?')[0];
		ext = ext.split('.').pop();
		if(videos.includes(ext)) message = is_video({'url': message,'ext': ext});
		if(audios.includes(ext)) message = is_audio({'url': message,'ext': ext});
	}
	return message.trim();
};

const run_bot_urls_media = (message) => {
	var m = '';
	message.split(' ').map((str) => m += bot_urls_media(str) + ' ');
	return m.trim();
};

const bot_input = (message) => {
	let pattern = /^\/bot\s(.*)\s(.*)$/;
	if(pattern.test(message)){
		let data = Array.from(message.match(pattern)).slice(1);
		let comando = data[0].trim();
		if(comando.includes(' ')) comando = comando.split(' ');
		let capture = data[1].trim();
		if(Array.isArray(comando)){
			capture = comando[1] + " " + capture;
			comando = comando[0];
		}
		capture = capture.trim();
		console.log(`Comando: ${comando}, Capture: ${capture}`);
		if(intents[comando] && chat.bot_input){
			intents[comando](capture, socket);
		}
		if(comando === "init"){
			intents[comando](capture, socket);
		}
		return '';
	}
	return message;
};

module.exports = {
	'bot_spam': run_bot_spam,
	'bot_remove': bot_remove,
	'bot_strip_tags': run_strip_tags,
	'bot_youtube': run_bot_youtube,
	'bot_urls_media': run_bot_urls_media,
	'bot_url': run_bot_url,
	'bot_input': bot_input
};