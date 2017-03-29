package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.Board;
import global.sesoc.jazart.vo.BoardReply;

public interface BoardMapper {
	public ArrayList<Board> boardList(Map<String, String> search) throws Exception;

	public int getCount(Map<String, String> search) throws Exception;
	
	public int write(Board board) throws Exception;

	public Board selectList(int boardNum) throws Exception;

	public int addHits(int boardNum) throws Exception;

	public int updateBoard(Board board) throws Exception;

	public int deleteBoard(int boardNum) throws Exception;

	ArrayList<BoardReply> boardReply(int boardNum) throws Exception;

	int insertBoardReply(BoardReply boardreply) throws Exception;

	int updateBoardReply(BoardReply reply) throws Exception;

	int deleteBoardReply(int replynum) throws Exception;

	int selectRecommend(int replynum, String loginNickname) throws Exception;

	int recommendBoardReply(int replynum) throws Exception;

	int addHistory(int replynum, String loginNickname) throws Exception;
}