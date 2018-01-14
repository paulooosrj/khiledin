global.neural = global.neural || require('../../bot-make');

const def = () => `Não entendi sua pergunta.`;

neural.respond('hello init').run(function(){
	this.retorno(function(data){
		var sala = (chat.sala_origin === "global") ? "" : chat.sala_origin;
		return `
			Olá ${data.nome} seja bem vindo ao chat ${ sala }, meu nome é Junior!! 😄 
		`;
	});
}).save('hello');

neural.respond('o?(i|ie|la|ei) (junior|junior bot)').run(function(){
	this.retorno(function(data){
		$('.junior-bot-user .user-message').css('display', 'none');
		return `Oie ${data.nome}, tudo bem com você? 🤗`;
	});
}).save('oi');

neural.respond('(junior|junior bot) quem e seu criador').run(function(){
	this.retorno(function(data){
		return `Meu criador é https://github.com/PaulaoDev`;
	});
}).save('criador');

neural.respond('(.*)(junior|junior bot) (eu|eu quero|quero) ouvir(.*?)').run(function(pergunta, genero){

	var genero = this.args();
	genero = genero[(genero.length - 1)];
	genero = genero.trim();

	this.retorno(function(data){
		if(/funk/gim.test(genero)) return `https://www.youtube.com/watch?v=qc3rKuLI_uM`;
		if(/sertanejo/gim.test(genero)) return `https://www.youtube.com/watch?v=HVlUnTekqqU`;
		if(/rock/gim.test(genero)) return `https://www.youtube.com/watch?v=CSvFpBOe8eY`;
		return '';
	});

}).save('musica');

neural.respond('(.*)ta bem (junior|junior bot)\\?').run(function(){
	this.retorno(function(data){
		data.payload = "https://www.youtube.com/watch?v=AxmsC2arlHk&start=18";
		data.bot = {
			'nome':  'Junior Bot',
			'icone': 'src/images/junior.png',
			'node': '[write-id="junior-bot-user"]'
		};
		var pay = JSON.stringify(data);
		return `
			To sim ${data.nome} 😁, quer ver um video Engraçado?
			<button style="background:#3498db;border:none;cursor:pointer;" onclick="payload_event(this)" class="btn-link" data-payload='${pay}'>
				Assistir Video
			</button>
		`;
	});
}).save('ta_bem');


neural.respond('(junior|junior bot) qual e(.*)').run(function(nome, pergunta = ''){
	this.retorno(function(data){
		pergunta = pergunta.trim();
		console.log(pergunta);
		if(/meu nome/gim.test(pergunta)){
			pergunta = `Seu nome é ${data.nome} 🤗`;
		}
		return pergunta;
	});
}).save('perguntaa');


neural.respond('(junior|junior bot) quero (rir|ficar (?:feliz|alegre)?|dar risada|(?:ver)? ?video engracado|rir (.*)|ver memes?|memes?)').run(function(){
	this.retorno(function(data){
		return `https://www.youtube.com/watch?v=AxmsC2arlHk&start=76&autoplay=1`;
	});
}).save('memes');

/*
neural.respond('').run(function(){
	this.retorno(function(data){
		
	});
}).save('');
*/

module.exports = neural;
