var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf(' electron/') > -1) {
	window.$ = window.jQuery = module.exports;
	$('.caixa').css('background', '#fff');
	$('.caixa').css('color', 'black');
	$('.emit-message').css('color', 'black');
	$('.menu>.one').css('color', '#bdc3c7');
	$('.menu>.two').css('color', '#bdc3c7');
	$('.ons-agora').css('color', '#bdc3c7');
	$('.emit-message').val('Envie sua mensagem');
	$('.emit-message').click(function(){
		if($(this).val() === "Envie sua mensagem"){
			$(this).val('');
		}
	});
}