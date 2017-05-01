package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.SongReply;

@Repository
public class SongRepository {

	@Autowired
	SqlSession sqlSession;

	private static final Logger logger = LoggerFactory.getLogger(SongRepository.class);

	public SongInfo selectSong(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		SongInfo song = null;
		try {
			song = mapper.selectSong(songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return song;
	}

	public int recommend(int songnum, String loginNickname) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			int report = mapper.songlikeHistory(songnum, loginNickname);
			if (report == 1) {
				return result;
			} else {
				result = mapper.recommend(songnum);
				mapper.addSonglike(songnum, loginNickname);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public ArrayList<SongReply> songReply(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		ArrayList<SongReply> replyList = null;
		try {
			replyList = mapper.songReply(songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return replyList;
	}

	public int insertSongReply(SongReply songreply) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.insertSongReply(songreply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int deleteSongReply(int replynum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.deleteSongReply(replynum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int recommendSongReply(int replynum, String loginNickname) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.recommendSongReply(replynum);
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

	public int updateSongReply(SongReply reply) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.updateSongReply(reply);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public void insertSongInfo(SongInfo songinfo) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.insertSongInfo(songinfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}