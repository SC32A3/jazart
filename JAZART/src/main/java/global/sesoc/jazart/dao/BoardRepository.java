package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.utility.PageNavigator;
import global.sesoc.jazart.vo.Board;




@Repository
public class BoardRepository {
   @Autowired
   SqlSession sqlSession;
   
   public static final Logger logger = LoggerFactory.getLogger(BoardRepository.class);
   
   //1
   public ArrayList<Board> boardList(String searchTitle, String searchText, PageNavigator navi){
      BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
      Map<String, String> search = new HashMap<>();
      search.put("searchTitle", searchTitle);
      search.put("searchText", searchText);
      search.put("searchTitle", searchTitle);
      search.put("searchTitle", searchTitle);
      ArrayList<Board> bList= null;
      
 
      try {
         bList = mapper.boardList(search);
      } catch (Exception e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      return bList;
   }
   public int getCount(String searchTitle, String searchText){
	   BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
	   Map<String, String> search = new HashMap<>();
		search.put("searchTitle", searchTitle);
		search.put("searchText", searchText);
		int result = 0;
		try {
			result = mapper.getCount(search);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	   
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
   public Board selectList(int boardNum){
      BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
      Board board=null;
      try {
         board = mapper.selectList(boardNum);
      } catch (Exception e) {
         // TODO Auto-generated catch block
         e.printStackTrace();
      }
      return board;
   }
   
   public int updateBoard(Board board) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0; 
		try {
			result = mapper.updateBoard(board);
			logger.info("수정 count => "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
		
	}
	
	public int deleteBoard(int boardNum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.deleteBoard(boardNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public void addHits(int boardNum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.addHits(boardNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}