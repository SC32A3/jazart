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
import org.springframework.web.bind.annotation.ResponseBody;

import global.sesoc.jazart.dao.BoardRepository;
import global.sesoc.jazart.utility.PageNavigator;
import global.sesoc.jazart.vo.Board;
import global.sesoc.jazart.vo.BoardReply;


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
   @RequestMapping(value = "musicBoard", method = RequestMethod.GET)
   public String musicBoard() {
      return "board/musicBoard";
   }

   @RequestMapping(value = "commBoard", method = RequestMethod.GET)
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
      
      return "board/commBoard";
   }

   // 글 쓰기 폼
   @RequestMapping(value = "boardWrite", method = RequestMethod.GET)
   public String write() {
      return "board/boardWrite";
   }

   @RequestMapping(value = "boardWrite", method = RequestMethod.POST)
   public String write(Board board, Model model) {
      String loginNickname = (String) session.getAttribute("loginNickname");
      if (loginNickname == null) {
         return "redirect:/login";
      }

      board.setBoard_nickname(loginNickname);
      br.write(board);
      return "redirect:/commBoard";
   }
   
   @RequestMapping(value="boardRead", method=RequestMethod.GET)
   public String read(int boardNum, Model model){
      Board board = br.selectList(boardNum);
      br.addHits(boardNum);
      if(board == null){
         return "redirect:commBoard";
      }
      model.addAttribute("boardNum", boardNum);
      model.addAttribute("board",board);
      return "board/boardRead";
   }
   
	@RequestMapping(value="boardUpdate", method=RequestMethod.GET)
	public String boardUpdate(Model model, int boardNum){
		Board board = br.selectList(boardNum);
		model.addAttribute("board", board);
		logger.info("보드컨트롤러업데이트"+board);
		return "board/boardUpdate";
	}
	
	@RequestMapping(value="boardUpdate", method=RequestMethod.POST)
	public String boardUpdate(Board board){	
		String loginNickname = (String) session.getAttribute("loginNickname");
		board.setBoard_nickname(loginNickname);
		br.updateBoard(board);
		logger.info("보드컨트롤러업데이트2"+board);
		return "redirect:/commBoard";
	}
	
	@RequestMapping(value="boardDelete", method=RequestMethod.GET)
	public String boardDelete(int boardNum){
		int result = 0;
		result = br.deleteBoard(boardNum);
		logger.info("삭제 결과 : " + result);
		return "redirect:/commBoard";
	}
	
	@RequestMapping(value = "boardReplyList", method = RequestMethod.GET)
	   public @ResponseBody ArrayList<BoardReply> replyList(int boardNum) {
		  logger.info("replyList boardNum=> "+boardNum);
	      ArrayList<BoardReply> replyList = br.boardReply(boardNum);
	      return replyList;
	   }
	   
	   @RequestMapping(value = "boardLeaveReply", method = RequestMethod.GET)
	   public @ResponseBody int leaveReply(BoardReply boardreply) {
		   boardreply.setReply_nickname((String) session.getAttribute("loginNickname"));
		   logger.info("boardreply=> "+boardreply);
		   int result = br.insertBoardReply(boardreply);
		   return result;
	   }
	   
	   @RequestMapping(value = "boardUpdateReply", method = RequestMethod.GET)
	   public @ResponseBody int updateReply(BoardReply reply) {
		   int result = br.updateBoardReply(reply);
		   return result;
	   }
	   
	   @RequestMapping(value = "boardDeleteReply", method = RequestMethod.GET)
	   public @ResponseBody int deleteReply(int replynum) {
		   int result = br.deleteBoardReply(replynum);
		   return result;
	   }
	 
	   @RequestMapping(value = "boardRecommendReply", method = RequestMethod.GET)
	   public @ResponseBody int recommendReply(int replynum) {
		   int result = 0;
		   String loginNickname = (String) session.getAttribute("loginNickname");
		   int report = br.selectRecommend(replynum, loginNickname);
		   if (report == 1) {
			   return result; 
		   } else {
			   result = br.recommendBoardReply(replynum, loginNickname);
			   return result;   
		   }
	   }
}