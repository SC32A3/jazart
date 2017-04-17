package global.sesoc.jazart.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.StringTokenizer;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import global.sesoc.jazart.dao.SongRepository;
import global.sesoc.jazart.dao.UserRepository;
import global.sesoc.jazart.utility.FileService;
import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.SongReply;
import global.sesoc.jazart.vo.User;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ComposeController {

	private static final Logger logger = LoggerFactory.getLogger(ComposeController.class);

	@Autowired
	UserRepository ur;
	@Autowired
	SongRepository sr;
	@Autowired
	HttpSession session;

	final String uploadPath = "/userProfile"; // 파일이 업로드 되는 경로
	final String uploadPath2 = System.getProperty("user.home") + "/downloads"; // 내
																				// 녹음이
																				// 업로드되는
																				// 경로
	final String uploadPath3 = "/userRecording"; // 내 녹음이 서버에 이전 되는 경로

	@RequestMapping(value = "compose", method = RequestMethod.GET)
	public String compose() {
		return "compose/compose";
	}

	@RequestMapping(value = "mixing", method = RequestMethod.GET)
	public String mixing() {
		return "compose/mixing";
	}

	@RequestMapping(value = "songPage", method = RequestMethod.GET)
	public String songpage(int songnum, Model model) {
		logger.info("songPage replynum=> " + songnum);
		SongInfo song = sr.selectSong(songnum);
		ArrayList<SongReply> replyList = sr.songReply(songnum);
		model.addAttribute("song", song);
		model.addAttribute("songReply", replyList);
		return "user/songPage";
	}

	@RequestMapping(value = "songReplyList", method = RequestMethod.GET)
	public @ResponseBody ArrayList<SongReply> replyList(int songnum) {
		logger.info("replyList songnum=> " + songnum);
		ArrayList<SongReply> replyList = sr.songReply(songnum);
		return replyList;
	}

	@RequestMapping(value = "artistPage", method = RequestMethod.GET)
	public String artistpage(Model model, String song_nickname) {
		if (song_nickname != null) {
			User user = ur.selectUser(song_nickname);
			model.addAttribute("user", user);
			ArrayList<SongInfo> songsByArtist = ur.songsByArtist(song_nickname);
			model.addAttribute("songs", songsByArtist);
			return "user/artistPage";
		} else {
			String loginNickname = (String) session.getAttribute("loginNickname");
			User user = ur.selectUser(loginNickname);
			model.addAttribute("user", user);
			ArrayList<SongInfo> songsByArtist = ur.songsByArtist(loginNickname);
			model.addAttribute("songs", songsByArtist);
			return "user/artistPage";
		}
	}

	@RequestMapping(value = "download", method = RequestMethod.GET)
	public String download(String type, String data, HttpServletResponse response) {
		logger.info("다운로드type,data" + type + ", " + data);
		String originalfile = "";
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		// 한개의 글을 가져옴
		if (type.equals("song")) {
			int songnum = Integer.parseInt(data);
			SongInfo song = sr.selectSong(songnum);
			originalfile = song.getSong_picture();
		} else if (type.equals("user")) {
			originalfile = data;
		} else if (type.equals("music")) {
			StringTokenizer token = new StringTokenizer(data, "?");
			String data2 = token.nextToken();
			originalfile = data2;
		}

		fullpath = uploadPath + "/" + originalfile;
		// 사용자 측에서 다운로드 받도록 하기 위해서
		// response 객체의 헤더를 조작함, 웹페이지 개발자모드(F12)의 Head에서 확인할수 있다
		// text/html에서 파일 다운로드 가능한 형태로 변경

		if (type.equals("rec")) {
			originalfile = data;
			fullpath = uploadPath2 + "/" + originalfile;
		}

		try {
			response.setHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode(originalfile, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}

		// (웹유저) <---servletOutputStream(출력)---- (서버(웹프로젝트 주체))
		// <--FileInputStream(입력)-- (하드 rose.jpg)
		try {
			filein = new FileInputStream(fullpath);
			fileout = response.getOutputStream();
			// Spring에서 제공하는 유틸리티
			FileCopyUtils.copy(filein, fileout);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (filein != null)
					filein.close();
				if (fileout != null)
					fileout.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	@RequestMapping(value = "songRecommend", method = RequestMethod.POST)
	public @ResponseBody int recommend(int songnum) {
		String loginNickname = (String) session.getAttribute("loginNickname");
		if (loginNickname == null) {
			return 3;
		}
		int result = sr.recommend(songnum, loginNickname);
		return result;
	}

	@RequestMapping(value = "songLeaveReply", method = RequestMethod.GET)
	public @ResponseBody int leaveReply(SongReply songreply) {
		songreply.setReply_nickname((String) session.getAttribute("loginNickname"));
		logger.info("songreply=> " + songreply);
		int result = sr.insertSongReply(songreply);
		return result;
	}

	@RequestMapping(value = "songDeleteReply", method = RequestMethod.GET)
	public @ResponseBody int deleteReply(int replynum) {
		int result = sr.deleteSongReply(replynum);
		return result;
	}

	@RequestMapping(value = "songUpdateReply", method = RequestMethod.GET)
	public @ResponseBody int updateReply(SongReply reply) {
		int result = sr.updateSongReply(reply);
		return result;
	}

	@RequestMapping(value = "songRecommendReply", method = RequestMethod.GET)
	public @ResponseBody int recommendReply(int replynum) {
		int result = 0;
		String loginNickname = (String) session.getAttribute("loginNickname");
		int report = sr.selectRecommend(replynum, loginNickname);
		if (report == 1) {
			return result;
		} else {
			result = sr.recommendSongReply(replynum, loginNickname);
			return result;
		}
	}

	@RequestMapping(value = "songPopup", method = RequestMethod.GET)
	public String songPopup(Model model) {
		String userId = (String) session.getAttribute("loginId");
		ArrayList<SongInfo> playlist = ur.playlist(userId);
		model.addAttribute("playlist", playlist);
		return "user/songPopup";
	}

	@RequestMapping(value = "mixing", method = RequestMethod.POST)
	public String saveRecord(MultipartHttpServletRequest request, MultipartFile[] upload, Model model) {
		ArrayList<String> list = new ArrayList<>();
		String type = "r_";

		FileWriter fw;
		try {
			fw = new FileWriter(new File(request.getServletContext().getRealPath("/src/data/samples.txt")));
			BufferedWriter bw = new BufferedWriter(fw);
			PrintWriter pw = new PrintWriter(bw);

			pw.println(
					"{\"projectInfo\":{\"tempo\":\"128\",\"tracks\":\"4\",\"effects\":[[],[],[],[]]},\"samples\": [");
			for (int i = 0; i < upload.length; i++) {
				MultipartFile multipartFile = upload[i];
				if (!multipartFile.isEmpty()) {
					// String savedfile =
					// FileService.saveFile(multipartFile,uploadPath3, type);
					String savedfile = FileService.saveFile(multipartFile,
							request.getServletContext().getRealPath("src/data/samples/"), type);
					list.add(savedfile);
					pw.print("{\"id\":\"" + (i + 1) + "\",\"url\":\"src/data/samples/" + savedfile
							+ "\",\"track\":\"1\",\"startTime\":[],\"duration\":\"3.8399999141693115\"}");
				}

				if (i != upload.length - 1) {
					pw.println(",");
				} else {
					pw.println("]}");
					pw.flush();
				}
			}
			pw.close();
			bw.close();
			model.addAttribute("srclist", list);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "compose/mixing";
	}
}
