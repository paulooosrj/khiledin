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

const app = new Vue({
  el: '#app',
  data: {
    people: {
    	email: null,
    	senha: null,
    	nome: null,
    	icone: null
    },
    register: false,
    upload: false,
    loginSuccess: false,
    loginError: false,
    messageRegisterSuccess: false,
    messageRegisterError: false
  },
  methods: {
  	apiRequest(url, data){
  		return new Promise((Resolve, Reject) => {
  			  fetch(url, {
			    method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
			    body: JSON.stringify(data)
			  }).then(function(response) {
			    return response.json();
			  }).then(function(data) {
			    Resolve(data);
			  });
  		});
  	},
  	toggle(){
  		this.people = {
	    	email: null,
	    	senha: null,
	    	nome: null,
	    	icone: null
	    };
  		this.register = !this.register;
  	},
  	loadRemember(){
  	  if(local('email') && local('password')){
          this.people.email = local('email');
          this.people.senha = local('password');
      }
  	},
  	remember(data){
  	    Object.keys(data).map((e) => local(e, data[e]));
  	},
  	uploadImage(event){
      if(this.upload) return false;
  		let [ file ] = event.target.files;
      let button = document.querySelector(".btn-file-up");
      uploaded('../../../upload/imagem', file).then(event => {
        this.upload = true;
        this.people.icone = event.path;
        button.style.cursor = "default";
        button.addEventListener('click', () => false);
      });
  	},
  	success_login(data){
  		this.remember(data);
	    var hash = location.hash.slice(1);
	    if(hash && hash.includes('room/')){
	      	location.href = location.origin + hash.replace('#/room/');
	    }else{
	    	console.log("Room");
	      	location.href = '/room';
	    }
  	},
  	login(){
  		let email = this.people.email;
  		let senha = this.people.senha;
  		let data = {
  			email: email,
  			password: senha
  		};
  		this.apiRequest("../../../users/auth", data).then((res) => {
  			if(res.msg === "success"){
          this.loginSuccess = true;
          setTimeout(() => this.success_login(data), 3500);
        }
        else{ 
          this.loginError = true;
          setTimeout(() => this.loginError = false, 3500);
        }
  		});
  	},
  	userRegister(){
      let data = {
        email: this.people.email,
        password: this.people.senha,
        username: this.people.nome,
        icon: this.people.icone,
        created_at: new Date(),
        updated_at: new Date()
      };
      this.apiRequest("../../../users/new", data).then((res) => {
        console.log(data);
        if(res.msg === "success"){
          this.messageRegisterSuccess = true;
        }else{
          this.messageRegisterError = true;
        }
      });
  	}
  }
});

app.loadRemember();
