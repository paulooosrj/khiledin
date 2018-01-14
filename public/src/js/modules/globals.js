const global = window;

global.command_toggle_hide = () => {
	$('.commands').css('display', 'none');
};

global.command_toggle = () => {
	emoji_hide();
	$('.commands').toggle(function(){
		if($(this).css('display') === "block"){
			$(this).css('display', 'flex');
			$('.image-up').click(uploads.image_upload);
			$('.video-up').click(uploads.video_upload);
			$('.audio-up').click(uploads.audio_upload);
			$('.code-up').click(uploads.codigo_upload);
			$('.help-chat').click(uploads.help_chat);
		}else{
			$(this).html(chat.config_bar_buffer);
			$(this).css('height', '10vh!important');
			$('.image-up').click(uploads.image_upload);
			$('.video-up').click(uploads.video_upload);
			$('.audio-up').click(uploads.audio_upload);
			$('.code-up').click(uploads.codigo_upload);
			$('.help-chat').click(uploads.help_chat);
		}
	});
};

global.renderize_emoji = () => {
	const emojis = require('./emojis');
	let template = emojis.reduce((ant, atual) => {
		var tpl = `
			<span class="emoji-icon">
				${atual}
			</span>
		`;
		return ant + emojione.toImage(tpl);
	}, '');
	$('.emojis').append(template);
	$('.emoji-icon').click(function(){
		var cache = $(".emit-message").val();
		var emoji = $(this).find('img').attr('alt');
		$(".emit-message").val(cache + emoji);
	});
};

global.emoji_hide = () => {
	$('.emojis').css('display', 'none');
};

global.emoji_toggle = () => {
	command_toggle_hide();
	$('.emojis').toggle(function(){
		if($(this).css('display') === "block"){
			$(this).addClass('slideInUp animated');
			$(this).css('display', 'flex');
		}else{
			$(this).addClass('slideInDown animated');
		}
	});
};

global.apagar_luz = (e) => {
	var buff = $(e).parent().html();
	let $e = $(e).parent().find('.upload');
	let ac = $('.luz');
	if(ac.css('display') === "none"){
		ac.css('display', 'flex');
		ac.find('.luz-conteudo').html($e);
		$(e).parent().html(buff);
		$('.menu-toggle').css('display', 'none !important');
	}
};

global.acender_luz = (e) => {
	let ac = $('.luz');
	if(ac.css('display') === "flex"){
		ac.css('display', 'none');
		ac.find('.luz-conteudo').html('');
		$('.menu-toggle').css('display', 'block !important');
	}
};

global.toggle_menu = function(){

	if(!chat.toggle_menu) chat.toggle_menu = false;
	if(!chat.toggle_menu){
		$('.menu>.one').css('flex-direction', 'column');
		$('.layer-1>p').css('display', 'none');
		$('.one>.layer-1,.one>.layer-2').css({
			width: '100%',
			justifyContent: 'center'
		});
		$('.menu p.ons-agora').html('ONS');
		$('.menu p.name').css('display', 'none');
		$('.menu .user-message').css('display', 'none');
		$('.menu a.ons-agora').html('R/ ONS');
		$('.menu a.ons-agora').css('padding', '15px')
		$('.bots-ons').css('padding', '0px');
		$('.bots-ons').css('width', '100%');
		$('.bots-ons').css('height', '10.5vh');
		$('.menu').css('width', '8%');
		$('.timeline').css('width', '92%');
		$('.one>.layer-2').html('<i class="fa fa-bars" aria-hidden="true"></i>');
		$('.one>.layer-2>i').css('margin-right', '0px');
		$('.emojis').css('left', '56%');
		chat.toggle_menu = true;
	}else{
		$('.menu>.one').css('flex-direction', '');
		$('.layer-1>p').css('display', 'block');
		$('.one>.layer-1,.one>.layer-2').css({
			width: '100%',
			justifyContent: 'flex-end'
		});
		$('.menu p.ons-agora').html('ONLINE AGORA');
		$('.menu p.name').css('display', 'block');
		$('.menu .user-message').css('display', 'flex');
		$('.menu a.ons-agora').html('ROBOS ONLINES');
		$('.menu a.ons-agora').css('padding', '35px')
		$('.bots-ons').css('padding', '15px');
		$('.bots-ons').css('width', '91%');
		$('.menu').css('width', '30%');
		$('.timeline').css('width', '70%');
		$('.one>.layer-2').html('<i class="fa fa-times no-mobile" aria-hidden="true"></i>');
		$('.one>.layer-2>i').css('margin-right', '25px');
		$('.emojis').css('left', '33.9%');
		chat.toggle_menu = false;
	}

};
