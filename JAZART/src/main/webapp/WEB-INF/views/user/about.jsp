<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
<title>ONAIR2</title>
<meta name="description" content="Radio station HTML template">
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-

scalable=no">

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
	href="resources/components/soundmanager/templates/qtradio-player/css/qt-360player-

volume.css" />

<!-- Main css file -->
<link rel="stylesheet" href="resources/css/qt-main.css">
<!-- INCLUDES THE CHOSEN FRAMEWORK VIA #IMPORT AND SASS 

-->

<!-- Custom typography settings and google fonts -->
<link rel="stylesheet" href="resources/css/qt-typography.css">

<link href="resources2/css/theme.css" rel="stylesheet">
</head>
<body>
	<!-- QT HEADER END ================================ -->

	<div class="qt-parentcontainer">
		<!-- QT MENUBAR TOP ================================ -->
		<div class="qt-menubar-top  qt-content-primary hide-on-large-and-down">
			<ul>
				<li><a href="#"><i class="dripicons-chevron-right"></i>About
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

				<li class="right"><a href="#"><i
						class="qticon-beatport qt-socialicon"></i></a></li>
				<li class="right"><a href="#"><i
						class="qticon-facebook qt-socialicon"></i></a></li>
				<li class="right"><a href="#"><i
						class="qticon-twitter qt-socialicon"></i></a></li>
				<li class="right"><a href="#"><i
						class="qticon-youtube qt-socialicon"></i></a></li>
				<li class="right"><a href="#"><i
						class="qticon-soundcloud qt-socialicon"></i></a></li>
			</ul>
		</div>
		<!-- QT MENUBAR  ================================ -->
		<nav class="qt-menubar nav-wrapper qt-content-primary ">
			<!-- desktop menu  HIDDEN IN MOBILE AND TABLETS -->
			<ul class="qt-desktopmenu hide-on-xl-and-down">
				<li class="qt-logo-link"><a href="./"
					class="brand-logo qt-logo-text">jazart<span>♬</span></a></li>
				<li><a href="page-schedule.html">Compose</a>
					<ul>
						<li><a href="page-schedule.html">Archive</a></li>
						<li><a href="single-show.html">Single show page</a></li>
					</ul></li>
				<li><a href="archive-podcast.html">Board</a>
					<ul>
						<li><a href="music_community">Music Community</a></li>
						<li><a href="single-podcast.html">Free Community</a></li>
					</ul></li>
				<li><a href="archive-members.html">Team</a>
					<ul>
						<li><a href="archive-members.html">Archive</a></li>
						<li><a href="single-member.html">Single show page</a></li>
					</ul></li>
				<li><a href="archive.html">Blog</a>
					<ul>
						<li><a href="archive.html">Blog archive</a></li>
						<li><a href="single-post.html">Single post</a></li>
					</ul></li>
				<li><a href="archive-chart.html">Charts</a>
					<ul>
						<li><a href="archive-chart.html">Charts archive</a></li>
						<li><a href="single-chart.html">Single chart</a></li>
					</ul></li>
				<li><a href="archive-events.html">Events</a>
					<ul>
						<li><a href="archive-events.html">Events archive</a></li>
						<li><a href="single-event.html">Single event</a></li>
					</ul></li>
				<li><a href="page-contacts.html">Contacts</a></li>
				<li class="right"><a href="#!" data-expandable="#qtsearchbar"
					class="qt-btn qt-btn-l qt-scrolltop"><i
						class="icon 

dripicons-search"></i></a></li>
				<li class="right"><a href="page-popup.html"
					class="qt-popupwindow" data-name="Music Player" data-width="320"
					data-height="500"><i class="icon dripicons-duplicate"></i>
						Popup</a></li>
				<li class="right"><a href="#!" class="button-playlistswitch"
					data-activates="channelslist"><i
						class="icon dripicons-

media-play"></i> Listen</a></li>
			</ul>
			<!-- mobile menu icon and logo VISIBLE ONLY TABLET AND MOBILE-->
			<ul class="qt-desktopmenu hide-on-xl-only ">
				<li><a href="#" data-activates="qt-mobile-menu"
					class="button-collapse qt-menu-switch qt-btn qt-btn-primary qt-btn-

