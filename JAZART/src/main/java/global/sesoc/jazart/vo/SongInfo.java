package global.sesoc.jazart.vo;

public class SongInfo {
	private int songnum;
	private String song_nickname;
	private String song_picture;
	private String song_savedpic;
	private String song_title;
	
	private String song_desc;
	private String song_file;
	private String song_savedfile;
	private String song_inputdate;
	private int song_like;

	private String song_genre;
	private String song_complete;

	public SongInfo() {
	}

	public int getSongnum() {
		return songnum;
	}

	public void setSongnum(int songnum) {
		this.songnum = songnum;
	}

	public String getSong_nickname() {
		return song_nickname;
	}

	public void setSong_nickname(String song_nickname) {
		this.song_nickname = song_nickname;
	}

	public String getSong_picture() {
		return song_picture;
	}

	public void setSong_picture(String song_picture) {
		this.song_picture = song_picture;
	}

	public String getSong_savedpic() {
		return song_savedpic;
	}

	public void setSong_savedpic(String song_savedpic) {
		this.song_savedpic = song_savedpic;
	}

	public String getSong_title() {
		return song_title;
	}

	public void setSong_title(String song_title) {
		this.song_title = song_title;
	}

	public String getSong_desc() {
		return song_desc;
	}

	public void setSong_desc(String song_desc) {
		this.song_desc = song_desc;
	}

	public String getSong_file() {
		return song_file;
	}

	public void setSong_file(String song_file) {
		this.song_file = song_file;
	}

	public String getSong_savedfile() {
		return song_savedfile;
	}

	public void setSong_savedfile(String song_savedfile) {
		this.song_savedfile = song_savedfile;
	}

	public String getSong_inputdate() {
		return song_inputdate;
	}

	public void setSong_inputdate(String song_inputdate) {
		this.song_inputdate = song_inputdate;
	}

	public int getSong_like() {
		return song_like;
	}

	public void setSong_like(int song_like) {
		this.song_like = song_like;
	}

	public String getSong_genre() {
		return song_genre;
	}

	public void setSong_genre(String song_genre) {
		this.song_genre = song_genre;
	}

	public String getSong_complete() {
		return song_complete;
	}

	public void setSong_complete(String song_complete) {
		this.song_complete = song_complete;
	}

	@Override
	public String toString() {
		return "SongInfo [songnum=" + songnum + ", song_nickname=" + song_nickname + ", song_picture=" + song_picture
				+ ", song_savedpic=" + song_savedpic + ", song_title=" + song_title + ", song_desc=" + song_desc
				+ ", song_file=" + song_file + ", song_savedfile=" + song_savedfile + ", song_inputdate="
				+ song_inputdate + ", song_like=" + song_like + ", song_genre=" + song_genre + ", song_complete="
				+ song_complete + "]";
	}
	
}
