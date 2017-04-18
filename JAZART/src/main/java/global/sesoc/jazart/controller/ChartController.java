package global.sesoc.jazart.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import global.sesoc.jazart.dao.ChartRepository;
import global.sesoc.jazart.utility.PageNavigator;
import global.sesoc.jazart.vo.SongInfo;

@Controller
public class ChartController {

	private static final Logger logger = LoggerFactory.getLogger(ChartController.class);

	@Autowired
	ChartRepository cr;
	@Autowired
	HttpSession session;

	final int countPerPage = 10; // 페이지당 글 수
	final int pagePerGroup = 5; // 페이지 그룹에 표시되는 그룹 수

	@RequestMapping(value = "musicBoard", method = RequestMethod.GET)
	public String musicBoard(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		int total = cr.allCount();
		PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
		int start = navi.getStartRecord(); // 1,11,21
		int end = start + countPerPage - 1; // 10,20,30
		logger.info("뮤직보드");
		logger.info("" + total);
		ArrayList<SongInfo> cList = cr.allList(start, end);
		model.addAttribute("all", cList);
		model.addAttribute("total", total); // 글 개수 출력
		model.addAttribute("navi", navi); // 페이징을 위해서
		return "board/musicBoard";
	}

	@RequestMapping(value = "realtimeChart", method = RequestMethod.GET)
	public String realtimect(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		int total = cr.realtimeCount();
		PageNavigator navi;
		if (total == 0) {
			total = cr.allCount();
			navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
			int start = navi.getStartRecord(); // 1,11,21
			int end = start + countPerPage - 1; // 10,20,30
			ArrayList<SongInfo> cList = cr.allList(start, end);
			model.addAttribute("type", "all");
			model.addAttribute("rc", cList);
			model.addAttribute("total", total); // 글 개수 출력
			model.addAttribute("navi", navi); // 페이징을 위해서
			return "chart/realtimeChart";
		}
		navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
		int start = navi.getStartRecord(); // 1,11,21
		int end = start + countPerPage - 1; // 10,20,30

		logger.info("> realtime chart");
		ArrayList<SongInfo> cList = cr.chartList("rc", start, end);
		model.addAttribute("rc", cList);
		model.addAttribute("navi", navi); // 페이징을 위해서
		return "chart/realtimeChart";
	}

	@RequestMapping(value = "dailyChart", method = RequestMethod.GET)
	public String dailyct(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		logger.info("> daily chart");
		PageNavigator navi;
		int total = cr.dailyCount();
		if (total == 0) {
			total = cr.allCount();
			navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
			int start = navi.getStartRecord(); // 1,11,21
			int end = start + countPerPage - 1; // 10,20,30
			ArrayList<SongInfo> cList = cr.allList(start, end);
			model.addAttribute("type", "all");
			model.addAttribute("dc", cList);
			model.addAttribute("total", total); // 글 개수 출력
			model.addAttribute("navi", navi); // 페이징을 위해서
			return "chart/dailyChart";
		}
		navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
		int start = navi.getStartRecord(); // 1,11,21
		int end = start + countPerPage - 1; // 10,20,30
		logger.info("페이징재료page,start,end=> " + page + ", " + start + ", " + end);
		ArrayList<SongInfo> cList = cr.chartList("dc", start, end);
		model.addAttribute("dc", cList);
		model.addAttribute("total", total); // 글 개수 출력
		model.addAttribute("navi", navi); // 페이징을 위해서
		return "chart/dailyChart";
	}

	@RequestMapping(value = "weeklyChart", method = RequestMethod.GET)
	public String weekilyct(Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		logger.info("> weekly chart");
		PageNavigator navi;
		int total = cr.weeklyCount();
		if (total == 0) {
			total = cr.allCount();
			navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
			int start = navi.getStartRecord(); // 1,11,21
			int end = start + countPerPage - 1; // 10,20,30
			ArrayList<SongInfo> cList = cr.allList(start, end);
			model.addAttribute("type", "all");
			model.addAttribute("wc", cList);
			model.addAttribute("total", total); // 글 개수 출력
			model.addAttribute("navi", navi); // 페이징을 위해서
			return "chart/weeklyChart";
		}
		navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
		int start = navi.getStartRecord(); // 1,11,21
		int end = start + countPerPage - 1; // 10,20,30
		logger.info("페이징재료page,start,end=> " + page + ", " + start + ", " + end);
		ArrayList<SongInfo> cList = cr.chartList("wc", start, end);
		model.addAttribute("wc", cList);
		model.addAttribute("navi", navi); // 페이징을 위해서
		return "chart/weeklyChart";
	}
	@ResponseBody
	@RequestMapping(value = "dwChart", method = RequestMethod.GET)
	public Map<String, Object> dwChart(Model model, @RequestParam(value = "page", defaultValue = "1") int page,
			String type) {
		Map<String, Object> data = new HashMap<>();
		logger.info("dwChart,page,type" + page + ", " + type);
		if (type.equals("daily")) {
			int total = cr.dailyCount();
			PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
			int start = navi.getStartRecord(); // 1,11,21
			int end = start + countPerPage - 1; // 10,20,30
			logger.info("페이징재료page,start,end=> " + page + ", " + start + ", " + end);
			ArrayList<SongInfo> cList = cr.chartList("dc", start, end);
			data.put("dc", cList);
			data.put("navi", navi);
			data.put("type", type);
		}
		if (type.equals("weekly")) {
			int total = cr.weeklyCount();
			PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
			int start = navi.getStartRecord(); // 1,11,21
			int end = start + countPerPage - 1; // 10,20,30
			logger.info("페이징재료page,start,end=> " + page + ", " + start + ", " + end);
			ArrayList<SongInfo> cList = cr.chartList("wc", start, end);
			data.put("dc", cList);
			data.put("navi", navi);
			data.put("type", type);
		}
		return data;
	}
}
