package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.User;

public interface SampleMapper {
	public int insert(User sample) throws Exception;

	public ArrayList<User> list() throws Exception;

	public int delete(int num) throws Exception;

	public int update(User sample) throws Exception;
}
