<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta content="charset=UTF-8">
<title>Insert title here</title>
<script src="resources/jquery-3.1.1.min.js"></script>
<script src="resources/js/audiodisplay.js"></script>
<script src="resources/js/recorderjs/recorder.js"></script>
<script src="resources/js/rec_main.js"></script>
<style type="text/css">
.btn {
	width: 30px;
	height: 30px; 
}

canvas {
	display: inline-block;
	background: #fffcfc;
	width: 200px;
	height: 70px;
}

#controls {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	height: 100%;
	width: 100%;
}

#record.recording {
	background: red;
	background: -webkit-radial-gradient(center, ellipse cover, #ff0000 0%, lightgrey 75%
		, lightgrey 100%, #7db9e8 100%);
	background: -moz-radial-gradient(center, ellipse cover, #ff0000 0%, lightgrey 75%,
		lightgrey 100%, #7db9e8 100%);
	background: radial-gradient(center, ellipse cover, #ff0000 0%, lightgrey 75%,
		lightgrey 100%, #7db9e8 100%);
}


#save {
	opacity: 0.25;
}

#save[download] {
	opacity: 1;
}

#viz {
	height: 80%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
}

@media ( orientation : landscape) {
	body {
		flex-direction: row;
	}
	#controls {
		flex-direction: column;
		height: 100%;
		width: 10%;
	}
	#viz {
		height: 100%;
		width: 90%;
	}
}
</style>
</head>
<body>
	<div id="viz">
		<canvas id="analyser" width="1024" height="500"></canvas>
		<canvas id="wavedisplay" width="1024" height="500"></canvas>
	</div>
	<div id="controls">
		<img id="record" class="btn" src="images/record.png"
			onclick="toggleRecording(this);"> <a id="save" href="#"><img
			class="btn" src="images/save.png"></a>
	</div>
</body>
</html>