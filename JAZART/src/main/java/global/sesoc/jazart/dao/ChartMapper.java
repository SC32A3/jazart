package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.SongInfo;

public interface ChartMapper {
	public ArrayList<SongInfo> realtimeChart(Map<String, String> search) throws Exception;

	public ArrayList<SongInfo> dailyChart(Map<String, String> search) throws Exception;

	public ArrayList<SongInfo> weeklyChart(Map<String, String> search) throws Exception;

	public String getDay() throws Exception;

	public int allCount() throws Exception;

	public ArrayList<SongInfo> allList(Map<String, String> searchs) throws Exception;

	public int chartAllCount() throws Exception;
}
