<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Jazart♬</title>
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
</head>
<body>
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
				<li><a href="compose">Compose</a>
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
	<!-- 			<li class="right"><a href="#!" data-expandable="#qtsearchbar"
					class="qt-btn qt-btn-l qt-scrolltop"><i
						class="icon dripicons-search"></i></a></li> -->
				
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
			<!-- HEADER CAPTION ========================= -->
			<div class="qt-pageheader qt-negative">
				<div class="qt-container">

					<h1 class="qt-caption qt-spacer-s">FAQ</h1>
					<h4 class="qt-subtitle">자주하는 질문</h4>
				</div>
				<div class="qt-header-bg"
					data-bgimage="images/back4.jpg">
					<img src="images/back4.jpg"
						alt="Featured image" width="690" height="302">
				</div>
			</div>
			<!-- HEADER CAPTION END ========================= -->
			<!-- ======================= CONTENT SECTION ======================= -->
			<div class="qt-container">
				<div class="row qt-vertical-padding-l ">
					<div class="col s12 m12 l12">
						<ul class="collapsible qt-chart-tracklist qt-spacer-m"
							data-collapsible="accordion">
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">어떤 프로그램(사이트)인가요?</h3>
										<p>사이트 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>기존의 복잡하고 어려운 작곡 프로그램에 실망하셨습니까? 내가 만든곡을  자랑하고 싶은데 어디서
										자랑해야 될지 모르겠습니까? 사용자의 편의를 고려한 간편 작곡 프로그램 Jazart가 여러분의 꽉막힌
										고민은 아주 시원하게 뚫어 드립니다. 초급자들은 몇번의 클릭만으로 완성도 있는 곡을 아주 손쉽게,
										고급자들은 자신의 감성을 살린 곡을  만들 수 있게 Jazart로 여러분의 숨겨진 잠재력을 폭발
										시켜보세요.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
									<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">jazart의
											의미는 무엇인가요?</h3>
										<p>사이트 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>Jazart는 자바를 이용한 프로그램으로 모차르트 처럼 작곡을 할 수 있다는 의미로서
										Java + Mozart = Jazart가 되었습니다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">Jazart 유료입니까?무료입니까?</h3>
										<p>사이트 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>무료 프로그램입니다. 따라서 저희 프로그램을 부담없이 이용해 보세요. 가격은 무료이지만 성능은
										프리이엄입니다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">Jazart 초급과
											고급은 어떻게 다른가요?</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>초급은 그동안의 어려웠던 작곡 스타일을 과감히 버리고 전문가들이 만든 멜로디를 추천받아
										장르와 분위기에 따라 추천받은 음원으로  작곡을 할 수 있도록 하였습니다. 
										고급은 어려분의 여러분의 실력을 섬세하게 발휘할 수 있도록 세세한 수정이 가능하도록 하였습니다.
										jazart와 함께 즐거운 작곡 여정을 시작합시다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">차트
											순위는 어떻게 결정되나요?</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>차트는 사용자들의 추천수를 합산해 순위가 결정됩니다. 사용자들은 중복추천을 할 수 없으므로
										사용자의(of the User) ,사용자에 의한(by the User)사용자를 위한(for the User)
										공정한 차트입니다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
						
					
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">다른 궁금하거나 불편한 점이 있을 경우 어디로 연락해야하나요</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>저희 제품을 사용하시다 궁금한 점이나 불편함이 있으시다면 question page를 통해  문의하실 수 있습니다. 
									문의 주시면 빠른 시일 내에 답변 드리겠습니다. 
									- 전화상담: 02-123-4567 
									- info@jazart.com
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">핸드폰으로도
											사용하고 싶어요</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>아직은 핸드폰으로 사용할 수 없지만 조만간 안드로이드 버전 개발 개획이 있으므로  안드로이드 버전이 개발되면
									공지할 계획입니다. 
									</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">작곡을
											하지 않고 다른 사람의 음악만 들을 수 있나요?</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>네 문제 없습니다. 음악만 듣는 것도 물론 가능하며또한 Jazart는 자유게시판을 통해 여러분의
										다양한 의견을 교환할 수 있는 장소를 마련해 두었으니 한 번 이용해 보세요.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
							
							<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">악플러가
											있다면 어떻게 합니까?</h3>
										<p>이용 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>저희 운영팀 info@jazart.com으로 알려주세요 저희가 악플러 판단 후 즉시 해당 사용자
										아이디를 정지시키겠습니다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
								<!-- CHART TRACK ========================= -->
							<li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
								<div
									class="qt-chart-table collapsible-header qt-content-primary">
									<div class="qt-position" style="width: 170px; height: 100px;">
											<span>Q</span>
									</div>
									<div class="qt-titles">
										<h3 class="qt-ellipsis qt-t">작곡을
											이어서 할 수 있나요?</h3>
										<p>작곡 기능 정보</p>
									</div>
								</div>
								<div class="collapsible-body qt-paper">
									<p>물론입니다. 여러분이 작곡을 하다 잠시 작곡을 쉬고 이어서 다시
										작곡을 할 수 있습니다.  편리하죠? 여러분이 작곡을 하고 싶을 때 언제든 이어서 작곡 할 수 있습니다.
										여러분은 Jazart의 평생회원입니다.</p>
								</div>
							</li>
							<!-- CHART TRACK END ========================= -->
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- .qt-main end -->
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
				<div class="qt-header-bg"
					data-bgimage="images/back.jpg">
					<img src="images/back.jpg" alt="Featured image"
						width="690" height="302">
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
				data-bgimage="imagestemplate/full-1600-700.jpg">
				<img src="imagestemplate/full-1600-700.jpg" alt="Featured image"
					width="690" height="302">
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
					data-background="imagestemplate/photo-squared-500-500.jpg"
					data-logo="imagestemplate/radio-logo.png"
					data-playtrack="http://173.192.105.231:3540/stream.mp3"
					data-host="173.192.105.231" data-port="3540" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="imagestemplate/radio-logo.png" alt="logo"
						class="qt-radiologo dripicons-media-play" width="80" height="80">
						<i class="dripicons-media-play"></i> Station 1
				</a></li>
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="altradio" data-subtitle="The subtitle of radio 2"
					data-background="imagestemplate/large-1170-512.jpg"
					data-logo="imagestemplate/radio-logo.png"
					data-playtrack="http://82.77.137.30:8557/;listen.mp3"
					data-host="82.77.137.30" data-port="8557" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="imagestemplate/radio-logo.png" alt="logo"
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
