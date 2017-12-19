const { 
	gen_id, 
	session, 
	clear_input,
	user_on_exists,
	to_scroll,
	get_user,
	get_horario
} = require('./utils');

window.uploaded = (url, file, callback) => {
	var form = new FormData();
    form.append('fileUpload', file);
	$.ajax({
        url: url,
        data: form,
        processData: false,
        contentType: false,
        type: 'POST',
        success: callback
    });
};

module.exports.image_upload = function(){
	let tpl = `<label class="btn btn-file-upload" style="cursor:pointer">Image Upload<input type="file" style="display: none;" class="image-upload" accept="image/*"></label>`;
	$(this).parent().html(tpl);
	$('.image-upload').change(function(){
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/imagem', file, function (data) {
			if(data.msg === "success"){
				command_toggle();
				let temp = `
					<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
					<img src="${data.path}" class="upload"/>
				`;
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
        });
	});
};

module.exports.video_upload = function(){
	let tpl = `<label class="btn btn-file-upload" style="cursor:pointer">Video Upload<input type="file" style="display: none;" class="video-upload" accept="video/*"></label>`;
	$(this).parent().html(tpl);
	$('.video-upload').change(function(){
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/video', file, function(up){
			if(up.msg === "success"){
				command_toggle();
				let ext = up.path.split('.').pop();
				let temp = `
					<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
					<video class="video-upload upload" controls><source src="${up.path}" type="video/${ext}"></video>
				`;
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.audio_upload = function(){
	let tpl = `<label class="btn btn-file-upload" style="cursor:pointer">Audio Upload<input type="file" style="display: none;" class="video-upload" accept="audio/*"></label>`;
	$(this).parent().html(tpl);
	$('.video-upload').change(function(){
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/audio', file, function(up){
			if(up.msg === "success"){
				command_toggle();
				let ext = up.path.split('.').pop();
				let temp = `
					<button class="btn-link" onclick="apagar_luz(this)" style="border:none;background:#3498db;cursor:pointer">Apagar Luz</button>
					<audio class="audio-upload upload" controls><source src="${up.path}" type="audio/${ext}"></audio>
				`;
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.codigo_upload = function(){
	let tpl = `<label class="btn btn-file-upload" style="cursor:pointer">Codigo Upload<input type="file" style="display: none;" class="code-upload" accept=".js,.html,.php,.css,.sass,.scss,.rb,.py,.ts,.c,.go,.rar"></label>`;
	$(this).parent().html(tpl);
	$('.code-upload').change(function(){
		var file = $(this).prop('files')[0];
		uploaded('../../../upload/arquivo', file, function(up){
			if(up.msg === "success"){
				command_toggle();
				let cores = {
					"js": "#f7df1e",
					"php": "#4f5b93",
					"rar": "#8e44ad",
					"css": "#00a98f",
					"html": "#e34f26",
					"default": "#f39c12"
				};
				let ext = up.path.split('.').pop();
				var cor = (cores[ext]) ? cores[ext] : cores["default"];
				console.log(cor);
				let temp = `
					<a href="${up.path}" class="btn-link upload-up" style="background:${cor};border:none;cursor:pointer;" download>Fazer download: ${up.path.split('/').pop()}</a>	
				`;
				if(ext !== "rar"){
					temp = `
						<a class="btn-link" target="__blank" href="./code/${up.path.split('/').pop()}" style="border:none;background:#3498db;cursor:pointer;width:40%;">Visualizar Codigo</button>
						${temp}
					`;
				}
				socket.emit('emit message', Object.assign({}, get_user(), {
					'text': temp,
					'horario': get_horario()
				}));
			}
		});
	});
};

module.exports.help_chat = function(){
	let tpl = `<div class="helped"><a href="mailto:jskhanframework@gmail.com?Subject=KhanChat" target="__blank"><div class="help-item"><i class="fa fa-envelope fa-lg" aria-hidden="true"></i><p class="entry">jskhanframework@gmail.com</p></div></a><a href="https://github.com/PaulaoDev" target="__blank"><div class="help-item"><i class="fa fa-github fa-lg" aria-hidden="true"></i><p class="entry">PaulaoDev</p></div></div></a>`;
	$(this).parent().html(tpl);
};