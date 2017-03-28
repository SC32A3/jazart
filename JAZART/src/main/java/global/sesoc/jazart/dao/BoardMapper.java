package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.Board;

public interface BoardMapper {
	public ArrayList<Board> boardList(Map<String, String> search) throws Exception;

	public int getCount(Map<String, String> search) throws Exception;
	
	public int write(Board board) throws Exception;

	public Board selectList(int boardNum) throws Exception;

	public int addHits(int boardNum) throws Exception;

	public int updateBoard(Board board) throws Exception;

	public int deleteBoard(int boardNum) throws Exception;

}