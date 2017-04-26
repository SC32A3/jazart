package global.sesoc.jazart.controller;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.StringTokenizer;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
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

	@RequestMapping(value = "test", method = RequestMethod.GET)
	public String test() {
		return "compose/test";
	}

	@RequestMapping(value = "mySrc", method = RequestMethod.GET)
	public String mySrc() {
		return "compose/mySource";
	}

	@RequestMapping(value = "compose", method = RequestMethod.GET)
	public String compose() {
		try {
			Runtime.getRuntime().exec("control mmsys.cpl sounds");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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

	@RequestMapping(value = "addSongList", method = RequestMethod.GET)
	public @ResponseBody int addSongList(int songnum) {
		int result = 0;
		logger.info("controller in");
		String loginNickname = (String) session.getAttribute("loginNickname");
		if (loginNickname == null) {
			return 3;
		}
		User user = ur.selectUser(loginNickname);
		result = ur.addSongList(songnum, user.getUser_id());
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
	public String songPopup(Model model, int songnum) {
		ArrayList<SongInfo> playlist = null;
		if (songnum == 0) {
			String userId = (String) session.getAttribute("loginId");
			playlist = ur.playlist(userId);
			model.addAttribute("playlist", playlist);
			return "user/songPopup";
		} else {
			playlist = ur.getPlayOne(songnum);
			model.addAttribute("playlist", playlist);
			return "user/songPopup";
		}
	}

	@RequestMapping(value = "deleteSongList", method = RequestMethod.GET)
	public @ResponseBody int deleteSongList(Model model, int songnum) {
		String user_id = (String) session.getAttribute("loginId");
		int result = ur.deleteSongList(user_id, songnum);
		return result;
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
					String savedfile = FileService.saveFile(multipartFile, uploadPath3, type);

					list.add(savedfile);
					logger.info("getSize : " + multipartFile.getSize());
					logger.info("getTime : " + multipartFile.getSize() * 8 / 52 / 1000);
					pw.print("{\"id\":\"" + (i + 1) + "\",\"url\":\"src/data/samples/" + savedfile
							+ "\",\"track\":\"1\",\"startTime\":[],\"duration\":"
							+ multipartFile.getSize() * 8 / 52 / 1000 + "}");

					/*
					 * (multipartFile.getBytes().length * ( 3.8399999141693115 /
					 * 338732) * 8)+"\"}"); logger.info("계산된 길이 : " +
					 * multipartFile.getBytes().length * ( 3.8399999141693115 /
					 * 338732) * 8);
					 */

					File d = new File(uploadPath3 + "/" + savedfile);
					logger.info("1: " + uploadPath3 + "/" + savedfile);
					File e = new File(request.getServletContext().getRealPath

					("src/data/samples/") + savedfile);
					logger.info("2 " + request.getServletContext().getRealPath

					("src/data/samples/") + savedfile);
					FileInputStream fis = new FileInputStream(d);
					FileOutputStream fos = new FileOutputStream(e);
					FileCopyUtils.copy(fis, fos);
					fis.close();
					fos.close();
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
			e.printStackTrace();
		}
		return "compose/mixing";
	}

	@RequestMapping(value = "savePage", method = RequestMethod.GET)
	public String savePage() {
		return "compose/savePage";
	}

	@RequestMapping(value = "saveSong", method = RequestMethod.POST)
	public String saveSong() {
		return "home";
	}

	@RequestMapping(value = "test2", method = RequestMethod.GET)
	public String test2(Model model) {
		File dd = new File("c:\\Test\\");
		ArrayList<File> fList = new ArrayList<>();
		for (File file : dd.listFiles()) {
			if (!file.isDirectory()) {
				fList.add(file);
			}
		}

		ArrayList<String> sList = new ArrayList<>();
		sList.add("1");
		sList.add("2");
		sList.add("3");
		model.addAttribute("sList", sList);
		model.addAttribute("fList", fList);
		return "compose/test2";
	}

	@RequestMapping(value = "piano", method = RequestMethod.GET)
	public String piano() {
		return "compose/piano";
	}

	@RequestMapping(value = "drum", method = RequestMethod.GET)
	public String drum() {
		return "compose/drum";
	}

	@RequestMapping(value = "ajaxTest1", method = RequestMethod.GET)
	public @ResponseBody void ajaxTest1(HttpServletRequest request, HttpServletResponse response) {
		String originalfile = "test2.wav";
		String otherpath = request.getServletContext().getRealPath("src/sample/");
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		// 한개의 글을 가져옴

		fullpath = otherpath + originalfile;
		System.out.println(fullpath);
		// 사용자 측에서 다운로드 받도록 하기 위해서
		// response 객체의 헤더를 조작함, 웹페이지 개발자모드(F12)의 Head에서 확인할수 있다
		// text/html에서 파일 다운로드 가능한 형태로 변경

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
			fileout.flush();
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
		// File dd = new
		// File(request.getServletContext().getRealPath("src/sample/test2.wav"));

		System.out.println("ajaxTest COunt>");
	}

	/*
	 * @RequestMapping(value = "ajaxTest1", method = RequestMethod.GET)
	 * public @ResponseBody File ajaxTest1(HttpServletRequest request) {
	 * //ArrayList<File> result = new ArrayList<>(); File dd = new
	 * File("c:\\Test\\"); File dd = new
	 * File(request.getServletContext().getRealPath("src/sample/test2.wav"));
	 * logger.info("들어옴2"); for (File file : dd.listFiles()) { if
	 * (!file.isDirectory()) { result.add(file); } } return dd; }
	 */
	@RequestMapping(value = "test5", method = RequestMethod.GET)
	public String test5() {
		return "compose/test5";
	}

	@RequestMapping(value = "pitch", method = RequestMethod.GET)
	public String pitch() {
		return "compose/pitch";
	}
	
	@RequestMapping(value = "effect", method = RequestMethod.GET)
	public String effect() {
		return "compose/effect";
	}
}
