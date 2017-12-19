module.exports = (() => {

	Map.prototype.getAll = function(){
		var n = [];
		for (var [key, value] of this) {
	  		n.push(value);
		}
		return n;
	};

})();