<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>ddd</title>
<script
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"
	type="text/javascript"></script>
<script type="text/javascript">
	var accessId = 'bc59492a-d127-487b-acb4-c2e4226b34cb';
	var taskUrl = 'analyze/melody';
	var parameters = {
		blocking : false,
		format : 'json',
		access_id : accessId
	};

	// the values for these parameters were taken from the corresponding controls in the demo form
	parameters['input_file'] = 'http://www.sonicAPI.com/music/solo_sax.mp3';
	parameters['detailed_result'] = 'true';

	function onTaskStarted(data) {
		var fileId = data.file.file_id;

		// request task progress every 500ms
		var polling = setInterval(pollTaskProgress, 500);

		function pollTaskProgress() {
			$.ajax({
				url : 'https://api.sonicAPI.com/file/status?file_id=' + fileId
						+ '&access_id=' + accessId + '&format=json',
				crossDomain : true,
				success : function(data) {
					if (data.file.status == 'ready') {
						onTaskSucceeded(fileId);
						clearInterval(polling);
					} else if (data.file.status == 'working') {
						$('#result').text(data.file.progress + '% done');
					}
				}
			});
		}
	}

	function onTaskSucceeded(fileId) {
		var downloadUrl = 'https://api.sonicAPI.com/file/download?file_id='
				+ fileId + '&access_id=' + accessId + '&format=json';

		$.ajax({
			url : downloadUrl,
			crossDomain : true,
			success : function(data) {
				$('#result').html(
						'Task succeeded, analysis result:<pre>'
								+ JSON.stringify(data, null, 4) + '</pre>');
			}
		});
	}

	function onTaskFailed(response) {
		var data = $.parseJSON(response.responseText);
		var errorMessages = data.errors.map(function(error) {
			return error.message;
		});

		$('#result').text('Task failed, reason: ' + errorMessages.join(','));
	}

	// start task when clicking on the "Start task" button
	$(document).ready(function() {
		$('#start').click(function() {
			// execute an HTTP GET using the task's URL, the parameters and callback functions defined above
			$.ajax({
				url : 'https://api.sonicAPI.com/' + taskUrl,
				data : parameters,
				success : onTaskStarted,
				error : onTaskFailed,
				crossDomain : true
			});
		});
	});
</script>
</head>
<body>
	<input type="button" id="start" value="Start task" />
	<div id="result"></div>
</body>
</html>