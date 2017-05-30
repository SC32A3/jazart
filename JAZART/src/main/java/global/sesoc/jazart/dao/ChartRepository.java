package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.SongInfo;

@Repository
public class ChartRepository {
	@Autowired
	SqlSession sqlSession;

	public static final Logger logger = LoggerFactory.getLogger(ChartRepository.class);

	public ArrayList<SongInfo> chartList(String type, int start, int end) {
		ChartMapper mapper = sqlSession.getMapper(ChartMapper.class);
		ArrayList<SongInfo> cList = null;
		Map<String, String> search = new HashMap<>();
		try {
			if (type.equals("dc")) {
				search.put("start", start + "");
				search.put("end", end + "");
				cList = mapper.dailyChart(search);
				logger.info("데일리차트=> " + cList);
			} else if (type.equals("rc")) {
				search.put("start", start + "");
				search.put("end", end + "");
				cList = mapper.realtimeChart(search);
				logger.info("실시간차트=> " + cList);
			} else if (type.equals("wc")) {
				String day = mapper.getDay();
				logger.info("위클리차트/요일=> " + day);
				search.put("day", day);
				search.put("start", start + "");
				search.put("end", end + "");
				cList = mapper.weeklyChart(search);
				logger.info("위클리차트=> " + cList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cList;
	}

	public ArrayList<SongInfo> allList(int start, int end) {
		ChartMapper mapper = sqlSession.getMapper(ChartMapper.class);
		ArrayList<SongInfo> cList = null;
		Map<String, String> search = new HashMap<>();
		search.put("start", start + "");
		search.put("end", end + "");
		try {
			cList = mapper.allList(search);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.info("데일리차트=> " + cList);

		return cList;
	}

	public int allCount() {
		ChartMapper mapper = sqlSession.getMapper(ChartMapper.class);
		int result = 1;
		try {
			result = mapper.allCount();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	public int chartAllCount() {
		int result = 0;
		ChartMapper mapper = sqlSession.getMapper(ChartMapper.class);
		try {
			result = mapper.chartAllCount();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
}
