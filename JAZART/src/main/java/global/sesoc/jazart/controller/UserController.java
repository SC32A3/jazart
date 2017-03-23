package global.sesoc.jazart.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import global.sesoc.jazart.dao.SampleRepository;
import global.sesoc.jazart.utility.FileService;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	SampleRepository sr;
	@Autowired
	HttpSession session;

	final String uploadPath = "/userProfile"; //파일이 업로드 되는 경로
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "home";
	}

	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String login() {
		return "login";
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(String userid, String password, Model model) {
		User loginUser = sr.selectUser(userid);
		if (loginUser == null) {
			model.addAttribute("message", "fail");
			return "login";
		}

		if (loginUser.getUser_pw().equals(password)) {
			model.addAttribute("message", "success");
			session.setAttribute("loginId", loginUser.getUser_id());
			session.setAttribute("loginNickname", loginUser.getUser_nickname());
			System.out.println(
					"로그인 Http세션값=> " + session.getAttribute("loginId") + ", " + session.getAttribute("loginNickname"));
			return "redirect:/";
		} else {
			model.addAttribute("message", "fail");
			return "login";
		}
	}

	@RequestMapping(value = "join", method = RequestMethod.GET)
	public String join() {
		return "join";
	}
	
	@RequestMapping(value = "joinCheck", method = RequestMethod.GET)
	public @ResponseBody String joinCheck(User user) {
		logger.info("가입체크 vo=> "+user.toString());
		String result = sr.joinCheck(user);
		logger.info("가입체크 메세지=> "+result);
		return result;
	}

	@RequestMapping(value = "join", method = RequestMethod.POST)
	public String join(User user, MultipartFile upload) {
		logger.info("가입 => "+user.toString());
		String userName = user.getUser_nickname();
		
		// 첨부된 파일을 처리
		if (!upload.isEmpty()) {
			String savedfile = FileService.saveFile(upload, uploadPath, userName);
			user.setUser_picture(savedfile);
		} else {
			user.setUser_picture("default.jpg");
		}

		sr.regist(user);

		return "join";
	}
	
//	@RequestMapping(value = "join", method = RequestMethod.POST)
//	public String jointest(User user) {
//		logger.info(user.toString());
//	
//		return null;
//	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(SessionStatus sessionStatus) {
		sessionStatus.setComplete();
		session.invalidate();
		return "redirect:/";
	}
	
	@RequestMapping(value = "test2", method = RequestMethod.GET)
	public String test2(Model model) {
		User user = sr.selectUser((String) session.getAttribute("loginId"));
		
		model.addAttribute("user", user);
		
		return "test2";
	}
	
	@RequestMapping(value="download", method=RequestMethod.GET)
	public String download(HttpServletResponse response){ //수동으로 데이터를 내보내야 하는 경우 HttpServletResponse를 사용한다
		//다른 방법
		//매개변수로 boardnum이 아닌 savedfile을 받으면 DB에 갈 필요가 없다. String fullpath부분부터 바로 하면 된다.
		
		//한개의 글을 가져옴
		User user = sr.selectUser((String) session.getAttribute("loginId"));
		
		String originalfile = user.getUser_picture();
		
		//사용자 측에서 다운로드 받도록 하기 위해서
		//response 객체의 헤더를 조작함, 웹페이지 개발자모드(F12)의 Head에서 확인할수 있다
		//text/html에서 파일 다운로드 가능한 형태로 변경
		try {
			response.setHeader("Content-Disposition", 
					"attachment;filename="+URLEncoder.encode(originalfile, "UTF-8")); //첫번째 매개변수 : 실제로 받아야하는 아이
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		String fullpath = uploadPath+"/"+user.getUser_picture();
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
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
