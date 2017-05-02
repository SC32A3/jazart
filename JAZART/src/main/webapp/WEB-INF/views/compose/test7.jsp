<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta content="charset=UTF-8">
<title>Insert title here</title>
<!-- Recording API -->
<script src="resources/jquery-3.1.1.min.js"></script>
<script src="resources/rTest/test2.js"></script>
<link rel="stylesheet" href="resources/rTest/app.css">

<link rel="stylesheet" href="assets/css/style.css" />
<script src="resources/js/keyboard/audiosynth.js"></script>
<script src="resources/js/keyboard/audiosynth.view.js"></script>
<script type="text/javascript">
	$(function() {
		$("#gogo").on('click', function(){
			$.ajax({
				url: 'gogo',
				type: 'get',
				success: function(resp){
					alert(JSON.stringify(resp));
				}
			})
		});
		$('#myfileinput').change(
				function() {
					alert('웰컴');
					// fileInput is an HTMLInputElement: <input type="file" id="myfileinput" multiple>
					var fileInput = document.getElementById("myfileinput");

					// files is a FileList object (similar to NodeList)
					var files = fileInput.files;

					// object for allowed media types
					var accept = {
						binary : [ "image/png", "image/jpeg", "audio/wav" ],
						text : [ "text/plain", "text/css", "application/xml",
								"text/html" ]
					};

					var file;
					var reader = new FileReader();

					for (var i = 0; i < files.length; i++) {
						file = files[i];
						alert(accept.binary.indexOf(file.type));
						// if file type could be detected
						if (file !== null) {
							if (accept.binary.indexOf(file.type) > -1) {
								// file is a binary, which we accept
								reader.onload = function() {
									alert(decodeUtf8(reader.result));
								}
								reader.readAsArrayBuffer(file);
							} else if (accept.text.indexOf(file.type) > -1) {
								// file is of type text, which we accept
								reader.readAsText(file);
								// modify data with string methods
								console.log('들어옴' + reader.result);
							}
						}
					}
				})
	})
	function decodeUtf8(arrayBuffer) {
		var result = "";
		var i = 0;
		var c = 0;
		var c1 = 0;
		var c2 = 0;

		var data = new Uint8Array(arrayBuffer);

		// If we have a BOM skip it
		if (data.length >= 3 && data[0] === 0xef && data[1] === 0xbb
				&& data[2] === 0xbf) {
			i = 3;
		}

		while (i < data.length) {
			c = data[i];

			if (c < 128) {
				result += String.fromCharCode(c);
				i++;
			} else if (c > 191 && c < 224) {
				if (i + 1 >= data.length) {
					throw "UTF-8 Decode failed. Two byte character was truncated.";
				}
				c2 = data[i + 1];
				result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				if (i + 2 >= data.length) {
					throw "UTF-8 Decode failed. Multi byte character was truncated.";
				}
				c2 = data[i + 1];
				c3 = data[i + 2];
				result += String.fromCharCode(((c & 15) << 12)
						| ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return result;
	}
</script>
</head>
<body>
	<div>
		<h4>
			<span>Record</span>
		</h4>
		<canvas class="visualizer"></canvas>
		<p>
			<button class="record">Rec.</button>
			<button class="stop">Stop</button>
			<button class="toPiano">toPiano</button>
		</p>
		<section class="sound-clips"></section>
	</div>
	<div class="keyboard-options">
		<b>Sound</b> <select ID="sound">
			<option value="0" selected>Keyboard</option>
			<option value="1">Organ</option>
			<option value="2">Acoustic Guitar</option>
			<option value="3">EDM, bro!</option>
		</select> <b>Range [C<span ID="OCTAVE_LOWER">3</span>-B<span
			ID="OCTAVE_UPPER">5</span>]
		</b> <input type="button" ID="-_OCTAVE" value="-" /> <input type="button"
			ID="+_OCTAVE" value="+" />
		<div ID="keyboard" class="keyboard-holder"></div>
		<input type="file" id="myfileinput" multiple>
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


	<input type="button" value="go!" id="gogo" />
</body>
</html>