m"><i
						class="dripicons-menu"></i></a></li>
				<li><a href="#!" class="brand-logo qt-logo-text">Jazart</a></li>
			</ul>
		</nav>
		<!-- mobile menu -->
		<div id="qt-mobile-menu" class="side-nav qt-content-primary">
			<ul class=" qt-side-nav">
				<li><a href="index.html">Home</a></li>
				<li class="menu-item-has-children"><a href="page-schedule.html">COMPOSE</a>
					<ul>
						<li><a href="page-schedule.html">Archive</a></li>
						<li><a href="single-show.html">Single show page</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a
					href="archive-podcast.html">Board</a>
					<ul>
						<li><a href="music_community">music community</a></li>
						<li><a href="single-podcast.html">free community</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a
					href="archive-members.html">Team</a>
					<ul>
						<li><a href="archive-members.html">Archive</a></li>
						<li><a href="single-member.html">Single show page</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a href="archive.html">Blog</a>
					<ul>
						<li><a href="archive.html">Blog archive</a></li>
						<li><a href="single-post.html">Single post</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a href="archive-chart.html">Charts</a>
					<ul>
						<li><a href="archive-chart.html">Charts archive</a></li>
						<li><a href="single-chart.html">Single chart</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a
					href="archive-events.html">Events</a>
					<ul>
						<li><a href="archive-events.html">Events archive</a></li>
						<li><a href="single-event.html">Single event</a></li>
					</ul></li>
				<li><a href="page-contacts.html">Contacts</a></li>
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
					class="icon dripicons-media-

play"></i></a></li>
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
								data- expandable="#qtsearchbar"><i class="dripicons-cross"></i></a>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- SEARCH FORM END ========================= -->
		<div id="maincontent" class="qt-main">
			<!-- ======================= HEADER SECTION ======================= -->
			<!-- HEADER CONTACTS ========================= -->
			<div class="qt-pageheader qt-negative">
				<div class="qt-container">
					<h1 class="qt-caption qt-spacer-s">About us</h1>
					<ul class="qt-menu-social qt-spacer-s">
						<li><a href="#"><i class="qticon-beatport"></i></a></li>
						<li><a href="#"><i class="qticon-facebook"></i></a></li>
						<li><a href="#"><i class="qticon-twitter"></i></a></li>
						<li><a href="#"><i class="qticon-youtube"></i></a></li>
						<li><a href="#"><i class="qticon-soundcloud"></i></a></li>
					</ul>
				</div>
				<div class="qt-header-bg"
					data-bgimage="resources/imagestemplate/full-1600-700.jpg">
					<img src="resources/imagestemplate/full-1600-700.jpg"
						alt="Featured image" width="690" height="302">
				</div>
			</div>
			<!-- HEADER CONTACTS END ========================= -->

			<!-- Controls -->
			<a class="left carousel-control" href="#theme-carousel" role="button"
				data-slide="prev">
				<div class="carousel-control-arrow">&#8249;</div>
			</a> <a class="right carousel-control" href="#theme-carousel"
				role="button" data-slide="next">
				<div class="carousel-control-arrow">&#8250;</div>
			</a>
		</div>

		<div class="container-about">
			<div class="container">
				<div class="page-header" id="about">
					<h1 class="text-center text-danger">Meet Our Team</h1>
					<h2 class="text-center">We are a small group of designers and
						developers</h2>
					<br />
				</div>
				<div class="row">
					<div class="col-md-4 text-center">
						<img class="img-responsive"
							style="border-radius: 50%; width: 250px; height: 250px;"
							src="resources2/images/image1.jpg" />
						<h3 class="text-danger">Mike Miller</h3>
						<br />
						<p class="text-justify">Lorem Ipsum is simply dummy text of
							the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s</p>
					</div>
					<div class="col-md-4 text-center">
						<img class="img-responsive"
							style="border-radius: 50%; width: 250px; height: 250px;"
							src="resources2/images/image2.jpg" />
						<h3 class="text-danger">Angelina Smithson</h3>
						<br />
						<p class="text-justify">Lorem Ipsum is simply dummy text of
							the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s</p>
					</div>
					<div class="col-md-4 text-center">
						<img class="img-responsive"
							style="border-radius: 50%; width: 250px; height: 250px;"
							src="resources2/images/image3.jpg" />
						<h3 class="text-danger">Dave Johnson</h3>
						<br />
						<p class="text-justify">Lorem Ipsum is simply dummy text of
							the printing and typesetting industry. Lorem Ipsum has been the
							industry's standard dummy text ever since the 1500s</p>
					</div>
				</div>
			</div>
		</div>

		<div class="container-services">
			<div class="container">
				<div class="page-header" id="services">
					<h1 class="text-center text-danger">What We Do</h1>
					<h2 class="text-center">
						We create clean, minimal websites and apps<br />
					</h2>
				</div>
				<div class="row">
					<div class="col-md-2 text-center">
						<span class="services-circle text-center"><i
							class="fa fa-pencil fa-2x" aria-hidden="true"></i></span>
					</div>
					<div class="col-md-4 text-justify">
						<h3 class="text-danger">Design</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry's
							standard dummy text</p>
					</div>
					<div class="col-md-2 text-center">
						<span class="services-circle text-center"><i
							class="fa fa-cogs fa-2x" aria-hidden="true"></i></span>
					</div>
					<div class="col-md-4 text-justify">
						<h3 class="text-danger">Development</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry's
							standard dummy text</p>
					</div>
				</div>
				<br />
				<div class="row">
					<div class="col-md-2 text-center">
						<span class="services-circle text-center"><i
							class="fa fa-users fa-2x" aria-hidden="true"></i></span>
					</div>
					<div class="col-md-4 text-justify">
						<h3 class="text-danger">Promotion</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry's
							standard dummy text</p>
					</div>
					<div class="col-md-2 text-center">
						<span class="services-circle text-center"><i
							class="fa fa-camera fa-2x" aria-hidden="true"></i></span>
					</div>
					<div class="col-md-4 text-justify">
						<h3 class="text-danger">Illustration</h3>
						<p>Lorem Ipsum is simply dummy text of the printing and
							typesetting industry. Lorem Ipsum has been the industry's
							standard dummy text</p>
					</div>
				</div>
			</div>
		</div>

		<div class="container-gallery">
			<div class="container">
				<div class="page-header" id="gallery">
					<h1 class="text-center text-danger">Our Works</h1>
					<h2 class="text-center">
						We create good brands<br />
					</h2>
				</div>
				<div class="row">
					<div class="col-md-12 text-center">
						<ul class="list-unstyled text-center">
							<li class="filter btn btn-danger" data-filter="all">ALL</li>
							<li class="filter btn btn-danger" data-filter=".graphic">GRAPHICS</li>
							<li class="filter btn btn-danger" data-filter=".print">PRINT</li>
							<li class="filter btn btn-danger" data-filter=".webdesign">WEB
								DESIGN</li>
						</ul>
					</div>
					<div class="mix graphic col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery1.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery1.jpg" />
						</a>
					</div>
					<div class="mix print col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery2.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery2.jpg" />
						</a>
					</div>
					<div class="mix webdesign col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery3.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery3.jpg" />
						</a>
					</div>
					<div class="mix webdesign col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery4.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery4.jpg" />
						</a>
					</div>
					<div class="mix print col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery5.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery5.jpg" />
						</a>
					</div>
					<div class="mix graphic col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery6.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery6.jpg" />
						</a>
					</div>
					<div class="mix webdesign col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery7.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery7.jpg" />
						</a>
					</div>
					<div class="mix webdesign col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery8.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery8.jpg" />
						</a>
					</div>
					<div class="mix graphic col-md-4 col-sm-6 col-xs-12">
						<a href="resources2/images/gallery/gallery9.jpg"
							class="img-wrapper"> <img class="img-responsive"
							src="resources2/images/gallery/gallery9.jpg" />
						</a>
					</div>
				</div>
			</div>
		</div>
		<!-- ====================== SECTION BOOKING AND CONTACTS END 

