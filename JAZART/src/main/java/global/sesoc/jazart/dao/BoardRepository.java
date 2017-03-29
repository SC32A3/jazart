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
import global.sesoc.jazart.vo.Boardreply;




@Repository
public class BoardRepository {
   @Autowired
   SqlSession sqlSession;
   
   public static final Logger logger = LoggerFactory.getLogger(BoardRepository.class);
   
   public ArrayList<Board> boardList(String searchTitle, String searchText, PageNavigator navi){
      BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
      Map<String, String> search = new HashMap<>();
      search.put("searchTitle", searchTitle);
      search.put("searchText", searchText);
      search.put("start", "" + navi.getStartRecord());
      search.put("end", "" + navi.getEndRecord());
      ArrayList<Board> bList= null;
      
 
      try {
         bList = mapper.boardList(search);
         logger.info("보드리스트"+bList);
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
	//
	public ArrayList<Boardreply> boardReply(int boardNum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		ArrayList<Boardreply> replyList = null;
		try {
			replyList = mapper.boardReply(boardNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return replyList;
	}

	public int insertBoardreply(Boardreply boardreply) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.insertBoardreply(boardreply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int updateBoardreply(Boardreply reply) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.updateBoardreply(reply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int deleteBoardreply(int replynum) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.deleteBoardreply(replynum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int selectRecommend(int replynum, String loginNickname) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.selectRecommend(replynum, loginNickname);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int recommendBoardreply(int replynum, String loginNickname) {
		BoardMapper mapper = sqlSession.getMapper(BoardMapper.class);
		int result = 0;
		try {
			result = mapper.recommendBoardreply(replynum);
			mapper.addHistory(replynum, loginNickname);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}