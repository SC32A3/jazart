/*License (MIT)

Copyright © 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and 
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of 
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
*/

(function(window){
  var count = 0;
  var soundClips = document.querySelector('.sound-clips'); // 사운드태그생기는 빈div
  
  var recIndex = 0;
  var WORKER_PATH = 'resources/js/recorderjs/recorderWorker.js';

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    this.context = source.context;
    if(!this.context.createScriptProcessor){
       this.node = this.context.createJavaScriptNode(bufferLen, 2, 2);
    } else {
       this.node = this.context.createScriptProcessor(bufferLen, 2, 2);
    }
   
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });
    var recording = false,
      currCallback;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0),
          e.inputBuffer.getChannelData(1)
        ]
      });
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
      recording = true;
    }

    this.stop = function(){
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffers = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffers' })
    }

    this.exportWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }

    this.exportMonoWAV = function(cb, type){
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportMonoWAV',
        type: type
      });
    }

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    }

    source.connect(this.node);
    this.node.connect(this.context.destination);   // if the script node is not connected to an output the "onaudioprocess" event is not triggered in chrome.
  };

  Recorder.setupDownload = function(blob, clipName){
	    count++;
	    var soundClips = document.querySelector('.sound-clips'); // 사운드태그생기는 빈div
	    var hiddenTag = document.getElementById('recordFlag');

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
		var audioURL = window.URL.createObjectURL(blob);
		audio.src = audioURL;
		
		clipLabel.classList.add('test'+count);
		clipLabel.href = audioURL;
		clipLabel.download = clipName + '.wav' || 'output.wav';
		console.log("recorder stopped");
	  
	  
	  
	  
	  /*recIndex++;
	  var url = (window.URL || window.webkitURL).createObjectURL(blob);
	  //내코드
	  var controls = document.getElementById('controls');
	  var clipContainer = document.createElement('article');//아티클
      var clipLabel = document.createElement('p');//파일명
      
      var audio = document.createElement('audio'); //오디오
      	  audio.src = url;
      	  audio.controls = true;
      var aTag = document.createElement('a'); //atag
	      aTag.href = url;
	      aTag.download = downfile || 'output.wav';
      var deleteButton = document.createElement('button'); //삭제버튼
     
      clipContainer.classList.add('clip');
      
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(downfile === null) {
        clipLabel.textContent = 'My unnamed clip '+recIndex;
      } else {
        clipLabel.textContent = downfile;
      }

      clipContainer.appendChild(audio); //오디오->아티클 
      clipContainer.appendChild(clipLabel); //파일명->아티클
      clipContainer.appendChild(deleteButton); //삭제버튼->아티클
      controls.appendChild(clipContainer); //아티클->div
	  //내 코드끝
	  
	  var link = document.getElementById("save");
	  link.href = url;
	  link.download = downfile || 'output.wav';
	  //c://userProfile/**.jpg //fileservice.java
*/	  
	// 삭제하기
      deleteButton.onclick = function(e) {
		evtTgt = e.target;
		evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode); //section에서 article을 날림
	  }
  }

  window.Recorder = Recorder;

})(window);
