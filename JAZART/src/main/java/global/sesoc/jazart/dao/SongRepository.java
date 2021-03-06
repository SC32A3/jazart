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
import global.sesoc.jazart.vo.Userlist;

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

	public int selectSongByName(String loginNickname, String song_title) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.selectSongByName(loginNickname, song_title);
			logger.info("곡유무 Count=> "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public int getSongnum(String loginNickname, String song_title) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int songnum = 0;
		try {
			songnum = mapper.getSongnum(loginNickname, song_title);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return songnum;
	}
	
	public void updateSongInfo(int songnum, String originalFileName, String savedfile) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.updateSongInfo(songnum, originalFileName, savedfile);
			logger.info("곡수정 result: "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public int insertSongdata(Userlist userlist) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.insertSongdata(userlist);
			logger.info("곡데이터 input result: "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public ArrayList<String> selectSongdata(int songnum, String file_type) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		ArrayList<String> list = new ArrayList<>();
		try {
			list = mapper.selectSongdata(songnum, file_type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public ArrayList<String> selectSongdata2(int songnum, String file_type) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		ArrayList<String> list = new ArrayList<>();
		try {
			list = mapper.selectSongdata2(songnum, file_type);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public ArrayList<String> selectSongdata3(int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		ArrayList<String> list = new ArrayList<>();
		try {
			list = mapper.selectSongdata3(songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	public String selectSongdata4(String originalfile, int songnum) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		String result = "";
		try {
			result = mapper.selectSongdata4(originalfile, songnum);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public void complete(SongInfo songinfo) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.complete(songinfo);
			logger.info("완료정보 count>> "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public int updateSongInfo2(int songnum, String originalFile, String savedfile) {
		SongMapper mapper = sqlSession.getMapper(SongMapper.class);
		int result = 0;
		try {
			result = mapper.updateSongInfo2(songnum, originalFile, savedfile);
			logger.info("곡파일수정 result: "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
}