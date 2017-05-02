--먼저 system/1234로 접속해서 해야할 일 
create tablespace jazart datafile 'c:\jazart.dbf' size 100m;
create user jazart identified by jazart32 default tablespace jazart;
grant create session, create table, create sequence, resource to jazart;
commit;

/* Drop Tables */

DROP TABLE boardreply_like CASCADE CONSTRAINTS;
DROP TABLE boardreply CASCADE CONSTRAINTS;
DROP TABLE board CASCADE CONSTRAINTS;
DROP TABLE InstEdit CASCADE CONSTRAINTS;
DROP TABLE playlist CASCADE CONSTRAINTS;
DROP TABLE songlike CASCADE CONSTRAINTS;
DROP TABLE songreply_like CASCADE CONSTRAINTS;
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


CREATE TABLE boardreply_like
(
	blike_seq number NOT NULL,
	replynum number NOT NULL,
	blike_nickname varchar2(30),
	PRIMARY KEY (blike_seq)
);


CREATE TABLE InstEdit
(
	instedit_seq number NOT NULL,
	-- 길이수정예정
	file_name varchar2(30) NOT NULL,
	-- 길이수정예정
	track varchar2(30) NOT NULL,
	note_seq number NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	listnum number NOT NULL,
	PRIMARY KEY (instedit_seq)
);


CREATE TABLE playlist
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	play_inputdate date DEFAULT SYSDATE
);


CREATE TABLE songinfo
(
	-- 곡일련번호
	songnum number NOT NULL,
	song_nickname varchar2(30),
	-- 곡프로필사진
	song_picture varchar2(30) DEFAULT 'default.png',
	song_savedpic varchar2(60) DEFAULT 'default.png',
	-- 곡제목
	song_title varchar2(100) NOT NULL,
	-- 곡설명
	song_desc varchar2(2000),
	-- 수록MP3파일
	song_file varchar2(20) NOT NULL,
	song_savedfile varchar2(60),
	-- 곡등록날짜
	song_inputdate date DEFAULT SYSDATE,
	-- 곡추천수
	song_like number DEFAULT 0,
	-- 곡의 장르
	song_genre varchar2(20),
	song_complete varchar2(6) CHECK (song_complete='y' or song_complete='n'),
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


CREATE TABLE songreply_like
(
	slike_seq number NOT NULL,
	replynum number NOT NULL,
	slike_nickname varchar2(30),
	PRIMARY KEY (slike_seq)
);


CREATE TABLE userinfo
(
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 비밀번호
	user_pw varchar2(30) NOT NULL,
	-- 프로필사진
	user_picture varchar2(30) NOT NULL,
	user_savedpic varchar2(60),
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


CREATE TABLE userlist
(
	listnum number NOT NULL,
	-- 유저아이디
	user_id varchar2(30) NOT NULL,
	-- 곡일련번호
	songnum number NOT NULL,
	-- 길이수정예정
	file_type varchar2(30),
	-- 길이수정예정
	file_original varchar2(30),
	file_saved varchar2(60),
	PRIMARY KEY (listnum),
	UNIQUE (user_id, songnum)
);



/* Create Foreign Keys */

ALTER TABLE boardreply
	ADD FOREIGN KEY (boardnum)
	REFERENCES board (boardnum)
;


ALTER TABLE boardreply_like
	ADD FOREIGN KEY (replynum)
	REFERENCES boardreply (replynum)
;


ALTER TABLE InstEdit
	ADD FOREIGN KEY (songnum)
	REFERENCES songinfo (songnum)
;


ALTER TABLE playlist
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


ALTER TABLE songreply_like
	ADD FOREIGN KEY (replynum)
	REFERENCES songreply (replynum)
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

update songinfo set song_like = song_like+1 where songnum = #{songnum}

-------------------------------------------------------------------------------------------------------------------------------
--일간차트카운트
select count(slike.like_time) cnt
		from songinfo info, songlike slike
		where info.songnum = slike.songnum and slike.like_time between
		to_date(sysdate-1, 'yy/mm/dd') and to_date(sysdate, 'yy/mm/dd')

--일간차트
	select * from (select rownum rnum, b.* from (select info.songnum, info.song_nickname, info.song_picture, info.song_title,
		info.song_desc, count(slike.like_time) cnt
		from songinfo info, songlike slike
		where info.songnum = slike.songnum and slike.like_time
		  between to_date(sysdate-1, 'yy/mm/dd') and to_date(sysdate, 'yy/mm/dd')
		  group by info.songnum, info.song_nickname, info.song_picture, info.song_title, info.song_desc
		  order by cnt desc)b)c where rnum between #{start} and #{end}

--주간차트카운트
select count(slike.like_time) cnt
	from songinfo info, songlike slike
	where info.songnum = slike.songnum and
	slike.like_time between
	
--주간차트
select * from (select rownum rnum, b.* from(
	select info.songnum, info.song_nickname, info.song_picture,
	info.song_title, info.song_desc, count(slike.like_time) cnt
	from songinfo info, songlike slike
	where info.songnum = slike.songnum and
	slike.like_time between
	<choose>
		<when test="day == '일요일'"> next_day(sysdate-14, '월요일') and next_day(sysdate-14, '일요일') </when>
		<otherwise> next_day(sysdate-14, '월요일') and next_day(sysdate-7, '일요일') </otherwise>
	</choose>
	group by info.songnum, info.song_nickname, info.song_picture,
	info.song_title, info.song_desc
	order by cnt desc) b) c where rnum between #{start} and #{end}

--실시간차트카운트
select count(*) cnt
		from songinfo info, songlike slike    
		where info.songnum = slike.songnum and
		slike.like_time between sysdate-5/24 and sysdate;
		
--실시간차트
select * from
(select rownum rnum, b.* from
	(select info.songnum, info.song_title, info.song_genre, info.song_nickname, info.song_desc, count(slike.songnum) count
	from songinfo info, songlike slike
	where info.songnum = slike.songnum and slike.like_time between sysdate-5/24 and sysdate
	group by info.songnum, info.song_title, info.song_genre, info.song_nickname, info.song_desc
	order by count desc)
b) where rnum between #{start} and #{end}

--플레이리스트
 insert into playlist values('apple2', '2', to_date('2017/04/04 09:25', 'yyyy/mm/dd HH24:MI'));
  insert into playlist values('apple2', '1', to_date('2017/04/04 11:25', 'yyyy/mm/dd HH24:MI'));
  insert into playlist values('apple2', '21', to_date('2017/04/03 21:25', 'yyyy/mm/dd HH24:MI'));
  
  select info.songnum, info.song_title, info.song_picture, info.song_nickname, info.song_file from playlist list, songinfo info
  		where list.songnum = info.songnum and list.user_id = #{userId}
  		
 alter table songinfo add (complete varchar(3) constraint songinfo_complete_ck check(complete='Y' or complete='N')) 	

