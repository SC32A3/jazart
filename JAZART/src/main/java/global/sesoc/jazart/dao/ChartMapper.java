package global.sesoc.jazart.dao;

import java.util.ArrayList;
import java.util.Map;

import global.sesoc.jazart.vo.SongInfo;

public interface ChartMapper {
	  public ArrayList<SongInfo> chartList() throws Exception;
	  public ArrayList<SongInfo> dailyChart(Map<String, String> search) throws Exception;
	  public ArrayList<SongInfo> realtimeChart() throws Exception;
	  public ArrayList<SongInfo> weeklyChart(String day) throws Exception;
	  public String getDay() throws Exception;
	  public ArrayList<SongInfo> weeklyChart(Map<String, String> search);
	  public int dailyCount() throws Exception;
}
