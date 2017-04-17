package global.sesoc.jazart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;

import global.sesoc.jazart.dao.ChartRepository;
import global.sesoc.jazart.dao.UserRepository;
import global.sesoc.jazart.utility.FileService;
import global.sesoc.jazart.utility.PageNavigator;
import global.sesoc.jazart.utility.SendMailTest;
import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserRepository ur;
	@Autowired
	ChartRepository cr;
	@Autowired
	HttpSession session;
	
	final int countPerPage = 10; // 페이지당 글 수
	final int pagePerGroup = 5; // 페이지 그룹에 표시되는 그룹 수

	final String uploadPath = "/userProfile"; // 파일이 업로드 되는 경로

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		logger.info("> weekly chart");

		int total = cr.weeklyCount();

		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
		int start = navi.getStartRecord(); // 1,11,21
		int end = start + countPerPage - 1; // 10,20,30
		logger.info("페이징재료page,start,end=> " + page + ", " + start + ", " + end);

		ArrayList<SongInfo> cList = cr.allList(start, end);
		model.addAttribute("all", cList);
		ArrayList<SongInfo> cList2 = cr.chartList("wc", start, end);
		model.addAttribute("wc", cList2);
		model.addAttribute("navi", navi); // 페이징을 위해서
		return "home";
	}

	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String login() {
		return "user/login";
	}

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(String userid, String password, Model model) {
		User loginUser = ur.selectUser(userid);
		if (loginUser == null) {
			model.addAttribute("message", "fail");
			return "user/login";
		}

		if (loginUser.getUser_pw().equals(password)) {
			model.addAttribute("message", "success");
			session.setAttribute("loginId", loginUser.getUser_id());
			session.setAttribute("loginNickname", loginUser.getUser_nickname());
			return "redirect:/";
		} else {
			model.addAttribute("message", "fail");
			return "user/login";
		}
	}

	@RequestMapping(value = "join", method = RequestMethod.GET)
	public String join() {
		return "user/join";
	}

	@RequestMapping(value = "joinCheck", method = RequestMethod.GET)
	public @ResponseBody String joinCheck(User user) {
		String result = ur.joinCheck(user);
		return result;
	}

	@RequestMapping(value = "join", method = RequestMethod.POST)
	public String join(User user, MultipartFile upload) {
		String userName = user.getUser_nickname();
		String type = "u_";
		
		// 첨부된 파일을 처리
		if (!upload.isEmpty()) {
			String savedfile = FileService.saveFile(upload, uploadPath, type);
			user.setUser_picture(savedfile);
		} else {
			user.setUser_picture("default.jpg");
		}
		ur.regist(user);
		return "redirect:/";
	}

	@RequestMapping(value = "logout", method = RequestMethod.GET)
	public String logout(SessionStatus sessionStatus) {
		sessionStatus.setComplete();
		session.invalidate();
		return "redirect:/";
	}

	@RequestMapping(value = "about", method = RequestMethod.GET)
	public String about() {

		return "user/about";
	}

	@RequestMapping(value = "qna", method = RequestMethod.GET)
	public String qna() {
		return "user/qna";
	}

	@RequestMapping(value = "question", method = RequestMethod.GET)
	public String question() {
		return "user/question";
	}
	
	@RequestMapping(value = "sitemap", method = RequestMethod.GET)
	public String sitemap() {
		return "user/siteMap";
	}

	@RequestMapping(value = "accept", method = RequestMethod.POST)
	public String accept(String title, String contents) {
		logger.info("accept result : " + title + "," + contents);
		String user_id = (String) session.getAttribute("loginId");
		User user = ur.selectUser(user_id);
		String user_email = user.getUser_email();
		
		
		SendMailTest mail = new SendMailTest();
		mail.main(user_id, user_email, title, contents);
		return "redirect:/";
	}
}