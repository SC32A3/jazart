
/* Drop Tables */

DROP TABLE boardreply CASCADE CONSTRAINTS;
DROP TABLE board CASCADE CONSTRAINTS;
DROP TABLE InstEdit CASCADE CONSTRAINTS;
DROP TABLE Instrument_detail CASCADE CONSTRAINTS;
DROP TABLE Instrument CASCADE CONSTRAINTS;
DROP TABLE playlist CASCADE CONSTRAINTS;
DROP TABLE SongEdit CASCADE CONSTRAINTS;
DROP TABLE songlike CASCADE CONSTRAINTS;
DROP TABLE songreply CASCADE CONSTRAINTS;
DROP TABLE userlist CASCADE CONSTRAINTS;
DROP TABLE songinfo CASCADE CONSTRAINTS;
DROP TABLE userinfo CASCADE CONSTRAINTS;




/* Create Tables */

CREATE TABLE board
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


CREATE TABLE boardreply
(
	replynum number NOT NULL,
	reply_nickname varchar2(30),
	-- 댓글내용
	reply_text varchar2(300) NOT NULL,
	-- 댓글작성일
	reply_inputdate date DEFAULT sysdate,
	reply_like number DEFAULT 0,
	-- 글번호
	boardnum number NOT NULL,
	PRIMARY KEY (replynum)
);


CREATE TABLE InstEdit
(
	inst_seq number NOT NULL,
	-- 길이수정예정
	Instrument varchar2(30) NOT NULL,
	-- 길이수정예정
	Inst_Key varchar2(30) NOT NULL,
	Inst_Seq number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL,
	PRIMARY KEY (inst_seq)
);


CREATE TABLE Instrument
(
	-- 길이수정예정
	Instrument varchar2(30) NOT NULL,
	-- 길이수정예정
	Inst_Type varchar2(30) NOT NULL,
	Inst_Genre varchar2(20) NOT NULL,
	PRIMARY KEY (Instrument)
);


CREATE TABLE Instrument_detail
(
	-- 길이수정예정
	Instrument varchar2(30) NOT NULL,
	Inst_Key varchar2(20)
);


CREATE TABLE playlist
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	play_inputdate date DEFAULT SYSDATE
);


CREATE TABLE SongEdit
(
	mel_seq number NOT NULL,
	-- 길이수정예정
	Melody_Key varchar2(30) NOT NULL,
	Song_Seq number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL,
	PRIMARY KEY (mel_seq)
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
	bpm number(4),
	-- 음악의 박자  ex) 3/4 , 6/8
	Beat varchar2(10),
	-- 곡의 장르
	song_genre varchar2(10),
	PRIMARY KEY (songnum)
);


CREATE TABLE songlike
(
	like_seq number NOT NULL,
	-- 아이디
	like_nickname varchar2(30),
	-- 좋아요시간
	like_time date,
	-- 곡일련번호
	songnum number NOT NULL,
	PRIMARY KEY (like_seq)
);


CREATE TABLE songreply
(
	replynum number NOT NULL,
	reply_nickname varchar2(30),
	-- 댓글내용
	reply_text varchar2(300) NOT NULL,
	-- 댓글작성일
	reply_inputdate date DEFAULT sysdate,
	reply_like number DEFAULT 0,
	-- 곡일련번호
	songnum number NOT NULL,
	PRIMARY KEY (replynum)
);


CREATE TABLE userinfo
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 비밀번호
	user_pw varchar2(30) NOT NULL,
	-- 프로필사진
	user_picture varchar2(30) NOT NULL,
	-- 아티스트명
	user_nickname varchar2(30) NOT NULL UNIQUE,
	-- 전화번호
	user_phone varchar2(30),
	-- 이메일주소
	user_email varchar2(100) NOT NULL UNIQUE,
	-- 자기소개
	user_desc varchar2(2000),
	PRIMARY KEY (user_id)
);
CREATE TABLE Loop
(
	--루프장르
	Loop_Genre varchar2(20) NOT NULL,
	--루프의넘버 
	Loop_num number(3) NOT NULL,
	--루프의 종류(Beat,Bass,Pad)
	Loop_Type varchar2(20) NOT NULL
);


CREATE TABLE userlist
(
	listnum number NOT NULL,
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	-- 길이수정예정
	Inst_file varchar2(30),
	-- 길이수정예정
	Melody_file varchar2(30),
	PRIMARY KEY (listnum),
	UNIQUE (user_id, songnum)
);



/* Create Foreign Keys */

ALTER TABLE boardreply
	ADD FOREIGN KEY (boardnum)
	REFERENCES board (boardnum)
;


ALTER TABLE Instrument_detail
	ADD FOREIGN KEY (Instrument)
	REFERENCES Instrument (Instrument)
;


ALTER TABLE InstEdit
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE playlist
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE SongEdit
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE songlike
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE songreply
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE userlist
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE playlist
	ADD FOREIGN KEY (user_id)
	REFERENCES userinfo (user_id)
;


ALTER TABLE userlist
	ADD FOREIGN KEY (user_id)
	REFERENCES userinfo (user_id)
;


ALTER TABLE InstEdit
	ADD FOREIGN KEY (listnum)
	REFERENCES userlist (listnum)
;


ALTER TABLE SongEdit
	ADD FOREIGN KEY (listnum)
	REFERENCES userlist (listnum)
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


