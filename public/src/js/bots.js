window.bots = require('./modules/bots/bots');
// var app = require('./modules/bot-views/vueApp');
const path = location.pathname;

Object.keys(bots).map((bot) => {
	var b = bots[bot];
	if(b.icon) bots[bot]['icon'] = "../" + b.icon;
	bots[bot]['url'] = "../bot/" + b.id;
	bots[bot]['size'] = b.call.toString().length;
	bots[bot]['eventos'] = b.events.map((e) => " " + e + " ").toString();
});
