const banir = (id, server) => {
	Array.from(document.querySelectorAll(`.people .name`)).map((node) => {
		if($(node).html() === id){
			$('.emit-message').val('');
			let id = $(node).parent().attr('id');
			let data = $(`div#${id}.message`).data().user;
			$(`div#${id}.people`).remove();
			$(`div#${id}.message`).remove();
			server.emit('banido', data);
		}
	});
};

const init = (hash, server) => {
	$('.emit-message').val('');
	if(btoa(hash) === "key"){
		chat.bot_input = true;
		$('.emit-message').attr('placeholder', 'Bot input iniciado com sucesso.');
	}
};

module.exports = {
	"ban": banir,
	"init": init
};
