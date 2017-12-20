/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var gen_id = function gen_id() {
  return Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
};

var session = function session(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (value === null) {
    if (sessionStorage.getItem(name)) {
      return sessionStorage.getItem(name);
    } else {
      return null;
    }
  }
  if (value !== null) {
    if (!sessionStorage.getItem(name)) {
      sessionStorage.setItem(name, value);
    }
  }
};

var clear_input = function clear_input() {
  return $('.emit-message').val('');
};

var user_on_exists = function user_on_exists(p) {
  var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';

  // document.querySelector(`.peoples-timeline>div[id="${p.id}"]`)
  return chat.peoples_add.includes(p.nome);
};

var to_scroll = function to_scroll() {
  var o = document.querySelector('.messages');
  $('.messages').animate({ scrollTop: o.scrollHeight }, 'slow');
};

var get_user = function get_user() {
  return {
    'id': user.user_id,
    'nome': user.nome,
    'icon': user.icon
  };
};

var get_horario = function get_horario() {
  var horario = new Date();
  var prefix = function prefix(h) {
    return h < 10 ? "0" + h : h;
  };
  var _ref = [prefix(horario.getHours()), prefix(horario.getMinutes()), prefix(horario.getSeconds())],
      hora = _ref[0],
      minutos = _ref[1],
      segundos = _ref[2];

  return hora + ':' + minutos + ':' + segundos;
};

function html_element(html) {
  var d = document.createElement('div');
  d.innerHTML = html;
  return d.firstChild;
}

function removerAcentos(newStringComAcento) {
  var string = newStringComAcento;
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g
  };
  for (var letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }
  return string;
}

var bot_write = function bot_write(out) {
  var entrys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var $ = document.querySelector.bind(document);
  var cout = entrys.length * 10000 / entrys.length;
  var active = 0;
  var end = entrys.length - 1;
  var w_bot = setInterval(function () {
    var a = entrys[active];
    out.innerHTML = a;
    active++;
    if (active > end) active = 0;
  }, cout);
};

