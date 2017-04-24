<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PIANO</title>
<style>
.key {
	position: absolute;
	font-family: Helvetica;
	font-weight: 100;
	font-size: 12px;
	border: 1px solid rgba(32, 32, 32, 0.2);
	border-radius: 0px 0px 5px 5px;
	cursor: pointer;
	box-shadow: 0px 5px 1px rgba(32, 32, 32, 0.2);
	-webkit-transition: margin 0.05s ease, background-color 0.05s ease,
		box-shadow 0.05s ease;
}

.key:hover {
	background-color: rgb(255, 192, 32);
}

.key .label {
	position: absolute;
	bottom: 5px;
	text-align: center;
	left: 0px;
	right: 0px;
}

.ctrTab{
 	text-align: center;
}

.black {
	background-color: rgb(32, 32, 32);
	color: #ffffff;
	z-index: 1;
	text-shadow: 0px -1px 1px rgba(255, 255, 255, 0.5);
}

.white {
	background-color: #ffffff;
	color: rgb(32, 32, 32);
	z-index: 0;
	text-shadow: 0px 1px 1px rgba(32, 32, 32, 0.5);
}

.title {
	text-shadow: 0px 1px 1px rgba(32, 32, 32, 0.2);
	font-size: 40px;
	font-weight: bold;
	font-family: Helvetica;
	padding: 10px;
	text-align: center;
}

.sub {
	color: rgb(96, 96, 96);
	font-size: 30px;
	padding: 10px;
	font-weight: 100;
	margin: 10px 0px;
	text-shadow: 0px 1px 1px rgba(32, 32, 32, 0.2);
	text-align: center;
}

.sub a, .sub a:link, .sub a:visited, .sub a:active {
	font-weight: bold;
	color: rgb(128, 160, 255);
	text-decoration: none;
}

.sub a:hover {
	color: rgb(160, 192, 255);
}

.source a {
	color: rgb(255, 96, 96);
}

.source a:link, .source a:visited, .source a:active {
	color: rgb(255, 96, 96);
}

.source a:hover {
	color: rgb(255, 128, 128);
}

.small {
	font-size: 20px;
}

.keyboard-options {
	width: auto;
	text-align: center;
	font-size: 12px;
	font-weight: 200;
}

.keyboard-holder {
	margin: 30px auto;
	height: 200px;
	position: relative;
	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-o-user-select: none;
}

.about {
	position: relative;
	max-width: 700px;
	margin: 30px auto;
}

.about .header {
	background-color: rgba(32, 64, 128, 0.5);
	border-radius: 10px 10px 0px 0px;
	color: rgb(255, 255, 255);
	text-shadow: 0px 1px 0px rgb(96, 96, 96);
	position: relative;
	max-width: 600px;
	margin: 0 auto;
	font-size: 30px;
	font-weight: bold;
	padding: 20px;
	text-align: center;
}

.about .contents {
	font-size: 16px;
	line-height: 20px;
	background-color: rgb(255, 255, 255);
	font-weight: 200;
	padding: 20px;
	text-align: left;
	position: relative;
	color: rgb(32, 32, 32);
	text-shadow: 0px 1px 0px rgb(224, 224, 224);
	box-shadow: 0px 5px 10px rgba(32, 32, 32, 0.5);
	-webkit-box-shadow: 0px 5px 10px rgba(32, 32, 32, 0.5);
	border: 1px solid rgb(192, 192, 192);
}

.about .footer {
	background-color: rgba(32, 64, 128, 0.5);
	border-radius: 0px 0px 10px 10px;
	color: rgb(255, 255, 255);
	position: relative;
	max-width: 600px;
	margin: 0 auto;
	font-weight: bold;
	padding: 20px;
}

.about a, .about a:link, .about a:visited, .about a:active {
	font-weight: bold;
	color: rgb(224, 96, 32);
	text-decoration: none;
}

.about a:hover {
	color: rgb(224, 128, 64);
}

.code {
	border: 1px solid rgba(32, 32, 32, 0.2);
	color: rgb(32, 32, 32);
	font-family: Courier New, Courier, monospace;
	font-size: 12px;
	white-space: pre;
	padding: 10px;
	margin: 10px;
}

.image {
	border: 1px solid rgba(32, 32, 32, 0.2);
	color: rgb(32, 32, 32);
	font-family: Courier New, Courier, monospace;
	font-size: 12px;
	white-space: pre;
	padding: 10px;
	margin: 10px;
	text-align: center;
}
</style>
<script src="resources/js/keyboard/audiosynth.js"></script>
<script src="resources/js/keyboard/audiosynth.view.js"></script>
</head>
<body>
	<div class="keyboard-options">
		<b>Sound</b> <select ID="sound">
			<option value="0" selected>Keyboard</option>
			<option value="1">Organ</option>
			<option value="2">Acoustic Guitar</option>
			<option value="3">EDM, bro!</option>
		</select>
			<b>Range [C<span ID="OCTAVE_LOWER">3</span>-B<span ID="OCTAVE_UPPER">5</span>]</b>
			<input type="button" ID="-_OCTAVE" value="-" /> <input type="button"
				ID="+_OCTAVE" value="+" />
		<div ID="keyboard" class="keyboard-holder"></div>
	</div>
	<script type="text/javascript">
		var a = new AudioSynthView();
		a.draw();
	</script>
	<script>
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
				(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script',
				'//www.google-analytics.com/analytics.js', 'ga');

		ga('create', 'UA-44899638-2', 'keithwhor.com');
		ga('send', 'pageview');
	</script>
</body>
</html>
