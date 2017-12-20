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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    gen_id = _require.gen_id,
    session = _require.session;

var schema = __webpack_require__(18);
window.uploads = __webpack_require__(5);

var schema_login = schema({
  'nome': 'string',
  'icon': 'string'
});

var success_login = function success_login(data) {
  $.post('../../../login', data, function (res) {
    if (res.msg === "success") location.href = '/room';
  });
};

var login = function login(event) {
  event.preventDefault();
  var data = {};
  var nome = $(".nick").val().length > 3 ? $(".nick").val() : "Anonimo-" + Math.floor(Math.random() * 10000);
  if (nome) {
    data.nome = nome;
    data.id = gen_id();
    if (!session("icone")) {
      data.icon = "src/images/default-user.jpg";
    } else {
      data.icon = session('icone');
    }
    if (data.nome && data.id && data.icon) success_login(data);
  }
};

var finish_upload = function finish_upload() {
  $(".btn-file-up").html('Upload Feito');
};

var uploadFile = function uploadFile(o) {
  var file = $('.icon').prop('files')[0];
  uploaded('../../../upload/imagem', file, function (data) {
    if (data.msg === "success") {
      session("icone", data.path);
      finish_upload();
    }
  });
};

$('.btn-login').click(login);
$('.icon').change(uploadFile);

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Schema = function Schema(schema) {

	Object.prototype.map = function () {
		var call = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

		if (_typeof(this) !== 'object') {
			return false;
		}
		var indexes = Object.keys(this);
		Object.values(this).map(function (value, index) {
			return call(indexes[index], value);
		});
	};

	var types = new Map();
	var is_valid = function is_valid(i, v) {
		if (types.has(schema[i]) || Array.isArray(schema[i])) {
			if (Array.isArray(schema[i])) {
				var verify = schema[i].map(function (ind, s) {
					return types.get(ind)(v);
				});
				return !verify.includes(false);
			}
			return types.get(schema[i])(v);
		}
		return false;
	};
	var filter_mail = function filter_mail(v) {
		var prefix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return prefix.test(v);
	};
	var filter_number = function filter_number(v) {
		return typeof v === "number" && Number.isInteger(v);
	};
	var filter_string = function filter_string(v) {
		return typeof v === "string" && v !== "";
	};
	var filter_date = function filter_date(v) {
		return v instanceof Date;
	};
	var filter_array = function filter_array(v) {
		return (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && Array.isArray(v);
	};
	var filter_object = function filter_object(v) {
		return (typeof v === "undefined" ? "undefined" : _typeof(v)) === "object" && !Array.isArray(v) && v !== null;
	};
	var filter_empty = function filter_empty(v) {
		return v !== "";
	};
	var filter_null = function filter_null(v) {
		return v !== null;
	};
	var filter_json = function filter_json(v) {
		try {
			JSON.parse(v);
		} catch (e) {
			return false;
		}
		return true;
	};

	types.set('mail', filter_mail);
	types.set('int', filter_number);
	types.set('string', filter_string);
	types.set('date', filter_date);
	types.set('json', filter_json);
	types.set('array', filter_array);
	types.set('object', filter_object);
	types.set('null', filter_null);
	types.set('empty', filter_empty);

	return function (value) {
		value.map(function (i, v) {
			return !is_valid(i, v) ? function () {
				throw "Error in: " + i + " value defined in Schema " + schema[i];
			}() : true;
		});
		return true;
	};
};

module.exports = Schema;

/***/ }),

/***/ 5:
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

window.uploaded = function (url, file, callback) {
	var form = new FormData();
	form.append('fileUpload', file);
	$.ajax({
		url: url,
		data: form,
		processData: false,
		contentType: false,
		type: 'POST',
		success: callback
	});
};

module.exports.image_upload = function () {
	var tpl = '<label class="btn btn-file-upload" style="cursor:pointer">Image Upload<input type="file" style="display: none;" class="image-upload" accept="image/*"></label>';
	$(this).parent().html(tpl);
	$('.image-upload').change(function () {
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/imagem', file, function (data) {
			if (data.msg === "success") {
				command_toggle();
				var temp = '\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<img src="' + data.path + '" class="upload"/>\n\t\t\t\t';
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.video_upload = function () {
	var tpl = '<label class="btn btn-file-upload" style="cursor:pointer">Video Upload<input type="file" style="display: none;" class="video-upload" accept="video/*"></label>';
	$(this).parent().html(tpl);
	$('.video-upload').change(function () {
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/video', file, function (up) {
			if (up.msg === "success") {
				command_toggle();
				var ext = up.path.split('.').pop();
				var temp = '\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<video class="video-upload upload" controls><source src="' + up.path + '" type="video/' + ext + '"></video>\n\t\t\t\t';
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.audio_upload = function () {
	var tpl = '<label class="btn btn-file-upload" style="cursor:pointer">Audio Upload<input type="file" style="display: none;" class="video-upload" accept="audio/*"></label>';
	$(this).parent().html(tpl);
	$('.video-upload').change(function () {
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/audio', file, function (up) {
			if (up.msg === "success") {
				command_toggle();
				var ext = up.path.split('.').pop();
				var temp = '\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<audio class="audio-upload upload" controls><source src="' + up.path + '" type="audio/' + ext + '"></audio>\n\t\t\t\t';
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.codigo_upload = function () {
	var tpl = '<label class="btn btn-file-upload" style="cursor:pointer">Codigo Upload<input type="file" style="display: none;" class="code-upload" accept=".js,.html,.php,.css,.sass,.scss,.rb,.py,.ts,.c,.go,.rar"></label>';
	$(this).parent().html(tpl);
	$('.code-upload').change(function () {
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/arquivo', file, function (up) {
			if (up.msg === "success") {
				command_toggle();
				var cores = {
					"js": "#f7df1e",
					"php": "#4f5b93",
					"rar": "#8e44ad",
					"css": "#00a98f",
					"html": "#e34f26",
					"default": "#f39c12"
				};
				var ext = up.path.split('.').pop();
				var cor = cores[ext] ? cores[ext] : cores["default"];
				console.log(cor);
				var temp = '\n\t\t\t\t\t<a href="' + up.path + '" class="btn-link upload-up" style="background:' + cor + ';border:none;cursor:pointer;" download>Fazer download: ' + up.path.split('/').pop() + '</a>\t\n\t\t\t\t';
				if (ext !== "rar") {
					temp = '\n\t\t\t\t\t\t<a class="btn-link" target="__blank" href="./code/' + up.path.split('/').pop() + '" style="border:none;background:#3498db;cursor:pointer;width:40%;">Visualizar Codigo</button>\n\t\t\t\t\t\t' + temp + '\n\t\t\t\t\t';
				}
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.help_chat = function () {
	var tpl = '<div class="helped"><a href="mailto:jskhanframework@gmail.com?Subject=KhanChat" target="__blank"><div class="help-item"><i class="fa fa-envelope fa-lg" aria-hidden="true"></i><p class="entry">jskhanframework@gmail.com</p></div></a><a href="https://github.com/PaulaoDev" target="__blank"><div class="help-item"><i class="fa fa-github fa-lg" aria-hidden="true"></i><p class="entry">PaulaoDev</p></div></div></a>';
	$(this).parent().html(tpl);
};

/***/ })

/******/ });