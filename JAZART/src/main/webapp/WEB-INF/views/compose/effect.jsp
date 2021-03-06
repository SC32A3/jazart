<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>pedalboard.js - Open-source JavaScript framework for
	developing audio effects for guitars</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name='viewport' content='user-scalable=no' />
<meta name='apple-mobile-web-app-capable' content='yes' />
<meta name='apple-mobile-web-app-status-bar-style'
	content='black-translucent' />

<!-- <link rel="stylesheet" href="resources/effect/example/css/reset.css" /> -->
<!-- <link rel="stylesheet" href="resources/effect/example/css/common.css" /> 배경, 주요문구 -->
<link rel="stylesheet" href="resources/effect/example/css/box.css" /> <!-- 박스디자인  -->
<!-- <link rel="stylesheet" href="resources/effect/example/css/switch.css" /> 효과전원버튼이펙트 -->
<!-- <link rel="stylesheet" href="resources/effect/example/css/pot.css" /> 조절knob  -->
<link rel="stylesheet" href="resources/effect/example/css/effect.css" />
<link href='http://fonts.googleapis.com/css?family=Damion'
	rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Yellowtail'
	rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Radley:400,400italic'
	rel='stylesheet' type='text/css'>
<script src="resources/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="resources/effect/dist/compiled2.js"></script>
<script type="text/javascript" src="resources/effect/src/Bootstrapper.js"></script>
<!-- For development comment out the line above and uncomment the lines below. -->
<style type="text/css">
.barHolder{
	width: 100px;
	height: 50px;
}
/* .knobHolder{
	display: none;
} */
</style>
</head>
<body>
	<div id="world">
		<div id="box">
			<div id="floor">
				<footer>&nbsp;PEDALBOARD.JS&nbsp;</footer>
			</div>
			<div id="wall">
				<div id="controlPanel">
					<div id="controlButton">&#9654;</div>
					<div class="linein">live</div>
			        <div id="samples">
						<div class="sample">Sample 1</div>
						<div class="sample">Sample 2</div>
						<div class="sample">Sample 3</div>
						<div class="sample">Sample 4</div>
						<div class="sample">Sample 5</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		var stage = new pb.Stage();
		var ctx = stage.getContext();

		var board = new pb.Board(ctx);
		stage.setBoard(board);

		var overdrive = new pb.stomp.Overdrive(ctx);
		var reverb = new pb.stomp.Reverb(ctx);
		var volume = new pb.stomp.Volume(ctx);
		var cabinet = new pb.stomp.Cabinet(ctx);
		var delay = new pb.stomp.Delay(ctx);

		board.addPedals([ overdrive, delay, reverb, volume, cabinet ]);

		overdrive.setDrive(.1);
		overdrive.setTone(.4);
		overdrive.setLevel(.6);
		volume.setLevel(1);
		reverb.setLevel(.3);
		delay.setDelayTimer(.2);
		delay.setFeedbackGain(.7);

		stage.render(document.getElementById('floor'));

		/*
		    Sample controls
		 */
		var state = false;

		var cb = document.getElementById('controlButton');
		var samples = document.getElementsByClassName('sample');
		var sampleNo = 1;
		samples = Array.prototype.slice.call(samples);
		var lb = document.getElementsByClassName('linein')[0];

		var playLineIn = function() {
			stage.stop();
			stage.input = new pb.io.StreamInput(stage.getContext());
			stage.input.addEventListener('loaded', function() {
				stage.route();
			});
		}

		lb.addEventListener('click', function() {
			state = true;
			sampleNo = 6;
			cBDraw();
			settings[sampleNo - 1]();
			playLineIn();
		}, false);
		var settings = [];

		var cBDraw = function() { //클릭이벤트
			cb.innerHTML = state ? '&#9724;' : '&#9654;';
			samples.forEach(function(sample) {
				sample.className = 'sample';
			});
			samples[sampleNo - 1]
					&& (samples[sampleNo - 1].className = 'sample on');

			sampleNo == 6 ? lb.className = 'linein on'
					: lb.className = 'linein';
		};

		var play = function() {
			if (sampleNo == 6) {
				playLineIn();
				return;
			}
			settings[sampleNo - 1] && settings[sampleNo - 1]();
			stage.play('resources/effect/example/audio/samples/sample' + sampleNo + '.mp3');
		}

		var cBHandler = function() {
			state = !state;
			cBDraw();
			stage.stop();
			if (state)
				play();
		};

		cb.addEventListener('click', cBHandler, false);

		samples.forEach(function(sample) {
			sample.addEventListener('click', function() {
				sampleNo = Array.prototype.slice.call(
						sample.parentNode.children).indexOf(sample) + 1;
				state = true;
				cBDraw();
				play();
			});
		});

		settings.push(function() {
			!overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(1);
			overdrive.setDrive(.1);
			overdrive.setTone(1);
			reverb.setLevel(1);
			!delay.bypassSwitch.getState() && delay.bypassSwitch.toggle();
			delay.setDelayTimer(0.6);
			delay.setFeedbackGain(.5);
			delay.setLevel(0.7);
		});

		settings.push(function() {
			!overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(.6);
			overdrive.setDrive(.25);
			overdrive.setTone(.5);
			reverb.setLevel(.3);
			delay.bypassSwitch.getState() && delay.bypassSwitch.toggle();
			delay.setDelayTimer(0);
			delay.setFeedbackGain(0);
			delay.setLevel(0);
		});

		settings.push(function() {
			!overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(.6);
			overdrive.setDrive(.4);
			overdrive.setTone(.5);
			reverb.setLevel(0.6);
			delay.bypassSwitch.getState() && delay.bypassSwitch.toggle();
			delay.setDelayTimer(0);
			delay.setFeedbackGain(0);
			delay.setLevel(0);
		});

		settings.push(function() {
			overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(1);
			overdrive.setDrive(0);
			overdrive.setTone(.1);
			reverb.setLevel(1);
			!delay.bypassSwitch.getState() && delay.bypassSwitch.toggle();
			delay.setDelayTimer(0.8);
			delay.setFeedbackGain(0.6);
			delay.setLevel(0.55);
		});

		settings.push(function() {
			!overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(1);
			overdrive.setDrive(0.4);
			overdrive.setTone(.3);
			reverb.setLevel(.7);
			!delay.bypassSwitch.getState() && delay.bypassSwitch.toggle();
			delay.setDelayTimer(0.77);
			delay.setFeedbackGain(0.4);
			delay.setLevel(1);
		});

		settings.push(function() {
			overdrive.bypassSwitch.getState()
					&& overdrive.bypassSwitch.toggle();
			overdrive.setLevel(1);
			overdrive.setDrive(.1);
			overdrive.setTone(.3);
			reverb.setLevel(.7);
		});
		
		function help(tag) {
			var knob = document.getElementById('Knob'+tag); //놉
			var range = document.getElementById('Range'+tag).value;
			var attribute = "rotateZ(" + range + "deg)";
			alert(attribute);
            
            knob.style.transform = attribute; 
		}
	</script>
</body>
</html>
