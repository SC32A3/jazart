--먼저 system/1234로 접속해서 해야할 일 
create tablespace temp2 datafile 'c:\temp2.dbf' size 100m;
create user temp2 identified by temp2 default tablespace temp2;
grant create session, create table, create sequence, resource to temp2;
commit;



/* Drop Tables */

DROP TABLE boardreply CASCADE CONSTRAINTS;
DROP TABLE boardreply_like CASCADE CONSTRAINTS;
DROP TABLE board CASCADE CONSTRAINTS;
DROP TABLE InstEdit CASCADE CONSTRAINTS;
DROP TABLE Instrument_detail CASCADE CONSTRAINTS;
DROP TABLE Instrument CASCADE CONSTRAINTS;
DROP TABLE playlist CASCADE CONSTRAINTS;
DROP TABLE SongEdit CASCADE CONSTRAINTS;
DROP TABLE songlike CASCADE CONSTRAINTS;
DROP TABLE songreply CASCADE CONSTRAINTS;
DROP TABLE songreply_like CASCADE CONSTRAINTS;
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
	songedit_seq number NOT NULL,
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
	song_genre varchar2(20),
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

ALTER TABLE boardreply_like
	ADD FOREIGN KEY (replynum)
	REFERENCES boardreply (replynum)
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

ALTER TABLE songreply_like
	ADD FOREIGN KEY (replynum)
	REFERENCES songreply (replynum)
;

create sequence songinfo_seq;
create sequence songreply_seq;
create sequence boardreply_seq;
create sequence board_seq;
create sequence list_seq;
create sequence instedit_seq;
create sequence songedit_seq;
create sequence slike_seq;
create sequence blike_seq;
create sequence like_seq;


----------------------------------------------------------------------------------------------------------------------
insert into userinfo values('apple2', '1111', 'defalut.jpg', 'apple', '010-2020-1020', 'apple2@naver.com' '안녕하세요, 사과입니다. 충주에서 왔습니다');

insert into songinfo values(songinfo_seq.nextval, 'apple', 'cat2.jpg', '사과송', '충주사과 홍보곡', 'x', sysdate, 0, 50, '4/4', 'hiphop');
insert into songinfo values(songinfo_seq.nextval, 'apple', 'seo.jpg', '사과좋아', '국민가수 사과맨의 컴백곡', 'x', sysdate, 0, 60, '3/4', 'ballad');
insert into songinfo values(songinfo_seq.nextval, 'apple', 'seo.jpg', '사과만세', '그가 돌아왔다 사과맨', 'x', sysdate, 0, 70, '3/4', 'jazz');

insert into board values(board_seq.nextval, 'x', 'banzzogari', '피처링 구해요', '피쳐링해주실분을 찾고 있습니다', sysdate, 1);
insert into board values(board_seq.nextval, 'x', 'banzzogari', '안녕하세요', '피쳐링해주실분을 찾고 있습니다', sysdate, 1);

insert into songreply values(songreply_seq.nextval, 'banana', '안녕', sysdate, 0, 21);
insert into songreply values(songreply_seq.nextval, 'banana', '나는', sysdate, 0, 21);
insert into songreply values(songreply_seq.nextval, 'banana', '바나나야', sysdate, 0, 21);
select * from songreply;
delete songreply where replynum = #{replynum}
update songreply set reply_like = reply_like+1 where replynum = #{replynum};

insert into boardreply values(boardreply_seq.nextval, 'banana', '안녕', sysdate, 0, 41);
insert into boardreply values(boardreply_seq.nextval, 'banana', '나는', sysdate, 0, 41);
insert into boardreply values(boardreply_seq.nextval, 'banana', '바나나야', sysdate, 0, 41);
select * from boardreply where boardnum = 41;
-------------------------------------------------------------------------------------------------------------------------------
select * from userinfo;
select * from board;

select count(user_id) from userinfo where user_id = 'x';
select count(user_nickname) from userinfo where user_nickname = 'x';
select count(user_email) from userinfo where user_email = 'bj@nae.com';

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