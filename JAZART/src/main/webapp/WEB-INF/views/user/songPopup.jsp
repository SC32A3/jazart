<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ONAIR2</title>
<meta name="description" content="Radio station HTML template">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- icons -->
<link href='resources/fonts/dripicons/webfont.css' rel='stylesheet'
	type='text/css'>
<link href='resources/fonts/qticons/qticons.css' rel='stylesheet'
	type='text/css'>

<!-- slick slider -->
<link href='resources/components/slick/slick.css' rel='stylesheet'
	type='text/css'>

<!-- swipebox -->
<link href='resources/components/swipebox/src/css/swipebox.min.css'
	rel='stylesheet' type='text/css'>

<!-- countdown component -->
<link rel="stylesheet" type="text/css"
	href="resources/components/countdown/css/jquery.classycountdown.css" />

<!-- QT 360 PLAYER component -->
<link rel="stylesheet" type="text/css"
	href="resources/components/soundmanager/templates/qtradio-player/css/flashblock.css" />
<link rel="stylesheet" type="text/css"
	href="resources/components/soundmanager/templates/qtradio-player/css/qt-360player-volume.css" />


<!-- Main css file -->
<link rel="stylesheet" href="resources/css/qt-main.css">
<!-- INCLUDES THE CHOSEN FRAMEWORK VIA #IMPORT AND SASS -->

<!-- Custom typography settings and google fonts -->
<link rel="stylesheet" href="resources/css/qt-typography.css">
<script src="resources/jquery-3.1.1.min.js"></script>
<script type="text/javascript">
	function input(title, nickname) {
		var myTitle = $('#myTitle');
		var myNickname = $('#myNickname');

		myTitle.html(title);
		myNickname.html(nickname);
	}
