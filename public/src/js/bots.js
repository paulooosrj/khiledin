var bots = require('./modules/bots/bots');
var app = require('./modules/bot-views/vueApp');
const path = location.pathname;

Object.keys(bots).map((bot) => {
	var b = bots[bot];
	if(b.icon) bots[bot]['icon'] = "../" + b.icon;
	bots[bot]['url'] = "../bot/" + b.id;
	bots[bot]['size'] = b.call.toString().length;
	bots[bot]['eventos'] = b.events.map((e) => " " + e + " ").toString();
});

console.log(/bot\/(.*)/.test(path));

if(/bots/.test(path)){
	try{
		app = app({
			'bots': bots
		});
	} catch(e){
		throw e.message;
	}
}

else if(/bot\/(.*)/.test(path) && window['id'] >= 0 && window['codee']){

	app = app({
		'bot': bots[id]
	});

}