!function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=13)}([function(e,t,n){"use strict";function o(e){var t=document.createElement("div");return t.innerHTML=e,t.firstChild}function a(e){var t=e,n={a:/[\xE0-\xE6]/g,A:/[\xC0-\xC6]/g,e:/[\xE8-\xEB]/g,E:/[\xC8-\xCB]/g,i:/[\xEC-\xEF]/g,I:/[\xCC-\xCF]/g,o:/[\xF2-\xF6]/g,O:/[\xD2-\xD6]/g,u:/[\xF9-\xFC]/g,U:/[\xD9-\xDC]/g,c:/\xE7/g,C:/\xC7/g,n:/\xF1/g,N:/\xD1/g};for(var o in n){var a=n[o];t=t.replace(a,o)}return t}var s=function(){return Math.floor(1e3*Math.random())+Math.floor(1e3*Math.random())},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===t)return sessionStorage.getItem(e)?sessionStorage.getItem(e):null;null!==t&&(sessionStorage.getItem(e)||sessionStorage.setItem(e,t))},r=function(){return $(".emit-message").val("")},c=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return chat.peoples_add.includes(e.nome)},u=function(){var e=document.querySelector(".messages");$(".messages").animate({scrollTop:e.scrollHeight},"slow")},l=function(){return{id:user.user_id,nome:user.nome,icon:user.icon}},d=function(){var e=new Date,t=function(e){return e<10?"0"+e:e},n=[t(e.getHours()),t(e.getMinutes()),t(e.getSeconds())];return n[0]+":"+n[1]+":"+n[2]},p=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=(document.querySelector.bind(document),1e4*t.length/t.length),o=0,a=t.length-1;setInterval(function(){var n=t[o];e.innerHTML=n,++o>a&&(o=0)},n)};e.exports={gen_id:s,session:i,clear_input:r,user_on_exists:c,to_scroll:u,get_user:l,get_horario:d,html_element:o,removerAcentos:a,bot_write:p}},function(e,t,n){"use strict";var o=function(e){var t=/(.*)<a(.*)>(.*)<\/a>(.*)/,n=/(.*)<iframe(.*)>(.*)<\/iframe>(.*)/;return t.test(e)?e:!!n.test(e)&&e},a=function(){return{login:function(e){return'\n            <div class="people" id="'+e.id+'">\n              <span class="status-active"></span>\n              <p class="name">'+e.nome+'</p>\n              <img src="'+(chat.url+e.icon)+'" alt="" class="my-icon">\n              <div class="user-message"></div>\n            </div>\n      '},ons:function(e){return'<span class="users-on spanabble">'+e.ons+"</span>"},message:function(e){return null===e.nome?"":$('\n              <div id="'+e.id+'" class="message">\n                <div class="user">\n                  <img src="'+(chat.url+e.icon)+'" alt="">\n                </div>\n                <span class="arrow"></span> \n                <div class="body">\n                  <div class="body-user">\n                      <p class="name-user">'+e.nome+'</p>\n                      <div class="time">'+e.horario+'</div>\n                  </div>\n                  <div class="text" '+(o(e.text)?'style="flex-direction:column;"':"")+">"+e.text+"</div>\n                </div>\n              </div>\n          ").attr("data-user",JSON.stringify(e))},message_people:function(e){var t=function(e){return'\n              <span class="arrow-user" style="border-right: 7.5px solid #2ecc71;"></span>\n              <div class="message">\n                <div class="text-user" style="background:#2ecc71">'+e+"</div>\n              </div>\n          "},n="";return document.querySelector(".people-active")||(console.log($('div.people[id="'+e.id+'"]>img')),$('div.people[id="'+e.id+'"]>img').css("border","1.5px solid #2ecc71"),n=$('div.people[id="'+e.id+'"] .user-message'),n.addClass("people-active"),n.html(t("Nova Mensagem"))),document.querySelector(".people-active")&&($(".people-active").parent().find("img").css("border","none"),$(".people-active").html(""),$(".people-active").removeClass("people-active"),n=$('div.people[id="'+e.id+'"] .user-message'),n.addClass("people-active"),n.html(t("Nova Mensagem")),$('div.people[id="'+e.id+'"]>img').css("border","1.5px solid #2ecc71")),n},logout:function(e){return $('\n              <div id="'+e.id+'" class="message">\n                <div class="user">\n                  <img src="'+(chat.url+e.icon)+'" alt="">\n                </div>\n                <span class="arrow"></span> \n                <div class="body">\n                  <div class="body-user">\n                      <p class="name-user">'+e.nome+'</p>\n                      <div class="time">'+e.horario+'</div>\n                  </div>\n                  <div class="text">'+e.nome+" saiu da sala.</div>\n                </div>\n              </div>\n          ").attr("data-user",JSON.stringify(e))},message_write:function(e){return $('\n            <div write-id="'+e.id+'" class="message bounceIn animated">\n              <div class="user">\n                <img src="'+(chat.url+e.icon)+'" alt="">\n              </div>\n              <span class="arrow"></span> \n              <div class="body">\n                <div class="body-user">\n                    <p class="name-user">'+e.nome+'</p>\n                    <div class="time">'+e.horario+'</div>\n                </div>\n                <div class="text">\n                    <div class="spinner">\n                      <div class="bounce1"></div>\n                      <div class="bounce2"></div>\n                      <div class="bounce3"></div>\n                    </div>\n                </div>\n              </div>\n            </div>\n          ')}}};e.exports=a},function(e,t,n){"use strict";var o=n(0),a=(o.gen_id,o.session,o.clear_input),s=(o.user_on_exists,o.to_scroll,o.get_user,o.get_horario,n(1),n(5)),i=function(e){$(e)&&$(e).remove()},r=function(e){var t={google:"#0057e7",youtube:"#cc181e",facebook:"#3b5998",github:"#333",default:"#3498db"};return t[e]?t[e]:t.default},c=function(){return a(),""},u="",l=function(e){return e===u||(u=e,!1)},d=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return l(e)?c():e.trim()},p=function(e){var t=document.createElement("div");return t.innerHTML=e,t.textContent.trim()},m=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return p(e).trim()},f=function(e){return/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)},g=function(e){if(f(e)){var t=document.createElement("a");t.href=e;var n=t.hostname.split("."),o="www"===n[0]?n[1]:n[0];e='\n\t\t\t<a href="'+e+'" style="background:'+r(o)+'" class="btn-link" target="__blank">\n\t\t\t\t'+o+"\n\t\t\t</a>\n  \t\t"}return e.trim()},h=function(e){var t="";return e.split(" ").map(function(e){return t+=g(e)+" "}),t.trim()},v=function(e){var t=function(e){return e.includes("https://youtu.be/")?"https://youtu.be/":!!e.includes("youtube.com/watch?v=")&&"youtube.com/watch?v="}(e);if(f(e)&&t){var n=e.split(t).pop();/(.*)\&(.*)/.test(n)&&(n=n.replace("&","?")),e='\n\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t<iframe class="upload" width="450" height="315" style="margin-top:15px" src="https://www.youtube.com/embed/'+n+'" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>\n\t\t',console.log(e)}return e.trim()},b=function(e){var t="";return e.split(" ").map(function(e){return t+=v(e)+" "}),t.trim()},y=function(e){var t=["mp4","webm","mpg","wmv","mov","avi"],n=["mp3","wav","pcm","acc","ogg","wma"];if(f(e)){var o="";e.includes("?")&&(o=e.split("?")[0]),o=o.split(".").pop(),t.includes(o)&&(e=function(e){return'\n\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t<video width="350" height="315" controls class="upload">\n\t\t  <source src="'+e.url+'" type="video/'+e.ext+'">\n\t\t</video>\n\t'}({url:e,ext:o})),n.includes(o)&&(e=function(e){return'\n\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t<audio controls class="upload">\n\t\t  <source src="'+e.url+'" type="audio/'+e.ext+'">\n\t\t</audio>\n\t'}({url:e,ext:o}))}return e.trim()},_=function(e){var t="";return e.split(" ").map(function(e){return t+=y(e)+" "}),t.trim()},x=function(e){var t=/^\/bot\s(.*)\s(.*)$/;if(t.test(e)){var n=Array.from(e.match(t)).slice(1),o=n[0].trim();o.includes(" ")&&(o=o.split(" "));var a=n[1].trim();return Array.isArray(o)&&(a=o[1]+" "+a,o=o[0]),a=a.trim(),console.log("Comando: "+o+", Capture: "+a),s[o]&&chat.bot_input&&s[o](a,socket),"init"===o&&s[o](a,socket),""}return e};e.exports={bot_spam:d,bot_remove:i,bot_strip_tags:m,bot_youtube:b,bot_urls_media:_,bot_url:h,bot_input:x}},function(e,t,n){"use strict";(function(t){t.neural=t.neural||n(11);neural.respond("hello init").run(function(){this.retorno(function(e){var t="global"===chat.sala_origin?"":chat.sala_origin;return"\n\t\t\tOlá "+e.nome+" seja bem vindo ao chat "+t+", meu nome é Junior!! 😄 \n\t\t"})}).save("hello"),neural.respond("o?(i|ie|la|ei) (junior|junior bot)").run(function(){this.retorno(function(e){return $(".junior-bot-user .user-message").css("display","none"),"Oie "+e.nome+", tudo bem com você? 🤗"})}).save("oi"),neural.respond("(junior|junior bot) quem e seu criador").run(function(){this.retorno(function(e){return"Meu criador é https://github.com/PaulaoDev"})}).save("criador"),neural.respond("(.*)(junior|junior bot) (eu|eu quero|quero) ouvir(.*?)").run(function(e,t){var t=this.args();t=t[t.length-1],t=t.trim(),this.retorno(function(e){return/funk/gim.test(t)?"https://www.youtube.com/watch?v=qc3rKuLI_uM":/sertanejo/gim.test(t)?"https://www.youtube.com/watch?v=HVlUnTekqqU":/rock/gim.test(t)?"https://www.youtube.com/watch?v=CSvFpBOe8eY":""})}).save("musica"),neural.respond("(.*)ta bem (junior|junior bot)\\?").run(function(){this.retorno(function(e){e.payload="https://www.youtube.com/watch?v=AxmsC2arlHk&start=18",e.bot={nome:"Junior Bot",icone:"src/images/junior.png",node:'[write-id="junior-bot-user"]'};var t=JSON.stringify(e);return"\n\t\t\tTo sim "+e.nome+' 😁, quer ver um video Engraçado?\n\t\t\t<button style="background:#3498db;border:none;cursor:pointer;" onclick="payload_event(this)" class="btn-link" data-payload=\''+t+"'>\n\t\t\t\tAssistir Video\n\t\t\t</button>\n\t\t"})}).save("ta_bem"),neural.respond("(junior|junior bot) qual e(.*)").run(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.retorno(function(e){return t=t.trim(),console.log(t),/meu nome/gim.test(t)&&(t="Seu nome é "+e.nome+" 🤗"),t})}).save("perguntaa"),neural.respond("(junior|junior bot) quero (rir|ficar (?:feliz|alegre)?|dar risada|(?:ver)? ?video engracado|rir (.*)|ver memes?|memes?)").run(function(){this.retorno(function(e){return"https://www.youtube.com/watch?v=AxmsC2arlHk&start=76&autoplay=1"})}).save("memes"),e.exports=neural}).call(t,n(10))},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();e.exports=function(){return new(function(){function e(){return o(this,e),this.filters=new Map,this}return a(e,[{key:"set",value:function(e,t){this.filters.set(e,t)}},{key:"get_filters",value:function(){return this.filters.getAll()}},{key:"run",value:function(e){e=e.trim();var e=this.get_filters().reduce(function(e,t){return t(e)},e);return e}}]),e}())}()},function(e,t,n){"use strict";var o=function(e,t){Array.from(document.querySelectorAll(".people .name")).map(function(n){if($(n).html()===e){$(".emit-message").val("");var o=$(n).parent().attr("id"),a=$("div#"+o+".message").data().user;$("div#"+o+".people").remove(),$("div#"+o+".message").remove(),t.emit("banido",a)}})},a=function(e,t){$(".emit-message").val(""),"key"===btoa(e)&&(chat.bot_input=!0,$(".emit-message").attr("placeholder","Bot input iniciado com sucesso."))};e.exports={ban:o,init:a}},function(e,t,n){"use strict";var o=n(0),a=(o.gen_id,o.session,o.clear_input,o.user_on_exists,o.to_scroll,o.get_user),s=o.get_horario;window.uploaded=function(e,t,n){var o=new FormData;o.append("fileUpload",t),$.ajax({url:e,data:o,processData:!1,contentType:!1,type:"POST",success:n})},e.exports.image_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Image Upload<input type="file" style="display: none;" class="image-upload" accept="image/*"></label>'),$(".image-upload").change(function(){var e=$(this).prop("files")[0];uploaded("../../../upload/imagem",e,function(e){if("success"===e.msg){command_toggle();var t='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<img src="'+e.path+'" class="upload"/>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:t,horario:s()}))}})})},e.exports.video_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Video Upload<input type="file" style="display: none;" class="video-upload" accept="video/*"></label>'),$(".video-upload").change(function(){var e=$(this).prop("files")[0];uploaded("../../../upload/video",e,function(e){if("success"===e.msg){command_toggle();var t=e.path.split(".").pop(),n='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<video class="video-upload upload" controls><source src="'+e.path+'" type="video/'+t+'"></video>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:n,horario:s()}))}})})},e.exports.audio_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Audio Upload<input type="file" style="display: none;" class="video-upload" accept="audio/*"></label>'),$(".video-upload").change(function(){var e=$(this).prop("files")[0];uploaded("../../../upload/audio",e,function(e){if("success"===e.msg){command_toggle();var t=e.path.split(".").pop(),n='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<audio class="audio-upload upload" controls><source src="'+e.path+'" type="audio/'+t+'"></audio>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:n,horario:s()}))}})})},e.exports.codigo_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Codigo Upload<input type="file" style="display: none;" class="code-upload" accept=".js,.html,.php,.css,.sass,.scss,.rb,.py,.ts,.c,.go,.rar"></label>'),$(".code-upload").change(function(){var e=$(this).prop("files")[0];uploaded("../../../upload/arquivo",e,function(e){if("success"===e.msg){command_toggle();var t={js:"#f7df1e",php:"#4f5b93",rar:"#8e44ad",css:"#00a98f",html:"#e34f26",default:"#f39c12"},n=e.path.split(".").pop(),o=t[n]?t[n]:t.default;console.log(o);var i='\n\t\t\t\t\t<a href="'+e.path+'" class="btn-link upload-up" style="background:'+o+';border:none;cursor:pointer;" download>Fazer download: '+e.path.split("/").pop()+"</a>\t\n\t\t\t\t";"rar"!==n&&(i='\n\t\t\t\t\t\t<a class="btn-link" target="__blank" href="./code/'+e.path.split("/").pop()+'" style="border:none;background:#3498db;cursor:pointer;width:40%;">Visualizar Codigo</button>\n\t\t\t\t\t\t'+i+"\n\t\t\t\t\t"),socket.emit("emit message",Object.assign({},a(),{text:i,horario:s()}))}})})},e.exports.help_chat=function(){$(this).parent().html('<div class="helped"><a href="mailto:jskhanframework@gmail.com?Subject=KhanChat" target="__blank"><div class="help-item"><i class="fa fa-envelope fa-lg" aria-hidden="true"></i><p class="entry">jskhanframework@gmail.com</p></div></a><a href="https://github.com/PaulaoDev" target="__blank"><div class="help-item"><i class="fa fa-github fa-lg" aria-hidden="true"></i><p class="entry">PaulaoDev</p></div></div></a>')}},function(e,t,n){"use strict";e.exports=[n(8),n(9),n(12)]},function(e,t,n){"use strict";var o=n(0),a=(o.gen_id,o.session,o.clear_input,o.user_on_exists),s=(o.to_scroll,o.get_user,o.get_horario,n(1)),i=function(e,t,n){chat.messages_receive_user.map(function(e){a(e)||(chat.peoples++,chat.peoples_add.push(e.nome),$(".peoples-timeline").append(s().login(e)),$(".users-on").html(chat.peoples))})},r=["message","escrevendo"],c={id:"0",nome:"new user bot",on:!0,code:"src/js/modules/bots/new_user.js",events:r,call:i};e.exports=c},function(e,t,n){"use strict";var o=n(0),a=(o.gen_id,o.session,o.clear_input,o.user_on_exists,o.to_scroll,o.get_user,o.get_horario),s=o.removerAcentos,i=o.bot_write,r=n(4),c=n(2),u=(n(1),n(3));r.set("bot urls media embed",c.bot_urls_media),r.set("embed youtube",c.bot_youtube),r.set("url",c.bot_url);var l=(n(3),"src/images/junior.png"),d=function(e,t){return"hello init"===t&&(e.init=!0),e.return=!1,e.text=r.run(e.text),e.nome="Junior Bot",e.icon=l,e.is_bot=!0,e.horario=a(),e.id="junior-bot-user",e.node='[write-id="'+e.id+'"]',e},p=function(e,t,n,o){e="login"===o?"hello init":e,u.run(e,function(e){t.text=e(t),m(n,t,1500)})},m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;t=d(t),e.emit("escrevendo",t),setTimeout(function(){e.emit("message",t),e.emit("clear",t.node)},n)},f=function(e,t,n){if(!t.text)return!1;var o=s(t.text.trim());p(o,t,n,e),"on"===e&&i(document.querySelector("div#junior-bot-user .text-user"),["Diz oi ai vai","To esperando","Me chama ai","To aguardando","Seja legal comigo"])},g=["on","message","login"],h={id:"1",nome:"junior bot",desc:"Robô feito para interagir com os usuarios pelo o chat.",on:!0,code:"src/js/modules/bots/junior.js",icon:l,events:g,call:f};e.exports=h},function(e,t,n){"use strict";var o,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":a(window))&&(o=window)}e.exports=o},function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var a={};a.calls={},a.entrys=[],a.train=function(e,t){a.entrys.push({input:new RegExp("^"+e+"$","i"),output:t})},a.run_train=function(e){return a.entrys.map(function(t){var n=t.input,o=t.output;t.level;return{input:n,output:o,status:n.test(e)}})},a.respond=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return{run:function(e){return{save:function(n){t.map(function(e){return a.train(e,n)}),a.calls[n]=e}}}}},a.run=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},n=a.run_train(e),s=n.filter(function(e){return e.status});if(null!==(s=Array.isArray(s)&&s.length>0?s[0]:null)){var i=s.output,r=s.input,c=Array.from(e.match(r))||[];c=c.length>0?c.slice(1):[],a.calls[i].bind({receive:e,intent:i,args:function(){return c},retorno:t}).apply(void 0,o(c))}},e.exports=a},function(e,t,n){"use strict";var o=n(0),a=(o.gen_id,o.session,o.clear_input,o.user_on_exists,o.to_scroll,o.get_user),s=(o.get_horario,o.removerAcentos,o.bot_write,function(e){var t=new Date,n=e.split(":"),o=n[0],a=n[1],s=n[2];return t.setHours(o),t.setMinutes(a),t.setSeconds(s),t}),i=function(e){var t=Array.from(document.querySelectorAll('.message[id="'+e+'"]')).pop();if(t=t,$(t).attr("data-user")){var n=JSON.parse(t.dataset.user);return new Date-s(n.horario)}},r=function(){var e=function(e){return sessionStorage.removeItem(e)};socket.emit("desconectou",a()),e("icone"),e("nome"),e("id"),e("status"),e("my_id"),setTimeout(function(){return location.href="./"},500)},c=function(e,t,n){Array.from(document.querySelectorAll(".people")).map(function(e){var t=$(e).attr("id");i(t)>=18e5&&!t.includes("bot")&&($('.people[id="'+t+'"]').remove(),t===a().id&&r())})},u=["on","write","message","login"],l={id:"2",nome:"bot remove",desc:"Robô feito para remover usuarios inativos do chat.",on:!0,code:"src/js/modules/bots/bot_remove.js",icon:"src/images/bot-remove.png",events:u,call:c};e.exports=l},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(0),s=(a.gen_id,a.session,a.clear_input),i=(a.user_on_exists,a.to_scroll,a.get_user),r=a.get_horario;"https:"===location.protocol&&(location.href="http:"+window.location.href.substring(window.location.protocol.length));var c=(n(14),n(16),n(1),n(2)),u=(n(17),n(4));n(18)(socket);window.uploads=n(6);var l=n(7),d=n(19),p=new d(socket);p.use(l),p.run();var m=!1;renderize_emoji(),u.set("bot urls media embed",c.bot_urls_media),u.set("embed youtube",c.bot_youtube),u.set("url",c.bot_url),u.set("anti spam",c.bot_spam),u.set("bot input",c.bot_input),window.payload_event=function(e){var t=$(e).data();if(t.payload){var n=t.payload;n.nome=n.bot.nome,n.icon=n.bot.icone,n.text=u.run(n.payload),socket.emit("chat",o({},chat.sala+"message",n))}},$(".emit-message").keypress(function(e){var t='[write-id="'+i().id+'"]',n=c.bot_strip_tags($(".emit-message").val());!1===m&&(socket.emit("chat",o({},chat.sala+"escrevendo",Object.assign({},i(),{text:i().nome+" está escrevendo.",horario:r(),node:t}))),m=!0),13===e.keyCode&&n.length>1&&n.length<500&&(socket.emit("chat",o({},chat.sala+"clear",t)),""!==(n=u.run(n))&&($(".emojis").css("display","none"),socket.emit("chat",o({},chat.sala+"message",Object.assign({},i(),{text:n,horario:r()}))),m=!1,s()))}),$(".logout").click(function(){var e=function(e){return sessionStorage.removeItem(e)};socket.emit("chat",o({},chat.sala+"logout",i())),e("icone"),e("my_id"),setTimeout(function(){return location.href=chat.url+"logout"},500)}),$(".open-emoji").click(emoji_toggle),chat.config_bar_buffer=$(".commands").html(),$(".open-commands").click(command_toggle),$(".menu-toggle").click(function(){$(this).html();"none"===$(".menu").css("display")?($(this).css("background","#e74c3c"),$(this).html('<i class="fa fa-times fa-lg" aria-hidden="true"></i>'),$(".menu").css("display","block")):($(this).css("background","#3498db"),$(this).html('<i class="fa fa-bars fa-lg" aria-hidden="true"></i>'),$(".menu").css("display","none"))}),$(".create-sala").click(function(){if(chat.sala_create)return!1;chat.sala_create=!0,$(this).css("background","#2ecc71"),$(this).removeClass("create-sala"),$(this).addClass("create-sala-build"),$(this).html('<i class="fa fa-check fa-lg" aria-hidden="true"></i>'),$(".sala-create").append('\n\t\t<input type="text" placeholder="Nome da sala para criar" class="sala-name"/>\n\t'),$(".create-sala-build").click(function(){if(chat.sala_create_build)return!1;chat.sala_create_build=!0;var e=$(".sala-name").val();if(e.length<2&&""===e)return!1;var t=e.trim().replace(/\s/,"-");$(".sala-name").css("display","none"),$(".sala-create").append('\n\t\t\t<button class="btn" id="btn-linked" data-clipboard-text="'+chat.url+"s/"+t+'">Copiar link da Sala</button>\n\t\t'),new Clipboard("#btn-linked").on("success",function(e){$(".sala-create .btn").html("Sala copiada com sucesso"),$("#btn-linked").css("background","#2ecc71"),e.clearSelection()})})})},function(e,t,n){"use strict";var o=window;o.command_toggle_hide=function(){$(".commands").css("display","none")},o.command_toggle=function(){emoji_hide(),$(".commands").toggle(function(){"block"===$(this).css("display")?($(this).css("display","flex"),$(".image-up").click(uploads.image_upload),$(".video-up").click(uploads.video_upload),$(".audio-up").click(uploads.audio_upload),$(".code-up").click(uploads.codigo_upload),$(".help-chat").click(uploads.help_chat)):($(this).html(chat.config_bar_buffer),$(this).css("height","10vh!important"),$(".image-up").click(uploads.image_upload),$(".video-up").click(uploads.video_upload),$(".audio-up").click(uploads.audio_upload),$(".code-up").click(uploads.codigo_upload),$(".help-chat").click(uploads.help_chat))})},o.renderize_emoji=function(){var e=n(15),t=e.reduce(function(e,t){var n='\n\t\t\t<span class="emoji-icon">\n\t\t\t\t'+t+"\n\t\t\t</span>\n\t\t";return e+emojione.toImage(n)},"");$(".emojis").append(t),$(".emoji-icon").click(function(){var e=$(".emit-message").val(),t=$(this).find("img").attr("alt");$(".emit-message").val(e+t)})},o.emoji_hide=function(){$(".emojis").css("display","none")},o.emoji_toggle=function(){command_toggle_hide(),$(".emojis").toggle(function(){"block"===$(this).css("display")?($(this).addClass("slideInUp animated"),$(this).css("display","flex")):$(this).addClass("slideInDown animated")})},o.apagar_luz=function(e){var t=$(e).parent().html(),n=$(e).parent().find(".upload"),o=$(".luz");"none"===o.css("display")&&(o.css("display","flex"),o.find(".luz-conteudo").html(n),$(e).parent().html(t),$(".menu-toggle").css("display","none !important"))},o.acender_luz=function(e){var t=$(".luz");"flex"===t.css("display")&&(t.css("display","none"),t.find(".luz-conteudo").html(""),$(".menu-toggle").css("display","block !important"))},o.toggle_menu=function(){chat.toggle_menu||(chat.toggle_menu=!1),chat.toggle_menu?($(".menu>.one").css("flex-direction",""),$(".layer-1>p").css("display","block"),$(".one>.layer-1,.one>.layer-2").css({width:"100%",justifyContent:"flex-end"}),$(".menu p.ons-agora").html("ONLINE AGORA"),$(".menu p.name").css("display","block"),$(".menu .user-message").css("display","flex"),$(".menu a.ons-agora").html("ROBOS ONLINES"),$(".menu a.ons-agora").css("padding","35px"),$(".bots-ons").css("padding","15px"),$(".bots-ons").css("width","91%"),$(".menu").css("width","30%"),$(".timeline").css("width","70%"),$(".one>.layer-2").html('<i class="fa fa-times no-mobile" aria-hidden="true"></i>'),$(".one>.layer-2>i").css("margin-right","25px"),$(".emojis").css("left","33.9%"),chat.toggle_menu=!1):($(".menu>.one").css("flex-direction","column"),$(".layer-1>p").css("display","none"),$(".one>.layer-1,.one>.layer-2").css({width:"100%",justifyContent:"center"}),$(".menu p.ons-agora").html("ONS"),$(".menu p.name").css("display","none"),$(".menu .user-message").css("display","none"),$(".menu a.ons-agora").html("R/ ONS"),$(".menu a.ons-agora").css("padding","15px"),$(".bots-ons").css("padding","0px"),$(".bots-ons").css("width","100%"),$(".bots-ons").css("height","10.5vh"),$(".menu").css("width","8%"),$(".timeline").css("width","92%"),$(".one>.layer-2").html('<i class="fa fa-bars" aria-hidden="true"></i>'),$(".one>.layer-2>i").css("margin-right","0px"),$(".emojis").css("left","56%"),chat.toggle_menu=!0)}},function(e,t,n){"use strict";e.exports=[":grinning:",":grin:",":joy:",":blush:",":yum:",":innocent:",":sunglasses:",":rage:",":rofl:",":alien:",":hugging:",":heart_eyes_cat:",":scream_cat:",":thumbsup:",":v:"]},function(e,t,n){"use strict";var o=new webkitSpeechRecognition;document.querySelector(".emit-message");o.continuous=!1,o.lang="pt-BR",o.onresult=function(e){Array.from(e.results).map(function(e){Array.from(e).map(function(e){$(".emit-message").val(e.transcript),$(".emit-message").trigger({type:"keypress",which:13,keyCode:13}),$(".open-voice").css("color","#fff")})})},$(".open-voice").click(function(){$(".open-voice").css("color","#e74c3c"),o.start()})},function(e,t,n){"use strict";var o=function(){function e(e,t){var n=[],o=!0,a=!1,s=void 0;try{for(var i,r=e[Symbol.iterator]();!(o=(i=r.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){a=!0,s=e}finally{try{!o&&r.return&&r.return()}finally{if(a)throw s}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.exports=function(){Map.prototype.getAll=function(){var e=[],t=!0,n=!1,a=void 0;try{for(var s,i=this[Symbol.iterator]();!(t=(s=i.next()).done);t=!0){var r=s.value,c=o(r,2),u=(c[0],c[1]);e.push(u)}}catch(e){n=!0,a=e}finally{try{!t&&i.return&&i.return()}finally{if(n)throw a}}return e}}()},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=n(0),s=(a.gen_id,a.session),i=(a.clear_input,a.user_on_exists),r=a.to_scroll,c=a.get_user,u=a.get_horario,l=(a.html_element,n(1)),d=n(2),p=d.bot_remove;e.exports=function(e){e.emit("chat",o({},chat.sala+"login",c())),e.on(chat.sala+"login",function(e){chat.messages++,i(e)||chat.peoples++;var t=Object.assign(e,{text:e.nome+" entrou na sala.",horario:u()});s("my_id",e.my_id),chat.messages_receive_user.push(e),i(e)||(chat.peoples_add.push(e.nome),t.text=emojione.toImage(t.text),$(".peoples-timeline").append(l().login(t)),$(".messages").append(l().message(t)),$(".messages-number").html(chat.messages),$(".users-on").html(chat.peoples),r())}),e.on(chat.sala+"message",function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(e.text=emojione.toImage(e.text),console.log(chat.end_message.includes(e.text)),!chat.end_message.includes(e.text)){chat.messages++,chat.end_message=e.text;var t=l().message(e);$(".messages").append(t),$(".messages-number").html(chat.messages),e.init||l().message_people(e),chat.messages_receive_user.push(e),r()}}),e.on(chat.sala+"clear",function(e){p(e)}),e.on(chat.sala+"escrevendo",function(e){document.querySelector(e.node)||($(".messages").append(l().message_write(e)),r())}),e.on(chat.sala+"banido",function(e){e.text=e.nome+" foi banido da sala.",e.horario=u();var t=e,n=l().message(t);$(".messages").append(n),e.id===c().id&&(location.href="./logout")}),e.on(chat.sala+"logout",function(e){$(".messages").append(l().logout(Object.assign({},e,{horario:u()}))),p('.peoples-timeline>div[id="'+e.id+'"]'),r()})}},function(e,t,n){"use strict";function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();e.exports=function(){function e(t){a(this,e),this.server=t,this.config()}return s(e,[{key:"use",value:function(e){var t=this;Array.isArray(e)?e.map(function(e){t.config.bots.includes(e)||t.config.bots.push(e)}):this.config.bots.includes(e)||this.config.bots.push(e)}},{key:"config",value:function(e){this.config.bots=[]}},{key:"attach_on",value:function(){var e=this;this.config.bots.map(function(t){if(t.events.includes("on")){var n={emit:function(t,n){e.server.emit("chat",o({},chat.sala+t,n))},on:function(t,n){e.server.on(chat.sala+t,n)}};t.call("on",{},n)}})}},{key:"run",value:function(){var e=this;this.config.bots.map(function(t){t.events.map(function(n){e.server.on(chat.sala+n,function(a){var s={emit:function(t,n){e.server.emit("chat",o({},chat.sala+t,n))},on:function(t,n){e.server.on(chat.sala+t,n)}};t.call(n,a,s)})})}),this.attach_on()}}]),e}()}]);