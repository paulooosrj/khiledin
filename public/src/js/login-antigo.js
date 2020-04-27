const { gen_id, session } = require('./modules/utils');
window.uploads = require('./modules/uploads');

const local = (name, value = null) => {
  if(value === null){ 
      if(localStorage.getItem(name)){
        return localStorage.getItem(name);
      }else{
        return null;
      }
  }
  if(value !== null){
      if(!localStorage.getItem(name)){
        localStorage.setItem(name, value);
      }
  }
};

$(document).ready(function($){

  $(".dropdown-button").dropdown();
  $('.modal').modal();
  $(".signup-toggle").click(function(){
      $(this).hide();
      $(".signupForm").show(300);
      $(".policy").css("visibility","visible");
  });

  const loadRemember = () => {
      if(local('email') && local('password')){
          $('#user').val(local('email'));
          $('#pass').val(local('password'));
      }
  };

  loadRemember();

  const remember = (data) => {
      Object.keys(data).map((e) => local(e, data[e]));
  };

  const success_login = function(data){
    remember(data);
    var hash = location.hash.slice(1);
    if(hash && hash.includes('room/')){
      location.href = location.origin + hash.replace('#/room/');
    }else{
      location.href = '/room';
    }
  };

  const finish_upload = () => {
    $(".btn-file-up").append('Upload Feito');
  }

  const cord = (call) => navigator.geolocation.getCurrentPosition(p => call(p.coords));
  const date = () => new Date().toString();

  $('.cadastro-form').submit(function(event){
      event.preventDefault();
      var strg = (o) => {
        o = {latitude: o.latitude,longitude: o.longitude};
        return "{" + Object.keys(o).map((k) => { return `"${k}": "${o[k]}"`; }) + "}";
      };
      cord(function(cordenada){
          let file = $('.icon').prop('files')[0]
          uploaded('../../../upload/imagem', file, function (imagem) {
              if(imagem.msg === "success"){
                  const form = $('.cadastro-form');
                  const data = {};
                  var horario = date();
                  data['username'] = form.find('#name-picked').val();
                  data['password'] = form.find('#pass-picked').val();
                  data['email'] = form.find('#email').val();
                  data['icon'] = imagem.path;
                  data['admin'] = false;
                  data['location'] = strg(cordenada);
                  data['created_at'] = horario;
                  data['updated_at'] = horario;
                  $.post('../../../api/users/new', data, function(res){
                      res = JSON.parse(res);
                      if(res.msg === "success"){
                          $("div.signupForm > h4").addClass('green-text');
                          $("div.signupForm > h4").text('Já pode fazer o login!!');
                      } 
                  });
              }
          });
      });
  });

  $('.btn-cadastro').click(function(){
      $('.cadastro-form').submit();
  });

  $('.login-form').submit(function(event){
      event.preventDefault();
      const form = $('.login-form');
      let data = {};
      data.email = form.find('#user').val();
      data.password = form.find('#pass').val(); 
      $.post('../../../api/users/auth', data, function(res){
          res = JSON.parse(res);
          if(res.msg === "success") success_login(data);
      });
  });

  $('.icon').change(function(o){
    let file = $('.icon').prop('files')[0]
    if(file) finish_upload();
  });

});
