<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>PIANO</title>
<link rel="stylesheet" href="assets/css/style.css" />
</head>
<body>
	<audio src="assets/sounds/Yamaha-RX15-Ride-Cymbal.wav" id="cymbal1"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Tom1.wav" id="tom1"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Tom2.wav" id="tom2"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Crash-Cymbal.wav" id="cymbal2"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Bass-Drum.wav" id="bass"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Hi-Tune-Snare.wav" id="snare"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Open-Hi-Hat.wav" id="hihat1"></audio>
	<audio src="assets/sounds/Yamaha-RX15-Closed-Hi-Hat.wav" id="hihat2"></audio>
	<script src="resources/jquery-3.1.1.min.js"></script>
	<div id="drum_wrapper" class="drums">
		<b>Basic/Recommend Beat</b>
		<select id="selectBox">
			<option id="two_and_four" value="two_and_four" selected>two and four</option>
			<option id="four_on_the_floor" value="four_on_the_floor">four
				on the floor</option>
			<option id="one_drop" value="one_drop">one drop</option>
			<option id="boom_boom_clap" value="boom_boom_clap">boom
				boom clap</option>
			<option id="sample" value="sample">sample test</option>
		</select>
		<span id="testbox"></span>
		<!-- <input type="button" class="lesson" ID="two_and_four" value="5" /> -->
		<br><br>
		<table class="table_space">
			<tr>
				<td id="cymbal1_pad" class="drum_pad">A <br> <small>(Ride-Cymbal)</small></td>
				<td id="tom1_pad" class="drum_pad">S <br> <small>(Tom1)</small></td>
				<td id="tom2_pad" class="drum_pad">D <br> <small>(Tom2)</small></td>
				<td id="cymbal2_pad" class="drum_pad">F <br> <small>(Crash-Cymbal)</small></td>
			</tr>
			<tr>
				<td id="bass_pad" class="drum_pad">J <br> <small>(Bass)</small></td>
				<td id="snare_pad" class="drum_pad">K <br> <small>(Snare)</small></td>
				<td id="hihat1_pad" class="drum_pad">L <br> <small>(Open-Hi-Hat)</small></td>
				<td id="hihat2_pad" class="drum_pad">; <br> <small>(Closed-Hi-Hat)</small></td>
			</tr>
		</table>

	</div>
	<script src="assets/js/jquery-2.1.0.min.js"></script>
	<script src="assets/js/music.js"></script>
	<script>
	function recommend(){
		var selectBox = $('#selectBox').val();
		alert(selectBox);
		play_rhythm(selectBox);
	}
	</script>
</body>
</html>
