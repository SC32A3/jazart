<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
<title>Jazart</title>
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

<!-- Recording API -->
<script src="resources/jquery-3.1.1.min.js"></script>
<script src="resources/rTest/test.js"></script>
<link rel="stylesheet" href="resources/rTest/app.css">
<style type="text/css">
.clip {
	vertical-align: middle;
	display: table;
	width: 100%;
	text-align: center;
	padding: 10px;
	text-align: center;
	margin-bottom: 30px;
}

.clipText {
	display: table-caption;
	padding: 0px 10px 0px 30px;
	border-bottom: 1px dotted lightpink;
}

.clip audio {
	padding: 0px 20px 0px 20px;
}

.clipSpan {
	background: #ff8080;
	padding: 0.525rem 0.75rem;
	text-align: center;
	color: white;
	border: none;
	height: 35px;
	bottom: 0.5px;
}

.clipSpan:hover {
	background: #804040;
}

.clipA {
	color: white;
	height: 35px;
	line-height: 0px;
}

.clipA:hover {
	color: white;
}

div#input2 {
    text-align: center;
}

.file_input label {
	position: relative;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	overflow: hidden;
	width: 100px;
	height: 30px;
	background: #ff8080;
	color: #fff;
	text-align: center;
	line-height: 30px;
	font-size: 12px;
}

.file_input label input {
	position: absolute;
	width: 0;
	height: 0;
	overflow: hidden;
}

.file_input input[type=text] {
	vertical-align: middle;
	display: inline-block;
	width: 400px;
	height: 28px;
	line-height: 28px;
	font-size: 11px;
	margin: 0;
	border: 1px solid #777;
}

.title {
	text-align: center;
}

.album {
    background-color: beige;
}

.albumart {
    margin: 0 auto;
    max-width : 210px;
    max-height : 195px;
}

.sound-clips {
	margin: 0 auto;
	width: 50%;
}

audio {
    width: 50%;
    margin-top: 4px;
    display: block;
    float: left;
}

img.clipImg {
    width: 5%;
    display: inline;
    margin-right: 3px;
}
</style>
<script type="text/javascript">
	var files = "";
	$(function() {
		
		
		$('#saveBtn').on('click', function() {
			var song_title = $('#song_title').val();
			var song_genre = $('#song_genre').val();
			var song_desc = $('#song_desc').val();
			var songinfo = {'song_title' : song_title, 'song_genre' : song_genre, 'song_desc' : song_desc };
			
			var songPic = document.getElementById('songPic'); //$('#songPic');
			var PicData = new FormData(songPic);
			
			
			$.ajax({
				url: 'saveSonginfo',
				type: 'post',
				data: songinfo,
				success : uploadPic
			});
		})
		
		$('#fileTag1').change(function() {
			var fileName = $(this).val();
			var fileCount = $(this).get(0).files.length;
			var file = document.getElementById('fileTag1');
			var fileList = file.files ;

			if ($(this).get(0).files.length == 1) {
				 // 읽기
			    var reader = new FileReader();
			    //로드 한 후
			    reader.onload = function  () {
			    	document.getElementById('albumart').src = reader.result ;
			    };
			    reader.readAsDataURL(fileList [0]);
				
				var output = fileName.split('\\').pop();
				$('#fileRoot1').val(output);
			} else {
				$('#fileRoot1').val('파일 ' + fileCount + '개');
			}
		});
		$('#fileTag2').change(function() {
			var fileName = $(this).val();
			var fileCount = $(this).get(0).files.length;

			if ($(this).get(0).files.length == 1) {
				var output = fileName.split('\\').pop();
				$('#fileRoot2').val(output);
			} else {
				$('#fileRoot2').val('파일 ' + fileCount + '개');
			}
		});
		$(".setting").click(function(){
			$.ajax({
				url:"setting",
				type:"get",
				success : function(resp) {
				},
				error : function(resp) {
				}
			});
		});
	});
	
	function uploadPic(resp) {
		if (resp == 0) {
			alert('동일한 작곡명이 있습니다');
		} else {
			document.getElementById('songnum').value = resp;
			document.getElementById('songnum2').value = resp;
			
			var songPic = document.getElementById('songPic'); //$('#songPic');
			var PicData = new FormData(songPic);
			
			$.ajax({
				url: "saveSongPic",
				type: 'post',
				processData: false,
	            contentType: false,
	            data: PicData,
				success: function(result){
					alert('사진업로드 성공! '+result);
				}
			});
		}
	}
	function check() {
		var song_title = document.getElementById('song_title');
		if (song_title.value == '') {
			alert('곡정보를 입력해주세요');
			return false;
		}
		return true;
	}