================================================ -->
	</div>
	</div>
	</div>
	</div>
	<div class="qt-footer qt-footerwidgets">
		<div class="qt-section qt-footer-widgets qt-content-primary-light">
			<div class="qt-container">
				<h2 class="qt-footer-logo">
					<a href="./" class="brand-logo qt-logo-text">ONAIR<span>2</span></a>
				</h2>
				<div
					class="qt-widgets qt-widgets-footer qt-negative qt-spacer-m row">
					<div class="col s12 m3 l3">
						<div class="qt-widget">
							<h5 class="qt-caption-small">
								<span>Stay Connected</span>
							</h5>
							Subscribe now to the newsletter to receive weekly updates.
							<hr class="qt-spacer-s">
							<form method="post" action="#newsletter" class="qt-inline-form">
								<div class="row qt-nopadding">
									<div class="col s12 m8 l9">
										<input placeholder="Your email" value="" type="text"
											class="validate qt-input-s">
									</div>
									<div class="col s12 m4 l3">
										<input type="button" value="submit"
											class="qt-btn qt-btn-secondary qt-btn-s qt-fullwidth">
									</div>
								</div>
							</form>
						</div>
					</div>
					<div class="col s12 m3 l3">
						<div class="qt-widget">
							<h5 class="qt-caption-small">
								<span>Contacts</span>
							</h5>
							<div class="qt-widget-contacts">
								<p>
									<i class="qticon-home"></i><a
										href="http://www.qantumthemes.com">www.qantumthemes.com</a>
								</p>
								<p>
									<i class="qticon-at-sign"></i><a
										href="mailto:info@someofyoursite.com">info@someofyoursite.com</a>
								</p>
								<p>
									<i class="qticon-phone"></i><a href="tel:1-847-555-5555">1-847-555-5555</a>
								</p>
							</div>
						</div>
					</div>
					<div class="col s12 m3 l3">
						<div class="qt-widget">
							<h5 class="qt-caption-small">
								<span>Contacts</span>
							</h5>
							<div class="qt-widget-about">
								<p>
									We are a young and dynamic radio station which wants to bring
									happyness in your life. <br> <a
										href="http://www.qantumthemes.com">Discover more <i
										class="dripicons-arrow-thin-

