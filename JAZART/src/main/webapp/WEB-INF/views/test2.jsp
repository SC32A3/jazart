<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style type="text/css">
* {
	margin : 0 auto;
	text-align: center;
}

.wrapper {
	height: auto;
	width: 580px;
}

h2 {
	margin: 20px auto;
}

table {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>
<title>Board Read</title>
</head>
<body>
<div class="wrapper">
<header><h2>[ 글 읽 기 ]</h2></header>
<table border="1">
<tr><td>아이디</td><td>${user.user_id}</td></tr>
<tr><td>패스워드</td><td>${user.user_pw}</td></tr>
<tr><td>닉네임</td><td>${user.user_nickname}</td></tr>
<tr><td>첨부파일</td>
	<td><c:if test="${user.user_picture != 'x'}"><img src="download"></c:if></td></tr>
	<!-- 그림 바로 보이는 방법 -->
	<!-- BUT, 그림인지 확인해주는 분기처리가 필요함. 아닐 시 X로 표시됨-->
	<!-- <img src="download?boardnum=${board.boardnum}"> -->
</table>
</div>
</body>
</html>
<!-- <read.jsp>
[글보기]
글제목
작성자
작성일
첨부파일
글내용

[목록] [수정] [삭제] -->