</script>
</head>
<body>
	<input type="hidden" id="recordFlag" value="record"> <!-- 레코딩쪽 css용 hidden-->
	<!-- QT HEADER END ================================ -->

	<div class="qt-parentcontainer">
		<!-- QT MENUBAR TOP ================================ -->
		<div class="qt-menubar-top  qt-content-primary hide-on-large-and-down">
			<ul>
				<li><a href="about"><i class="dripicons-chevron-right"></i>About
						US</a></li>

				<c:if test="${empty loginNickname}">
					<li><a href="login"><i class="dripicons-chevron-right"></i>Login</a></li>
					<li><a href="join"><i class="dripicons-chevron-right"></i>Join
							Us</a></li>
				</c:if>
				<c:if test="${not empty loginNickname}">
					<li><a href="logout"><i class="dripicons-chevron-right"></i>logout</a></li>
					<li><i class="dripicons-chevron-right"></i>Welcome
						${loginNickname}</li>
				</c:if>
			</ul>
		</div>
		<!-- QT MENUBAR  ================================ -->
		<nav class="qt-menubar nav-wrapper qt-content-primary ">
			<!-- desktop menu  HIDDEN IN MOBILE AND TABLETS -->
			<ul class="qt-desktopmenu hide-on-xl-and-down">
				<li class="qt-logo-link"><a href="./"
					class="brand-logo qt-logo-text">jazart<span>♬</span></a></li>
				<li><a href="start">Compose</a></li>
				<li><a href="musicBoard">Board</a>
					<ul>
						<li><a href="musicBoard">Music Community</a></li>
						<li><a href="commBoard">Free Community</a></li>
					</ul></li>
				<li><a href="realtimeChart">Charts</a>
					<ul>
						<li><a href="realtimeChart">Realtime Chart</a></li>
						<li><a href="dailyChart">Daily Chart</a></li>
						<li><a href="weeklyChart">Weekly Chart</a></li>
					</ul></li>
				<li><a href="qna">Contacts</a>
					<ul>
						<li><a href="qna">QnA</a></li>
						<li><a href="question">Question</a></li>
					</ul></li>

				<%-- <!-- 플레이리스트 -->
				<c:if test="${not empty loginNickname}">
					<li class="right"><a href="songPopup" class="qt-popupwindow"
						data-name="Music Player" data-width="320" data-height="500"> <i
							class="icon dripicons-duplicate"></i>Playlist
					</a></li>
				</c:if> --%>

			</ul>
			<!-- mobile menu icon and logo VISIBLE ONLY TABLET AND MOBILE-->
			<ul class="qt-desktopmenu hide-on-xl-only ">
				<li><a href="#" data-activates="qt-mobile-menu"
					class="button-collapse qt-menu-switch qt-btn qt-btn-primary qt-btn-m"><i
						class="dripicons-menu"></i></a></li>
				<li><a href="#!" class="brand-logo qt-logo-text">jazart</a></li>
			</ul>
		</nav>
		<!-- mobile menu -->
		<div id="qt-mobile-menu" class="side-nav qt-content-primary">
			<ul class=" qt-side-nav">
				<li><a href="/">jazart<span>♬</span></a></li>
				<li class="menu-item-has-children"><a href="compose">Compose</a>
					<ul>
						<li><a href="mixing">(test)Mixing Page</a></li>
						<li><a href="artistPage">(test)Artist Page</a></li>
					</ul></li>
				<li><a href="musicBoard">Board</a>
					<ul>
						<li><a href="musicBoard">Music Community</a></li>
						<li><a href="commBoard">Free Community</a></li>
					</ul></li>
				<li><a href="realtimeChart">Charts</a>
					<ul>
						<li><a href="realtimeChart">Realtime Chart</a></li>
						<li><a href="dailyChart">Daily Chart</a></li>
						<li><a href="weeklyChart">Weekly Chart</a></li>
					</ul></li>
				<li><a href="qna">Contacts</a>
					<ul>
						<li><a href="qna">QnA</a></li>
						<li><a href="question">Question</a></li>
					</ul></li>
			</ul>
		</div>
		<!-- mobile toolbar -->
		<ul
			class="qt-mobile-toolbar qt-content-primary-dark qt-content-aside hide-on-large-only">
			<li><a href="#!" data-expandable="#qtsearchbar"
				class="qt-scrolltop"><i class="icon dripicons-search"></i></a></li>
			<li><a href="page-popup.html" class="qt-popupwindow"
				data-name="Music Player" data-width="320" data-height="500"><i
					class="icon dripicons-duplicate"></i></a></li>
			<li><a href="#!" class="button-playlistswitch"
				data-activates="channelslist"><i
					class="icon dripicons-media-play"></i></a></li>
		</ul>
		<!-- SEARCH FORM ========================= -->

		<div id="qtsearchbar"
			class="qt-searchbar qt-content-primary qt-expandable">
			<div class="qt-expandable-inner">
				<form method="post" action="#search" class="qt-inline-form">
					<div class="row qt-nopadding">
						<div class="col s12 m8 l9">
							<input placeholder="Search" value="" id="searchtex" type="text"
								class="validate qt-input-l">
						</div>
						<div class="col s12 m3 l2">
							<input type="button" value="Search"
								class="qt-btn qt-btn-primary qt-btn-l qt-fullwidth">
						</div>
						<div class="col s12 m1 l1">
							<a href="#!"
								class="qt-btn qt-btn-l qt-btn-secondary qt-fullwidth aligncenter"
								data-expandable="#qtsearchbar"><i class="dripicons-cross"></i></a>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- SEARCH FORM END ========================= -->
		<div id="maincontent" class="qt-main">
			<!-- ======================= HEADER SECTION ======================= -->
			<!-- HEADER CAPTION ========================= -->
			<div class="qt-pageheader qt-negative">
				<div class="qt-container">

					<h1 class="qt-caption qt-spacer-s">Recording</h1>
					<h4 class="qt-subtitle">음성 녹음</h4>
				</div>
				<div class="qt-header-bg" data-bgimage="images/back1.jpg">
					<img src="images/back1.jpg" alt="Featured image" width="690"
						height="302">
				</div>
			</div>
			<!-- HEADER CAPTION END ========================= -->
			<!-- ======================= CONTENT SECTION ======================= -->
			<div class="qt-container qt-vertical-padding-m">
				<div class="row">
					<div class="qt-sidebar col m2">
						<!-- SIDEBAR ================================================== -->
						<div>
							<div class="col l14">
								<div class="qt-widget">
									<div class="qt-widget-onair qt-card aligncenter">
										<h4 class="qt-caption-med">
											<span>Record</span>
										</h4>
										<canvas class="visualizer"></canvas>
										<p class="qt-small">
											<button class="record">Rec.</button>
											<button class="stop">Stop</button>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div class="col l14">
								<div class="qt-widget">
									<div class="qt-widget-onair qt-card aligncenter">
										<h4 class="qt-caption-med">
											<span>Setting</span>
										</h4>
										<p class="qt-small">
										[제어판]-[소리]<br>
										-[녹음 탭]-[마이크]<br>
										마우스 오른쪽 클릭<br>
										'기본 장치로 설정'</p>
									</div>
								</div>
							</div>
						</div>
						<!-- SIDEBAR END ================================================== -->
					</div>
					<div class="col l10">
						<!-- ====================== SECTION BOOKING AND CONTACTS ================================================ -->
						<div id="booking" class="section qt-section-booking qt-card">
							<div class="qt-valign-wrapper">
								<div class="qt-valign flow-text">
									<div class="qt-booking-form" data-100p-top="opacity:0;"
										data-80p-top="opacity:0;" data-30p-top="opacity:1;">
										<ul class="tabs">
											<li class="tab col s4">
												<h5>
													<a href="#songinfo" class="active">Song Info</a>
												</h5>
											</li>
											<li class="tab col s4">
												<h5>
													<a href="#worklist">Work List</a>
												</h5>
											</li>
										</ul>
										<div id="songinfo" class="row">
											<table>
												<tr>
													<th class="album" rowspan="2" style="width: 250px; height: 250px;">
																								
														<img id="albumart" class="albumart" src="images/default.png" /></th>
													<th class="title">곡 명</th>
													<td><input type="text" id="song_title" required></td>
												</tr>
												<tr>
													<th class="title">장 르</th>
													<td><select id="song_genre"
														class="qt-btn qt-btn-s write_combo">
															<option value="ballad">Ballad</option>
															<option value="hiphop">HipHop</option>
															<option value="rnb">RnB</option>
															<option value="rock">Rock</option>
															<option value="disco">Disco</option>
															<option value="electronic">Electoronic</option>
															<option value="blues">Blues</option>
															<option value="world">World</option>
													</select></td>
												</tr>
												<tr>
													<th>
														<form id="songPic" method="post" enctype="multipart/form-data">
														<div class="file_input" id="input2">
															<input type="hidden" id="songnum" name="songnum" value="#">
															<label> File Attach <input type="file" id="fileTag1"
																name="upload1" class="albumart">
															</label> <input type="text" id="fileRoot1" readonly="readonly"
																style="width: 120px;" title="File Route">
														</div>
														</form>
													</th>
													<th class="title">곡 설 명</th>
													<td><input type="text" id="song_desc" required></td>
												</tr>
												<tr>
													<th colspan="3" style="text-align: right;">
														<input type="button" id="saveBtn" value="저장"></th>
												</tr>
											</table>
										</div>
										<div id="worklist" class="row qt-contacts">
											<div class="row">
												<form action="mySrc" method="post" enctype="multipart/form-data" onsubmit="return check()">
													<section class="sound-clips"></section>
													<div class="file_input">
														<input type="hidden" id="songnum2" name="songnum" value="0">
														<label> File Attach <input type="file"
															multiple="multiple" name="upload2" id="fileTag2">
														</label> <input type="text" id="fileRoot2" readonly="readonly"
															title="File Route">
													</div>
													<input type="submit" value="NEXTPAGE" style="width: 160px;"
														class="qt-btn qt-btn-l qt-btn-primary qt-spacer-m">
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- ====================== SECTION BOOKING AND CONTACTS END ================================================ -->
				</div>
			</div>
		</div>
	</div>
	<!-- .qt-main end -->
	<div class="qt-footer qt-footerwidgets">
			<div class="qt-section qt-footer-widgets qt-content-primary-light">
				<div class="qt-container"
					style="background-color: rgba(0, 0, 0, 0.5); padding-left: 5px;">
					<h2 class="qt-footer-logo">
						<a href="./" class="brand-logo qt-logo-text">jazart<span>♬</span></a>
					</h2>
					<div
						class="qt-widgets qt-widgets-footer qt-negative qt-spacer-m row">
						<div class="col s12 m3 l3">
							<div class="qt-widget">
								<h5 class="qt-caption-small">
									<span>About site</span>
								</h5>
								<div class="qt-widget-about">
									<p>
										We are a young and dynamic compose station which wants to
										bring happyness in your life. <br> <a href="sitemap">
											Site Map <i class="dripicons-arrow-thin-right"></i>
										</a>
									</p>
								</div>
							</div>
						</div>
						<div class="col s12 m3 l3">
							<div class="qt-widget">
								<h5 class="qt-caption-small">
									<span>Contacts</span>
								</h5>
								<div class="qt-widget-contacts">
									<p>
										<i class="qticon-home"></i><a href="#">www.jazart.com</a>
									</p>
									<p>
										<i class="qticon-at-sign"></i><a href="question">jazart2017@gmail.com</a>
									</p>
									<p>
										<i class="qticon-phone"></i><a href="#">02-123-1234</a>
									</p>
								</div>
							</div>
						</div>
						<div class="col s12 m3 l3">
							<div class="qt-widget">
								<h5 class="qt-caption-small">
									<span>Our Team</span>
								</h5>
								<div class="qt-widget-about">
									<p>

										We are a small group of designers and developers. We create
										clean, minimal and apps. <br> <a href="about">About
											us <i class="dripicons-arrow-thin-right"></i>
										</a>
									</p>
								</div>
							</div>
						</div>
						<div class="col s12 m3 l3">
							<div class="qt-widget">
								<h5 class="qt-caption-small">
									<span>Main links</span>
								</h5>
								<ul class="qt-widget-menu qt-list-chevron">
									<li><a href="compose">Compose</a></li>
									<li><a href="commBoard">Board </a></li>
									<li><a href="realtimeChart">Charts </a></li>
									<li><a href="qna">Contacts</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="qt-header-bg" data-bgimage="images/back.jpg">
					<img src="images/back.jpg" alt="Featured image" width="690"
						height="302">
				</div>
			</div>
		</div>
	</div>

	<!-- PLAYER SIDEBAR ========================= -->
	<div id="channelslist"
		class="side-nav qt-content-primary qt-right-sidebar">
		<a href="#"
			class="qt-btn qt-btn-secondary button-playlistswitch-close qt-close-sidebar-right"
			data-activates="channelslist"><i class="icon dripicons-cross"></i></a>
		<!-- PLAYER ========================= -->
		<div id="qtplayercontainer" data-playervolume="true"
			data-accentcolor="#dd0e34" data-accentcolordark="#ff0442"
			data-textcolor="#ffffff"
			data-soundmanagerurl="./components/soundmanager/swf/"
			class="qt-playercontainer qt-playervolume qt-clearfix qt-content-primary">
			<div class="qt-playercontainer-content qt-vertical-padding-m">
				<div class="qt-playercontainer-header">
					<h5 class="qt-text-shadow small">Now on</h5>
					<h3 id="qtradiotitle" class="qt-text-shadow">STATION 1 RADIO</h3>
					<h4 id="qtradiosubtitle" class="qt-thin qt-text-shadow small">Subtitle
						of the radio</h4>
				</div>
				<div class="qt-playercontainer-musicplayer" id="qtmusicplayer">
					<div class="qt-musicplayer">
						<div class="ui360 ui360-vis qt-ui360">
							<a id="playerlink"
								href="http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Blue%20Belle%20Lament.mp3"></a>
						</div>
					</div>
				</div>
				<div
					class="qt-playercontainer-data qt-container qt-text-shadow small">
					<h6 class="qt-inline-textdeco">
						<span>Current track</span>
					</h6>
					<div class="qt-t qt-current-track">
						<h5 id="qtFeedPlayerTrack">TITLE</h5>
						<h6 class="qt-small" id="qtFeedPlayerAuthor">ARTIST</h6>
					</div>
					<hr class="qt-inline-textdeco">
				</div>
			</div>
			<div id="playerimage" class="qt-header-bg">
				<img src="images/back1.jpg" alt="Featured image" width="690"
					height="302">
			</div>
		</div>
		<!-- this is for xml radio feed -->
		<div id="qtShoutcastFeedData" class="hidden" data-style=""
			data-channel="1" data-host="173.192.105.231" data-port="3540"></div>
		<!-- PLAYER END ========================= -->
		<!-- CHANNELS LIST ========================= -->
		<div class="qt-part-channels-list">
			<ul class="qt-content-aside qt-channelslist qt-negative">
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"> <img
						src="images/radio-logo.png" alt="logo"
						class="qt-radiologo dripicons-media-play" width="80" height="80">
						<i class="dripicons-media-play"></i> Station 1
				</a></li>
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"> <img
						src="images/radio-logo.png" alt="logo" class="qt-radiologo"
						width="80" height="80"> <i class="dripicons-media-play"></i>
						altradio
				</a></li>
			</ul>
		</div>
		<!-- CHANNELS LIST END ========================= -->
	</div>
	<!-- PLAYER SIDEBAR END ========================= -->

	<!-- QT BODY END ================================ -->

	<!-- QT FOOTER SCRIPTS ================================ -->
	<script src="resources/js/modernizr-2.8.3-respond-1.4.2.min.js"></script>
	<!-- <script src="resources/js/jquery.js"></script> -->
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
	<!-- <script src="resources/components/soundmanager/script/shoutcast.js"></script>
	<script
		src="resources/components/soundmanager/templates/qtradio-player/script/qt-360player-volumecontroller.js"></script> -->

	<!-- Popup -->
	<script src="resources/components/popup/popup.js"></script>


	<!-- MAIN JAVASCRIPT FILE ================================ -->
	<script src="resources/js/qt-main.js"></script>

</body>
</html>
