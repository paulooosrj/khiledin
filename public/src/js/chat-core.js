const ChatCore = function(socket, channels = []){
	var self = this;
	this.server = socket;
	channels.map((channel) => {
		self.server.on(channel, (data) => self.on_event(data));
	});
};

ChatCore.prototype.config = function(data){

};

ChatCore.prototype.set = function(data){

};

ChatCore.prototype.get = function(data){

};

ChatCore.prototype.on_event_set = function(message){
	
};

ChatCore.prototype.on_event = function(event){
	console.log(event);
};

ChatCore.prototype.isBot = function(){
	ChatCore.data.bots.map((bot) => {
		if(typeof bot === "function") bot();
	});
};

ChatCore.prototype.run = function(data){

};