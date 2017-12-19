const def = () => `Não entendi sua pergunta.`;

const hello = (data, extract) => {
	return `
		Olá ${data.nome} seja bem vindo ao chat, 
		meu nome é Junior e estou aqui sempre que Precisar!! 😄 
	`;
}

const musica = (data, extract) => {
	if(extract.length > 1){
		var pergunta = extract[2];
		pergunta = pergunta.trim();
		if(/funk/gim.test(pergunta)){
			return `
				https://www.youtube.com/watch?v=qc3rKuLI_uM
			`;
		}
		if(/sertanejo/gim.test(pergunta)){
			return `
				https://www.youtube.com/watch?v=HVlUnTekqqU
			`;
		}
		if(/rock/gim.test(pergunta)){
			return `
				https://www.youtube.com/watch?v=CSvFpBOe8eY
			`;
		}
	}
	return def();
};

const voce_bem = (data, extract) => {
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
}

const oi = (data, extract) => {
	$('.junior-bot-user .user-message').css('display', 'none');
	return `Oie ${data.nome}, tudo bem com você? 🤗`;
}

const criador = (data, extract) => {
	return `Meu criador é https://github.com/PaulaoDev`
};

const qual = (data, extract) => {
	if(extract.length > 1){
		var pergunta = extract[1];
		pergunta = pergunta.trim();
		if(/meu nome/gim.test(pergunta)){
			return `Seu nome é ${data.nome} 🤗`;
		}
	}
	return def();
}

const memes = () => {
	return `https://www.youtube.com/watch?v=AxmsC2arlHk&start=76&autoplay=1`;
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