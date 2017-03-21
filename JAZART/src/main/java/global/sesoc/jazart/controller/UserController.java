package global.sesoc.jazart.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

	@RequestMapping(value = "join", method = RequestMethod.POST)
	public String join(User user, MultipartFile upload) {
		logger.info(user.toString());
		String userName = user.getUser_nickname();
		
		// 첨부된 파일을 처리
		if (!upload.isEmpty()) {
			String savedfile = FileService.saveFile(upload, uploadPath, userName);
			
			//			board.setOriginalfile(upload.getOriginalFilename());
//			board.setSavedfile(savedfile);
		} else {
			user.setUser_picture("x");
		}

		sr.regist(user);

		return "join";
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(SessionStatus sessionStatus) {
		sessionStatus.setComplete();
		session.invalidate();
		return "redirect:/";
	}
}
