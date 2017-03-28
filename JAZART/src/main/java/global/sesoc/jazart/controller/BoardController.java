package global.sesoc.jazart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import global.sesoc.jazart.dao.BoardRepository;
import global.sesoc.jazart.vo.Board;


/**
 * Handles requests for the application home page.
 */
@Controller
@SessionAttributes("boardNum")
public class BoardController {
   //1
   private static final Logger logger = LoggerFactory.getLogger(UserController.class);

   @Autowired
   BoardRepository br;
   @Autowired
   HttpSession session;

   /**
    * Simply selects the home view to render by returning its name.
    */
   @RequestMapping(value = "music_community", method = RequestMethod.GET)
   public String musicBoard() {
      return "musicBoard";
   }

   @RequestMapping(value = "free_community", method = RequestMethod.GET)
   public String boardList(Model model) {

      ArrayList<Board> bList = new ArrayList<>();

      bList = br.boardList();
      model.addAttribute("bList", bList);
      return "freeCommunity";
   }

   // 글 쓰기 폼
   @RequestMapping(value = "write", method = RequestMethod.GET)
   public String write() {
      return "write";
   }

   @RequestMapping(value = "write", method = RequestMethod.POST)
   public String write(Board board, Model model) {
      String loginNickname = (String) session.getAttribute("loginNickname");
      if (loginNickname == null) {
         return "redirect:/login";
      }

      board.setBoard_nickname(loginNickname);
      br.write(board);
      return "redirect:/free_community";
   }
   @RequestMapping(value="board_read", method=RequestMethod.GET)
   public String read(int boardNum, Model model){
      Board board = br.selectList(boardNum);
      if(board == null){
         return "redirect:free_community";
      }
      model.addAttribute("board",board);
      return "read";
   }
   
	@RequestMapping(value="boardUpdate", method=RequestMethod.GET)
	public String boardUpdate(Model model){
	
		
		
		return "boardUpdate";
	}
	
	@RequestMapping(value="boardUpdate", method=RequestMethod.POST)
	public String boardUpdate(Board board){	
		
		return "redirect:free_community";
	}
	
	@RequestMapping(value="boardDelete", method=RequestMethod.GET)
	public String boardDelete(int boardNum){
		int result = 0;
		result = br.deleteBoard(boardNum);
		logger.info("삭제 결과 : " + result);
		return "redirect:/free_community";
	}
	
	@RequestMapping(value = "archive-chart.html", method = RequestMethod.GET)
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
	}
}