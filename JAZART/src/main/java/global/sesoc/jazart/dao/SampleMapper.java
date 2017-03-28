package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Boardreply;

public interface SampleMapper {

	ArrayList<Boardreply> boardReply(int boardNum) throws Exception;

	int insertBoardreply(Boardreply boardreply) throws Exception;

	int updateBoardreply(Boardreply reply) throws Exception;

	int deleteBoardreply(int replynum) throws Exception;

	int selectRecommend(int replynum, String loginNickname) throws Exception;

	int recommendBoardreply(int replynum) throws Exception;

	int addHistory(int replynum, String loginNickname) throws Exception;

}
