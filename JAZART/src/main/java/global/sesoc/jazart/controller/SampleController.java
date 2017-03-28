package global.sesoc.jazart.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import global.sesoc.jazart.dao.SampleRepository;
import global.sesoc.jazart.vo.Boardreply;
import global.sesoc.jazart.vo.Songreply;


/**
 * Handles requests for the application home page.
 */
@Controller
public class SampleController {
   
   private static final Logger logger = LoggerFactory.getLogger(SampleController.class);

   @Autowired
   SampleRepository zr;
   @Autowired
   HttpSession session;

   /**
    * Simply selects the home view to render by returning its name.
    */
   @RequestMapping(value = "board_replyList", method = RequestMethod.GET)
   public @ResponseBody ArrayList<Boardreply> replyList(int boardNum) {
	  logger.info("replyList boardNum=> "+boardNum);
      ArrayList<Boardreply> replyList = zr.boardReply(boardNum);
      return replyList;
   }
   
   @RequestMapping(value = "board_leaveReply", method = RequestMethod.GET)
   public @ResponseBody int leaveReply(Boardreply boardreply) {
	   boardreply.setReply_nickname((String) session.getAttribute("loginNickname"));
	   logger.info("boardreply=> "+boardreply);
	   int result = zr.insertBoardreply(boardreply);
	   return result;
   }
   
   @RequestMapping(value = "board_updateReply", method = RequestMethod.GET)
   public @ResponseBody int updateReply(Boardreply reply) {
	   int result = zr.updateBoardreply(reply);
	   return result;
   }
   
   @RequestMapping(value = "board_deleteReply", method = RequestMethod.GET)
   public @ResponseBody int deleteReply(int replynum) {
	   int result = zr.deleteBoardreply(replynum);
	   return result;
   }
 
   @RequestMapping(value = "board_recommendReply", method = RequestMethod.GET)
   public @ResponseBody int recommendReply(int replynum) {
	   int result = 0;
	   String loginNickname = (String) session.getAttribute("loginNickname");
	   int report = zr.selectRecommend(replynum, loginNickname);
	   if (report == 1) {
		   return result; 
	   } else {
		   result = zr.recommendBoardreply(replynum, loginNickname);
		   return result;   
	   }
   }
   
}