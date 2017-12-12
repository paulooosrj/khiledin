module.exports = class {

	constructor(socket){
		this.server = socket;
		this.config();
	}

	use(bot){
		var self = this;
		if(Array.isArray(bot)){
			bot.map((b) => {
				if(!self.config.bots.includes(b)){
					self.config.bots.push(b);
				}
			});
		}else{
			if(!this.config.bots.includes(bot)){
				this.config.bots.push(bot);
			}
		}
	}

	config(config){
		this.config.bots = [];
	}

	on_event(name, data){
		console.log(name);
		var self = this;
		this.config.bots.map((bot) => {
			if(bot.events.includes(name)){
				bot.call(name, data, self.server);
			}
		});
	}

	run(channels){
		var self = this;
		channels.map((channel) => self.server.on(channel, (data) => {
			self.on_event(channel, data);
		}));
	}

};