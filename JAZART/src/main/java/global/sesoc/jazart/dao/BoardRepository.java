package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.Board;


@Repository
public class BoardRepository {
	@Autowired
	SqlSession sqlSession;
	
	public ArrayList<Board> boardList(){
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		//검색결과의 일부분만 읽기 
		//RowBounds객체 추가 
		
		
		//RowBounds 객체를 넘겨준다.(xml은 수정할 필요없음)
		ArrayList<Board> bList= null;
		try {
			bList = mapper.boardList();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bList;
	}
	
	public int write(Board board){
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result=0;
		try {
			result = mapper.write(board);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
}
