package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.Boardreply;
import global.sesoc.jazart.vo.Songreply;

@Repository
public class SampleRepository {

	@Autowired
	SqlSession sqlSession;

	private static final Logger logger = LoggerFactory.getLogger(SampleRepository.class);

	public ArrayList<Boardreply> boardReply(int boardNum) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		ArrayList<Boardreply> replyList = null;
		try {
			replyList = mapper.boardReply(boardNum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return replyList;
	}

	public int insertBoardreply(Boardreply boardreply) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.insertBoardreply(boardreply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int updateBoardreply(Boardreply reply) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.updateBoardreply(reply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int deleteBoardreply(int replynum) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.deleteBoardreply(replynum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int selectRecommend(int replynum, String loginNickname) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.selectRecommend(replynum, loginNickname);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int recommendBoardreply(int replynum, String loginNickname) {
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
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