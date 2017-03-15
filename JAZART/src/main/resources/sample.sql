
/* Drop Tables */

DROP TABLE reply CASCADE CONSTRAINTS;
DROP TABLE songinfo CASCADE CONSTRAINTS;
DROP TABLE user CASCADE CONSTRAINTS;


/* Create Tables */

CREATE TABLE reply
(
	replynum number NOT NULL,
	nickname varchar2(30) NOT NULL,
	-- 댓글내용
	text  NOT NULL,
	-- 댓글작성일
	regdate date DEFAULT sysdate,
	replylike number DEFAULT 0,
	-- 곡일련번호
	songnum number NOT NULL,
	PRIMARY KEY (replynum)
);


CREATE TABLE songinfo
(
	-- 곡일련번호
	songnum number NOT NULL,
	-- 곡제목
	title varchar2(100) NOT NULL,
	-- 곡설명
	content varchar2(2000),
	-- 곡프로필사진
	picture varchar2(30) DEFAULT 'u_profile',
	-- 수록MP3파일
	song varchar2(20) NOT NULL,
	-- 곡추천수
	like number DEFAULT 0,
	-- 아티스트명
	artist varchar2(30),
	-- 곡등록날짜
	regdate date DEFAULT SYSDATE,
	PRIMARY KEY (songnum)
);


CREATE TABLE user
(
	-- 유저아이디
	ID number NOT NULL,
	-- 비밀번호
	password number NOT NULL,
	-- 실제이름
	name varchar2(20) NOT NULL,
	-- 아티스트명
	nickname varchar2(30) NOT NULL UNIQUE,
	-- 전화번호
	phone varchar2(30),
	-- 이메일주소
	email varchar2(100) NOT NULL UNIQUE,
	-- 프로필사진
	profile varchar2(30) NOT NULL,
	-- 자기소개
	introd varchar2(2000),
	-- 선호장르
	favorite varchar2(30),
	PRIMARY KEY (ID)
);



/* Create Foreign Keys */

ALTER TABLE reply
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;



/* Comments */

COMMENT ON COLUMN reply.text IS '댓글내용';
COMMENT ON COLUMN reply.regdate IS '댓글작성일';
COMMENT ON COLUMN reply.songnum IS '곡일련번호';
COMMENT ON COLUMN songinfo.songnum IS '곡일련번호';
COMMENT ON COLUMN songinfo.title IS '곡제목';
COMMENT ON COLUMN songinfo.content IS '곡설명';
COMMENT ON COLUMN songinfo.picture IS '곡프로필사진';
COMMENT ON COLUMN songinfo.song IS '수록MP3파일';
COMMENT ON COLUMN songinfo.like IS '곡추천수';
COMMENT ON COLUMN songinfo.artist IS '아티스트명';
COMMENT ON COLUMN songinfo.regdate IS '곡등록날짜';
COMMENT ON COLUMN user.ID IS '유저아이디';
COMMENT ON COLUMN user.password IS '비밀번호';
COMMENT ON COLUMN user.name IS '실제이름';
COMMENT ON COLUMN user.nickname IS '아티스트명';
COMMENT ON COLUMN user.phone IS '전화번호';
COMMENT ON COLUMN user.email IS '이메일주소';
COMMENT ON COLUMN user.profile IS '프로필사진';
COMMENT ON COLUMN user.introd IS '자기소개';
COMMENT ON COLUMN user.favorite IS '선호장르';



