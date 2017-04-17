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
      <!--       <li class="right"><a href="#!" data-expandable="#qtsearchbar"
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
         <!-- ======================= SLIDESHOW SECTION ======================= -->
         <!-- SLIDESHOW FULLSCREEN ================================================== -->
         <div class="qt-slickslider-container">
            <div
               class="qt-slickslider qt-slickslider-single qt-text-shadow qt-black-bg"
               data-variablewidth="true" data-arrows="true" data-dots="true"
               data-infinite="true" data-centermode="true"
               data-pauseonhover="true" data-autoplay="true"
               data-arrowsmobile="true" data-centermodemobile="true"
               data-dotsmobile="false" data-variablewidthmobile="true">
               <!-- SLIDESHOW ITEM -->
               <div class="qt-slick-opacity-fx qt-item">
                  <!-- POST HERO ITEM ========================= -->
                  <div class="qt-part-archive-item qt-part-item-post-hero">
                     <div class="qt-item-header">
                        <div class="qt-header-top">
                           <div class="qt-feedback">
                              <a>17<i class="dripicons-message"></i></a><a>34<i
                                 class="dripicons-heart"></i></a>
                           </div>
                        </div>
                        <div class="qt-header-mid qt-vc">
                           <div class="qt-vi">

                              <h2 class="qt-title">
                                 <a href="#read" class="qt-text-shadow"> compose </a>
                              </h2>
                              <div
                                 class="qt-the-content qt-spacer-s small hide-on-med-and-down ">
                                 <p class="qt-spacer-s qt-text-shadow">
                                    Let's start our composing journey. More easy, more quickly
                                    makes your music!!<br> 1. Click (test)mixing page. <br>2.
                                    Select genres and atmosphere. <br>3. Simply drag the
                                    recommended music file.
                                 </p>
                                 <p>
                                    <a href="compose" class="qt-btn qt-btn-l qt-btn-primary "><i
                                       class="dripicons-align-justify"></i></a>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div class="qt-header-bg" data-bgimage="images/back1.jpg">
                           <img src="images/back1.jpg" alt="Featured image" width="1170"
                              height="512">
                        </div>
                     </div>
                  </div>
                  <!-- POST HERO ITEM END ========================= -->
               </div>
               <!-- SLIDESHOW ITEM -->
               <div class="qt-slick-opacity-fx qt-item">
                  <!-- POST HERO ITEM ========================= -->
                  <div class="qt-part-archive-item qt-part-item-post-hero">
                     <div class="qt-item-header">
                        <div class="qt-header-top">
                           <div class="qt-feedback">
                              <a>17<i class="dripicons-message"></i></a><a>34<i
                                 class="dripicons-heart"></i></a>
                           </div>
                        </div>
                        <div class="qt-header-mid qt-vc">
                           <div class="qt-vi">

                              <h2 class="qt-title">
                                 <a href="#read" class="qt-text-shadow"> board </a>
                              </h2>
                              <div
                                 class="qt-the-content qt-spacer-s small hide-on-med-and-down ">
                                 <p class="qt-spacer-s qt-text-shadow">
                                    We provide music community, and free community. <br>
                                    Don't hesitate to write. Our search box makes it easier to
                                    use.
                                 </p>
                                 <p>
                                    <a href="commBoard" class="qt-btn qt-btn-l qt-btn-primary "><i
                                       class="dripicons-align-justify"></i></a>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div class="qt-header-bg" data-bgimage="images/back2.jpg">
                           <img src="images/back2.jpg" alt="Featured image" width="1170"
                              height="512">
                        </div>
                     </div>
                  </div>
                  <!-- POST HERO ITEM END ========================= -->
               </div>
               <!-- SLIDESHOW ITEM -->
               <div class="qt-slick-opacity-fx qt-item">
                  <!-- POST HERO ITEM ========================= -->
                  <div class="qt-part-archive-item qt-part-item-post-hero">
                     <div class="qt-item-header">
                        <div class="qt-header-top">
                           <div class="qt-feedback">
                              <a>17<i class="dripicons-message"></i></a><a>34<i
                                 class="dripicons-heart"></i></a>
                           </div>
                        </div>
                        <div class="qt-header-mid qt-vc">
                           <div class="qt-vi">

                              <h2 class="qt-title">
                                 <a href="#read" class="qt-text-shadow"> chart </a>
                              </h2>
                              <div
                                 class="qt-the-content qt-spacer-s small hide-on-med-and-down ">
                                 <p class="qt-spacer-s qt-text-shadow">
                                    We have a more detailed chart for users.<br> Check!!
                                    the realtime chart, daily chart, and weekly chart.<br>
                                    Your recommendation can change the ranking.
                                 </p>
                                 <p>
                                    <a href="realtimeChart"
                                       class="qt-btn qt-btn-l qt-btn-primary "><i
                                       class="dripicons-align-justify"></i></a>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div class="qt-header-bg" data-bgimage="images/back3.jpg">
                           <img src="images/back3.jpg" alt="Featured image" width="1170"
                              height="512">
                        </div>
                     </div>
                  </div>
                  <!-- POST HERO ITEM END ========================= -->
               </div>
               <!-- SLIDESHOW ITEM -->
               <div class="qt-slick-opacity-fx qt-item">
                  <!-- POST HERO ITEM ========================= -->
                  <div class="qt-part-archive-item qt-part-item-post-hero">
                     <div class="qt-item-header">
                        <div class="qt-header-top">
                           <div class="qt-feedback">
                              <a>17<i class="dripicons-message"></i></a><a>34<i
                                 class="dripicons-heart"></i></a>
                           </div>
                        </div>
                        <div class="qt-header-mid qt-vc">
                           <div class="qt-vi">

                              <h2 class="qt-title">
                                 <a href="#read" class="qt-text-shadow"> contacts </a>
                              </h2>
                              <div
                                 class="qt-the-content qt-spacer-s small hide-on-med-and-down ">
                                 <p class="qt-spacer-s qt-text-shadow">
                                    We are always ready to answer your questions.<br> 1.
                                    Check out the FAQ(frequently asked questions). <br>
                                    2.If you can't find a solution, please send a message from
                                    the question page.
                                 </p>
                                 <p>
                                    <a href="qna" class="qt-btn qt-btn-l qt-btn-primary "><i
                                       class="dripicons-align-justify"></i></a>
                                 </p>
                              </div>
                           </div>
                        </div>
                        <div class="qt-header-bg" data-bgimage="images/back4.jpg">
                           <img src="images/back4.jpg" alt="Featured image" width="1170"
                              height="512">
                        </div>
                     </div>
                  </div>
                  <!-- POST HERO ITEM END ========================= -->
               </div>
            </div>
         </div>
         <!-- SLIDESHOW FULLSCREEN END ================================================== -->







         <!-- ======================= HERO VIDEO POST SECTION ======================= -->
         <div class="qt-container qt-spacer-m qt-section">
            <h3 class="qt-caption-med">
               <span>Video story</span>
            </h3>
            <hr class="qt-spacer-s">
            <!-- POST VIDEO ITEM ========================= -->






            <div class="embed-responsive embed-responsive-16by9">
               <iframe width="800" height="450"
                  src="https://www.youtube.com/embed/J_eeOf-_UdA" frameborder="0"
                  allowfullscreen></iframe>
            </div>





            <!-- POST VIDEO ITEM END ========================= -->
         </div>
         <!-- ======================= VIEDO LIST SECTION ======================= -->
         <div class="qt-container qt-spacer-m qt-section">
            <div class="row">
               <div class="col s12 m6 l3"></div>
            </div>
         </div>

         <!-- ======================= UPCOMING SHOWS  SECTION ======================= -->
         <div class="qt-container qt-spacer-m">
            <h5 class="qt-caption-small">
               <span>Featured music</span>
            </h5>
            <hr class="qt-spacer-s">
            <!-- SLIDESHOW UPCOMING SHOWS ================================================== -->
            <div class="qt-slickslider-container qt-slickslider-externalarrows">
               <div class="row">

                  <!-- SLIDESHOW ITEM -->
                  <div class="qt-item">
                     <!-- SHOW UPCOMING ITEM ========================= -->
                     <!-- TAB CONTENTS ======================================== -->
                     <div id="daymonday" class="qt-show-schedule-day">
                        <!-- SCHEDULE DAY ================================================== -->
                        <div class="qt-show-schedule-day row">
                           <c:forEach var="allList" varStatus="status" items="${all}">
                              <div class="col s12 m4 l4">
                                 <!-- SCHEDULE SHOW ========================= -->
                                 <div
                                    class="qt-part-archive-item qt-part-show-schedule-day-item">
                                    <div class="qt-item-header">
                                       <div class="qt-header-mid qt-vc">
                                          <div class="qt-vi">
                                             <h4 class="qt-item-title qt-title">
                                                <a href="#read" class="qt-ellipsis  qt-t">생각해봐!</a>
                                             </h4>
                                             <p class="qt-item-det">
                                                <span class="qt-time">${allList.song_title}</span>
                                                <!-- <span class="qt-am">am</span> -->
                                                <span class="qt-day qt-capfont">${allList.song_nickname}</span>
                                             </p>
                                          </div>
                                       </div>
                                       <a href="#" class="qt-info bottom right"><i
                                          class="dripicons-information"></i></a>
                                       <div class="qt-header-bg"
                                          data-bgimage="download?type=song&data=${allList.songnum}">
                                          <img src="download?type=song&data=${allList.songnum}"
                                             alt="Featured image" width="690" height="302">
                                       </div>
                                    </div>
                                    <div class="qt-overinfo qt-paper">
                                       <p class="qt-item-det qt-accent">
                                          <span class="qt-time">${allList.song_title}</span>
                                          <!-- <span class="qt-am">am</span> -->
                                          <span class="qt-day qt-capfont">${allList.song_nickname}</span>
                                       </p>
                                       <div class="qt-more">
                                          <p class="qt-ellipsis-2">${allList.song_desc}</p>
                                          <a href="songPage?songnum=${allList.songnum}">더보기</a>
                                       </div>
                                    </div>
                                 </div>
                                 <!-- SCHEDULE SHOW END ========================= -->
                              </div>
                              <!-- SCHEDULE DAY END ================================================== -->
                           </c:forEach>

                        </div>
                     </div>
                     <!-- TAB CONTENTS end======================================== -->
                     <!-- SHOW UPCOMING ITEM END ========================= -->
                  </div>

                  <!-- 경계 -->
               </div>
            </div>
            <!-- SLIDESHOW UPCOMING SHOWS END ================================================== -->
         </div>

         <hr class="qt-spacer-m">
         <!-- ======================= CHART SECTION ======================= -->
         <div class="qt-vertical-padding-l qt-content-primary-dark qt-section">
            <div class="qt-container qt-negative">
               <h3 class="qt-caption-med">
                  <span>weekly Chart</span>
               </h3>
               <ul class="collapsible qt-chart-tracklist qt-spacer-m"
                  data-collapsible="accordion">

                  <c:forEach var="weekly" varStatus="status" items="${wc}">
                     <!-- CHART TRACK ========================= -->
                     <li class="qt-part-chart qt-chart-track qt-negative qt-card-s">
                        <div
                           class="qt-chart-table collapsible-header qt-content-primary">
                           <div class="qt-position">
                              <img src="download?type=song&data=${weekly.songnum}"
                                 class="qt-chart-cover" alt="Chart track" width="170"
                                 height="170"> <span>${status.count}</span>
                           </div>
                           <div class="qt-titles">
                              <h3 class="qt-ellipsis qt-t">${ weekly.song_title }</h3>
                              <p>${ weekly.song_nickname }</p>
                           </div>
                           <div class="qt-action">
                              <a href="#purchase-link" class="qt-btn qt-btn-ghost qt-btn-l"><i
                                 class="dripicons-cart"></i></a>
                           </div>
                        </div>
                        <div class="collapsible-body qt-paper">
                           <p>${ weekly.song_desc }</p>
                        </div>
                     </li>
                     <!-- CHART TRACK END ========================= -->
                  </c:forEach>

               </ul>
               <p class="aligncenter qt-spacer-m">
                  <a href="weeklyChart"
                     class="qt-btn qt-btn qt-btn-l qt-btn-primary">View full chart</a>
               </p>
            </div>
            <div class="qt-header-bg"
               data-bgimage="imagestemplate/full-1600-700.jpg">
               <img src="imagestemplate/full-1600-700.jpg" alt="Featured image"
                  width="690" height="302">
            </div>
         </div>
         <!-- ======================= SPONSORS ======================= -->
         <div class="qt-vertical-padding-m qt-sponsors qt-section">
            <h3 class="qt-caption-med">
               <span> Used language</span>
            </h3>
            <hr class="qt-spacer-m">
            <!-- SLIDESHOW SPONSORS ================================================== -->
            <div
               class="qt-slickslider-container qt-slickslider-externalarrows qt-slickslider-fullscreen">
               <div class="row">
                  <div
                     class="qt-slickslider qt-slickslider-multiple qt-text-shadow "
                     data-slidestoshow="6" data-slidestoshowipad="3"
                     data-variablewidth="false" data-arrows="true" data-dots="false"
                     data-infinite="true" data-centermode="false"
                     data-pauseonhover="true" data-autoplay="true"
                     data-arrowsmobile="false" data-centermodemobile="true"
                     data-dotsmobile="false" data-slidestoshowmobile="1"
                     data-variablewidthmobile="true" data-infinitemobile="false">
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/css.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/html.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/java.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/javascript.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/jquery.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/ajax.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>
                     <!-- SLIDESHOW ITEM -->
                     <div class="qt-item">
                        <a href="#" target="_blank" rel="nofollow" class="qt-sponsor">
                           <img src="resources/imagestemplate/servlets.jpg" width="235"
                           height="132" alt="sponsor" class="qt-image-responsive">
                        </a>
                     </div>

                  </div>
               </div>
            </div>
            <!-- SLIDESHOW SPONSORS END ================================================== -->
            <hr class="qt-spacer-s">
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