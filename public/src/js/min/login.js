!function(t){function e(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var o={};e.m=t,e.c=o,e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=20)}({0:function(t,e,o){"use strict";function n(t){var e=document.createElement("div");return e.innerHTML=t,e.firstChild}function a(t){var e=t,o={a:/[\xE0-\xE6]/g,A:/[\xC0-\xC6]/g,e:/[\xE8-\xEB]/g,E:/[\xC8-\xCB]/g,i:/[\xEC-\xEF]/g,I:/[\xCC-\xCF]/g,o:/[\xF2-\xF6]/g,O:/[\xD2-\xD6]/g,u:/[\xF9-\xFC]/g,U:/[\xD9-\xDC]/g,c:/\xE7/g,C:/\xC7/g,n:/\xF1/g,N:/\xD1/g};for(var n in o){var a=o[n];e=e.replace(a,n)}return e}var i=function(){return Math.floor(1e3*Math.random())+Math.floor(1e3*Math.random())},s=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)return sessionStorage.getItem(t)?sessionStorage.getItem(t):null;null!==e&&(sessionStorage.getItem(t)||sessionStorage.setItem(t,e))},r=function(){return $(".emit-message").val("")},l=function(t){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return chat.peoples_add.includes(t.nome)},u=function(){var t=document.querySelector(".messages");$(".messages").animate({scrollTop:t.scrollHeight},"slow")},c=function(){return{id:user.user_id,nome:user.nome,icon:user.icon}},p=function(){var t=new Date,e=function(t){return t<10?"0"+t:t},o=[e(t.getHours()),e(t.getMinutes()),e(t.getSeconds())];return o[0]+":"+o[1]+":"+o[2]},d=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],o=(document.querySelector.bind(document),1e4*e.length/e.length),n=0,a=e.length-1;setInterval(function(){var o=e[n];t.innerHTML=o,++n>a&&(n=0)},o)};t.exports={gen_id:i,session:s,clear_input:r,user_on_exists:l,to_scroll:u,get_user:c,get_horario:p,html_element:n,removerAcentos:a,bot_write:d}},20:function(t,e,o){"use strict";var n=o(0);n.gen_id,n.session;window.uploads=o(6);var a=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(null===e)return localStorage.getItem(t)?localStorage.getItem(t):null;null!==e&&(localStorage.getItem(t)||localStorage.setItem(t,e))};$(document).ready(function(t){t(".dropdown-button").dropdown(),t(".modal").modal(),t(".signup-toggle").click(function(){t(this).hide(),t(".signupForm").show(300),t(".policy").css("visibility","visible")});!function(){a("email")&&a("password")&&(t("#user").val(a("email")),t("#pass").val(a("password")))}();var e=function(t){Object.keys(t).map(function(e){return a(e,t[e])})},o=function(t){e(t);var o=location.hash.slice(1);o&&o.includes("room/")?location.href=location.origin+o.replace("#/room/"):location.href="/room"},n=function(){t(".btn-file-up").append("Upload Feito")},i=function(t){return navigator.geolocation.getCurrentPosition(function(e){return t(e.coords)})},s=function(){return(new Date).toString()};t(".cadastro-form").submit(function(e){e.preventDefault();var o=function(t){return t={latitude:t.latitude,longitude:t.longitude},"{"+Object.keys(t).map(function(e){return'"'+e+'": "'+t[e]+'"'})+"}"};i(function(e){var n=t(".icon").prop("files")[0];uploaded("../../../upload/imagem",n,function(n){if("success"===n.msg){var a=t(".cadastro-form"),i={},r=s();i.username=a.find("#name-picked").val(),i.password=a.find("#pass-picked").val(),i.email=a.find("#email").val(),i.icon=n.path,i.admin=!1,i.location=o(e),i.created_at=r,i.updated_at=r,t.post("../../../api/users/new",i,function(e){e=JSON.parse(e),"success"===e.msg&&(t("div.signupForm > h4").addClass("green-text"),t("div.signupForm > h4").text("Já pode fazer o login!!"))})}})})}),t(".btn-cadastro").click(function(){t(".cadastro-form").submit()}),t(".login-form").submit(function(e){e.preventDefault();var n=t(".login-form"),a={};a.email=n.find("#user").val(),a.password=n.find("#pass").val(),t.post("../../../api/users/auth",a,function(t){t=JSON.parse(t),"success"===t.msg&&o(a)})}),t(".icon").change(function(e){t(".icon").prop("files")[0]&&n()})})},6:function(t,e,o){"use strict";var n=o(0),a=(n.gen_id,n.session,n.clear_input,n.user_on_exists,n.to_scroll,n.get_user),i=n.get_horario;window.uploaded=function(t,e,o){var n=new FormData;n.append("fileUpload",e),$.ajax({url:t,data:n,processData:!1,contentType:!1,type:"POST",success:o})},t.exports.image_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Image Upload<input type="file" style="display: none;" class="image-upload" accept="image/*"></label>'),$(".image-upload").change(function(){var t=$(this).prop("files")[0];uploaded("../../../upload/imagem",t,function(t){if("success"===t.msg){command_toggle();var e='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<img src="'+t.path+'" class="upload"/>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:e,horario:i()}))}})})},t.exports.video_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Video Upload<input type="file" style="display: none;" class="video-upload" accept="video/*"></label>'),$(".video-upload").change(function(){var t=$(this).prop("files")[0];uploaded("../../../upload/video",t,function(t){if("success"===t.msg){command_toggle();var e=t.path.split(".").pop(),o='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<video class="video-upload upload" controls><source src="'+t.path+'" type="video/'+e+'"></video>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:o,horario:i()}))}})})},t.exports.audio_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Audio Upload<input type="file" style="display: none;" class="video-upload" accept="audio/*"></label>'),$(".video-upload").change(function(){var t=$(this).prop("files")[0];uploaded("../../../upload/audio",t,function(t){if("success"===t.msg){command_toggle();var e=t.path.split(".").pop(),o='\n\t\t\t\t\t<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>\n\t\t\t\t\t<audio class="audio-upload upload" controls><source src="'+t.path+'" type="audio/'+e+'"></audio>\n\t\t\t\t';socket.emit("emit message",Object.assign({},a(),{text:o,horario:i()}))}})})},t.exports.codigo_upload=function(){$(this).parent().html('<label class="btn btn-file-upload" style="cursor:pointer">Codigo Upload<input type="file" style="display: none;" class="code-upload" accept=".js,.html,.php,.css,.sass,.scss,.rb,.py,.ts,.c,.go,.rar"></label>'),$(".code-upload").change(function(){var t=$(this).prop("files")[0];uploaded("../../../upload/arquivo",t,function(t){if("success"===t.msg){command_toggle();var e={js:"#f7df1e",php:"#4f5b93",rar:"#8e44ad",css:"#00a98f",html:"#e34f26",default:"#f39c12"},o=t.path.split(".").pop(),n=e[o]?e[o]:e.default;console.log(n);var s='\n\t\t\t\t\t<a href="'+t.path+'" class="btn-link upload-up" style="background:'+n+';border:none;cursor:pointer;" download>Fazer download: '+t.path.split("/").pop()+"</a>\t\n\t\t\t\t";"rar"!==o&&(s='\n\t\t\t\t\t\t<a class="btn-link" target="__blank" href="./code/'+t.path.split("/").pop()+'" style="border:none;background:#3498db;cursor:pointer;width:40%;">Visualizar Codigo</button>\n\t\t\t\t\t\t'+s+"\n\t\t\t\t\t"),socket.emit("emit message",Object.assign({},a(),{text:s,horario:i()}))}})})},t.exports.help_chat=function(){$(this).parent().html('<div class="helped"><a href="mailto:jskhanframework@gmail.com?Subject=KhanChat" target="__blank"><div class="help-item"><i class="fa fa-envelope fa-lg" aria-hidden="true"></i><p class="entry">jskhanframework@gmail.com</p></div></a><a href="https://github.com/PaulaoDev" target="__blank"><div class="help-item"><i class="fa fa-github fa-lg" aria-hidden="true"></i><p class="entry">PaulaoDev</p></div></div></a>')}}});