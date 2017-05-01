package global.sesoc.jazart.vo;

public class SongInfo {
	private int songnum;
	private String song_nickname;
	private String song_picture;
	private String song_title;
	private String song_desc;
	private String song_file;
	private String song_inputdate;
	private int song_like;
	private int bpm;
	private String beat;
	private String song_genre;
	private String complete;

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

	public int getBpm() {
		return bpm;
	}

	public void setBpm(int bpm) {
		this.bpm = bpm;
	}

	public String getBeat() {
		return beat;
	}

	public void setBeat(String beat) {
		this.beat = beat;
	}

	public String getSong_genre() {
		return song_genre;
	}

	public void setSong_genre(String song_genre) {
		this.song_genre = song_genre;
	}

	public String getComplete() {
		return complete;
	}

	public void setComplete(String complete) {
		this.complete = complete;
	}

	@Override
	public String toString() {
		return "SongInfo [songnum=" + songnum + ", song_nickname=" + song_nickname + ", song_picture=" + song_picture
				+ ", song_title=" + song_title + ", song_desc=" + song_desc + ", song_file=" + song_file
				+ ", song_inputdate=" + song_inputdate + ", song_like=" + song_like + ", bpm=" + bpm + ", beat=" + beat
				+ ", song_genre=" + song_genre + ", complete=" + complete + "]";
	}
}
