package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.Sample;

public interface SampleMapper {
	public int insert(Sample sample) throws Exception;

	public ArrayList<Sample> list() throws Exception;

	public int delete(int num) throws Exception;

	public int update(Sample sample) throws Exception;
}