module.exports = {
  gen_id: gen_id,
  session: session,
  clear_input: clear_input,
  user_on_exists: user_on_exists,
  to_scroll: to_scroll,
  get_user: get_user,
  get_horario: get_horario,
  html_element: html_element,
  removerAcentos: removerAcentos,
  bot_write: bot_write
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var is_link = function is_link(m) {
  var p1 = /(.*)<a(.*)>(.*)<\/a>(.*)/;
  var p2 = /(.*)<iframe(.*)>(.*)<\/iframe>(.*)/;
  // m = m.replace(/\s\s/gi, '').replace(/\n/gi, '');
  if (p1.test(m)) return m;
  if (p2.test(m)) return m;
  return false;
};

var templates = function templates() {
  return {
    'login': function login(data) {
      return '\n            <div class="people" id="' + data.id + '">\n              <span class="status-active"></span>\n              <p class="name">' + data.nome + '</p>\n              <img src="' + data.icon + '" alt="" class="my-icon">\n              <div class="user-message"></div>\n            </div>\n      ';
    },
    'ons': function ons(data) {
      return '<span class="users-on spanabble">' + data.ons + '</span>';
    },
    'message': function message(data) {
      if (data.nome === null) return '';
      return $('\n              <div id="' + data.id + '" class="message">\n                <div class="user">\n                  <img src="' + data.icon + '" alt="">\n                </div>\n                <span class="arrow"></span> \n                <div class="body">\n                  <p class="name-user">' + data.nome + '</p>\n                  <div class="text" ' + (is_link(data.text) ? 'style="flex-direction:column;"' : '') + '>' + data.text + '</div>\n                  <div class="time">' + data.horario + '</div>\n                </div>\n              </div>\n          ').attr('data-user', JSON.stringify(data));
    },
    'message_people': function message_people(data) {
      var tpl = function tpl(number) {
        return '\n              <span class="arrow-user" style="border-right: 7.5px solid #2ecc71;"></span>\n              <div class="message">\n                <div class="text-user" style="background:#2ecc71">' + number + '</div>\n              </div>\n          ';
      };
      var $el = '';
      if (!document.querySelector('.people-active')) {
        console.log($('div.people[id="' + data.id + '"]>img'));
        $('div.people[id="' + data.id + '"]>img').css('border', '1.5px solid #2ecc71');
        $el = $('div.people[id="' + data.id + '"] .user-message');
        $el.addClass('people-active');
        $el.html(tpl('Nova Mensagem'));
      }
      if (document.querySelector('.people-active')) {
        $('.people-active').parent().find('img').css('border', 'none');
        $('.people-active').html('');
        $('.people-active').removeClass('people-active');
        $el = $('div.people[id="' + data.id + '"] .user-message');
        $el.addClass('people-active');
        $el.html(tpl('Nova Mensagem'));
        $('div.people[id="' + data.id + '"]>img').css('border', '1.5px solid #2ecc71');
      }
      return $el;
    },
    'logout': function logout(data) {
      return $('\n              <div id="' + data.id + '" class="message">\n                <div class="user">\n                  <img src="' + data.icon + '" alt="">\n                </div>\n                <span class="arrow"></span> \n                <div class="body">\n                  <p class="name-user">' + data.nome + '</p>\n                  <div class="text">' + data.nome + ' saiu da sala.</div>\n                  <div class="time">' + data.horario + '</div>\n                </div>\n              </div>\n          ').attr('data-user', JSON.stringify(data));
    },
    'message_write': function message_write(data) {
      return $('\n            <div write-id="' + data.id + '" class="message">\n              <div class="user">\n                <img src="' + data.icon + '" alt="">\n              </div>\n              <span class="arrow"></span> \n              <div class="body">\n                <p class="name-user">' + data.nome + '</p>\n                <div class="text">' + data.nome + ' est\xE1 escrevendo.</div>\n                <div class="time">' + data.horario + '</div>\n              </div>\n            </div>\n          ');
    }
  };
};

module.exports = templates;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    gen_id = _require.gen_id,
    session = _require.session,
    clear_input = _require.clear_input,
    user_on_exists = _require.user_on_exists,
    to_scroll = _require.to_scroll,
    get_user = _require.get_user,
    get_horario = _require.get_horario;

var templates = __webpack_require__(1);
var intents = __webpack_require__(4);

var bot_remove = function bot_remove(e) {
	if ($(e)) {
		$(e).remove();
	}
};

var remove = function remove(e) {
	return $(e).remove();
};

var get_bg = function get_bg(domain) {

	var colors = {
		'google': '#0057e7',
		'youtube': '#cc181e',
		'facebook': '#3b5998',
		'github': '#333',
		'default': '#3498db'
	};

	return colors[domain] ? colors[domain] : colors['default'];
};

var is_spam = function is_spam() {
	clear_input();
	return '';
};

var is_message = function is_message(message) {
	return typeof message === "string" && message.length > 3;
};

var bot_spam_buffer = '';

var bot_spam = function bot_spam(message) {
	if (message !== bot_spam_buffer) {
		bot_spam_buffer = message;
		return false;
	} else {
		return true;
	}
};

var run_bot_spam = function run_bot_spam(message) {
	var filter_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Bot Spam Filter';

	var sp = bot_spam(message);
	if (sp) {
		return is_spam();
	}
	return message.trim();
};

var bot_strip_tags = function bot_strip_tags(message) {
	var strip = document.createElement('div');
	strip.innerHTML = message;
	return strip.textContent.trim();
};

var run_strip_tags = function run_strip_tags(message) {
	var filter_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Bot Strip Tags Filter';

	return bot_strip_tags(message).trim();
};

var validateUrl = function validateUrl(value) {
	return (/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
	);
};

var bot_url = function bot_url(message) {
	if (validateUrl(message)) {
		var a = document.createElement('a');
		a.href = message;
		var explode = a.hostname.split('.');
		var domain = explode[0] === 'www' ? explode[1] : explode[0];
		var bg = get_bg(domain);
		message = '\n\t\t\t<a href="' + message + '" style="background:' + bg + '" class="btn-link" target="__blank">\n\t\t\t\t' + domain + '\n\t\t\t</a>\n  \t\t';
	}
	return message.trim();
};

var run_bot_url = function run_bot_url(message) {
	var m = '';
	message.split(' ').map(function (str) {
		return m += bot_url(str) + ' ';
	});
	return m.trim();
};

var bot_youtube = function bot_youtube(message) {
	var is_youtube = function is_youtube(url) {
		var pattern1 = 'https://youtu.be/';
		var pattern2 = 'youtube.com/watch?v=';
		if (url.includes(pattern1)) return pattern1;
		if (url.includes(pattern2)) return pattern2;
		return false;
	};
	var pattern = is_youtube(message);
	if (validateUrl(message) && pattern) {
		var id_video = message.split(pattern).pop();
		if (/(.*)\&(.*)/.test(id_video)) id_video = id_video.replace('&', '?');
		message = '\n\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t<iframe class="upload" width="450" height="315" style="margin-top:15px" src="https://www.youtube.com/embed/' + id_video + '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>\n\t\t';
		console.log(message);
	}
	return message.trim();
};

var run_bot_youtube = function run_bot_youtube(message) {
	var m = '';
	message.split(' ').map(function (str) {
		return m += bot_youtube(str) + ' ';
	});
	return m.trim();
};

var bot_urls_media = function bot_urls_media(message) {
	var is_video = function is_video(video) {
		return '\n\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t<video width="350" height="315" controls class="upload">\n\t\t  <source src="' + video.url + '" type="video/' + video.ext + '">\n\t\t</video>\n\t';
	};
	var is_audio = function is_audio(audio) {
		return '\n\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t<audio controls class="upload">\n\t\t  <source src="' + audio.url + '" type="audio/' + audio.ext + '">\n\t\t</audio>\n\t';
	};
	var videos = ['mp4', 'webm', 'mpg', 'wmv', 'mov', 'avi'];
	var audios = ['mp3', 'wav', 'pcm', 'acc', 'ogg', 'wma'];
	if (validateUrl(message)) {
		var ext = '';
		if (message.includes('?')) ext = message.split('?')[0];
		ext = ext.split('.').pop();
		if (videos.includes(ext)) message = is_video({ 'url': message, 'ext': ext });
		if (audios.includes(ext)) message = is_audio({ 'url': message, 'ext': ext });
	}
	return message.trim();
};

var run_bot_urls_media = function run_bot_urls_media(message) {
	var m = '';
	message.split(' ').map(function (str) {
		return m += bot_urls_media(str) + ' ';
	});
	return m.trim();
};

var bot_input = function bot_input(message) {
	var pattern = /^\/bot\s(.*)\s(.*)$/;
	if (pattern.test(message)) {
		var data = Array.from(message.match(pattern)).slice(1);
		var comando = data[0].trim();
		if (comando.includes(' ')) comando = comando.split(' ');
		var capture = data[1].trim();
		if (Array.isArray(comando)) {
			capture = comando[1] + " " + capture;
			comando = comando[0];
		}
		capture = capture.trim();
		console.log('Comando: ' + comando + ', Capture: ' + capture);
		if (intents[comando] && chat.bot_input) {
			intents[comando](capture, socket);
		}
		if (comando === "init") {
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	var Bot = function () {
		function Bot() {
			_classCallCheck(this, Bot);

			this.filters = new Map();
			return this;
		}

		_createClass(Bot, [{
			key: "set",
			value: function set(name, value) {
				this.filters.set(name, value);
			}
		}, {
			key: "get_filters",
			value: function get_filters() {
				return this.filters.getAll();
			}
		}, {
			key: "run",
			value: function run(message) {
				message = message.trim();
				var message = this.get_filters().reduce(function (filter_ant, filter_atual) {
					return filter_atual(filter_ant);
				}, message);
				return message;
			}
		}]);

		return Bot;
	}();

	;

	return new Bot();
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var banir = function banir(id, server) {
	Array.from(document.querySelectorAll('.people .name')).map(function (node) {
		if ($(node).html() === id) {
			$('.emit-message').val('');
			var _id = $(node).parent().attr('id');
			var data = $('div#' + _id + '.message').data().user;
			$('div#' + _id + '.people').remove();
			$('div#' + _id + '.message').remove();
			server.emit('banido', data);
		}
	});
};

var init = function init(hash, server) {
	$('.emit-message').val('');
	if (btoa(hash) === "key") {
		chat.bot_input = true;
		$('.emit-message').attr('placeholder', 'Bot input iniciado com sucesso.');
	}
};

module.exports = {
	"ban": banir,
	"init": init
};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [__webpack_require__(7), __webpack_require__(8), __webpack_require__(10)];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    gen_id = _require.gen_id,
    session = _require.session,
    clear_input = _require.clear_input,
    user_on_exists = _require.user_on_exists,
    to_scroll = _require.to_scroll,
    get_user = _require.get_user,
    get_horario = _require.get_horario;

var templates = __webpack_require__(1);

var callback = function callback(event, data, server) {
	chat.messages_receive_user.map(function (people) {
		if (!user_on_exists(people)) {
			chat.peoples++;
			chat.peoples_add.push(people.nome);
			$('.peoples-timeline').append(templates().login(people));
			$('.users-on').html(chat.peoples);
		}
	});
};

var events = ['message', 'escrevendo'];

var bot_new_user = {
	'id': '0',
	'nome': 'new user bot',
	'on': true,
	'code': 'src/js/modules/bots/new_user.js',
	'events': events,
	'call': callback
};

module.exports = bot_new_user;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _require = __webpack_require__(0),
    gen_id = _require.gen_id,
    session = _require.session,
    clear_input = _require.clear_input,
    user_on_exists = _require.user_on_exists,
    to_scroll = _require.to_scroll,
    get_user = _require.get_user,
    get_horario = _require.get_horario,
    removerAcentos = _require.removerAcentos,
    bot_write = _require.bot_write;

var bot_filter = __webpack_require__(3);
var filtros = __webpack_require__(2);
var templates = __webpack_require__(1);

bot_filter.set('bot urls media embed', filtros.bot_urls_media);
bot_filter.set('embed youtube', filtros.bot_youtube);
bot_filter.set('url', filtros.bot_url);

var intents = __webpack_require__(9);
var icon = "src/images/junior.png";

var build_bot = function build_bot(data, receive) {
	var test = validate(receive, data);
	if (receive === "hello init") data.init = true;
	if (test) {
		data.text = test.trim();
	}
	data.text = bot_filter.run(data.text);
	data.nome = "Junior Bot";
	data.icon = icon;
	data.is_bot = true;
	data.horario = get_horario();
	data.id = 'junior-bot-user';
	data.node = '[write-id="' + data.id + '"]';
	return data;
};

var validate = function validate(message, data) {
	var is_intent = function is_intent(i, m) {
		return i.test(m);
	};
	var find = false;
	Object.keys(intents).map(function (intent) {
		var intent_text = intent;
		intent = new RegExp(intent, 'i');
		if (is_intent(intent, message) && !find) {
			var extract = '';
			if (intent_text.includes('(.*')) {
				extract = message.match(intent);
				if (Array.isArray(extract)) {
					var _extract = extract,
					    _extract2 = _toArray(_extract),
					    r = _extract2.slice(1);

					extract = r;
				}
			}
			find = intents[intent_text](data, extract);
		}
	});
	return find;
};

var callback = function callback(event, data, server) {
	var receive = '';
	if (data.text) {
		receive = removerAcentos(data.text.trim().toLowerCase());
	}
	if (Object.keys(data).includes('is_bot') === false && event === 'message') {
		data = build_bot(data, receive);
		if (data.text !== '') {
			server.emit('escrevendo', data);
			setTimeout(function () {
				server.emit('emit message', data);
				server.emit('clear', data.node);
			}, 1000);
		}
	}
	if (Object.keys(data).includes('is_bot') === false && event === 'login') {
		data = build_bot(data, 'hello init');
		if (data.text !== '') {
			server.emit('escrevendo', data);
			setTimeout(function () {
				server.emit('emit message', data);
				server.emit('clear', data.node);
			}, 1000);
		}
	}
	if (event === 'on') {
		bot_write(document.querySelector('div#junior-bot-user .text-user'), ['Diz oi ai vai', 'To esperando', 'Me chama ai', 'To aguardando', 'Seja legal comigo']);
	}
};

var events = ['on', 'message', 'login'];

var bot_junior = {
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var def = function def() {
	return 'N\xE3o entendi sua pergunta.';
};

var hello = function hello(data, extract) {
	return '\n\t\tOl\xE1 ' + data.nome + ' seja bem vindo ao chat, \n\t\tmeu nome \xE9 Junior e estou aqui sempre que Precisar!! \uD83D\uDE04 \n\t';
};

var musica = function musica(data, extract) {
	if (extract.length > 1) {
		var pergunta = extract[2];
		pergunta = pergunta.trim();
		if (/funk/gim.test(pergunta)) {
			return '\n\t\t\t\thttps://www.youtube.com/watch?v=qc3rKuLI_uM\n\t\t\t';
		}
		if (/sertanejo/gim.test(pergunta)) {
			return '\n\t\t\t\thttps://www.youtube.com/watch?v=HVlUnTekqqU\n\t\t\t';
		}
		if (/rock/gim.test(pergunta)) {
			return '\n\t\t\t\thttps://www.youtube.com/watch?v=CSvFpBOe8eY\n\t\t\t';
		}
	}
	return def();
};

var voce_bem = function voce_bem(data, extract) {
	data.payload = "https://www.youtube.com/watch?v=AxmsC2arlHk&start=18";
	data.bot = {
		'nome': 'Junior Bot',
		'icone': 'src/images/junior.png',
		'node': '[write-id="junior-bot-user"]'
	};
	var pay = JSON.stringify(data);
	return '\n\t\tTo sim ' + data.nome + ' \uD83D\uDE01, quer ver um video Engra\xE7ado?\n\t\t<button style="background:#3498db;border:none;cursor:pointer;" onclick="payload_event(this)" class="btn-link" data-payload=\'' + pay + '\'>\n\t\t\tAssistir Video\n\t\t</button>\n\t';
};

var oi = function oi(data, extract) {
	$('.junior-bot-user .user-message').css('display', 'none');
	return 'Oie ' + data.nome + ', tudo bem com voc\xEA? \uD83E\uDD17';
};

var criador = function criador(data, extract) {
	return 'Meu criador \xE9 https://github.com/PaulaoDev';
};

var qual = function qual(data, extract) {
	if (extract.length > 1) {
		var pergunta = extract[1];
		pergunta = pergunta.trim();
		if (/meu nome/gim.test(pergunta)) {
			return 'Seu nome \xE9 ' + data.nome + ' \uD83E\uDD17';
		}
	}
	return def();
};

var memes = function memes() {
	return 'https://www.youtube.com/watch?v=AxmsC2arlHk&start=76&autoplay=1';
};

module.exports = {
	"hello init": hello,
	"^(junior|junior bot) quem e seu criador$": criador,
	"(.*)(junior|junior bot) (eu|eu quero|quero) ouvir(.*)": musica,
	"^(.*)ta bem (junior|junior bot)\\?$": voce_bem,
	"^o?(i|ie|la|ei) (junior|junior bot)$": oi,
	"^(junior|junior bot) qual e(.*)": qual,
	"^(junior|junior bot) quero (rir|ficar (?:feliz|alegre)?|dar risada|(?:ver)? ?video engracado|rir (.*)|ver memes?|memes?)$": memes
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    gen_id = _require.gen_id,
    session = _require.session,
    clear_input = _require.clear_input,
    user_on_exists = _require.user_on_exists,
    to_scroll = _require.to_scroll,
    get_user = _require.get_user,
    get_horario = _require.get_horario,
    removerAcentos = _require.removerAcentos,
    bot_write = _require.bot_write;

var make_date = function make_date(d) {
	var da = new Date();
	var explode = d.split(':');
	var hora = explode[0];
	var minuto = explode[1];
	var segundo = explode[2];
	da.setHours(hora);
	da.setMinutes(minuto);
	da.setSeconds(segundo);
	return da;
};

var get_end = function get_end(id) {
	var end_message = Array.from(document.querySelectorAll('.message[id="' + id + '"]')).pop();
	end_message = end_message;
	if ($(end_message).attr('data-user')) {
		var end = JSON.parse(end_message.dataset.user);
		var ultima_hora = new Date() - make_date(end.horario);
		return ultima_hora;
	}
};

var logout = function logout() {
	var rm = function rm(i) {
		return sessionStorage.removeItem(i);
	};
	socket.emit('desconectou', get_user());
	rm('icone');
	rm('nome');
	rm('id');
	rm('status');
	rm('my_id');
	setTimeout(function () {
		return location.href = './';
	}, 500);
};

var callback = function callback(event, data, server) {
	Array.from(document.querySelectorAll('.people')).map(function (people) {
		var id = $(people).attr('id');
		var end = get_end(id);
		var max_time_off = 30 * 60000;
		if (end >= max_time_off && !id.includes('bot')) {
			var p = $('.people[id="' + id + '"]');
			p.remove();
			if (id === get_user()['id']) logout();
		}
	});
};

var events = ['on', 'write', 'message', 'login'];
var icon = "src/images/bot-remove.png";

var bot_remove = {
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

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bots = __webpack_require__(6);
var app = __webpack_require__(20);
var path = location.pathname;

Object.keys(bots).map(function (bot) {
	var b = bots[bot];
	if (b.icon) bots[bot]['icon'] = "../" + b.icon;
	bots[bot]['url'] = "../bot/" + b.id;
	bots[bot]['size'] = b.call.toString().length;
	bots[bot]['eventos'] = b.events.map(function (e) {
		return " " + e + " ";
	}).toString();
});

console.log(/bot\/(.*)/.test(path));

if (/bots/.test(path)) {
	try {
		app = app({
			'bots': bots
		});
	} catch (e) {
		throw e.message;
	}
} else if (/bot\/(.*)/.test(path) && window['id'] >= 0 && window['codee']) {

	app = app({
		'bot': bots[id]
	});
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var app = new Vue({
        'el': '.app',
        'data': data
    });
    return app;
};

/***/ })
/******/ ]);