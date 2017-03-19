package global.sesoc.jazart.vo;

import java.util.ArrayList;

public class Translation {

	private String contents;
	
	public Translation() {	}
	
	public String getContents() {
		return contents;
	}

	public void setContents(String contents) {
		this.contents = contents;
	}

	@Override
	public String toString() {
		return "Translation [contents=" + contents + "]";
	}


	public String encoding(String contents){
		String result = "";
		
		System.out.println("contents "+contents);
		
		String[] values = contents.split("&#");
		ArrayList<String> newValues = null;		
		for (int i = 1; i < values.length; i++) {
			System.out.println("translated "+ values[i]);
			
		}
		
		return result;
	}
	
	
}
