// fork getUserMedia for multiple browser versions, for the future
// when more browsers support MediaRecorder
$(function() {

	navigator.getUserMedia = (navigator.getUserMedia
			|| navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	// set up basic variables for app

	var count = 0;
	
	var record = document.querySelector('.record'); // 레코드버튼
	var stop = document.querySelector('.stop'); // 스톱버튼
	var soundClips = document.querySelector('.sound-clips'); // 사운드태그생기는 빈div
	var canvas = document.querySelector('.visualizer'); // 캔버스

	// disable stop button while not recording 레코딩중이아니면 스탑 비활성화

	stop.disabled = true;

	// visualiser setup - create web audio api context and canvas

	var audioCtx = new (window.AudioContext || webkitAudioContext)(); // 오디오context
	var canvasCtx = canvas.getContext("2d"); // 캔버스 2d

	// main block for doing the audio recording

	if (navigator.getUserMedia) {
		console.log('getUserMedia supported.'); // 로그니까 상관 없음

		var constraints = {
			audio : true
		}; // 오디오 트루
		var chunks = []; // 빈배열값

		var onSuccess = function(stream) { // 성공시 스트림을 받아서
			var mediaRecorder = new MediaRecorder(stream);

			visualize(stream); // 스트림 시각화

			record.onclick = function() { // 녹음 클릭시
				mediaRecorder.start(); // 녹음 스타트
				console.log(mediaRecorder.state);
				console.log("recorder started");
				record.style.background = "red"; // 배경색 지정

				stop.disabled = false; // 스톱버튼 활성화
				record.disabled = true; // 녹음버튼 비활성화
			}

			stop.onclick = function() { // 스탑시
				mediaRecorder.stop(); // 레코더 스탑
				console.log(mediaRecorder.state);
				console.log("recorder stopped");
				record.style.background = ""; // 배경초기화
				record.style.color = ""; // 배경글씨색
				// mediaRecorder.requestData();

				stop.disabled = true;
				record.disabled = false;
			}

			mediaRecorder.onstop = function(e) {
				count++;
				console
						.log("data available after MediaRecorder.stop() called.");

				var hiddenTag = document.getElementById('recordFlag');
				
				var clipName = prompt('Enter a name for your sound clip?',
						'My music source');
				console.log(clipName);
				var clipContainer = document.createElement('article');
				var clipText = document.createTextNode(clipName);
				var clipTextSpan = document.createElement('span');
				var clipLabel = document.createElement('a');
				var audio = document.createElement('audio');
				//var saveButton = document.createElement('button');
				var deleteButton = document.createElement('button');
				var clipSpan = document.createElement('span');
				var clipImg = document.createElement('img');
				
				audio.classList.add('recAudio');
				clipContainer.classList.add('clip');
				clipTextSpan.classList.add('clipText');
				clipSpan.classList.add('clipSpan');
				deleteButton.classList.add('clipSpan');
				clipLabel.classList.add('clipA');

				audio.setAttribute('controls', '');
				deleteButton.textContent = 'Delete';
				deleteButton.className = 'delete';

				if (clipName === null || clipName == "My music source") {
					clipText.textContent = 'My music source ' + count + '.wav';
					clipName = 'My music source ' + count;
				} else {
					clipText.textContent = clipName + '.wav';
					count--;
				}
				
				clipLabel.textContent = 'Save';
				
				if (hiddenTag.value == 'record') {
					clipImg.classList.add('clipImg');
					clipImg.src = 'images/recordingIcon.png';
					clipTextSpan.appendChild(clipImg);
				} else if (hiddenTag.value == 'keyboard') {
					clipImg.classList.add('clipImg');
					clipImg.src = 'images/keyboard.png';
					clipTextSpan.appendChild(clipImg);
				} else if (hiddenTag.value == '') {
					clipImg.classList.add('clipImg');
					clipImg.src = 'images/drum.png';
					clipTextSpan.appendChild(clipImg);
				}				
				clipTextSpan.appendChild(clipText);
				clipSpan.appendChild(clipLabel);
				clipContainer.appendChild(clipTextSpan);
				clipContainer.appendChild(audio);
				clipContainer.appendChild(clipSpan);
				clipContainer.appendChild(deleteButton);
				
				soundClips.appendChild(clipContainer);

				audio.controls = true;
				var blob = new Blob(chunks, {
					'type' : 'audio/ogg; codecs=opus'
				});
				chunks = [];	
				var audioURL = window.URL.createObjectURL(blob);
				audio.src = audioURL;
				
				clipLabel.classList.add('test'+count);
				clipLabel.href = audioURL;
				clipLabel.download = clipName + '.wav' || 'output.wav';
				console.log("recorder stopped");

				// 삭제하기
				deleteButton.onclick = function(e) {
					evtTgt = e.target;
					evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode); //section에서 article을 날림
				}
			}

			// 데이터가 사용가능하면 빈배열에 데이터를 넣어라..?!
			mediaRecorder.ondataavailable = function(e) {
				chunks.push(e.data);
			}
		}

		var onError = function(err) {
			console.log('The following error occured: ' + err);
		}

		navigator.getUserMedia(constraints, onSuccess, onError);
	} else {
		console.log('getUserMedia not supported on your browser!');
	}

	function visualize(stream) {
		var source = audioCtx.createMediaStreamSource(stream);

		var analyser = audioCtx.createAnalyser();
		analyser.fftSize = 2048;
		var bufferLength = analyser.frequencyBinCount;
		var dataArray = new Uint8Array(bufferLength);

		source.connect(analyser);
		// analyser.connect(audioCtx.destination);

		WIDTH = canvas.width
		HEIGHT = canvas.height;
		draw()

		function draw() {

			requestAnimationFrame(draw);

			analyser.getByteTimeDomainData(dataArray);

			canvasCtx.fillStyle = 'rgb(255, 252, 252)';
			canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

			canvasCtx.lineWidth = 2;
			canvasCtx.strokeStyle = 'rgb(75, 36, 36)';

			canvasCtx.beginPath();

			var sliceWidth = WIDTH * 1.0 / bufferLength;
			var x = 0;
			
			for (var i = 0; i < bufferLength; i++) { //여기가 버퍼랭스에 맞게 x,y값 잡아주는 것
				
				var v = dataArray[i] / 128.0;
				var y = v * HEIGHT / 2;

				if (i === 0) {
					canvasCtx.moveTo(x, y);
				} else {
					canvasCtx.lineTo(x, y);
				}
				
				x += sliceWidth;
				console.log('dataArray[i]'+dataArray[i]/128.0);
			}
			var hei = canvas.height / 2;
			canvasCtx.lineTo(canvas.width, hei);
			canvasCtx.stroke();

		}
	}
})
