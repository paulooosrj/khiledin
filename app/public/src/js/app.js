import 'babel-polyfill';

const {
	gen_id,
	session,
	clear_input,
	user_on_exists,
	to_scroll,
	get_user,
	get_horario
} = require('./modules/utils');
const { DocumentEvent } = require("./components/decorators/document.js")

//window.bot = require('make-bot');
// if (location.protocol === 'https:'){
//  	location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
// }

console.log("AQUI!!");   

var status_write = false;

@DocumentEvent('DOMContentLoaded')
function loadPage(){
	document.querySelector('.load').style.display = "none";
    $(".menu-toggle").css("cssText", "display: flex !important;");
}

// document.addEventListener("DOMContentLoaded", () => {

// 	document.querySelector('.load').style.display = "none";
//   $(".menu-toggle").css("cssText", "display: flex !important;");

// });

window.onunload = function () {
  const body = {
    data: get_user(),
    sala: chat.sala
  };
  let headers = {
    type: 'application/json'
  };
  let blob = new Blob([JSON.stringify(body)], headers);
  navigator.sendBeacon('/logout', blob);
};

/* Init Vue */

// Vue.component('timeline', require('./vue/timeline.js'));

// Vue.config.devtools = true;

// global.app = new Vue({
//     el: '#app',
//     data: {
//       messages: [],
//       chat
//     },
//     methods: {
//       writeMessage(){
//         var node = `[write-id="${get_user()['id']}"]`;
//         if(status_write === false){
//           socket.emit('chat', {
//                 [chat.sala + "escrevendo"]: Object.assign({}, get_user(), {
//               'text': get_user()['nome'] + ' está escrevendo.',
//               'horario': get_horario(),
//               'node': node
//             })
//           });
//           status_write = true;
//         }
//       },
//       sendMessage(evt){
//         let message = evt.target.value;
//         if(message.length > 1 && message.length < 500){
//           var node = `[write-id="${get_user()['id']}"]`;
//           socket.emit('chat', {[chat.sala + "clear"]: node});
//           message = bot_filter.run(message)
//           if(message !== ''){
//             $('.emojis').css('display', 'none')
//             socket.emit('chat', {
//               [chat.sala + "message"]: Object.assign({}, get_user(), {
//                 'text': message,
//                 'horario': get_horario()
//               })
//             });
//             status_write = false;
//             clear_input();
//           }
//         }
//       }
//     }
// });

/* End Vue */

const globals = require('./modules/globals')
const speech = require('./use/speech');
const templates = require('./modules/views')
const filtros = require('./modules/filtros')
const polyfill = require('./modules/polyfill')
const bot_filter = require('./modules/bot_filter')
const websockets = require('./modules/sockets')(socket)
window.uploads = require('./modules/uploads')
const bots = require('./modules/bots/bots')
const ChatCore = require('./modules/chat')
const Chat = new ChatCore(socket)

Chat.use(bots)
Chat.run()

renderize_emoji();

bot_filter.set('bot urls media embed', filtros.bot_urls_media);
bot_filter.set('embed youtube', filtros.bot_youtube);
bot_filter.set('url', filtros.bot_url);
bot_filter.set('anti spam', filtros.bot_spam);
bot_filter.set('bot input', filtros.bot_input);

window.payload_event = function(e){
	var data = $(e).data()
	if(data.payload){
		var d = data.payload
		d.nome = d.bot.nome
		d.icon = d.bot.icone
		d.text = bot_filter.run(d.payload)
		socket.emit('chat', {
        	[chat.sala + "message"]: d
    	});
	}
}

if(chat.colors.background){
	$('.messages').attr('style', chat.colors.background);
}

let menu_colors_buffer = $('.menu-colors').html();

