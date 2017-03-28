package global.sesoc.jazart.vo;

public class Songreply {
	private int replynum;
	private String reply_nickname;
	private String reply_text;
	private String reply_inputdate;
	private int reply_like;
	private int songnum;

	public Songreply() {	}

	public int getReplynum() {
		return replynum;
	}

	public void setReplynum(int replynum) {
		this.replynum = replynum;
	}

	public String getReply_nickname() {
		return reply_nickname;
	}

	public void setReply_nickname(String reply_nickname) {
		this.reply_nickname = reply_nickname;
	}

	public String getReply_text() {
		return reply_text;
	}

	public void setReply_text(String reply_text) {
		this.reply_text = reply_text;
	}

	public String getReply_inputdate() {
		return reply_inputdate;
	}

	public void setReply_inputdate(String reply_inputdate) {
		this.reply_inputdate = reply_inputdate;
	}

	public int getReply_like() {
		return reply_like;
	}

	public void setReply_like(int reply_like) {
		this.reply_like = reply_like;
	}

	public int getSongnum() {
		return songnum;
	}

	public void setSongnum(int songnum) {
		this.songnum = songnum;
	}

	@Override
	public String toString() {
		return "Songreply [replynum=" + replynum + ", reply_nickname=" + reply_nickname + ", reply_text=" + reply_text
				+ ", reply_inputdate=" + reply_inputdate + ", reply_like=" + reply_like + ", songnum=" + songnum + "]";
	}
	
}

