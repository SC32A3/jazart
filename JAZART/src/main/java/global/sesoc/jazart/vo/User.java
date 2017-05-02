package global.sesoc.jazart.vo;

public class User {
	private String user_id;
	private String user_pw;
	private String user_nickname;
	private String user_phone;
	private String user_email;
	private String user_desc;
	private String user_picture;
	private String user_savedpic;
	
	public User() {}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_pw() {
		return user_pw;
	}

	public void setUser_pw(String user_pw) {
		this.user_pw = user_pw;
	}

	public String getUser_nickname() {
		return user_nickname;
	}

	public void setUser_nickname(String user_nickname) {
		this.user_nickname = user_nickname;
	}

	public String getUser_phone() {
		return user_phone;
	}

	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}

	public String getUser_email() {
		return user_email;
	}

	public void setUser_email(String user_email) {
		this.user_email = user_email;
	}

	public String getUser_desc() {
		return user_desc;
	}

	public void setUser_desc(String user_desc) {
		this.user_desc = user_desc;
	}

	public String getUser_picture() {
		return user_picture;
	}

	public void setUser_picture(String user_picture) {
		this.user_picture = user_picture;
	}

	public String getUser_savedpic() {
		return user_savedpic;
	}

	public void setUser_savedpic(String user_savedpic) {
		this.user_savedpic = user_savedpic;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", user_pw=" + user_pw + ", user_nickname=" + user_nickname
				+ ", user_phone=" + user_phone + ", user_email=" + user_email + ", user_desc=" + user_desc
				+ ", user_picture=" + user_picture + ", user_savedpic=" + user_savedpic + "]";
	}
}