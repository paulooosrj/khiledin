var recognizer = new webkitSpeechRecognition();

var output = document.querySelector('.emit-message');

recognizer.continuous = false;
recognizer.lang = "pt-BR";

recognizer.onresult = function(event){
   	Array.from(event.results).map(e => {
   		Array.from(e).map((e) => {
   			$(".emit-message").val(e.transcript);
   			$(".emit-message").trigger({type: 'keypress', which: 13, keyCode: 13});
   			$('.open-voice').css('color', '#fff');
   		});
   	});
};

$('.open-voice').click(function(){
	$('.open-voice').css('color', '#e74c3c');
	recognizer.start();
});