$('body>div>div.timeline>div.head>div:nth-child(1)').click(function(){
	$('.menu-colors').toggle();
	$('.menu-colors').html(menu_colors_buffer);

	$('.change-back-color').click(function(){
			$('.menu-colors').html(`
				<div class="change-back-div">
					<label class="up-back-btn">
						Fazer Upload
						<input type="file" class="background-msg" style="display:none">
					</label>
					<input type="text" class="background-msg-text" placeholder="Link da imagem">
				</div>
			`);
			$('.background-msg').on("change", function(){
				var file = $(this).prop('files')[0];
				uploaded('../../../upload/imagem', file, function (data) {
					if(data.msg === "success"){
						localStorage.setItem('colors.background', data.path);
						$('.menu-colors').toggle();
						location.reload();
					}
				});
			});
			$('.background-msg-text').change(function(){
				localStorage.setItem('colors.background', $(this).val());
				$('.menu-colors').toggle();
				location.reload();
			});
	});

	$('.change-msg-color').click(function(){
			$('.menu-colors').html(`
				<div class="change-colors-div">
					<input type="color" class="color-msg">
					<input type="text" class="color-msg-text" placeholder="Cor em hexadecimal">
				</div>
			`);
			$('.color-msg').on("change", function(){
				localStorage.setItem('colors.message_me', $(this).val());
				$('.menu-colors').toggle();
			});
			$('.color-msg-text').change(function(){
				localStorage.setItem('colors.message_me', $(this).val());
				$('.menu-colors').toggle();
			});
	});

});

$(".emit-message").keypress(function(e){
	console.log("Emit message");
	var node = `[write-id="${get_user()['id']}"]`;
	var message = filtros.bot_strip_tags($(".emit-message").val())
	if(status_write === false){
		socket.emit('chat', {
        	[chat.sala + "escrevendo"]: Object.assign({}, get_user(), {
				'text': get_user()['nome'] + ' está escrevendo.',
				'horario': get_horario(),
				'node': node
			})
    	});
		status_write = true
	}
	if(e.keyCode === 13 && message.length > 1 && message.length < 500){
		socket.emit('chat', {[chat.sala + "clear"]: node});
		message = bot_filter.run(message)
		if(message !== ''){
			$('.emojis').css('display', 'none')
			socket.emit('chat', {
				[chat.sala + "message"]: Object.assign({}, get_user(), {
					'text': message,
					'horario': get_horario()
				})
			});
			status_write = false;
			clear_input();
		}
	}
});

$('.logout').click(function(){
	var rm = (i) => sessionStorage.removeItem(i)
	socket.emit('chat', {
		[chat.sala + "logout"]: get_user()
	});
	rm('icone')
	rm('my_id')
	setTimeout(() => location.href = chat.url + 'logout', 500)
})

$('.open-emoji').click(emoji_toggle)

chat.config_bar_buffer = $('.commands').html()

$('.open-commands').click(command_toggle)
$('.menu-toggle').click(function(){
	let buff = $(this).html()
	if($('.menu').css('display') === "none"){
		$(this).css('background', '#e74c3c')
		$(this).html(`<i class="fa fa-times fa-lg" aria-hidden="true"></i>`)
		$('.menu').css('display', 'block')
	}else{
		$(this).css('background', '#3498db')
		$(this).html(`<i class="fa fa-bars fa-lg" aria-hidden="true"></i>`)
		$('.menu').css('display', 'none')
	}
});

$('.create-sala').click(function(){
	if(chat.sala_create) return false;
	chat.sala_create = true;
	$(this).css('background', '#2ecc71');
	$(this).removeClass('create-sala');
	$(this).addClass('create-sala-build');
	$(this).html(`<i class="fa fa-check fa-lg" aria-hidden="true"></i>`);
	$('.sala-create').append(`
		<input type="text" placeholder="Nome da sala para criar" class="sala-name"/>
	`);
	$('.create-sala-build').click(function(){
		if(chat.sala_create_build) return false;
		chat.sala_create_build = true;
		var v = $('.sala-name').val();
		if(v.length < 2 && v === "") return false;
		var name_sala = v.trim().replace(/\s/, '-');
		$('.sala-name').css('display', 'none');
		$('.sala-create').append(`
			<button class="btn" id="btn-linked" data-clipboard-text="${chat.url + 's/' + name_sala}">Copiar link da Sala</button>
		`);
		var clipboard = new Clipboard('#btn-linked');
		clipboard.on('success', function(e) {
		    $('.sala-create .btn').html('Sala copiada com sucesso');
		    $("#btn-linked").css('background', '#2ecc71');
		    e.clearSelection();
		});
	});
});

