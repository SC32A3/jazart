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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        
        <!-- icons -->
        <link href='resources/fonts/dripicons/webfont.css' rel='stylesheet' type='text/css'>
        <link href='resources/fonts/qticons/qticons.css' rel='stylesheet' type='text/css'>
        
        <!-- slick slider -->
        <link href='resources/components/slick/slick.css' rel='stylesheet' type='text/css'>
        
        <!-- swipebox -->
        <link href='resources/components/swipebox/src/css/swipebox.min.css' rel='stylesheet' type='text/css'>
        
        <!-- countdown component -->
        <link rel="stylesheet" type="text/css" href="resources/components/countdown/css/jquery.classycountdown.css" />

        <!-- QT 360 PLAYER component -->
        <link rel="stylesheet" type="text/css" href="resources/components/soundmanager/templates/qtradio-player/css/flashblock.css" />
        <link rel="stylesheet" type="text/css" href="resources/components/soundmanager/templates/qtradio-player/css/qt-360player-volume.css" />

        <!-- Main css file -->
        <link rel="stylesheet" href="resources/css/qt-main.css"><!-- INCLUDES THE CHOSEN FRAMEWORK VIA #IMPORT AND SASS -->
        
        <!-- Custom typography settings and google fonts -->
        <link rel="stylesheet" href="resources/css/qt-typography.css">
    </head>
    <body>
    <!-- QT HEADER END ================================ -->
        
        <div class="qt-parentcontainer">
            <!-- QT MENUBAR TOP ================================ -->
            <div class="qt-menubar-top  qt-content-primary hide-on-large-and-down">
               <ul>
                    <li><a href="#"><i class="dripicons-chevron-right"></i>About US</a></li>
                    <c:if test="${empty loginNickname}">
					<li><a href="login"><i class="dripicons-chevron-right"></i>Login</a></li>
					<li><a href="join"><i class="dripicons-chevron-right"></i>Join Us</a></li>
					</c:if>
					<c:if test="${not empty loginNickname}">
					<li><a href="logout"><i class="dripicons-chevron-right"></i>logout</a></li>
    	            <li><i class="dripicons-chevron-right"></i>Welcome ${loginNickname}</li>
              		</c:if>
              		                      
                    <li class="right"><a href="#"><i class="qticon-beatport qt-socialicon"></i></a></li>
                    <li class="right"><a href="#"><i class="qticon-facebook qt-socialicon"></i></a></li>
                    <li class="right"><a href="#"><i class="qticon-twitter qt-socialicon"></i></a></li>
                    <li class="right"><a href="#"><i class="qticon-youtube qt-socialicon"></i></a></li>
                    <li class="right"><a href="#"><i class="qticon-soundcloud qt-socialicon"></i></a></li>
                </ul>
            </div>
            <!-- QT MENUBAR  ================================ -->
            <nav class="qt-menubar nav-wrapper qt-content-primary ">
                <!-- desktop menu  HIDDEN IN MOBILE AND TABLETS -->
                <ul class="qt-desktopmenu hide-on-xl-and-down">
                    <li class="qt-logo-link"><a href="./" class="brand-logo qt-logo-text">jazart<span>♬</span></a></li>
                    <li><a href="page-schedule.html">Compose</a>
                        <ul>
                            <li><a href="page-schedule.html">Archive</a></li>
                            <li><a href="single-show.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li><a href="archive-podcast.html">Board</a>
                        <ul>
						<li><a href="music_community">Music Community</a></li>
						<li><a href="single-podcast.html">Free Community</a></li>
						</ul>
                    </li>
                    <li><a href="archive-members.html">Team</a>
                        <ul>
                            <li><a href="archive-members.html">Archive</a></li>
                            <li><a href="single-member.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li><a href="archive.html">Blog</a>
                        <ul>
                            <li><a href="archive.html">Blog archive</a></li>
                            <li><a href="single-post.html">Single post</a></li>
                        </ul>
                    </li>
                    <li><a href="archive-chart.html">Charts</a>
                        <ul>
                            <li><a href="archive-chart.html">Charts archive</a></li>
                            <li><a href="single-chart.html">Single chart</a></li>
                        </ul>
                    </li>
                    <li><a href="archive-events.html">Events</a>
                        <ul>
                            <li><a href="archive-events.html">Events archive</a></li>
                            <li><a href="single-event.html">Single event</a></li>
                        </ul>
                    </li>
                    <li><a href="page-contacts.html">Contacts</a></li>
                    <li class="right"><a href="#!" data-expandable="#qtsearchbar" class="qt-btn qt-btn-l qt-scrolltop"><i class="icon dripicons-search"></i></a></li>
                    <li class="right"><a href="page-popup.html" class="qt-popupwindow" data-name="Music Player" data-width="320" data-height="500"><i class="icon dripicons-duplicate"></i> Popup</a></li>
                    <li class="right"><a href="#!" class="button-playlistswitch" data-activates="channelslist"><i class="icon dripicons-media-play"></i> Listen</a></li>
                </ul>
                <!-- mobile menu icon and logo VISIBLE ONLY TABLET AND MOBILE-->
                <ul class="qt-desktopmenu hide-on-xl-only ">
                    <li><a href="#" data-activates="qt-mobile-menu" class="button-collapse qt-menu-switch qt-btn qt-btn-primary qt-btn-m"><i class="dripicons-menu"></i></a></li>
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
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="archive-podcast.html">Board</a>
                        <ul>
                            <li><a href="music_community">music community</a></li>
                            <li><a href="single-podcast.html">free community</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="archive-members.html">Team</a>
                        <ul>
                            <li><a href="archive-members.html">Archive</a></li>
                            <li><a href="single-member.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="archive.html">Blog</a>
                        <ul>
                            <li><a href="archive.html">Blog archive</a></li>
                            <li><a href="single-post.html">Single post</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="archive-chart.html">Charts</a>
                        <ul>
                            <li><a href="archive-chart.html">Charts archive</a></li>
                            <li><a href="single-chart.html">Single chart</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="archive-events.html">Events</a>
                        <ul>
                            <li><a href="archive-events.html">Events archive</a></li>
                            <li><a href="single-event.html">Single event</a></li>
                        </ul>
                    </li>
                    <li><a href="page-contacts.html">Contacts</a></li>
                </ul>
            </div>
            <!-- mobile toolbar -->
            <ul class="qt-mobile-toolbar qt-content-primary-dark qt-content-aside hide-on-large-only">
                <li><a href="#!" data-expandable="#qtsearchbar" class="qt-scrolltop"><i class="icon dripicons-search"></i></a></li>
                <li><a href="page-popup.html" class="qt-popupwindow" data-name="Music Player" data-width="320" data-height="500"><i class="icon dripicons-duplicate"></i></a></li>
                <li><a href="#!" class="button-playlistswitch" data-activates="channelslist"><i class="icon dripicons-media-play"></i></a></li>
            </ul>
            <!-- SEARCH FORM ========================= -->
            <div id="qtsearchbar" class="qt-searchbar qt-content-primary qt-expandable">
                <div class="qt-expandable-inner">
                    <form method="post" action="#search" class="qt-inline-form">
                        <div class="row qt-nopadding">
                            <div class="col s12 m8 l9">
                                <input placeholder="Search" value="" id="searchtex" type="text" class="validate qt-input-l">
                            </div>
                            <div class="col s12 m3 l2">
                                <input type="button" value="Search" class="qt-btn qt-btn-primary qt-btn-l qt-fullwidth">
                            </div>
                            <div class="col s12 m1 l1">
                                <a href="#!" class="qt-btn qt-btn-l qt-btn-secondary qt-fullwidth aligncenter" data-expandable="#qtsearchbar"><i class="dripicons-cross"></i></a>
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
                        <h1 class="qt-caption qt-spacer-s">
                                Join Us
                            </h1>
                        <ul class="qt-menu-social qt-spacer-s">
                            <li><a href="#"><i class="qticon-beatport"></i></a></li>
                            <li><a href="#"><i class="qticon-facebook"></i></a></li>
                            <li><a href="#"><i class="qticon-twitter"></i></a></li>
                            <li><a href="#"><i class="qticon-youtube"></i></a></li>
                            <li><a href="#"><i class="qticon-soundcloud"></i></a></li>
                        </ul>
                    </div>
                    <div class="qt-header-bg" data-bgimage="resources/imagestemplate/full-1600-700.jpg">
                        <img src="resources/imagestemplate/full-1600-700.jpg" alt="Featured image" width="690" height="302">
                    </div>
                </div>
                <!-- HEADER CONTACTS END ========================= -->
                <div class="qt-container qt-vertical-padding-l">
                    <div class="row">
                        <div class="col s12 m8 push-m2">
                            <!-- ====================== SECTION BOOKING AND CONTACTS ================================================ -->
                            <div id="booking" class="section qt-section-booking qt-card">
                                <div class="qt-valign-wrapper">
                                    <div class="qt-valign flow-text">
                                        <div class="qt-booking-form" data-100p-top="opacity:0;" data-80p-top="opacity:0;" data-30p-top="opacity:1;">
                                            <ul class="tabs">
                                                <li class="tab col s4">
                                                    <h5><a href="#form" class="active">Send a message</a></h5></li>
                                                <li class="tab col s4">
                                                    <h5><a href="#contacts">Contacts</a></h5></li>
                                                <li class="tab col s4">
                                                    <h5><a href="#map">Map</a></h5></li>
                                            </ul>
                                            <div id="form" class="row">
                                                <form class="col s12" method="post" action="join" enctype="multipart/form-data"> <!-- email_sender.php -->
                                                    <input type="hidden" name="antispam" value="x123">
                                                    <h3 class="left-align qt-vertical-padding-m">write down below</h3>
                                                    <div class="row">
                                                        <div class="input-field col s6">
                                                            <input name="user_id" id="user_id" type="text" class="validate">
                                                            <label>ID</label>
                                                        </div>
                                                        <div class="input-field col s6">
                                                            <input name="user_pw" id="user_pw" type="password" class="validate">
                                                            <label>Password</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s6">
                                                            <input name="user_nickname" id="user_nickname" type="text" class="validate">
                                                            <label>Nickname</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
														<div class="input-field col s6">
                                                            <!-- <label>Profile</label> -->
                                                            <input type="file" name="upload">
                                                        </div>
													</div>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <input name="user_phone" id="user_phone" type="text" class="validate">
                                                            <label>Phone</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <input name="user_email" id="user_email" type="email" class="validate">
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                           <p class="comment-form-comment">
														    <textarea id="user_desc" placeholder="Comment *" name="user_desc" cols="45" aria-required="true"></textarea>
														   </p>
                                                        </div>
                                                    </div>
                                                    <hr class="qt-spacer-s hide-on-med-and-up">
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <button class="qt-btn qt-btn-l qt-btn-primary qt-spacer-m waves-effect waves-light" type="submit" name="action">
                                                                <span class="lnr lnr-rocket"></span> join
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div id="contacts" class="row qt-contacts">
                                                <div class="col s12">
                                                    <h3 class="left-align qt-vertical-padding-m">Our contacts</h3>
                                                    <p><i class="qt-bigicon dripicons-phone"></i><span>+44 443 53 2324</span></p>
                                                    <p><i class="qt-bigicon dripicons-phone"></i><span>info@bookmenow.com</span></p>
                                                    <p><i class="qt-bigicon dripicons-phone"></i><span>Road Avenue, California</span></p>
                                                </div>
                                            </div>
                                            <div id="map" class="qt-map">
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2823.9899192531298!2d-123.04142404893491!3d44.94387287592946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff0c89be210f%3A0x79aa007f04406672!2s295+Center+St+NE%2C+Salem%2C+OR+97301%2C+USA!5e0!3m2!1sen!2ses!4v1478257655617" width="600" height="450" style="border:0" allowfullscreen></iframe>
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
            <div class="qt-footer qt-footerwidgets">
                <div class="qt-section qt-footer-widgets qt-content-primary-light">
                    <div class="qt-container">
                        <h2 class="qt-footer-logo"><a href="./" class="brand-logo qt-logo-text">ONAIR<span>2</span></a></h2>
                        <div class="qt-widgets qt-widgets-footer qt-negative qt-spacer-m row">
                            <div class="col s12 m3 l3">
                                <div class="qt-widget">
                                    <h5 class="qt-caption-small"><span>Stay Connected</span></h5> Subscribe now to the newsletter to receive weekly updates.
                                    <hr class="qt-spacer-s">
                                    <form method="post" action="#newsletter" class="qt-inline-form">
                                        <div class="row qt-nopadding">
                                            <div class="col s12 m8 l9">
                                                <input placeholder="Your email" value="" type="text" class="validate qt-input-s">
                                            </div>
                                            <div class="col s12 m4 l3">
                                                <input type="button" value="submit" class="qt-btn qt-btn-secondary qt-btn-s qt-fullwidth">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col s12 m3 l3">
                                <div class="qt-widget">
                                    <h5 class="qt-caption-small"><span>Contacts</span></h5>
                                    <div class="qt-widget-contacts">
                                        <p>
                                            <i class="qticon-home"></i><a href="http://www.qantumthemes.com">www.qantumthemes.com</a>
                                        </p>
                                        <p>
                                            <i class="qticon-at-sign"></i><a href="mailto:info@someofyoursite.com">info@someofyoursite.com</a>
                                        </p>
                                        <p>
                                            <i class="qticon-phone"></i><a href="tel:1-847-555-5555">1-847-555-5555</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m3 l3">
                                <div class="qt-widget">
                                    <h5 class="qt-caption-small"><span>Contacts</span></h5>
                                    <div class="qt-widget-about">
                                        <p>
                                            We are a young and dynamic radio station which wants to bring happyness in your life.
                                            <br>
                                            <a href="http://www.qantumthemes.com">Discover more <i class="dripicons-arrow-thin-right"></i></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m3 l3">
                                <div class="qt-widget">
                                    <h5 class="qt-caption-small"><span>Main links</span></h5>
                                    <ul class="qt-widget-menu qt-list-chevron">
                                        <li>
                                            <a href="http://www.qantumthemes.com">Home page</a>
                                        </li>
                                        <li>
                                            <a href="http://www.qantumthemes.com">Shows schedule</a>
                                        </li>
                                        <li>
                                            <a href="http://www.qantumthemes.com">Events archive</a>
                                        </li>
                                        <li>
                                            <a href="http://www.qantumthemes.com">Contacts</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="qt-header-bg" data-bgimage="resources/imagestemplate/full-1600-700.jpg">
                        <img src="resources/imagestemplate/full-1600-700.jpg" alt="Featured image" width="690" height="302">
                    </div>
                </div>
                <div class="qt-footer-bottom qt-content-primary-dark">
                    <div class="qt-container">
                        <div class="row">
                            <div class="col s12 m12 l8">
                                Copyright 2016 <a href="http://qantumthemes.com">Qantumthemes.com</a> | Radio Station HTML Template
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
                                    <li class="right"><a href="#"><i class="qticon-soundcloud"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- PLAYER SIDEBAR ========================= -->
        <div id="channelslist" class="side-nav qt-content-primary qt-right-sidebar">
            <a href="#" class="qt-btn qt-btn-secondary button-playlistswitch-close qt-close-sidebar-right" data-activates="channelslist"><i class="icon dripicons-cross"></i></a>
            <!-- PLAYER ========================= -->
            <div id="qtplayercontainer" data-playervolume="true" data-accentcolor="#dd0e34" data-accentcolordark="#ff0442" data-textcolor="#ffffff" data-soundmanagerurl="resources/components/soundmanager/swf/" class="qt-playercontainer qt-playervolume qt-clearfix qt-content-primary">
                <div class="qt-playercontainer-content qt-vertical-padding-m">
                    <div class="qt-playercontainer-header">
                        <h5 class="qt-text-shadow small">Now on</h5>
                        <h3 id="qtradiotitle" class="qt-text-shadow">STATION 1 RADIO</h3>
                        <h4 id="qtradiosubtitle" class="qt-thin qt-text-shadow small">Subtitle of the radio</h4>
                    </div>
                    <div class="qt-playercontainer-musicplayer" id="qtmusicplayer">
                        <div class="qt-musicplayer">
                            <div class="ui360 ui360-vis qt-ui360">
                                <a id="playerlink" href="http://freshly-ground.com/data/audio/sm2/Adrian%20Glynn%20-%20Blue%20Belle%20Lament.mp3"></a>
                            </div>
                        </div>
                    </div>
                    <div class="qt-playercontainer-data qt-container qt-text-shadow small">
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
                <div id="playerimage" class="qt-header-bg" data-bgimage="resources/imagestemplate/full-1600-700.jpg">
                    <img src="resources/imagestemplate/full-1600-700.jpg" alt="Featured image" width="690" height="302">
                </div>
            </div>
            <!-- this is for xml radio feed -->
            <div id="qtShoutcastFeedData" class="hidden" data-style="" data-channel="1" data-host="173.192.105.231" data-port="3540"></div>
            <!-- PLAYER END ========================= -->
            <!-- CHANNELS LIST ========================= -->
            <div class="qt-part-channels-list">
                <ul class="qt-content-aside qt-channelslist qt-negative">
                    <li class="qt-channel">
                        <a href="#!" class="qt-ellipsis" data-title="06AM Ibiza" data-subtitle="Underground Radio" data-background="resources/imagestemplate/photo-squared-500-500.jpg" data-logo="imagestemplate/radio-logo.png" data-playtrack="http://173.192.105.231:3540/stream.mp3" data-host="173.192.105.231" data-port="3540" data-stats_path="" data-played_path="" data-channel="">
                            <img src="resources/imagestemplate/radio-logo.png" alt="logo" class="qt-radiologo dripicons-media-play" width="80" height="80">
                            <i class="dripicons-media-play"></i> Station 1
                        </a>
                    </li>
                    <li class="qt-channel">
                        <a href="#!" class="qt-ellipsis" data-title="altradio" data-subtitle="The subtitle of radio 2" data-background="resources/imagestemplate/large-1170-512.jpg" data-logo="imagestemplate/radio-logo.png" data-playtrack="http://82.77.137.30:8557/;listen.mp3" data-host="82.77.137.30" data-port="8557" data-stats_path="" data-played_path="" data-channel="">
                            <img src="resources/imagestemplate/radio-logo.png" alt="logo" class="qt-radiologo" width="80" height="80">
                            <i class="dripicons-media-play"></i> altradio
                        </a>
                    </li>
                </ul>
            </div>
            <!-- CHANNELS LIST END ========================= -->
        </div>

        <!-- PLAYER SIDEBAR END ========================= -->        

        <!-- QT BODY END ================================ -->

        <!-- QT FOOTER SCRIPTS ================================ -->
        <script src="resources/js/modernizr-2.8.3-respond-1.4.2.min.js"></script>
        <script src="resources/js/jquery.js"></script><!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL VERSION (NOW 1.12) -->
        <script src="resources/js/jquery-migrate.min.js"></script><!--  JQUERY VERSION MUST MATCH WORDPRESS ACTUAL VERSION (NOW 1.12) -->
       
        <!-- Framework -->
        <script src="resources/js/materializecss/bin/materialize.min.js"></script>

        <!-- Cookies for player -->
        <script src="resources/js/jquerycookie.js"></script>

         <!-- Slick carousel and skrollr -->
        <script src="resources/components/slick/slick.min.js"></script>
        <script src="resources/components/skrollr/skrollr.min.js"></script>
        
        <!-- Swipebox -->
        <script src="resources/components/swipebox/lib/ios-orientationchange-fix.js"></script>
        <script src="resources/components/swipebox/src/js/jquery.swipebox.min.js"></script>

        <!-- Countdown -->
        <script src="resources/components/countdown/js/jquery.knob.js"></script>
        <script src="resources/components/countdown/js/jquery.throttle.js"></script>
        <script src="resources/components/countdown/js/jquery.classycountdown.min.js"></script>

        <!-- Soundmanager2 -->
        <!--[if IE]><script src="components/soundmanager/script/excanvas.js"></script><![endif]-->
        <script src="resources/components/soundmanager/script/berniecode-animator.js"></script>
        <script src="resources/components/soundmanager/script/soundmanager2-nodebug.js"></script>
        <script src="resources/components/soundmanager/script/shoutcast.js"></script>
        <script src="resources/components/soundmanager/templates/qtradio-player/script/qt-360player-volumecontroller.js"></script>

        <!-- Popup -->
        <script src="resources/components/popup/popup.js"></script>


        <!-- MAIN JAVASCRIPT FILE ================================ -->
        <script src="resources/js/qt-main.js"></script>

    </body>
</html>