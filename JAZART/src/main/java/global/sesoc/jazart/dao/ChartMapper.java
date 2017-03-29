package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.SongInfo;

public interface ChartMapper {
	  public ArrayList<SongInfo> chartList() throws Exception;
}
