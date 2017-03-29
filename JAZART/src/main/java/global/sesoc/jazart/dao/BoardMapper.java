package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.Board;
import global.sesoc.jazart.vo.Boardreply;

public interface BoardMapper {
	public ArrayList<Board> boardList(Map<String, String> search) throws Exception;

	public int getCount(Map<String, String> search) throws Exception;
	
	public int write(Board board) throws Exception;

	public Board selectList(int boardNum) throws Exception;

	public int addHits(int boardNum) throws Exception;

	public int updateBoard(Board board) throws Exception;

	public int deleteBoard(int boardNum) throws Exception;

	ArrayList<Boardreply> boardReply(int boardNum) throws Exception;

	int insertBoardreply(Boardreply boardreply) throws Exception;

	int updateBoardreply(Boardreply reply) throws Exception;

	int deleteBoardreply(int replynum) throws Exception;

	int selectRecommend(int replynum, String loginNickname) throws Exception;

	int recommendBoardreply(int replynum) throws Exception;

	int addHistory(int replynum, String loginNickname) throws Exception;
}