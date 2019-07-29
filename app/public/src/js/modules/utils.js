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

const clear_input = () => $('.emit-message').val('');

const user_on_exists = (p, e  = 'default') => {
  // document.querySelector(`.peoples-timeline>div[id="${p.id}"]`)
  return chat.peoples_add.includes(p.nome);
};

const to_scroll = () => {
  var o = document.querySelector('.messages');
  $('.messages').animate({ scrollTop: o.scrollHeight }, 'slow');
}

const get_user = () => {
    return {
      'id': user.user_id,
      'nome': user.nome,
      'icon': user.icon
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

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
  var mapaAcentosHex = {
      a : /[\xE0-\xE6]/g,
      A : /[\xC0-\xC6]/g,
      e : /[\xE8-\xEB]/g,
      E : /[\xC8-\xCB]/g,
      i : /[\xEC-\xEF]/g,
      I : /[\xCC-\xCF]/g,
      o : /[\xF2-\xF6]/g,
      O : /[\xD2-\xD6]/g,
      u : /[\xF9-\xFC]/g,
      U : /[\xD9-\xDC]/g,
      c : /\xE7/g,
      C : /\xC7/g,
      n : /\xF1/g,
      N : /\xD1/g,
  };
  for ( var letra in mapaAcentosHex ) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace( expressaoRegular, letra );
  }
  return string;
}

const bot_write = (out, entrys = []) => {
  let $ = document.querySelector.bind(document);
  let cout = (entrys.length * 10000) / entrys.length;
  let active = 0; 
  let end = entrys.length - 1;
  const w_bot = setInterval(() => {
    var a = entrys[active];
    out.innerHTML = a;
    active++;
    if(active > end) active = 0;
  }, cout);
};

module.exports = { 
  gen_id, 
  session, 
  clear_input,
  user_on_exists,
  to_scroll,
  get_user,
  get_horario,
  html_element,
  removerAcentos,
  bot_write
};