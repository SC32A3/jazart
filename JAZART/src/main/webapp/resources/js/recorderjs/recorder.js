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

  Recorder.setupDownload = function(blob, downfile){
	  recIndex++;
	  var url = (window.URL || window.webkitURL).createObjectURL(blob); alert(url);
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
	  
	// 삭제하기
      deleteButton.onclick = function(e) {
		evtTgt = e.target;
		evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode); //section에서 article을 날림
	  }
  }

  window.Recorder = Recorder;

})(window);
