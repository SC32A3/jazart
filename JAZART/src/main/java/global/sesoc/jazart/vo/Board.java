package global.sesoc.jazart.vo;

public class Board {

	private int boardNum;
	private String board_tag;
	private String board_picture;
	private String board_nickname;
	private String board_title;
	private String board_content;
	private String board_inputdate;
	private int board_hits;
	
	public Board(int boardNum, String board_tag, String board_picture, String board_nickname, String board_title,
			String board_content, String board_inputdate, int board_hits) {
		super();
		this.boardNum = boardNum;
		this.board_tag = board_tag;
		this.board_picture = board_picture;
		this.board_nickname = board_nickname;
		this.board_title = board_title;
		this.board_content = board_content;
		this.board_inputdate = board_inputdate;
		this.board_hits = board_hits;
	}

	public Board() {
		super();
	}

	public int getboardNum() {
		return boardNum;
	}

	public void setboardNum(int boardNum) {
		this.boardNum = boardNum;
	}

	public String getBoard_tag() {
		return board_tag;
	}

	public void setBoard_tag(String board_tag) {
		this.board_tag = board_tag;
	}

	public String getBoard_picture() {
		return board_picture;
	}

	public void setBoard_picture(String board_picture) {
		this.board_picture = board_picture;
	}

	public String getBoard_nickname() {
		return board_nickname;
	}

	public void setBoard_nickname(String board_nickname) {
		this.board_nickname = board_nickname;
	}

	public String getBoard_title() {
		return board_title;
	}

	public void setBoard_title(String board_title) {
		this.board_title = board_title;
	}

	public String getBoard_content() {
		return board_content;
	}

	public void setBoard_content(String board_content) {
		this.board_content = board_content;
	}

	public String getBoard_inputdate() {
		return board_inputdate;
	}

	public void setBoard_inputdate(String board_inputdate) {
		this.board_inputdate = board_inputdate;
	}

	public int getBoard_hits() {
		return board_hits;
	}

	public void setBoard_hits(int board_hits) {
		this.board_hits = board_hits;
	}

	@Override
	public String toString() {
		return "Board [boardNum=" + boardNum + ", board_tag=" + board_tag + ", board_picture=" + board_picture
				+ ", board_nickname=" + board_nickname + ", board_title=" + board_title + ", board_content="
				+ board_content + ", board_inputdate=" + board_inputdate + ", board_hits=" + board_hits + "]";
	}
	
	
	
}
