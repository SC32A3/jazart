package global.sesoc.jazart.dao;

import java.util.ArrayList;

import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.User;

public interface UserMapper {
	public int insert(User sample) throws Exception;

	public ArrayList<User> list() throws Exception;

	public int delete(int num) throws Exception;

	public int update(User sample) throws Exception;

	public User selectUser(String userid) throws Exception;

	public int countId(String user_id) throws Exception;

	public int countNickname(String user_nickname) throws Exception;

	public int countEmail(String user_email) throws Exception;

	public ArrayList<SongInfo> songsByArtist(String loginNickname) throws Exception;

	public ArrayList<SongInfo> playlist(String userId) throws Exception;

	public ArrayList<SongInfo> getPlayOne(int songnum) throws Exception;

	public int addSongList(int songnum, String user_id) throws Exception;

	public int deleteSongList(String user_id, int songnum) throws Exception;
}