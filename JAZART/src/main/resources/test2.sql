
/* Drop Tables */

DROP TABLE InstEdit CASCADE CONSTRAINTS;
DROP TABLE Instrument_detail CASCADE CONSTRAINTS;
DROP TABLE Instrument CASCADE CONSTRAINTS;
DROP TABLE play_inputdate CASCADE CONSTRAINTS;
DROP TABLE p_reply CASCADE CONSTRAINTS;
DROP TABLE p_board CASCADE CONSTRAINTS;
DROP TABLE p_like CASCADE CONSTRAINTS;
DROP TABLE Song_Edit CASCADE CONSTRAINTS;
DROP TABLE user_Song CASCADE CONSTRAINTS;
DROP TABLE p_list CASCADE CONSTRAINTS;
DROP TABLE p_user CASCADE CONSTRAINTS;
DROP TABLE songinfo CASCADE CONSTRAINTS;




/* Create Tables */

CREATE TABLE InstEdit
(
	Instrument varchar2(0) NOT NULL,
	Inst_Key varchar2(0) NOT NULL,
	Inst_Seq number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL
);


CREATE TABLE Instrument
(
	Instrument varchar2(0) NOT NULL,
	Inst_Type varchar2(0) NOT NULL,
	PRIMARY KEY (Instrument)
);


CREATE TABLE Instrument_detail
(
	Instrument varchar2(0) NOT NULL,
	Inst_Key varchar2(20)
);


CREATE TABLE play_inputdate
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	play_inputdate date DEFAULT SYSDATE
);


CREATE TABLE p_board
(
	-- 글번호
	boardnum number NOT NULL,
	board_tag varchar2(30) NOT NULL,
	board_picture varchar2(30),
	board_nickname varchar2(30) NOT NULL,
	-- 제목
	board_title varchar2(100) NOT NULL,
	board_content nvarchar2(2000) NOT NULL,
	board_inputdate date DEFAULT SYSDATE,
	-- 조회수
	board_hits number DEFAULT 0,
	PRIMARY KEY (boardnum)
);


CREATE TABLE p_like
(
	-- 아이디
	like_nickname varchar2(30),
	-- 좋아요시간
	like_time date,
	-- 곡일련번호
	songnum number NOT NULL
);


CREATE TABLE p_list
(
	listnum number NOT NULL,
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	PRIMARY KEY (listnum)
);


CREATE TABLE p_reply
(
	replynum number NOT NULL,
	reply_type varchar2(3) NOT NULL,
	reply_nickname varchar2(30),
	-- 댓글내용
	reply_text varchar2(300) NOT NULL,
	-- 댓글작성일
	reply_inputdate date DEFAULT sysdate,
	reply_like number DEFAULT 0,
	-- 곡일련번호
	text_num number NOT NULL,
	-- 글번호
	PRIMARY KEY (replynum)
);


CREATE TABLE p_user
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 비밀번호
	user_pw varchar2(30) NOT NULL,
	-- 프로필사진
	user_picture varchar2(30) NOT NULL,
	-- 실제이름
	user_name varchar2(20) NOT NULL,
	-- 아티스트명
	user_nickname varchar2(30) NOT NULL UNIQUE,
	-- 전화번호
	user_phone varchar2(30),
	-- 이메일주소
	user_email varchar2(100) NOT NULL UNIQUE,
	-- 자기소개
	user_desc varchar2(2000),
	-- 선호장르
	user_genre varchar2(30),
	PRIMARY KEY (user_id)
);


CREATE TABLE songinfo
(
	-- 곡일련번호
	songnum number NOT NULL,
	song_nickname varchar2(30),
	-- 곡프로필사진
	song_picture varchar2(30) DEFAULT 'u_profile',
	-- 곡제목
	song_title varchar2(100) NOT NULL,
	-- 곡설명
	song_desc varchar2(2000),
	-- 수록MP3파일
	song_file varchar2(20) NOT NULL,
	-- 곡등록날짜
	song_inputdate date DEFAULT SYSDATE,
	-- 곡추천수
	song_like number DEFAULT 0,
	-- 음악의 빠르기
	-- 
	bpm number(3),
	-- 음악의 박자  ex) 3/4 , 6/8
	Beat varchar2(10),
	PRIMARY KEY (songnum)
);


CREATE TABLE Song_Edit
(
	Melody_Key varchar2(0) NOT NULL,
	Song_Seq number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL
);


CREATE TABLE user_Song
(
	Inst_ID varchar2(0) NOT NULL,
	Inst_File varchar2(0) NOT NULL,
	Melody_ID varchar2(0) NOT NULL,
	Melody_File varchar2(0) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL
);



/* Create Foreign Keys */

ALTER TABLE Instrument_detail
	ADD FOREIGN KEY (Instrument)
	REFERENCES Instrument (Instrument)
;


ALTER TABLE p_reply
	ADD FOREIGN KEY (text_num)
	REFERENCES p_board (boardnum)
;


ALTER TABLE InstEdit
	ADD FOREIGN KEY (listnum)
	REFERENCES p_list (listnum)
;


ALTER TABLE Song_Edit
	ADD FOREIGN KEY (listnum)
	REFERENCES p_list (listnum)
;


ALTER TABLE user_Song
	ADD FOREIGN KEY (listnum)
	REFERENCES p_list (listnum)
;


ALTER TABLE play_inputdate
	ADD FOREIGN KEY (user_id)
	REFERENCES p_user (user_id)
;


ALTER TABLE p_list
	ADD FOREIGN KEY (user_id)
	REFERENCES p_user (user_id)
;


ALTER TABLE InstEdit
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE play_inputdate
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE p_like
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE p_list
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE p_reply
	ADD FOREIGN KEY (text_num)
	REFERENCES songinfo (songnum)
;


ALTER TABLE Song_Edit
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE user_Song
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;



