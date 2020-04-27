const Schema = (schema) => {

	Object.prototype.map = function(call = function(){}){
		if (typeof this !== 'object') {
			return false
		}
		let indexes = Object.keys(this);
		Object.values(this).map((value, index) => call(indexes[index], value));
  	};
	
	const types = new Map();
	const is_valid = (i, v) => {
		if(types.has(schema[i]) || Array.isArray(schema[i])){
			if(Array.isArray(schema[i])){
				var verify = schema[i].map((ind, s) => types.get(ind)(v));
				return !verify.includes(false);
			}
			return types.get(schema[i])(v);
		}
		return false;
	};
	const filter_mail = (v) => {
		let prefix = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return prefix.test(v);
	};
	const filter_number = (v) => typeof v === "number" && Number.isInteger(v);
	const filter_string = (v) => typeof v === "string" && v !== "";
	const filter_date = (v) => v instanceof Date;
	const filter_array = (v) => typeof v === "object" && Array.isArray(v);
	const filter_object = (v) => (typeof v === "object" && !Array.isArray(v) && v !== null);
	const filter_empty = (v) => v !== "";
	const filter_null = (v) => v !== null;
	const filter_json = (v) => {
		try {
				JSON.parse(v);
		} catch (e) {
				return false;
		}
		return true;
	};

  types.set('mail', filter_mail);
	types.set('int', filter_number);	
	types.set('string', filter_string);
	types.set('date', filter_date);
	types.set('json', filter_json);
	types.set('array', filter_array);
	types.set('object', filter_object);
	types.set('null', filter_null);
	types.set('empty', filter_empty);

	return function(value){
		value.map((i, v) => (!is_valid(i, v)) 
			? (() => { throw `Error in: ${i} value defined in Schema ${schema[i]}` })() 
			: true
		);
		return true;
  	};

};

module.exports = Schema;