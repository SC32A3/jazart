package global.sesoc.jazart.vo;

public class Userlist {
	private int listnum;
	private int songnum;
	private String file_type;
	private String file_original;
	private String file_saved;
	
	public Userlist() {}
	
	public Userlist(int listnum, int songnum, String file_type, String file_original, String file_saved) {
		super();
		this.listnum = listnum;
		this.songnum = songnum;
		this.file_type = file_type;
		this.file_original = file_original;
		this.file_saved = file_saved;
	}



	public int getListnum() {
		return listnum;
	}

	public void setListnum(int listnum) {
		this.listnum = listnum;
	}

	public int getSongnum() {
		return songnum;
	}

	public void setSongnum(int songnum) {
		this.songnum = songnum;
	}

	public String getFile_type() {
		return file_type;
	}

	public void setFile_type(String file_type) {
		this.file_type = file_type;
	}

	public String getFile_original() {
		return file_original;
	}

	public void setFile_original(String file_original) {
		this.file_original = file_original;
	}

	public String getFile_saved() {
		return file_saved;
	}

	public void setFile_saved(String file_saved) {
		this.file_saved = file_saved;
	}

	@Override
	public String toString() {
		return "Userlist [listnum=" + listnum + ", songnum=" + songnum + ", file_type=" + file_type + ", file_original="
				+ file_original + ", file_saved=" + file_saved + "]";
	}
}
