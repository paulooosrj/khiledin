const {
	gen_id,
	session,
	clear_input,
	user_on_exists,
	to_scroll,
	get_user,
	get_horario
} = require('./modules/utils')

const globals = require('./modules/globals')
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

var status_write = false

renderize_emoji()

bot_filter.set('bot urls media embed', filtros.bot_urls_media)
bot_filter.set('embed youtube', filtros.bot_youtube)
bot_filter.set('url', filtros.bot_url)
bot_filter.set('anti spam', filtros.bot_spam)
bot_filter.set('bot input', filtros.bot_input)

window.payload_event = function(e){
	var data = $(e).data()
	if(data.payload){
		var d = data.payload
		d.nome = d.bot.nome
		d.icon = d.bot.icone
		d.text = bot_filter.run(d.payload)
		socket.emit('emit message', d)
	}
}

$(".emit-message").keypress(function(e){
	var node = `[write-id="${get_user()['id']}"]`
	var message = filtros.bot_strip_tags($(".emit-message").val())
	if(status_write === false){
		socket.emit('escrevendo', Object.assign({}, get_user(), {
			'text': get_user()['nome'] + ' está escrevendo.',
			'horario': get_horario(),
			'node': node
		}))
		status_write = true
	}
	if(e.keyCode === 13 && message.length >= 1 && message.length < 500){
		socket.emit('clear', node)
		message = bot_filter.run(message)
		if(message !== ''){
			$('.emojis').css('display', 'none')
			socket.emit('emit message', Object.assign({}, get_user(), {
				'text': message,
				'horario': get_horario()
			}))
			status_write = false
			clear_input()
		}
	}
})

$('.logout').click(function(){
	var rm = (i) => sessionStorage.removeItem(i)
	socket.emit('desconectou', get_user())
	rm('icone')
	rm('my_id')
	setTimeout(() => location.href = './logout', 500)
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
})
