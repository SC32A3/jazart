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

import global.sesoc.jazart.dao.SampleRepository;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ComposeController {
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	SampleRepository sr;
	@Autowired
	HttpSession session;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/compose", method = RequestMethod.GET)
	public String compose() {
		return "test";
	}
}
