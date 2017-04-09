package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.SongInfo;

public interface ChartMapper {
	public ArrayList<SongInfo> realtimeChart(Map<String, String> search) throws Exception;

	public ArrayList<SongInfo> dailyChart(Map<String, String> search) throws Exception;

	public ArrayList<SongInfo> weeklyChart(Map<String, String> search) throws Exception;

	public Integer realtimeCount() throws Exception;

	public Integer weeklyCount(Map<String, String> search) throws Exception;

	public Integer dailyCount() throws Exception;

	public String getDay() throws Exception;

	public int allCount() throws Exception;

	public ArrayList<SongInfo> allList(Map<String, String> search) throws Exception;
}
