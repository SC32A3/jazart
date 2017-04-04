package global.sesoc.jazart.vo;

public class Playlist {
	private String user_id;
	private String songnum;
	private String play_inputdate;
	
	public Playlist() {	}
		
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getSongnum() {
		return songnum;
	}
	public void setSongnum(String songnum) {
		this.songnum = songnum;
	}
	public String getPlay_inputdate() {
		return play_inputdate;
	}
	public void setPlay_inputdate(String play_inputdate) {
		this.play_inputdate = play_inputdate;
	}

	@Override
	public String toString() {
		return "Playlist [user_id=" + user_id + ", songnum=" + songnum + ", play_inputdate=" + play_inputdate + "]";
	}
	
}
