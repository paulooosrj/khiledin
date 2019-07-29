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

// Ouvir Musicas

neural.respond('(.*)(junior|junior bot) (eu|eu quero|quero) ouvir(.*?)').run(function(pergunta, genero){

	var genero = this.args();
	genero = genero[(genero.length - 1)];
	genero = genero.trim();

  var api = async gen => {
    const key = process.env.GOOGLE_API_KEY;
    let endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${gen}&maxResults=5`;
    let request = await fetch(endpoint);
    request = await request.json();
    let i = request.items;
    i = i.filter(i => i.kind !== "youtube#playlist");
    let rand = i[Math.floor(Math.random() * i.length)];
    return rand.id.videoId;
  };

  this.retorno(async function(data){
    let genid = await api(genero);
    let video = "https://www.youtube.com/watch?v=" + genid;
    console.log(video);
    console.log(genid);
    return video;
  });

}).save('musica');

// Procurar video no Youtube
neural.respond('(.*)(junior|junior bot) (procurar|procurar no|buscar no) youtube(.*?)').run(function(pergunta, genero){

  var genero = this.args();
  genero = genero[(genero.length - 1)];
  genero = genero.trim();

  var api = async gen => {
    const key = process.env.GOOGLE_API_KEY;
    let endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${key}&q=${gen}&maxResults=5`;
    let request = await fetch(endpoint);
    request = await request.json();
    let i = request.items;
    i = i.filter(i => i.kind !== "youtube#playlist");
    let rand = i[Math.floor(Math.random() * i.length)];
    return rand.id.videoId;
  };

  this.retorno(async function(data){
    let genid = await api(genero);
    let video = "https://www.youtube.com/watch?v=" + genid;
    console.log(video);
    console.log(genid);
    return video;
  });

}).save('youtube');

// Procurar resposta no Wikipedia
neural.respond('(.*)(junior|junior bot) (o que e|me diz o que e) (.*?)').run(function(pergunta, genero){

  var genero = this.args();
  genero = genero[(genero.length - 1)];
  genero = genero.trim();

  var api = async gen => {
    let endpoint = `https://cors-anywhere.herokuapp.com/http://pt.wikipedia.org/w/api.php?action=opensearch&search=${gen}&format=json`;
    let pay = {
    	method: 'GET',
    	headers: new Headers({
  			"Content-Type": "application/json; charset=UTF-8"
  		})
    };
    let request = await fetch(endpoint, pay);
    request = await request.json();
    let i = request[2];
	i = i.sort(function(a, b){
	  return b.length - a.length;
	});
    let rand = i[Math.floor(Math.random() * i.length)];
    return (rand.trim() === "") ? "Esta função de procurar ainda está na fase Beta, nao consegui achar a Resposta." : rand;
  };

  this.retorno(async function(data){
    let texto = await api(genero);
    console.log(texto);
    return texto;
  });

}).save('wikipedia');

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
