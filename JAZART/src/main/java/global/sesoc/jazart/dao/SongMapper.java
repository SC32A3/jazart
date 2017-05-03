package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.SongReply;
import global.sesoc.jazart.vo.Userlist;

public interface SongMapper {

   SongInfo selectSong(int songnum) throws Exception;

   int recommend(int songnum) throws Exception;

   ArrayList<SongReply> songReply(int songnum) throws Exception;

   int insertSongReply(SongReply songreply) throws Exception;

   int deleteSongReply(int replynum) throws Exception;

   int recommendSongReply(int replynum) throws Exception;

   int selectRecommend(int replynum, String loginNickname) throws Exception;

   int addHistory(int replynum, String loginNickname) throws Exception;

   int updateSongReply(SongReply songreply) throws Exception;

   int songlikeHistory(int songnum, String loginNickname) throws Exception;

   int addSonglike(int songnum, String loginNickname) throws Exception;

   int insertSongInfo(SongInfo songinfo) throws Exception;

   int selectSongByName(String loginNickname, String song_title) throws Exception;

   int getSongnum(String loginNickname, String song_title) throws Exception;

   int updateSongInfo(int songnum, String originalFileName, String savedfile) throws Exception;

   int insertSongdata(Userlist userlist) throws Exception;

}