<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html class="no-js" lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
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

<script src="resources/jquery-3.1.1.min.js"></script>
<script type="text/javascript">
	var songnum = '';
	var loginNickname = '${loginNickname}';

	$(function() {
		$("#leaveReply").on("click", leaveReply);
		init();
	})

	function init() {
		songnum = $("#songnum").val();
		$.ajax({
			method : "get",
			url : "songReplyList",
			data : {
				songnum : songnum
			},
			dataType : "json",
			success : output
		})
	};

	function leaveReply() {
		songnum = $("#songnum").val();
		var comment = $("#comment").val();

		if (comment.length > 300) {
			alert("댓글은 300자 미만으로 작성해주세요");
			return;
		}

		$.ajax({
			method : "get",
			url : "songLeaveReply",
			data : {
				reply_text : comment,
				songnum : songnum
			},
			success : function(resp) {
				if (resp == 1) {
					init();
					$("#comment").val('');
				}
			}
		});
	}

	function output(resp) {
		var replyArea = $("#replyArea").val();
		$('#replyArea').empty(); //기존 화면상 데이터 삭제

		var msg = '<table>';
		msg = '<tr><th>ID</th><th>Text</th><th>Date</th><th>Like</th><th></th></tr>';
		$
				.each(
						resp,
						function(index, item) {
							msg += "<tr>";
							msg += "<td class='tdNum'>" + item.reply_nickname
									+ "</td>";
							msg += "<td class='tdName' id='"+item.replynum+"_name'><span id='"+item.replynum+"_span1'>"
									+ item.reply_text + "</span></td>";
							msg += "<td class='tdText' id='"+item.replynum+"_text'>"
									+ item.reply_inputdate + "</td>";
							msg += "<td>" + item.reply_like + "</td>";
							if (item.reply_nickname == loginNickname) {
								msg += "<td class='tdBtn'><span id='"+item.replynum+"_span2'><input type='button' value='삭제' class='del' data-num='"+item.replynum+"'>";
								msg += "<input type='button' value='수정' class='upd' data-num='"+item.replynum+"'>";
								msg += "<input type='button' value='추천' class='rec' data-num='"+item.replynum+"'></span></td>";
							} else {
								msg += "<td><input type='button' value='추천' class='rec' data-num='"+item.replynum+"'></td>";
							}
							msg += "</tr>";
							//data-num : js, jquery에서 쓰는 사용자 정의 속성, 고유의 번호를 갖기 위해 존재
							//class : 등록버튼과 다르게 공통된 삭제버튼들에게 이벤트를 부여하기 위해 존재, css 입힐 때도 사용
						})
		msg += '</table>'
		$('#replyArea').html(msg);

		$("input:button.del").on("click", replyDel);
		$("input:button.rec").on("click", replyRec);
		$("input:button.upd").on("click", replyUpd);
	}

	function replyUpd() {
		var num = $(this).attr("data-num"); //this : 호출한 버튼 'input'객체
		$("#" + num + "_span1")
				.html("<input type='text' id='"+num+"_Newtext'>");
		$("#" + num + "_span2")
				.html(
						"<input type='button' id='"+num+"_ok' value='확인'><input type='button' id='"+num+"_cancel' value='취소'>");

		$("#" + num + "_ok").on("click", function() {
			$.ajax({
				method : "get",
				url : "songUpdateReply",
				data : {
					"replynum" : num,
					"reply_text" : $("#" + num + "_Newtext").val()
				},
				success : function(resp) {
					if (resp == 1) {
						init();
					}
				}
			});
		})

		$("#" + num + "_cancel").on("click", function() {
			init();
		})
	};

	function replyDel() {
		var num = $(this).attr("data-num"); //this : 호출한 버튼 'input'객체
		$.ajax({
			method : "get",
			url : "songDeleteReply",
			data : {
				"replynum" : num
			},
			success : function() {
				init();
			}
		});
	};

	function replyRec() {
		var num = $(this).attr("data-num"); //this : 호출한 버튼 'input'객체
		//var num = $(this).parent().parent().attr("data-num"); //tr에 data-num을 붙였을 시

		$.ajax({
			method : "get",
			url : "songRecommendReply",
			data : {
				"replynum" : num
			},
			success : function(resp) {
				if (resp == 1) {
					init();
				} else {
					alert('추천은 한번만 가능합니다');
				}
			}
		});
	};
