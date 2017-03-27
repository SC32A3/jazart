package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Board;

public interface BoardMapper {

	public ArrayList<Board> boardList() throws Exception;
	public int write(Board board) throws Exception;
	public Board selectList(int boardNum) throws Exception;
}