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

};