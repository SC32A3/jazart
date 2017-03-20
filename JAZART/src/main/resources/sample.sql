/* Drop Tables */

DROP TABLE InstEdit CASCADE CONSTRAINTS;
DROP TABLE Instrument CASCADE CONSTRAINTS;
DROP TABLE p_board CASCADE CONSTRAINTS;
DROP TABLE p_like CASCADE CONSTRAINTS;
DROP TABLE p_list CASCADE CONSTRAINTS;
DROP TABLE p_reply CASCADE CONSTRAINTS;
DROP TABLE Song_Edit CASCADE CONSTRAINTS;
DROP TABLE user_Song CASCADE CONSTRAINTS;
DROP TABLE p_songinfo CASCADE CONSTRAINTS;
DROP TABLE p_user CASCADE CONSTRAINTS;

/* Create Tables */

CREATE TABLE InstEdit
(
	Instrument varchar2(0) NOT NULL,
	Inst_Key varchar2(0) NOT NULL,
	Inst_Seq number NOT NULL,
	Inst_Bpm number NOT NULL,
	Inst_Beat varchar2(0) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL
);


CREATE TABLE Instrument
(
	Instrument varchar2(0) NOT NULL,
	Inst_Type varchar2(0) NOT NULL,
	Inst_Key varchar2(0) NOT NULL
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
	like_songnum number NOT NULL
);


CREATE TABLE p_list
(
	listnum number NOT NULL,
	-- 유저아이디
	list_user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	list_songnum number NOT NULL,
	PRIMARY KEY (listnum)
);


CREATE TABLE p_reply
(
	replynum number NOT NULL,
	reply_nickname varchar2(30),
	-- 댓글내용
	reply_text varchar2(300) NOT NULL,
	-- 댓글작성일
	reply_inputdate date DEFAULT sysdate,
	reply_like number DEFAULT 0,
	-- 곡일련번호
	reply_songnum number NOT NULL,
	PRIMARY KEY (replynum)
);


CREATE TABLE p_songinfo
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
	PRIMARY KEY (songnum)
);


CREATE TABLE p_user
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 비밀번호
	user_pw number NOT NULL,
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


CREATE TABLE Song_Edit
(
	Melody_Key varchar2(0) NOT NULL,
	Song_Seq number NOT NULL,
	Song_Bpm number NOT NULL,
	Song_Beat number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL
);


CREATE TABLE user_Song
(
	Inst_ID varchar2(0) NOT NULL,
	Inst_File varchar2(0) NOT NULL,
	Melody_ID varchar2(0) NOT NULL,
	Melody_File varchar2(0) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL
);



/* Create Foreign Keys */

ALTER TABLE InstEdit
	ADD FOREIGN KEY (songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE p_like
	ADD FOREIGN KEY (like_songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE p_list
	ADD FOREIGN KEY (list_songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE p_reply
	ADD FOREIGN KEY (reply_songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE Song_Edit
	ADD FOREIGN KEY (songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE user_Song
	ADD FOREIGN KEY (songnum)
	REFERENCES p_songinfo (songnum)
;


ALTER TABLE p_list
	ADD FOREIGN KEY (list_user_id)
	REFERENCES p_user (user_id)
;


create sequence songinfo_seq;
create sequence reply_seq;
create sequence board_seq;
create sequence list_seq;

----------------------------------------------------------------------------------------------------------------------

insert into p_user values('daehan','1111', 'x', '최대한', 'banzzogari', '010-3637', 'daehan@naver.com', '안녕하세요','발라드');

insert into p_songinfo values(songinfo_seq.nextval, 'banzzogari', 'x', '우리조의로고송', '설명입니다1', 'x', sysdate, 0);

insert into p_reply values(reply_seq.nextval, 'banzzogari', '와우', sysdate, 1, 22);

insert into p_board values(board_seq.nextval, '발라드', 'x', 'banzzogari', '피처링 구해요', '피쳐링해주실분을 찾고 있습니다', sysdate, 1);

insert into p_like values('banzzogari', sysdate, 22);

-------------------------------------------------------------------------------------------------------------------------------

insert into p_user values('sunghan','1111', 'x', '홍성한', 'sunghan', '010-3217', 'sunghan@naver.com', '안녕','힙합');

insert into p_songinfo values(songinfo_seq.nextval, 'sunghan', 'x', '캡송', '아캡아캡아캡송시작', 'x', sysdate, 0);

insert into p_reply values(reply_seq.nextval, 'banzzogari', '개굿', sysdate, 1, 23);

insert into p_board values(board_seq.nextval, '힙합', 'x', 'banzzogari', '피처링 구했습니다', '냉무', sysdate, 1);

insert into p_like values('banzzogari', sysdate, 22);

-------------------------------------------------------------------------------------------------------------------------------

insert into p_user values('hyunwoo','1111', 'x', '정현우', '다람쥐장군', '010-9870', 'hyunwoo@naver.com', '안니용', '알앤비');

insert into p_songinfo values(songinfo_seq.nextval, 'hyunwoo', 'x', '프로젝트테마곡', '자차르트교향곡', 'x', sysdate, 0);

insert into p_reply values(reply_seq.nextval, 'hyunwoo', '와우', sysdate, 1, 24);

insert into p_board values(board_seq.nextval, '알앤비', 'x', 'sunghan', '손가락은5개인데', '왜 유비는 넷?!', sysdate, 1);

insert into p_like values('sunghan', sysdate, 24);

-------------------------------------------------------------------------------------------------------------------------------
commit;
select * from p_user;
select * from p_songinfo;
select * from p_reply;
select * from p_board;
select * from p_like;
