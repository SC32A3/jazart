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
import org.springframework.web.bind.annotation.RequestParam;

import global.sesoc.jazart.dao.BoardRepository;
import global.sesoc.jazart.utility.PageNavigator;
import global.sesoc.jazart.vo.Board;


/**
 * Handles requests for the application home page.
 */
@Controller
public class BoardController {
 
   private static final Logger logger = LoggerFactory.getLogger(BoardController.class);
   final int countPerPage = 10;
   final int pagePerGroup = 5;
   
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
   public String boardList(Model model, @RequestParam(value = "searchTitle", defaultValue = "") String searchTitle,
			@RequestParam(value = "searchText", defaultValue = "") String searchText,
			@RequestParam(value = "page", defaultValue = "1") int page) {
	  int total = br.getCount(searchTitle, searchText);
	  PageNavigator navi = new PageNavigator(countPerPage, pagePerGroup, page, total);
	  
      ArrayList<Board> bList = br.boardList(searchTitle, searchText, navi);
      model.addAttribute("bList", bList);
      model.addAttribute("searchText", searchText);
	  model.addAttribute("searchTitle", searchTitle);
	  model.addAttribute("total", total);
	  model.addAttribute("navi", navi);
      
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
      br.addHits(boardNum);
      if(board == null){
         return "redirect:free_community";
      }
      model.addAttribute("boardNum", boardNum);
      model.addAttribute("board",board);
      return "read";
   }
   
	@RequestMapping(value="boardUpdate", method=RequestMethod.GET)
	public String boardUpdate(Model model, int boardNum){
		Board board = br.selectList(boardNum);
		model.addAttribute("board", board);
		logger.info("보드컨트롤러업데이트"+board);
		return "boardUpdate";
	}
	
	@RequestMapping(value="boardUpdate", method=RequestMethod.POST)
	public String boardUpdate(Board board){	
		String loginNickname = (String) session.getAttribute("loginNickname");
		board.setBoard_nickname(loginNickname);
		br.updateBoard(board);
		logger.info("보드컨트롤러업데이트2"+board);
		return "redirect:free_community";
	}
	
	@RequestMapping(value="boardDelete", method=RequestMethod.GET)
	public String boardDelete(int boardNum){
		int result = 0;
		result = br.deleteBoard(boardNum);
		logger.info("삭제 결과 : " + result);
		return "redirect:/free_community";
	}
}