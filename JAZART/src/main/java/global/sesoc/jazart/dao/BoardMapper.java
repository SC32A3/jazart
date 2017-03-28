package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Board;

public interface BoardMapper {
   public ArrayList<Board> boardList() throws Exception;
   public int write(Board board) throws Exception;
   public Board selectList(int boardNum) throws Exception;
   public int addHits(int boardnum) throws Exception;
	public int updateBoard(Board board) throws Exception;
	public int deleteBoard(int boardNum) throws Exception;
}