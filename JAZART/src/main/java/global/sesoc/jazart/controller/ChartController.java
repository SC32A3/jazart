package global.sesoc.jazart.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;

import global.sesoc.jazart.dao.BoardRepository;

@Controller
@SessionAttributes("boardNum")
public class ChartController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	BoardRepository br;
	@Autowired
	HttpSession session;

	/*@RequestMapping(value = "archive-chart.html", method = RequestMethod.GET)
	public String realtimect() {
		return "realtimect";
	}

	@RequestMapping(value = "single-chart.html", method = RequestMethod.GET)
	public String dayilyct() {
		return "dailyct";
	}

	@RequestMapping(value = "chart.html", method = RequestMethod.GET)
	public String weekilyct() {
		return "weeklyct";
	}*/
}
