const gen_id = () => {
	return Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 1000);
};

const session = (name, value = null) => {
  if(value === null){ 
      if(sessionStorage.getItem(name)){
        return sessionStorage.getItem(name);
      }else{
        return null;
      }
  }
  if(value !== null){
      if(!sessionStorage.getItem(name)){
        sessionStorage.setItem(name, value);
      }
  }
};

const clear_input = () => $('.emit-message').value = '';

const user_on_exists = (p) => ($(`.peoples-timeline>div[id="${p.id}"]`)) ? true : false;

const to_scroll = () => {
  var o = $('.messages');
  o.scrollTop = o.scrollHeight;
}

const get_user = () => {
    return {
      'id': session('id'),
      'nome': session("nome"),
      'icon': session("icone"),
      'status': session("status")
    };
};

const get_horario = () => {
  var horario = new Date();
  var prefix = (h) => (h < 10) ? "0" + h : h;
  var [hora, minutos, segundos] = [
    prefix(horario.getHours()),
    prefix(horario.getMinutes()),
    prefix(horario.getSeconds())
  ];
  return hora + ':' + minutos + ':' + segundos;
};

function html_element(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.firstChild;
}

module.exports = { 
  gen_id, 
  session, 
  clear_input,
  user_on_exists,
  to_scroll,
  get_user,
  get_horario,
  html_element
};