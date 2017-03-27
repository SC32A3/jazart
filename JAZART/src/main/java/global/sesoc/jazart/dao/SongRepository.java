package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.Songinfo;
import global.sesoc.jazart.vo.Songreply;

@Repository
public class SongRepository {

	@Autowired
	SqlSession sqlSession;

	private static final Logger logger = LoggerFactory.getLogger(SongRepository.class);

	public Songinfo selectSong(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		Songinfo song = null;
		try {
			song = mapper.selectSong(songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return song;
	}

	public int recommend(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.recommend(songnum);
			logger.info("추천 레파짓토리=>"+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public ArrayList<Songreply> songReply(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		ArrayList<Songreply> replyList = null;
		try {
			replyList = mapper.songReply(songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return replyList;
	}

	public int insertSongreply(Songreply songreply) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.insertSongreply(songreply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int deleteSongreply(int replynum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.deleteSongreply(replynum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int recommendSongreply(int replynum, String loginNickname) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.recommendSongreply(replynum);
			mapper.addHistory(replynum, loginNickname);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int selectRecommend(int replynum, String loginNickname) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.selectRecommend(replynum, loginNickname);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int updateSongreply(Songreply reply) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.updateSongreply(reply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}