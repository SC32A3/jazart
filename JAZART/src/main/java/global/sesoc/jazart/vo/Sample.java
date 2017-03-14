package global.sesoc.jazart.vo;

public class Sample {
	private int num;
	private String name;
	private String text;

	public Sample() {
		super();
	}

	public Sample(int num, String name, String text) {
		super();
		this.num = num;
		this.name = name;
		this.text = text;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	@Override
	public String toString() {
		return "Comment [num=" + num + ", name=" + name + ", text=" + text + "]";
	}
}
