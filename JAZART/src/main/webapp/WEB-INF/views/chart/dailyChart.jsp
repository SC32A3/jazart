<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<html class="no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Jazart</title>
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
                    <li><a href="#"><i class="dripicons-chevron-right"></i>Advertisement</a></li>
                    <li><a href="resources/page-contacts.html"><i class="dripicons-chevron-right"></i>Contacts</a></li>
                    <li><a href="#"><i class="dripicons-chevron-right"></i>Privacy</a></li>
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
                    <li class="qt-logo-link"><a href="./" class="brand-logo qt-logo-text">Jazart<span>♬</span></a></li>
                    <li><a href="resources/page-schedule.html">Schedule</a>
                        <ul>
                            <li><a href="resources/page-schedule.html">Archive</a></li>
                            <li><a href="resources/single-show.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/archive-podcast.html">Podcast</a>
                        <ul>
                            <li><a href="resources/archive-podcast.html">Archive</a></li>
                            <li><a href="resources/single-podcast.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/archive-members.html">Team</a>
                        <ul>
                            <li><a href="resources/archive-members.html">Archive</a></li>
                            <li><a href="resources/single-member.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/archive.html">Blog</a>
                        <ul>
                            <li><a href="resources/archive.html">Blog archive</a></li>
                            <li><a href="resources/single-post.html">Single post</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/archive-chart.html">Charts</a>
                        <ul>
                      		<li><a href="archive-chart.html">realtime chart</a></li>
							<li><a href="single-chart.html">daily chart</a></li>
							<li><a href="chart.html">weekly chart</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/archive-events.html">Events</a>
                        <ul>
                            <li><a href="resources/archive-events.html">Events archive</a></li>
                            <li><a href="resources/single-event.html">Single event</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/page-contacts.html">Contacts</a></li>
                    <li class="right"><a href="#!" data-expandable="#qtsearchbar" class="qt-btn qt-btn-l qt-scrolltop"><i class="icon dripicons-search"></i></a></li>
                    <li class="right"><a href="page-popup.html" class="qt-popupwindow" data-name="Music Player" data-width="320" data-height="500"><i class="icon dripicons-duplicate"></i> Popup</a></li>
                    <li class="right"><a href="#!" class="button-playlistswitch" data-activates="channelslist"><i class="icon dripicons-media-play"></i> Listen</a></li>
                </ul>
                <!-- mobile menu icon and logo VISIBLE ONLY TABLET AND MOBILE-->
                <ul class="qt-desktopmenu hide-on-xl-only ">
                    <li><a href="#" data-activates="qt-mobile-menu" class="button-collapse qt-menu-switch qt-btn qt-btn-primary qt-btn-m"><i class="dripicons-menu"></i></a></li>
                    <li><a href="#!" class="brand-logo qt-logo-text">ONAIR2</a></li>
                </ul>
            </nav>
            <!-- mobile menu -->
            <div id="qt-mobile-menu" class="side-nav qt-content-primary">
                <ul class=" qt-side-nav">
                    <li><a href="index.html">Home</a></li>
                    <li class="menu-item-has-children"><a href="resources/page-schedule.html">Schedule</a>
                        <ul>
                            <li><a href="resources/page-schedule.html">Archive</a></li>
                            <li><a href="resources/single-show.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="resources/archive-podcast.html">Podcast</a>
                        <ul>
                            <li><a href="resources/archive-podcast.html">Archive</a></li>
                            <li><a href="resources/single-podcast.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="resources/archive-members.html">Team</a>
                        <ul>
                            <li><a href="resources/archive-members.html">Archive</a></li>
                            <li><a href="resources/single-member.html">Single show page</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="resources/archive.html">Blog</a>
                        <ul>
                            <li><a href="resources/archive.html">Blog archive</a></li>
                            <li><a href="resources/single-post.html">Single post</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="resources/archive-chart.html">Charts</a>
                        <ul>
                            <li><a href="resources/archive-chart.html">Charts archive</a></li>
                            <li><a href="resources/single-chart.html">Single chart</a></li>
                        </ul>
                    </li>
                    <li class="menu-item-has-children"><a href="resources/archive-events.html">Events</a>
                        <ul>
                            <li><a href="resources/archive-events.html">Events archive</a></li>
                            <li><a href="resources/single-event.html">Single event</a></li>
                        </ul>
                    </li>
                    <li><a href="resources/page-contacts.html">Contacts</a></li>
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
                <!-- HEADER CAPTION ========================= -->
                <div class="qt-pageheader qt-negative">
                    <div class="qt-container">
              
                        <h1 class="qt-caption qt-spacer-s">
                          daily chart
                        </h1>
                        <h4 class="qt-subtitle">
                            Subtitle of the page
                        </h4>
                    </div>
                    <div class="qt-header-bg" data-bgimage="resources/imagestemplate/full-1600-700.jpg">
                        <img src="resources/imagestemplate/full-1600-700.jpg" alt="Featured image" width="690" height="302">
                    </div>
                </div>
                <!-- HEADER CAPTION END ========================= -->
                <!-- ======================= CONTENT SECTION ======================= -->
                <div class="qt-container">
                    <div class="row qt-vertical-padding-l ">
                        <div class="col s12 m12 l1 qt-pushpin-container">
                            <div class="qt-pushpin">
                                <!-- SHARE FUNCTIONS ================================================== -->
                                <ul class="qt-sharepage qt-content-primary">
                                    <li class="hide-on-med-and-down">
                                        <i class="qticon-share qt-shareicon qt-content-primary-dark"></i>
                                    </li>
                                    <li>
                                        <a class="qt-popupwindow qt-sharelink" data-sharetype="facebook" data-name="Share" data-width="600" data-height="500" target="_blank" href="#">
                                            <i class="qticon-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="qt-popupwindow qt-sharelink" data-sharetype="twitter" data-name="Share" data-width="600" data-height="500" target="_blank" href="#">
                                            <i class="qticon-twitter"></i>
                                        </a>
                                        </li>
                                    <li>
                                        <a class="qt-popupwindow qt-sharelink" data-sharetype="google" data-name="Share" data-width="600" data-height="500" target="_blank" href="#">
                                            <i class="qticon-googleplus"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="qt-popupwindow qt-sharelink" data-sharetype="pinterest" data-name="Share" data-width="600" data-height="500" target="_blank" href="#">
                                            <i class="qticon-pinterest"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="qt-btn-primary qt-sharelink"><i class="dripicons-heart"></i>
                                        </a>
                                    </li>
                                </ul>
                                <!-- SHARE FUNCTIONS ================================================== -->
                            </div>
                            <hr class="qt-spacer-m">
                        </div>
                        <div class="col s12 m12 l8">
                            <ul class="collapsible qt-chart-tracklist" data-collapsible="accordion">
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>1</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>2</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>3</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>4</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>5</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>6</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>7</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>8</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>9</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>10</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                              
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>11</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>12</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                                <!-- CHART TRACK ========================= -->
                                <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                                    <div class="qt-chart-table collapsible-header qt-content-primary">
                                        <div class="qt-position">
                                            <img src="resources/imagestemplate/thumb-170-170.jpg" class="qt-chart-cover" alt="Chart track" width="170" height="170">
                                            <span>13</span>
                                        </div>
                                        <div class="qt-titles">
                                            <h3 class="qt-ellipsis qt-t">Last night a Dj Saved My Life</h3>
                                            <p>Dj Phoenix Da Housemat feat Emix Bizz</p>
                                        </div>
                                        <div class="qt-action">
                                            <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i class="dripicons-cart"></i></a>
                                        </div>
                                    </div>
                                    <div class="collapsible-body qt-paper">
                                        <p>
                                            Lorem ipsum dolor sit amet.
                                        </p>
                                    </div>
                                </li>
                                <!-- CHART TRACK END ========================= -->
                            </ul>
                        </div>
                        <div class="qt-sidebar col s12 m12 l3">
                            <!-- SIDEBAR ================================================== -->
                            <div class="qt-widgets qt-sidebar-main qt-text-secondary row">
                                <div class="col s12 m3 l12">
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
                                <div class="col s12 m3 l12">
                                    <div class="qt-widget">
                                        <h5 class="qt-caption-small"><span>Recent Posts</span></h5>
                                        <!-- POST SMALL TITLE ITEM ========================= -->
                                        <div class="qt-part-archive-item qt-part-archive-item-small-title">
                                            <div class="qt-item-header">
                                                <div class="qt-header-top">
                                                    <ul class="qt-tags">
                                                        <li><a href="#">Adventure</a></li>
                                                    </ul>
                                                </div>
                                                <div class="qt-header-mid qt-vc">
                                                    <div class="qt-vi">
                                                        <h4 class="qt-title">
                                                            <a href="#read" class="qt-text-shadow">
                                                                HERO - THE LIGHT AND MUSIC EXPOSITION HITS LOS ANGELES IN THE FASHION WEEK
                                                            </a>
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div class="qt-header-bottom">
                                                    <a href="#read" class="qt-btn qt-btn-primary qt-readmore"><i class="dripicons-media-play"></i></a>
                                                </div>
                                                <div class="qt-header-bg" data-bgimage="resources/imagestemplate/medium-690-302.jpg">
                                                    <img src="resources/imagestemplate/medium-690-302.jpg" alt="Featured image" width="690" height="302">
                                                </div>
                                            </div>
                                        </div>
                                        <!-- POST SMALL TITLE ITEM END ========================= -->
                                    </div>
                                </div>
                                <div class="col s12 m3 l12">
                                    <div class="qt-widget">
                                        <h5 class="qt-caption-small">
                                            <span>Now on air</span>
                                        </h5>
                                        <div class="qt-widget-onair qt-card aligncenter">
                                            <a href="#post">
                                                <img src="resources/imagestemplate/thumbnail.jpg" class="qt-featured-image" alt="photo" />
                                            </a>
                                            <h4 class="qt-caption-med">
                                                <span>Sound circus</span>
                                            </h4>
                                            <h6 class="qt-onair-title">
                                                By Tom Shepard
                                            </h6>
                                            <p class="qt-small">
                                                A journey into the music of your best holiday nights, full of melodies and rhythm. Dance and get crazy with Tom Shepard!
                                            </p>
                                            <a href="#show" class="qt-btn qt-btn-s qt-btn-secondary">Info and episodes</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col s12 m3 l12">
                                    <div class="qt-widget">
                                        <h5 class="qt-caption-small"><span>Next shows</span></h5>
                                        <ul class="qt-widget-upcoming">
                                            <li class="qt-card-s paper">
                                                <h5>
                                                    <a href="#showlink">About Jenny</a>
                                                </h5>
                                                <p>
                                                    07:00 pm
                                                </p>
                                                <img src="resources/imagestemplate/thumbnail-200-110.jpg" alt="Show cover" width="200" height="110" class="right">
                                            </li>
                                            <li class="qt-card-s paper">
                                                <h5>
                                                    <a href="#showlink">About Jenny</a>
                                                </h5>
                                                <p>
                                                    07:00 pm
                                                </p>
                                                <img src="resources/imagestemplate/thumbnail-200-110.jpg" alt="Show cover" width="200" height="110" class="right">
                                            </li>
                                            <li class="qt-card-s paper">
                                                <h5>
                                                    <a href="#showlink">About Jenny</a>
                                                </h5>
                                                <p>
                                                    07:00 pm
                                                </p>
                                                <img src="resources/imagestemplate/thumbnail-200-110.jpg" alt="Show cover" width="200" height="110" class="right">
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col s12 m3 l12">
                                    <div class="qt-widget">
                                        <h5 class="qt-caption-small"><span>Sponsor</span></h5>
                                        <div class="qt-widget-sponsor qt-card">
                                            <a href="#sponsorlink" target="_blank" rel="nofollow">
                                                <img src="resources/imagestemplate/sponsor.png" alt="Sponsor" width="235" height="132">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- SIDEBAR END ================================================== -->
                        </div>
                    </div>
                          	<div class="qt-pagination qt-content-primary">
					<!-- PAGINATION ========================= -->
					<ul class="pagination qt-container">
						<li class="special"><span class="qt-pagination-label qt-content-primary-dark">PAGES</span></li>
						<li class="special disabled"><a href="#!" class="qt-btn qt-btn-l qt-btn-primary"><i class="dripicons-arrow-thin-left"></i></a></li>
						<li class="special waves-effect"><a href="#!" class="qt-btn qt-btn-l qt-btn-primary"><i class="dripicons-arrow-thin-right"></i></a></li>
						<li class="item active hide-on-large-and-down"><a href="#!">1</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">2</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">3</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">4</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">5</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">6</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">7</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">8</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">9</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">10</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">11</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">12</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">13</a></li>
					</ul>
					<!-- PAGINATION END ========================= -->
				</div>
                </div>
                      	<div class="qt-pagination qt-content-primary">
					<!-- PAGINATION ========================= -->
					<ul class="pagination qt-container">
						<li class="special"><span class="qt-pagination-label qt-content-primary-dark">PAGES</span></li>
						<li class="special disabled"><a href="#!" class="qt-btn qt-btn-l qt-btn-primary"><i class="dripicons-arrow-thin-left"></i></a></li>
						<li class="special waves-effect"><a href="#!" class="qt-btn qt-btn-l qt-btn-primary"><i class="dripicons-arrow-thin-right"></i></a></li>
						<li class="item active hide-on-large-and-down"><a href="#!">1</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">2</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">3</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">4</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">5</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">6</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">7</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">8</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">9</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">10</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">11</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">12</a></li>
						<li class="item waves-effect hide-on-large-and-down"><a href="#!">13</a></li>
					</ul>
					<!-- PAGINATION END ========================= -->
				</div>
                <!-- ======================= RELATED SECTION ======================= -->
                <div class="qt-content-primary qt-negative qt-related-section qt-vertical-padding-l">
                    <div class="qt-container">
                        <h5 class="qt-caption-small"><span>Related charts</span></h5>
                        <div class="qt-related-list row">
                            <div class="col s12 m4">
                                <div class="qt-part-archive-item qt-item-chart">
                                    <div class="qt-item-header">
                                        <div class="qt-header-top">
                                            <ul class="qt-tags">
                                                <li><a href="#">Dance</a></li>
                                            </ul>
                                            <div class="qt-feedback">
                                                <a>17<i class="dripicons-message"></i></a><a>34<i class="dripicons-heart"></i></a>
                                            </div>
                                        </div>
                                        <div class="qt-header-mid qt-vc">
                                            <div class="qt-vi">
                                                <h3 class="qt-title">
                                                    <a href="#" class="qt-text-shadow">
                                                        2016 Summer Chart
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="qt-header-bottom">
                                            <a href="#" class="qt-btn qt-btn-primary qt-readmore"><i class="dripicons-align-justify"></i></a>
                                        </div>
                                        <div class="qt-header-bg" data-bgimage="resources/imagestemplate/squared-690-690.jpg">
                                            <img src="resources/imagestemplate/squared-690-690.jpg" alt="Featured image" width="690" height="690">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m4">
                                <div class="qt-part-archive-item qt-item-chart">
                                    <div class="qt-item-header">
                                        <div class="qt-header-top">
                                            <ul class="qt-tags">
                                                <li><a href="#">Dance</a></li>
                                            </ul>
                                            <div class="qt-feedback">
                                                <a>17<i class="dripicons-message"></i></a><a>34<i class="dripicons-heart"></i></a>
                                            </div>
                                        </div>
                                        <div class="qt-header-mid qt-vc">
                                            <div class="qt-vi">
                                                <h3 class="qt-title">
                                                    <a href="#" class="qt-text-shadow">
                                                        2016 Summer Chart
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="qt-header-bottom">
                                            <a href="#" class="qt-btn qt-btn-primary qt-readmore"><i class="dripicons-align-justify"></i></a>
                                        </div>
                                        <div class="qt-header-bg" data-bgimage="resources/imagestemplate/squared-690-690.jpg">
                                            <img src="resources/imagestemplate/squared-690-690.jpg" alt="Featured image" width="690" height="690">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col s12 m4">
                                <div class="qt-part-archive-item qt-item-chart">
                                    <div class="qt-item-header">
                                        <div class="qt-header-top">
                                            <ul class="qt-tags">
                                                <li><a href="#">Dance</a></li>
                                            </ul>
                                            <div class="qt-feedback">
                                                <a>17<i class="dripicons-message"></i></a><a>34<i class="dripicons-heart"></i></a>
                                            </div>
                                        </div>
                                        <div class="qt-header-mid qt-vc">
                                            <div class="qt-vi">
                                                <h3 class="qt-title">
                                                    <a href="#" class="qt-text-shadow">
                                                        2016 Summer Chart
                                                    </a>
                                                </h3>
                                            </div>
                                        </div>
                                        <div class="qt-header-bottom">
                                            <a href="#" class="qt-btn qt-btn-primary qt-readmore"><i class="dripicons-align-justify"></i></a>
                                        </div>
                                        <div class="qt-header-bg" data-bgimage="resources/imagestemplate/squared-690-690.jpg">
                                            <img src="resources/imagestemplate/squared-690-690.jpg" alt="Featured image" width="690" height="690">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- .qt-main end -->
            <div class="qt-footer qt-footerwidgets">
                <div class="qt-section qt-footer-widgets qt-content-primary-light">
                    <div class="qt-container">
                        <h2 class="qt-footer-logo"><a href="./" class="brand-logo qt-logo-text">jazart<span>♬</span></a></h2>
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
                    <div class="qt-header-bg" data-bgimage="imagestemplate/full-1600-700.jpg">
                        <img src="imagestemplate/full-1600-700.jpg" alt="Featured image" width="690" height="302">
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
            <div id="qtplayercontainer" data-playervolume="true" data-accentcolor="#dd0e34" data-accentcolordark="#ff0442" data-textcolor="#ffffff" data-soundmanagerurl="./components/soundmanager/swf/" class="qt-playercontainer qt-playervolume qt-clearfix qt-content-primary">
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
                        <a href="#!" class="qt-ellipsis" data-title="06AM Ibiza" data-subtitle="Underground Radio" data-background="imagestemplate/photo-squared-500-500.jpg" data-logo="imagestemplate/radio-logo.png" data-playtrack="http://173.192.105.231:3540/stream.mp3" data-host="173.192.105.231" data-port="3540" data-stats_path="" data-played_path="" data-channel="">
                            <img src="resources/imagestemplate/radio-logo.png" alt="logo" class="qt-radiologo dripicons-media-play" width="80" height="80">
                            <i class="dripicons-media-play"></i> Station 1
                        </a>
                    </li>
                    <li class="qt-channel">
                        <a href="#!" class="qt-ellipsis" data-title="altradio" data-subtitle="The subtitle of radio 2" data-background="imagestemplate/large-1170-512.jpg" data-logo="imagestemplate/radio-logo.png" data-playtrack="http://82.77.137.30:8557/;listen.mp3" data-host="82.77.137.30" data-port="8557" data-stats_path="" data-played_path="" data-channel="">
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