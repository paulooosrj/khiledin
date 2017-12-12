const $ = require('./modules/selector');
const { gen_id, session } = require('./modules/utils');
const schema = require('./modules/schema');

const schema_login = schema({
    'nome': 'string',
    'icon': 'string'
});

const success_login = () => {
  const data = {
    nome: session("nome"),
    icon: session("icone")
  };
  if (schema_login(data)) {
    session("status", "logado");
    location.href = '/room';
  }
};

const login = event => {
  event.preventDefault();
  var nome = $(".nick").value.length > 3
      ? $(".nick").value
      : "Anonimo-" + Math.floor(Math.random() * 10000);
  if (nome){ 
    session("nome", nome); 
    session("id", gen_id()); 
    if(!session("icone")) session("icone", 'https://cdn.dribbble.com/users/291/screenshots/292820/female_avatar.png');
  }
  success_login();
};

const finish_upload = file => {
  $(".btn-file-up").innerText = file.name;
};

const uploadFile = o => {
  let file = o.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    session("icone", reader.result);
    if (session("icone")) finish_upload(file);
  };
  reader.readAsDataURL(file);
};

$('.btn-login').addEventListener('click', login);

$('.icon').addEventListener('change', () => uploadFile($('.icon')));