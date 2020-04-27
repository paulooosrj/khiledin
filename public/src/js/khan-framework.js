window.$broadcast = (data = {}) => {
	return function(update = () => {}){
		return new Proxy(data, {
            get: (target, key) => (key in target) ? target[key] : null,
            set: (target, key, value) => {
              if(!target["$_updates"]) target["$_updates"] = true;
				      target[key] = value;
              update(target, key, value);
            }
    	});
    }
};

window.khanApp = {};

khanApp.db = {};
khanApp.last_render_buffer = {};

khanApp.create = function(){
    return this;
};

khanApp.$controller = function($view, $event){
    if(!window['khan_controller']) window['khan_controller'] = {};
    var view = document.querySelector(`[khan-controller="${$view}"]`);
    view.setAttribute('visibility', 'hidden');
    if(view){
        window['khan_controller'][$view] = {};
        let model = window['khan_controller'][$view];
        let $ctrl = "window.khan_controller." + $view;
        let proxy = $broadcast(model)(khanApp.updateView(view, $ctrl));
        $event.bind(proxy)(proxy);
    }
};

khanApp.parse_template = (code, data, controller) => {
    var code_t = code.replace(/\n/g, '').replace(/\s\s/g, '');
    var fk = code_t.match(/{{(.*?)}}/g).length;
    var make_test = (data) => {
          if(data["$_updates"]) delete data["$_updates"];
          if(data["computed"]) delete data["computed"];
          return Object.keys(data).length;
    };

    if(make_test(data) >= fk){

      code_t.match(/{{(.*?)}}/g).map((m) => {

        var n = m.replace('{{', '')
                 .replace('}}', '')
                 .trim();

        var gn = '';


        Object.keys(data).map((k) => {
            gn = `$${k}`;
            if(n.includes(gn)){
               gn = '\\' + gn;
               if(typeof data[k] === "function"){
                  if(!data.computed) data.computed = {};
                  if(data.computed[k]) return;
                  data.computed[k] = data[k];
                  n = n.replace(new RegExp(gn, 'g'), controller + ".computed['"+k+"']");
               }else{
                  n = n.replace(new RegExp(gn, 'g'), controller + "." + k);
               }
            }
        });

        if(!n.includes('.computed[')){
          code_t = code_t.replace(m, '${' + n + '}');
        }else{
          if(!n.includes('(') && !n.includes(')')){
            code_t = code_t.replace(m, '' + n + '(this)');
          }else{
            code_t = code_t.replace(m, '${' + n + '}');
          }
        }

      });

      code_t = code_t.replace(new RegExp('&gt;', 'g'), '>')
                     .replace(new RegExp('&lt;', 'g'), '<')
                     .replace(new RegExp('\\#\\(', 'g'), "'")
                     .replace(new RegExp('\\)\\#', 'g'), "'")
                     .replace(new RegExp('\\-\\>', 'g'), "+")
                     .replace(new RegExp('\\<\\-', 'g'), "+");

      return new Function('return `'+code_t+'`;');     

    }

    return function(){};

};

khanApp.data = (view, key = null, value = null) => {
    if(value === null && key !== null) return view.dataset[key];
    if(value !== null && key !== null) view.dataset[key] = value;
};

khanApp.render = function(view, data, controller){
    var code = 'false';
    if(!khanApp.data(view, 'render')){
        khanApp.data(view, 'render', Math.floor(Math.random() * 10000));
    }
    if(!khanApp.render_buffer) khanApp.render_buffer = {};
    if(!khanApp.render_buffer[view.dataset['render']]){
      khanApp.render_buffer[view.dataset['render']] = view.innerHTML;
      code = khanApp.parse_template(
                view.innerHTML, 
                data,
                controller
             );
    }else{
      code = khanApp.parse_template(
                khanApp.render_buffer[view.dataset['render']], 
                data,
                controller
             );
    }
    var template = '';
    try{
      template = code();
      view.setAttribute('visibility', 'visible');
      view.innerHTML = template;
    }catch(e){}
};

khanApp.updateView = (view, controller) => {
	  return function(data, key, value){
        //console.log("Update View !!");
        khanApp.render(view, data, controller);
    };
};
