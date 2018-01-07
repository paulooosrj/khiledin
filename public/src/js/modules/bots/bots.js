const bot = require('make-bot');
console.log(bot);

module.exports = [ 
	require('./new_user'),  
	require('./junior'),
	require('./bot_remove')
];