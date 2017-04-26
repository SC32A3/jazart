<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta content="charset=UTF-8">
<title>Insert title here</title>
<!-- <script src="resources/jquery-3.1.1.min.js"></script> -->
<script type="text/javascript">
	window.onload = function() {
		var xhr = new XMLHttpRequest();
		//xhr.open("GET", "download?name=" + name, true);
		xhr.open("GET", "ajaxTest1", true);
		
		xhr.overrideMimeType('audio/wav'); //~테스트소스~ application/xml
		//xhr.setRequestHeader("Content-Type","audio/mpeg"); 
		
		xhr.responseType = "blob";
		xhr.onreadystatechange = function () {
		  if (xhr.readyState == xhr.DONE) {
		    var blob = new Blob([xhr.response], {type: "audio/wav"});
		    
		    /* var audio = document.getElementById("my-audio");
		    audio.src = URL.createObjectURL(blob); */
		    
		    var hihi = document.getElementById("hihi");
		    hihi.href = URL.createObjectURL(blob);
		    hihi.download = "hihi.wav";
		  }
		}
		xhr.send();
	}
</script>
</head>
<body>
	<p>안되는놈</p>
	<audio controls>
		<source id="my-audio" src="" type="audio/wav">
	</audio>
	<a id="hihi">hihi</a>
	<p>되는놈</p>
	<audio controls>
		<source src="src/sample/test2.wav" type="audio/wav">
	</audio>
	
</body>
</html>