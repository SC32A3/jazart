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

import global.sesoc.jazart.dao.BoardRepository;
import global.sesoc.jazart.vo.Board;

/**
 * Handles requests for the application home page.
 */
@Controller
public class BoardController {
	
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
	
	
	@RequestMapping(value="free_community",method=RequestMethod.GET)
	//@RequestParam(value="page", defaultValue="1") int page
	//request값으로 넘어오는 int page가 없으면 1로 지정
	public String boardList(Model model){
		ArrayList<Board> bList =br.boardList();
		model.addAttribute("bList",bList);
		logger.info(bList.toString());
		return "freeCommunity";
	}
	
	//글 쓰기 폼
		@RequestMapping(value = "write", method = RequestMethod.GET)
		public String write(){
			return "write";
		}
		
		@RequestMapping(value = "write", method = RequestMethod.POST)
		public String write(Board board, Model model){
			String id= (String) session.getAttribute("loginNickname");
			if(id==null){
				//session에 아이디 없으면 
				//customer/loginform으로 보내버린다.
				return "redirect:/login";
			}
			
			board.setBoard_nickname(id);
			br.write(board);
			return "redirect:freeCommunity";

		}
}
