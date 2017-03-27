package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Songinfo;
import global.sesoc.jazart.vo.Songreply;

public interface SongMapper {

   Songinfo selectSong(int songnum) throws Exception;

   int recommend(int songnum) throws Exception;

   ArrayList<Songreply> songReply(int songnum) throws Exception;

   int insertSongreply(Songreply songreply) throws Exception;

   int deleteSongreply(int replynum) throws Exception;

   int recommendSongreply(int replynum) throws Exception;

   int selectRecommend(int replynum, String loginNickname) throws Exception;

   int addHistory(int replynum, String loginNickname) throws Exception;

   int updateSongreply(Songreply songreply) throws Exception;

}