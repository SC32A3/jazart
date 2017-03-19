package global.sesoc.jazart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import global.sesoc.jazart.dao.SampleRepository;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SampleController {
	
	private static final Logger logger = LoggerFactory.getLogger(SampleController.class);
	
	@Autowired
	SampleRepository sr;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home() {
		return "join";
	}
	
	@RequestMapping(value = "join", method = RequestMethod.POST)
	public String join(User user) {
		logger.info(user.toString());
		
		user.setUser_picture("x");
		user.setUser_genre("x");
		sr.regist(user);
		
		return "join";
	}
}
