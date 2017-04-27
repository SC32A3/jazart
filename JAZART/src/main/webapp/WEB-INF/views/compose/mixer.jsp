<!DOCTYPE html>
<html>
<head>
	<title>Jazart</title>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, user-scalable=no"/>
	<link rel="stylesheet" href="bin/gs-daw.min.css"/>
	<script>function lg( a ) { return console.log.apply( console, arguments ), a; }</script>
</head>
<body>

<div id="app"></div>

<!-- Production -->
<script type="text/javascript">
	var result = new Array();
	var sList = '${sList}';
	var toArray = sList.split('!');
	for (var i = 1; i < toArray.length; i=i+2) {
		result.push(toArray[i]);
	}				
</script>
<script src="bin/gs-daw2.js"></script>
<!-- -->

<!-- Development - ->
<script src="src/featuresTest.js"></script>

<script src="src/dep/keyboardRouter.min.js"></script>
<script src="src/dep/handlebars.runtime.min.js"></script>
<script src="src/dep/gs-ui-components.min.js"></script>
<script src="src/dep/gs-webaudio-library.min.js"></script>
<script src="src/dep/gs-webaudio-framework.min.js"></script>
<script src="bin/__templates.js"></script>

<script src="src/init.js"></script>
<script src="src/common/cursor.js"></script>
<script src="src/common/secCeilFloorRound.js"></script>
<script src="src/common/timestampText.js"></script>
<script src="src/common/uuid.js"></script>
<script src="src/ui/js/app.js"></script>
<script src="src/ui/js/partials/bpm.js"></script>
<script src="src/ui/js/partials/clock.js"></script>
<script src="src/ui/js/partials/controls.js"></script>
<script src="src/ui/js/partials/grid.js"></script>
<script src="src/ui/js/partials/gridcontent.js"></script>
<script src="src/ui/js/partials/history.js"></script>
<script src="src/ui/js/partials/timeline.js"></script>
<script src="src/ui/js/partials/toolDelete.js"></script>
<script src="src/ui/js/partials/tools.js"></script>
<script src="src/ui/js/partials/toolSelect.js"></script>
<script src="src/ui/js/partials/tracksBg.js"></script>
<script src="src/ui/js/partials/visual.js"></script>
<script src="src/ui/js/templates/itemBuffer.js"></script>
<script src="src/ui/js/templates/historyAction.js"></script>
<script src="src/ui/js/templates/gridblockSample.js"></script>
<script src="src/ui/js/templates/track.js"></script>

<script src="src/ui/js/old/gs/loop.js"></script>
<script src="src/ui/js/old/gs/playPauseStop.js"></script>
<script src="src/ui/js/old/gs/reset.js"></script>

<script src="src/ui/js/old/ui.js"></script>
<script src="src/ui/js/old/btnMagnet.js"></script>
<script src="src/ui/js/old/exportToWaveFile.js"></script>
<script src="src/ui/js/old/filesInput.js"></script>
<script src="src/ui/js/old/save.js"></script>
<script src="src/ui/js/old/timelineBeats.js"></script>
<script src="src/ui/js/old/timelineLoop.js"></script>
<script src="src/ui/js/old/_init.js"></script>

<script src="src/ui/js/old/panelSection.js"></script>
<script src="src/ui/js/old/resize.js"></script>
<script src="src/ui/js/old/sample.js"></script>
<script src="src/ui/js/old/setFilesWidth.js"></script>
<script src="src/ui/js/old/setTrackNamesWidth.js"></script>

<script src="src/ui/js/old/gs/compositions/init.js"></script>
<script src="src/ui/js/old/gs/compositions/load.js"></script>
<script src="src/ui/js/old/gs/compositions/readFile.js"></script>
<script src="src/ui/js/old/gs/compositions/save.js"></script>
<script src="src/ui/js/old/gs/compositions/serialize.js"></script>
<script src="src/ui/js/old/gs/compositions/store.js"></script>
<script src="src/ui/js/old/gs/samples/selected/copyPaste.js"></script>
<script src="src/ui/js/old/gs/samples/selected/cut.js"></script>
<script src="src/ui/js/old/gs/samples/selected/crop.js"></script>

<script src="src/ui/js/old/gs/events/bodyClick.js"></script>
<script src="src/ui/js/old/gs/events/divExtend.js"></script>
<script src="src/ui/js/old/gs/events/dropFiles.js"></script>
<script src="src/ui/js/old/gs/events/fileFilters.js"></script>
<script src="src/ui/js/old/gs/events/gridMouse.js"></script>
<script src="src/ui/js/old/gs/events/panelMenu.js"></script>
<script src="src/ui/js/old/gs/events/resize.js"></script>
<script src="src/ui/js/old/gs/events/toolCut.js"></script>
<script src="src/ui/js/old/gs/events/toolHand.js"></script>
<script src="src/ui/js/old/gs/events/toolMute.js"></script>
<script src="src/ui/js/old/gs/events/toolPaint.js"></script>
<script src="src/ui/js/old/gs/events/toolSlip.js"></script>
<script src="src/ui/js/old/gs/events/toolZoom.js"></script>

<script src="src/databinding.js"></script>
<script src="src/keybinding.js"></script>
<script src="src/run.js"></script>
<!-- -->
</body>
</html>
