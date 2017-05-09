/* Copyright 2013 Chris Wilson

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var rafID = null;
var analyserContext = null;
var canvasWidth, canvasHeight;
var recIndex = 0;

/* TODO:

- offer mono option
- "Monitor input" switch
*/

function saveAudio() {
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers( buffers ) {
	var canvas = document.getElementById( "wavedisplay" );
    //alert(buffers); //012013021103213323이런값으로 옴
    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] ); //표시해주는것

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
  /*  var tSpan = $("#testSpan");
	var inputSpan = '<audio id="newAudio" src="" controls></audio>';
	tSpan.html(inputSpan);*/
    
	/*audioRecorder.exportWAV( function ( blob ) {
    	  var url = (window.URL || window.webkitURL).createObjectURL(blob);
    	  alert(url);
    	  var aLink = $("#newAudio");
    	  aLink.attr("src", url);
	})*/
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
	var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
    Recorder.setupDownload( blob , clipName); 
}

function toggleRecording( e ) {
    if (e.classList.contains("recording")) {
        // stop recording
        audioRecorder.stop();
        e.classList.remove("recording");
        audioRecorder.getBuffers( gotBuffers );
    } else { 
    	// start recording
        if (!audioRecorder)
            return;
        
        /*new Audio('resources/metro.mp3').play();
    	setTimeout(function(){*/
            e.classList.add("recording");
            audioRecorder.clear();
            audioRecorder.record();
    	//}, 5000);
    }
}

function test(){
}

function toggle2(blob, clipName, count){
	var soundClips = document.querySelector('.sound-clips');
	var clipContainer = document.createElement('article');
	var clipText = document.createTextNode(clipName);
	var clipTextSpan = document.createElement('span');
	var clipLabel = document.createElement('a');
	var audio = document.createElement('audio');
	var clipSpan = document.createElement('span');
	var deleteButton = document.createElement('button');

	clipContainer.classList.add('clip');
	clipTextSpan.classList.add('clipText');
	clipSpan.classList.add('clipSpan');
	deleteButton.classList.add('clipSpan');
	clipLabel.classList.add('clipA');
	
	audio.controls = true;
	audio.setAttribute('controls', '');
	deleteButton.textContent = 'Delete';
	deleteButton.className = 'delete';
	
	clipLabel.textContent = 'Save';
	
	clipSpan.appendChild(clipLabel);
	clipTextSpan.appendChild(clipText);
	clipContainer.appendChild(clipTextSpan);
	clipContainer.appendChild(audio);
	clipContainer.appendChild(clipSpan);
	clipContainer.appendChild(deleteButton);
	soundClips.appendChild(clipContainer);
	
	clipLabel.classList.add('aTag'+count);
	audio.classList.add('audio'+count);
	//
	
	// 삭제하기
	deleteButton.onclick = function(e) {
		evtTgt = e.target;
		evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode); //section에서 article을 날림
	}
	
	Recorder.setupDownload(blob, clipName, count);
}

function convertToMono( input ) {
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById("analyser");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }

    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
}

function toggleMono() {
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

//    audioInput = convertToMono( input );

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect( analyserNode );

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );
    updateAnalysers();
}

function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio );
