module.exports = (() => {

	class Bot {

		constructor(){
			this.filters = new Map();
			return this;
		}

		set(name, value){
			this.filters.set(name, value);
		}

		get_filters(){
			return this.filters.getAll();
		}

		run(message){
			message = message.trim();
			var message = this.get_filters().reduce((filter_ant, filter_atual) => {
				return filter_atual(filter_ant); 
			}, message);
			return message;
		}

	};

	return new Bot();

})();