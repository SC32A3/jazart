package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Board;

public interface BoardMapper {

	public ArrayList<Board> boardList() throws Exception;
	public int write(Board board) throws Exception;
<<<<<<< HEAD
	public Board selectList(int boardnum) throws Exception;
=======
>>>>>>> branch 'master' of https://github.com/SC32A3/jazart.git
}