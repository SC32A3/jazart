<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PIANO</title>
<link rel="stylesheet" href="assets/css/style.css" />
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