right"></i></a>
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
								<li><a href="http://www.qantumthemes.com">Home page</a></li>
								<li><a href="http://www.qantumthemes.com">Shows
										schedule</a></li>
								<li><a href="http://www.qantumthemes.com">Events
										archive</a></li>
								<li><a href="http://www.qantumthemes.com">Contacts</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="qt-header-bg"
				data-bgimage="resources/imagestemplate/full-1600-700.jpg">
				<img src="resources/imagestemplate/full-1600-700.jpg"
					alt="Featured image" width="690" height="302">
			</div>
		</div>
		<div class="qt-footer-bottom qt-content-primary-dark">
			<div class="qt-container">
				<div class="row">
					<div class="col s12 m12 l8">
						Copyright 2016 <a href="http://qantumthemes.com">Qantumthemes.com</a>
						| Radio Station HTML Template
						<ul class="qt-menu-footer qt-small qt-list-chevron ">
							<li><a href="#">Home</a></li>
							<li><a href="#">Privacy</a></li>
							<li><a href="#">Sitemap</a></li>
						</ul>
					</div>
					<div class="col s12 m12 l4">
						<ul class="qt-menu-social">
							<li class="right"><a href="#"><i class="qticon-beatport"></i></a></li>
							<li class="right"><a href="#"><i class="qticon-facebook"></i></a></li>
							<li class="right"><a href="#"><i class="qticon-twitter"></i></a></li>
							<li class="right"><a href="#"><i class="qticon-youtube"></i></a></li>
							<li class="right"><a href="#"><i
									class="qticon-soundcloud"></i></a></li>
						</ul>
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
			data- activates="channelslist"><i class="icon dripicons-cross"></i></a>
		<!-- PLAYER ========================= -->
		<div id="qtplayercontainer" data-playervolume="true"
			data-accentcolor="#dd0e34" data-accentcolordark="#ff0442" data-
			textcolor="#ffffff"
			data-soundmanagerurl="resources/components/soundmanager/swf/"
			class="qt-playercontainer qt-playervolume qt-

clearfix qt-content-primary">
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
								href="http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Blue%20Belle

%20Lament.mp3"></a>
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
			data-channel="1" data-host="173.192.105.231" data- port="3540"></div>
		<!-- PLAYER END ========================= -->
		<!-- CHANNELS LIST ========================= -->
		<div class="qt-part-channels-list">
			<ul class="qt-content-aside qt-channelslist qt-negative">
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="06AM Ibiza" data-subtitle="Underground Radio" data-
					background="resources/imagestemplate/photo-squared-500-500.jpg"
					data-logo="imagestemplate/radio-logo.png" data-
					playtrack="http://173.192.105.231:3540/stream.mp3"
					data-host="173.192.105.231" data-port="3540" data-stats_path=""
					data-played_path="" data-channel=""> <img
						src="resources/imagestemplate/radio-logo.png" alt="logo"
						class="qt-radiologo dripicons-media-play" width="80" height="80">
						<i class="dripicons-media-play"></i> Station 1
				</a></li>
				<li class="qt-channel"><a href="#!" class="qt-ellipsis"
					data-title="altradio" data-subtitle="The subtitle of radio 2" data-
					background="resources/imagestemplate/large-1170-512.jpg"
					data-logo="imagestemplate/radio-logo.png" data-
					playtrack="http://82.77.137.30:8557/;listen.mp3"
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
	<script src="resources/js/jquery.js"></script>
	<!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL VERSION (NOW 

1.12) -->
	<script src="resources/js/jquery-migrate.min.js"></script>
	<!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL 

VERSION (NOW 1.12) -->

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

	<script src="resources2/js/jquery.min.js"></script>
	<script src="resources2/bootstrap/js/bootstrap.min.js"></script>
	<script src="resources2/js/jquery.mixitup.min.js"></script>
	<link href="resources2/css/magnific-popup.css" rel="stylesheet">
	<script src="resources2/js/jquery.magnific-popup.min.js"></script>

	<script src="resources2/js/theme.js"></script>

	<script type="text/javascript">
		jQuery(function($) {
			// Mix It Up Gallery and Magnific Popup setup
			$('.container-gallery').mixItUp();
			$('.container-gallery').magnificPopup({
				delegate : 'a',
				type : 'image'
			});

		});
	</script>

</body>
</html>