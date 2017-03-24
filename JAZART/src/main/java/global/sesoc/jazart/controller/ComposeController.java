package global.sesoc.jazart.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import global.sesoc.jazart.dao.SongRepository;
import global.sesoc.jazart.dao.UserRepository;
import global.sesoc.jazart.vo.Songinfo;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ComposeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ComposeController.class);
	
	@Autowired
	UserRepository ur;
	@Autowired
	SongRepository sr;
	@Autowired
	HttpSession session;
	
	final String uploadPath = "/userProfile"; //파일이 업로드 되는 경로
	
	@RequestMapping(value = "/compose", method = RequestMethod.GET)
	public String compose() {
		return "compose";
	}
	
	
	@RequestMapping(value = "/mixing", method = RequestMethod.GET)
	public String mixing() {
		return "mixing";
	}
	
	@RequestMapping(value = "/songpage", method = RequestMethod.GET)
	public String songpage(int songnum, Model model) {
		Songinfo song = sr.selectSong(songnum);
		model.addAttribute("song", song);
		return "songpg";
	}
	
	@RequestMapping(value = "/artistpage", method = RequestMethod.GET)
	public String artistpage(Model model) {
		String loginNickname = (String) session.getAttribute("loginNickname");
		User user = ur.selectUser(loginNickname);
		model.addAttribute("user", user);
		ArrayList<Songinfo> songsByArtist = ur.songsByArtist(loginNickname);
		model.addAttribute("songs", songsByArtist);
		return "artistpg";
	}
	
	@RequestMapping(value="download", method=RequestMethod.GET)
	public String download(String type, String data, HttpServletResponse response){ //수동으로 데이터를 내보내야 하는 경우 HttpServletResponse를 사용한다
		//다른 방법
		//매개변수로 boardnum이 아닌 savedfile을 받으면 DB에 갈 필요가 없다. String fullpath부분부터 바로 하면 된다.
		String originalfile = "";
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		
		logger.info("type=> "+type+", data=> "+data);
		//한개의 글을 가져옴
		if (type.equals("song")) {
			int songnum = Integer.parseInt(data);
			Songinfo song =  sr.selectSong(songnum);
			logger.info("songpicture=> "+song.getSong_picture());
			originalfile = song.getSong_picture();
			fullpath = uploadPath+"/"+song.getSong_picture();
		}
		
		//사용자 측에서 다운로드 받도록 하기 위해서
		//response 객체의 헤더를 조작함, 웹페이지 개발자모드(F12)의 Head에서 확인할수 있다
		//text/html에서 파일 다운로드 가능한 형태로 변경
		try {
			response.setHeader("Content-Disposition", 
					"attachment;filename="+URLEncoder.encode(originalfile, "UTF-8")); //첫번째 매개변수 : 실제로 받아야하는 아이
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		//(웹유저)  <---servletOutputStream(출력)---- (서버(웹프로젝트 주체)) <--FileInputStream(입력)-- (하드 rose.jpg) 
		try {
			filein = new FileInputStream(fullpath);
			fileout = response.getOutputStream();
			//Spring에서 제공하는 유틸리티
			FileCopyUtils.copy(filein, fileout);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (filein != null) filein.close();
				if (fileout != null) fileout.close();	
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
}


