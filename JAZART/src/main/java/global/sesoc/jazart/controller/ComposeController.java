package global.sesoc.jazart.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import global.sesoc.jazart.dao.UserRepository;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ComposeController {
	
	private static final Logger logger = LoggerFactory.getLogger(ComposeController.class);
	
	@Autowired
	UserRepository sr;
	@Autowired
	HttpSession session;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/compose", method = RequestMethod.GET)
	public String compose() {
		return "compose";
	}
	
	
	@RequestMapping(value = "/mixing", method = RequestMethod.GET)
	public String mixing() {
		return "mixing";
	}
	
	@RequestMapping(value = "/songpage", method = RequestMethod.GET)
	public String songpage() {
		return "songpg";
	}
	
	@RequestMapping(value = "/artistpage", method = RequestMethod.GET)
	public String artistpage(Model model) {
		String nickname = (String) session.getAttribute("loginNickname");
		
		
		return "artistpg";
	}
}
