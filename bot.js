const bot = require('make-bot');

console.log(bot);

bot.respond('o(i|ie|la)').run(function(){

    console.log(this);

}).save('oi');

bot.run('Oie');