</script>
</head>
<body>
	<!-- QT HEADER END ================================ -->
	<div class="qt-parentcontainer">

		<!-- PLAYER ========================= -->
		<div id="qtplayercontainer" data-playervolume="true"
			data-accentcolor="#dd0e34" data-accentcolordark="#ff0442"
			data-textcolor="#ffffff"
			data-soundmanagerurl="./resources/components/soundmanager/swf/"
			class="qt-playercontainer qt-playervolume qt-clearfix qt-content-primary">
			<c:forEach var="item" begin="0" end="0" items="${playlist}">
				<div class="qt-playercontainer-content qt-vertical-padding-m">

					<div class="qt-playercontainer-header">
						<h5 class="qt-text-shadow small">Now on</h5>
						<!-- <h3 id="qtradiotitle" class="qt-text-shadow">STATION 1 RADIO</h3> -->
						<!-- <h4 id="qtradiosubtitle" class="qt-thin qt-text-shadow small">Subtitle
						of the radio</h4> -->
					</div>


					<div class="qt-playercontainer-musicplayer" id="qtmusicplayer">
						<div class="qt-musicplayer">
							<div class="ui360 ui360-vis qt-ui360">
								<a id="playerlink"
									href="download?type=music&data=${item.song_file}"></a>
								<!-- <a id="playerlink"
								href="http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Blue%20Belle%20Lament.mp3"> -->
							</div>
						</div>
					</div>
					<div
						class="qt-playercontainer-data qt-container qt-text-shadow small">
						<h6 class="qt-inline-textdeco">
							<span>Current track</span>
						</h6>
						<div class="qt-t qt-current-track">
							<h5 id="myTitle">${item.song_title}</h5>
							<h6 class="qt-small" id="myNickname">${item.song_nickname}</h6>
						</div>
						<!-- qtFeedPlayerTrack  qtFeedPlayerAuthor-->
						<hr class="qt-inline-textdeco">
					</div>

				</div>
				<div id="playerimage" class="qt-header-bg"
					data-bgimage="download?type=song&data=${item.songnum}">
					<img src="download?type=song&data=${item.songnum}"
						alt="Featured image" width="690" height="302">
				</div>
			</c:forEach>
		</div>

		<!-- this is for xml radio feed -->

		<div id="qtShoutcastFeedData" class="hidden" data-style=""
			data-channel="1" data-host="173.192.105.231" data-port="3540"></div>
		<!-- <div id="qtShoutcastFeedData" class="hidden" data-style=""
			data-channel="1" data-host="203.233.196.37" data-port="9099"></div> -->
		<!-- PLAYER END ========================= -->
		<!-- CHANNELS LIST ========================= -->
		<div class="qt-part-channels-list">
			<ul
				class="qt-content-aside qt-channelslist qt-negative qt-content-primary">
				<!-- 요넘이 값을 씌워주는거란 말이지 
					data-title="06AM Ibiza 라디오국" data-subtitle="Underground Radio 라디오국 설명"
					data-background="resources/imagestemplate/photo-squared-500-500.jpg"
					data-logo="resources/imagestemplate/radio-logo.png"
					
					data-host="173.192.105.231" data-port="3540"
					data-playtrack="http://173.192.105.231:3540/stream.mp3"
					//img src="resources/imagestemplate/radio-logo.png" alt="logo"
				-->
				<c:forEach var="item" varStatus="status" items="${playlist}">
					<li class="qt-channel"><a href="#!" class="qt-ellipsis"
						data-title="" data-subtitle=""
						data-background="download?type=song&data=${item.songnum}"
						data-logo="download?type=song&data=${item.songnum}"
						data-playtrack="download?type=music&data=${item.song_file}"
						data-stats_path="" data-played_path="" data-channel=""
						onclick="javascript:input('${item.song_title}','${item.song_nickname}')">

							<img src="download?type=song&data=${item.songnum}" alt="logo"
							class="qt-radiologo dripicons-media-play" width="80" height="80">
							<i class="dripicons-media-play"></i> ${item.song_title}
					</a></li>


				</c:forEach>
			</ul>
		</div>
		<!-- CHANNELS LIST END ========================= -->
	</div>

	<!-- <li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="altradio" data-subtitle="The subtitle of radio 2"
					data-background="resources/imagestemplate/large-1170-512.jpg"
					data-logo="resources/imagestemplate/radio-logo.png"
					data-playtrack="http://82.77.137.30:8557/;listen.mp3"
					data-host="82.77.137.30" data-port="8557" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="resources/imagestemplate/radio-logo.png" alt="logo"
						class="qt-radiologo" width="80" height="80"> <i
						class="dripicons-media-play"></i> altradio
				</a></li> -->


	<!-- QT BODY END ================================ -->

	<!-- QT FOOTER SCRIPTS ================================ -->
	<script src="resources/js/modernizr-2.8.3-respond-1.4.2.min.js"></script>
	<script src="resources/js/jquery.js"></script>
	<!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL VERSION (NOW 1.12) -->
	<script src="resources/js/jquery-migrate.min.js"></script>
	<!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL VERSION (NOW 1.12) -->

	<!-- Framework -->
	<script src="resources/js/materializecss/bin/materialize.min.js"></script>

	<!-- Cookies for player -->
	<script src="resources/js/jquerycookie.js"></script>

	<!-- Slick carousel and skrollr -->
	<script src="resources/components/slick/slick.min.js"></script>
	<script src="resources/components/skrollr/skrollr.min.js"></script>

	<!-- Swipebox -->
	<script
		src="resources/components/swipebox/lib/ios-orientationchange-fix.js"></script>
	<script
		src="resources/components/swipebox/src/js/jquery.swipebox.min.js"></script>

	<!-- Countdown -->
	<script src="resources/components/countdown/js/jquery.knob.js"></script>
	<script src="resources/components/countdown/js/jquery.throttle.js"></script>
	<script
		src="resources/components/countdown/js/jquery.classycountdown.min.js"></script>

	<!-- Soundmanager2 -->
	<!--[if IE]><script src="components/soundmanager/script/excanvas.js"></script><![endif]-->
	<script
		src="resources/components/soundmanager/script/berniecode-animator.js"></script>
	<script
		src="resources/components/soundmanager/script/soundmanager2-nodebug.js"></script>
	<script src="resources/components/soundmanager/script/shoutcast.js"></script>
	<script
		src="resources/components/soundmanager/templates/qtradio-player/script/qt-360player-volumecontroller.js"></script>

	<!-- Popup -->
	<script src="resources/components/popup/popup.js"></script>


	<!-- MAIN JAVASCRIPT FILE ================================ -->
	<script src="resources/js/qt-main.js"></script>

</body>
</html>
