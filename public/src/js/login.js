const { gen_id, session } = require('./modules/utils');
const schema = require('./modules/schema');
window.uploads = require('./modules/uploads');

const schema_login = schema({
    'nome': 'string',
    'icon': 'string'
});

const success_login = (data) => {
  $.post('../../../login', data, function(res){
      if(res.msg === "success") location.href = '/room';
  });
};

const login = (event) => {
  event.preventDefault();
  let data = {};
  var nome = $(".nick").val().length > 3
      ? $(".nick").val()
      : "Anonimo-" + Math.floor(Math.random() * 10000);
  if (nome){ 
    data.nome = nome;
    data.id = gen_id();
    if(!session("icone")){
      data.icon = "src/images/default-user.jpg";
    }else{
      data.icon = session('icone');
    }
    if(data.nome && data.id && data.icon) success_login(data);
  }
};

const finish_upload = () => {
  $(".btn-file-up").html('Upload Feito');
};

const uploadFile = o => {
  let file = $('.icon').prop('files')[0];
  uploaded('../../../upload/imagem', file, function (data) {
      if(data.msg === "success"){
        session("icone", data.path);
        finish_upload();
      }
  });
};

$('.btn-login').click(login);
$('.icon').change(uploadFile);