package global.sesoc.jazart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import global.sesoc.jazart.dao.ChartRepository;
import global.sesoc.jazart.vo.SongInfo;

@Controller
public class ChartController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	ChartRepository cr;
	@Autowired
	HttpSession session;

	@RequestMapping(value = "realtimeChart", method = RequestMethod.GET)
	public String realtimect() {
		logger.info("> realtime chart");
		ArrayList<SongInfo> cList = cr.chartList("rc");
		session.setAttribute("chartList", cList);
		return "chart/realtimeChart";
	}

	@RequestMapping(value = "dailyChart", method = RequestMethod.GET)
	public String dayilyct() {
		logger.info("> daily chart");
		ArrayList<SongInfo> cList = cr.chartList("dc");
		session.setAttribute("chartList", cList);
		return "chart/dailyChart";
	}

	@RequestMapping(value = "weeklyChart", method = RequestMethod.GET)
	public String weekilyct() {
		logger.info("> weekly chart");
		ArrayList<SongInfo> cList = cr.chartList("wc");
		session.setAttribute("chartList", cList);
		return "chart/weeklyChart";
	}
}