</script>
</head>
<body>
	<!-- QT HEADER END ================================ -->
	<div class="qt-parentcontainer">
		<!-- QT MENUBAR TOP ================================ -->
		<div class="qt-menubar-top  qt-content-primary hide-on-large-and-down">
			<ul>
				<li><a href="#"><i class="dripicons-chevron-right"></i>About
						US</a></li>
				<li><a href="#"><i class="dripicons-chevron-right"></i>Advertisement</a></li>
				<li><a href="page-contacts.html"><i
						class="dripicons-chevron-right"></i>Contacts</a></li>
				<li><a href="#"><i class="dripicons-chevron-right"></i>Privacy</a></li>
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
				<li><a href="page-contacts.html">Contacts</a></li>
				<li class="right"><a href="#!" data-expandable="#qtsearchbar"
					class="qt-btn qt-btn-l qt-scrolltop"><i
						class="icon dripicons-search"></i></a></li>
				
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
				<li class="menu-item-has-children"><a href="musicBoard">Board</a>
					<ul>
						<li><a href="musicBoard">Music Community</a></li>
						<li><a href="commBoard">Free Community</a></li>
					</ul></li>
				<li class="menu-item-has-children"><a href="realtimeChart">Charts</a>
					<ul>
						<li><a href="realtimeChart">Realtime Chart</a></li>
						<li><a href="dailyChart">Daily Chart</a></li>
						<li><a href="weeklyChart">Weekly Chart</a></li>
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

					<h1 class="qt-caption qt-spacer-s">Song Page</h1>
					<ul class="qt-menu-social qt-spacer-s">
						<li><a href="#" target="_blank"><i
								class="qticon-beatport"></i></a></li>
						<li><a href="#" target="_blank"><i
								class="qticon-facebook"></i></a></li>
						<li><a href="#" target="_blank"><i class="qticon-twitter"></i></a></li>
						<li><a href="#" target="_blank"><i class="qticon-youtube"></i></a></li>
						<li><a href="#" target="_blank"><i
								class="qticon-soundcloud"></i></a></li>
					</ul>
				</div>
				<div class="qt-header-bg"
					data-bgimage="resources/imagestemplate/full-1600-700.jpg">
					<img src="images/back1.jpg" alt="Featured image" width="690"
						height="302">
				</div>
			</div>
			<!-- HEADER MEMBERS END ========================= -->
			<!-- ======================= CONTENT SECTION ======================= -->
			<div class="qt-container">
				<div class="row qt-spacer-l">
					<div class="col s12 m12 l1 qt-pushpin-container">
						<div class="qt-pushpin">
							<!-- SHARE FUNCTIONS ================================================== -->
							<ul class="qt-sharepage qt-content-primary">
								<li class="hide-on-med-and-down"><i
									class="qticon-share qt-shareicon qt-content-primary-dark"></i>
								</li>
								<li><a class="qt-popupwindow qt-sharelink"
									data-sharetype="facebook" data-name="Share" data-width="600"
									data-height="500" target="_blank" href="#"> <i
										class="qticon-facebook"></i>
								</a></li>
								<li><a class="qt-popupwindow qt-sharelink"
									data-sharetype="twitter" data-name="Share" data-width="600"
									data-height="500" target="_blank" href="#"> <i
										class="qticon-twitter"></i>
								</a></li>
								<li><a class="qt-popupwindow qt-sharelink"
									data-sharetype="google" data-name="Share" data-width="600"
									data-height="500" target="_blank" href="#"> <i
										class="qticon-googleplus"></i>
								</a></li>
								<li><a class="qt-popupwindow qt-sharelink"
									data-sharetype="pinterest" data-name="Share" data-width="600"
									data-height="500" target="_blank" href="#"> <i
										class="qticon-pinterest"></i>
								</a></li>
								<li><a href="#" class="qt-btn-primary qt-sharelink"><i
										class="dripicons-heart"></i> </a></li>
							</ul>
							<!-- SHARE FUNCTIONS ================================================== -->
						</div>
						<hr class="qt-spacer-m">
					</div>
					<div class="col s12 m12 l8">
						<div class="qt-the-content">
							<input type="hidden" id="songnum" name="songnum"
								value="${song.songnum}"> <img
								src="download?type=song&data=${song.songnum}" alt="Header image"
								width="500" height="525" class="qt-img-responsive">
							<!-- POST CONTENT ========================= -->
							<p></p>
							<table>
								<tr>
									<td>곡명</td>
									<td>${song.song_title}</td>
								</tr>
								<tr>
									<td>아티스트명</td>
									<td>${song.song_nickname}</td>
								</tr>
								<tr>
									<td>제작날짜</td>
									<td>${song.song_inputdate}</td>
								</tr>
								<tr>
									<td>추천수</td>
									<td>${song.song_like}</td>
								</tr>
								<tr>
									<td>곡소개</td>
									<td>${song.song_desc}</td>
								</tr>
							</table>

							<blockquote>
								<div id="replyArea"></div>
							</blockquote>

							<div id="respond" class="qt-comment-respond qt-card">
								<h4 id="reply-title" class="comment-reply-title">Leave a
									Reply</h4>

								<p class="comment-form-comment">
									<textarea id="comment" placeholder="Comment *" name="comment"
										cols="45" aria-required="true" required="required"></textarea>
								</p>

								<p class="form-submit">
									<input name="leaveReply" type="button" id="leaveReply"
										class="qt-btn qt-btn-primary" value="Post Comment">
									<!-- <input type="hidden" name="comment_post_ID" value="" id="comment_post_ID">
									<input type="hidden" name="comment_parent" id="comment_parent" value="0"> -->
								</p>
							</div>
							<!-- MEMBER END ========================= -->
						</div>
					</div>
				</div>


			</div>
			<hr class="qt-spacer-l">
		</div>
		<div class="qt-sidebar col s12 m12 l3">



			<!-- SIDEBAR END ================================================== -->
			<hr class="qt-spacer-l">
		</div>
	</div>
	</div>

	<!-- .qt-main end -->
	<div class="qt-footer qt-footerwidgets">
		<div class="qt-section qt-footer-widgets qt-content-primary-light">
			<div class="qt-container">
				<h2 class="qt-footer-logo">
					<a href="./" class="brand-logo qt-logo-text">Jazar<span>t</span></a>
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
										class="dripicons-arrow-thin-right"></i></a>
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
			data-activates="channelslist"><i class="icon dripicons-cross"></i></a>
		<!-- PLAYER ========================= -->
		<div id="qtplayercontainer" data-playervolume="true"
			data-accentcolor="#dd0e34" data-accentcolordark="#ff0442"
			data-textcolor="#ffffff"
			data-soundmanagerurl="./resources/components/soundmanager/swf/"
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
