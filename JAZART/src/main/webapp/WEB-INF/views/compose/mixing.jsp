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

<!-- Mixing API -->
<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.1/themes/base/jquery-ui.css" />
<link href="resources/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link rel="stylesheet" href="resources/css/mixing.css">
</head>
<body>
	<!-- QT HEADER END ================================ -->

	<div class="qt-parentcontainer">
		<!-- QT MENUBAR TOP ================================ -->
		<div class="qt-menubar-top  qt-content-primary hide-on-large-and-down">
			<ul style="margin: 0px;">
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


				<!-- 플레이리스트 -->
				<c:if test="${not empty loginNickname}">
					<li class="right"><a href="songPopup" class="qt-popupwindow"
						data-name="Music Player" data-width="320" data-height="500"> <i
							class="icon dripicons-duplicate"></i>Playlist
					</a></li>
				</c:if>

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
			<!-- HEADER MEMBERS ========================= -->
			<div class="qt-pageheader qt-negative">
				<div class="qt-container">

					<h1 class="qt-caption qt-spacer-s">Mixing Page</h1>
					<h4 class="qt-subtitle">믹싱페이지</h4>
				</div>
				<div class="qt-header-bg" data-bgimage="images/back1.jpg">
					<img src="images/back1.jpg" alt="Featured image" width="690"
						height="302">
				</div>
			</div>
			<!-- HEADER MEMBERS END ========================= -->
			<!-- HEADER CONTACTS END ========================= -->
			<div class="qt-container qt-vertical-padding-l">
				<div class="row">
					<div class="container-fluid">
						<table>
							<tr>
								<td><a id="step-backward" href="#">backward</a></td>
								<td><a id="playPause" href="#">play/pause</a></td>
								<td><a id="stop" href="#">stop</a></td>
							</tr>
						</table>
						<div id="holder">
							<div class="row-fluid" id="trackBed">

								<div class="span3">
									<div class="sidebar tabbable tabs-below well">
										<div class="tab-content tabContents">
											<div class="tab-pane sidebar-nav sidebarTab active"
												id="library">
												<ul id="libraryList" class="nav nav-list">
													<li class="nav-header">Library</li>
												</ul>
											</div>
											<div class="tab-pane sidebarTab" id="upload">
												<ul id="uploadList" class="nav nav-list">
													<li class="nav-header">Upload</li>
												</ul>
											</div>
											<div class="tab-pane sidebarTab" id="effects">
												<ul id="effectList" class="nav nav-list">
													<li class="nav-header">Effects</li>
													<li class="effectDrag"><a href="#">Reverb</a></li>
													<li class="effectDrag"><a href="#">Filter</a></li>
													<li class="effectDrag"><a href="#">Tremolo</a></li>
													<li class="effectDrag"><a href="#">Compressor</a></li>
													<li class="effectDrag"><a href="#">Delay</a></li>

												</ul>
											</div>
										</div>
										<ul class="nav nav-pills sidebarTabs">
											<li class="active"><a href="#library" data-toggle="tab">Library</a></li>
											<li><a href="#upload" data-toggle="tab">Upload</a></li>
											<li><a href="#effects" data-toggle="tab">Effects</a></li>
										</ul>
									</div>
								</div>
								<div id="tracks" class="span9 scrollable">
									<div class="row-fluid">
										<div class="span1" style="position: relative;">
											<div id="clock" class="clock"></div>
										</div>
										<div class="span1">
											<div id="zoom">
												<div class="btn-toolbar">
													<div class="btn-group">
														<button type="button" class="btn btn-mini" id="zoomOut">
															<i class="icon-minus"></i>
														</button>
														<button type="button" class="btn btn-mini" id="zoomIn">
															<i class="icon-plus"></i>
														</button>
													</div>
												</div>
											</div>
										</div>
										<div class="span10 timeline">
											<canvas id="timeline" width="500" height="20"
												style="padding-top: 10px;"> </canvas>
										</div>
									</div>
								</div>
								<div id="newTrackButton" class="span9 addTrack">
									<a id="addTrackButton" href="#"><p class="text-center">
											<i class="icon-plus-sign"></i>
										</p></a>
								</div>
							</div>
							<div class="row-fluid">
								<div class="span11 well" id="trackEffects">
									<button id="trackEffectsClose" class="close">&times;</button>
									<div>
										<h4 id="trackEffectsHeader"></h4>
									</div>
									<div class="effectsBed">
										<ul id="effectSortable">
											<li class="hidden effect" id="Reverb">
												<h6 style="margin: 0px 0;">Reverb</h6>
												<p class="left-knob-label">Reverb Type</p>

												<p class="right-knob-label">Wet/Dry</p> <span class="knobs">
													<!--<form>
                                <select id="reverbList">
                                    <option>reverb1</option>
                                    <option>reverb2</option>  
                                </select>
                            </form> --> <input id="reverbIrSelectKnob"
													data-fgColor="#222222" data-linecap=round
													data-angleOffset=-125 data-angleArc=250 data-width="50"
													data-min="0" data-max="1" class="dial" value="0"> <input
													id="reverbWetDryKnob" data-fgColor="#bd362f"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" class="dial">


											</span>
												<button class="effectClose">&times;</button>
											</li>
											<li class="hidden effect" id="Filter">
												<h6 style="margin: 0px 0;">Filter</h6>
												<p class="left-knob-label">Cutoff</p>
												<p class="middle-knob-label">Q</p>
												<p class="right-knob-label">Type</p> <span class="knobs">
													<input id="filterCutoffKnob" data-fgColor="#bd362f"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="100" class="dial"
													value="30"> <input id="filterQKnob"
													data-fgColor="#f89406" data-linecap=round
													data-angleOffset=-125 data-angleArc=250 data-width="50"
													data-min="1" data-max="10" class="dial" value="1">
													<input id="filterTypeKnob" data-fgColor="#222222"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="2" class="dial"
													value="0">
											</span>
												<button class="effectClose">&times;</button>
											</li>
											<li class="hidden effect" id="Delay">
												<h6 style="margin: 0px 0;">Delay</h6>
												<p class="left-knob-label">Delay Time</p>
												<p class="middle-knob-label">Feedback</p>
												<p class="right-knob-label">Wet/Dry</p> <span class="knobs">
													<input id="delayTimeKnob" data-fgColor="#bd362f"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="8" class="dial"
													value="1"> <input id="delayFeedbackKnob"
													data-fgColor="#f89406" data-linecap=round
													data-angleOffset=-125 data-angleArc=250 data-width="50"
													data-min="1" data-max="100" class="dial" value="1">
													<input id="delayWetDryKnob" data-fgColor="#222222"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="100" class="dial"
													value="0">
											</span>
												<button class="effectClose">&times;</button>
											</li>
											<li class="hidden effect" id="Compressor">
												<h6 style="margin: 0px 0;">Compressor</h6>
												<p class="left-knob-label">Threshold</p>
												<p class="middle-knob-label">Ratio</p>
												<p class="right-knob-label">Attack</p> <span class="knobs">
													<input id="compressorThresholdKnob" data-fgColor="#08c"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="-100" data-max="-1" class="dial"
													value="-24"> <input id="compressorRatioKnob"
													data-fgColor="#51a351" data-linecap=round
													data-angleOffset=-125 data-angleArc=250 data-width="50"
													data-min="1" data-max="20" class="dial" value="12">
													<input id="compressorAttackKnob" data-fgColor="#bd362f"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="1000" class="dial"
													value="3">
											</span>
												<button class="effectClose">&times;</button>
											</li>
											<li class="hidden effect" id="Tremolo">
												<h6 style="margin: 0px 0;">Tremolo</h6>
												<p class="left-knob-label">-</p>
												<p class="middle-knob-label">Rate</p>
												<p class="right-knob-label">Depth</p> <span class="knobs">
													<input id="tremoloNothingKnob" data-fgColor="#08c"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="-100" data-max="-1" class="dial"
													value="0"> <input id="tremoloRateKnob"
													data-fgColor="#51a351" data-linecap=round
													data-angleOffset=-125 data-angleArc=250 data-width="50"
													data-min="1" data-max="20" class="dial" value="2">
													<input id="tremoloDepthKnob" data-fgColor="#bd362f"
													data-linecap=round data-angleOffset=-125 data-angleArc=250
													data-width="50" data-min="0" data-max="100" class="dial"
													value="10">
											</span>
												<button class="effectClose">&times;</button>
											</li>
										</ul>
									</div>
								</div>
								<div id="masterControl" class="span1 well">
									<canvas id="VUmeterCanvas" width="30" height="80"
										style="display: block;"></canvas>
									<div id="masterVolume"></div>
								</div>
								<div>
									<a href="savePage">저장페이지</a>
								</div>
							</div>
						</div>
					</div>
					
					<!-- mixing JS -->
					<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
					<script src="resources/js/bootstrap.min.js"></script>
					<script src="https://code.jquery.com/ui/1.10.1/jquery-ui.js"></script>
					<script src="resources/js/bootstrap-button.js"></script>
					<script src="src/wavesurfer.js"></script>
					<script src="src/webaudio.js"></script>
					<script src="src/drawer.js"></script>
					<script src="src/scheduler.js"></script>
					<script src="src/storage.js"></script>
					<script src="src/jquery.knob.js"></script>
					<script src="src/recorder.js"></script>
					<script src="src/recorderWorker.js">
					
					
					</script>
					<script src="src/effects.js"></script>
					<script src="src/main.js"></script>
					<script src="src/vumeter.js"></script>
					<!-- ====================== SECTION BOOKING AND CONTACTS END ================================================ -->
				</div>
			</div>
		</div>
	</div>
	<div class="qt-footer qt-footerwidgets">
		<div class="qt-section qt-footer-widgets qt-content-primary-light">
			<div class="qt-container">
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
									We are a young and dynamic compose station which wants to bring
									happyness in your life. <br> <a href="sitemap"> Site
										Map <i class="dripicons-arrow-thin-right"></i>
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
									clean, minimal and apps. <br> <a href="about">About us
										<i class="dripicons-arrow-thin-right"></i>
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
		<div class="qt-footer-bottom qt-content-primary-dark">
			<div class="qt-container">
				<div class="row">
					<!-- <div class="col s12 m12 l8">
							Copyright 2016 <a href="http://qantumthemes.com">Qantumthemes.com</a>
							| Radio Station HTML Template
							<ul class="qt-menu-footer qt-small qt-list-chevron ">
								<li><a href="#">Home</a></li>
								<li><a href="#">Privacy</a></li>
								<li><a href="#">Sitemap</a></li>
							</ul>
						</div> -->
					<div class="col s12 m12 l4">
						<!-- <ul class="qt-menu-social">
								<li class="right"><a href="#"><i
										class="qticon-beatport"></i></a></li>
								<li class="right"><a href="#"><i
										class="qticon-facebook"></i></a></li>
								<li class="right"><a href="#"><i class="qticon-twitter"></i></a></li>
								<li class="right"><a href="#"><i class="qticon-youtube"></i></a></li>
								<li class="right"><a href="#"><i
										class="qticon-soundcloud"></i></a></li>
							</ul> -->
					</div>
				</div>
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
			<div id="playerimage" class="qt-header-bg"
				data-bgimage="resources/imagestemplate/full-1600-700.jpg">
				<img src="resources/imagestemplate/full-1600-700.jpg"
					alt="Featured image" width="690" height="302">
			</div>
		</div>
		<!-- this is for xml radio feed -->
		<div id="qtShoutcastFeedData" class="hidden" data-style=""
			data-channel="1" data-host="173.192.105.231" data-port="3540"></div>
		<!-- PLAYER END ========================= -->
		<!-- CHANNELS LIST ========================= -->
		<div class="qt-part-channels-list">
			<ul class="qt-content-aside qt-channelslist qt-negative">
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="06AM Ibiza" data-subtitle="Underground Radio"
					data-background="resources/imagestemplate/photo-squared-500-500.jpg"
					data-logo="resources/imagestemplate/radio-logo.png"
					data-playtrack="http://173.192.105.231:3540/stream.mp3"
					data-host="173.192.105.231" data-port="3540" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="resources/imagestemplate/radio-logo.png" alt="logo"
						class="qt-radiologo dripicons-media-play" width="80" height="80">
						<i class="dripicons-media-play"></i> Station 1
				</a></li>
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="altradio" data-subtitle="The subtitle of radio 2"
					data-background="resources/imagestemplate/large-1170-512.jpg"
					data-logo="resources/imagestemplate/radio-logo.png"
					data-playtrack="http://82.77.137.30:8557/;listen.mp3"
					data-host="82.77.137.30" data-port="8557" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="resources/imagestemplate/radio-logo.png" alt="logo"
						class="qt-radiologo" width="80" height="80"> <i
						class="dripicons-media-play"></i> altradio
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
	<!-- <script src="resources/components/soundmanager/script/shoutcast.js"></script> -->
	<!-- <script
		src="resources/components/soundmanager/templates/qtradio-player/script/qt-360player-volumecontroller.js"></script> -->

	<!-- Popup -->
	<script src="resources/components/popup/popup.js"></script>


	<!-- MAIN JAVASCRIPT FILE ================================ -->
	<script src="resources/js/qt-main.js"></script>

</body>
</html>
