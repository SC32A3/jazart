package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Songinfo;

public interface ChartMapper {
	  public ArrayList<Songinfo> chartList() throws Exception;

}
