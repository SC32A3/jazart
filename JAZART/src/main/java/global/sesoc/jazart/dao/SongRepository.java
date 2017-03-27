package global.sesoc.jazart.dao;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.Songinfo;

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
}