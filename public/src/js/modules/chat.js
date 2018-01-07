<<<<<<< HEAD
module.exports = class {

	constructor(socket){
		this.server = socket;
		this.events = {
			'login': 'new login', 
			'message': 'new emit message', 
			'clear': 'new clear', 
			'write': 'new escrevendo', 
			'logout': 'logout'
		};
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
		var self = this;
		this.config.bots.map((bot) => {
			if(bot.events.includes(name)){
				bot.call(name, data, self.server);
			}
		});
	}

	attach_on(){
		var self = this;
		this.config.bots.map((bot) => {
			if(bot.events.includes('on')){
				bot.call('on', {}, self.server);
			}
		});
	}

	run(){
		var self = this;
		Object.keys(self.events).map((channel) => {
			self.server.on(self.events[channel], (data) => {
				self.on_event(channel, data);
			});
		});
		this.attach_on();
	}

=======
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

	attach_on(){
		var self = this;
		this.config.bots.map((bot) => {
			if(bot.events.includes('on')){
				var server = {
					emit(ev, data){
						self.server.emit("chat", {
							[chat.sala + ev]: data
						});
					},
					on(ev, call){
						self.server.on(chat.sala + ev, call);
					}
				};
				bot.call('on', {}, server);
			}
		});
	}

	run(){
		var self = this;
		this.config.bots.map((bot) => {
			bot.events.map((e) => {
				self.server.on(chat.sala + e, function(data){
					var server = {
						emit(ev, data){
							self.server.emit("chat", {
								[chat.sala + ev]: data
							});
						},
						on(ev, call){
							self.server.on(chat.sala + ev, call);
						}
					};
					bot.call(e, data, server);
				});
			});
		});
		this.attach_on();
	}

>>>>>>> 837f5ca07b1d8f9fbefac2cd9301058fe174b4cd
};