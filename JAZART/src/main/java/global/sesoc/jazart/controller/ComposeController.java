package global.sesoc.jazart.controller;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;

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
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import global.sesoc.jazart.dao.SongRepository;
import global.sesoc.jazart.dao.UserRepository;
import global.sesoc.jazart.detect.PolyphonicPitchDetection;
import global.sesoc.jazart.utility.FileService2;
import global.sesoc.jazart.vo.SongInfo;
import global.sesoc.jazart.vo.SongReply;
import global.sesoc.jazart.vo.User;
import global.sesoc.jazart.vo.Userlist;

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
	final String uploadPath2 = System.getProperty("user.home") + "/downloads"; // 브라우저
	final String uploadPath3 = "/userSource"; // 서버 레코딩 경로
	final String uploadPath4 = "/userComplete"; // 서버 레코딩 경로
	final String beatFolder1 = "/MusicSource/ballad1"; //추천비트 경로1 고급(lev0)
	final String beatFolder2 = "/MusicSource/disco1"; //추천비트 경로2 초급(lev1)

	@RequestMapping(value = "start", method = RequestMethod.GET)
	public String start() {
		return "compose/start";
	}

	@RequestMapping(value = "mySrc", method = RequestMethod.POST)
	public String mySrc(MultipartFile[] upload2, Model model, int songnum) {
		logger.info("mySrc songnum: " + songnum);
		model.addAttribute("songnum", songnum);
		File recordingData = new File(uploadPath3);

		if (!recordingData.exists()) {
			recordingData.mkdir();
		}

		for (int i = 0; i < upload2.length; i++) {
			MultipartFile multipartFile = upload2[i];
			if (!multipartFile.isEmpty()) {
				String originalFile = multipartFile.getOriginalFilename();
				String savedfile = FileService2.saveFile(multipartFile, uploadPath3);
				Userlist userlist = new Userlist(0, songnum, "record", originalFile, savedfile);
				int result = sr.insertSongdata(userlist);
				logger.info("saved record => " + savedfile);
			}
		}
		return "compose/mySource";
	}

	@RequestMapping(value = "effect_ui", method = RequestMethod.POST)
	public String effect_ui(MultipartFile[] upload2, Model model, int songnum, HttpServletRequest request,
			HttpServletResponse response) {
		logger.info("effect songnum: " + songnum);
		model.addAttribute("songnum", songnum);
		File recordingData = new File(uploadPath3);
		FileOutputStream fileout = null;
		FileInputStream filein = null;

		if (!recordingData.exists()) {
			recordingData.mkdir();
		}

		for (int i = 0; i < upload2.length; i++) {
			MultipartFile multipartFile = upload2[i];
			if (!multipartFile.isEmpty()) {
				String originalFile = multipartFile.getOriginalFilename();
				String savedfile = FileService2.saveFile(multipartFile, uploadPath3);
				Userlist userlist = new Userlist(0, songnum, "source", originalFile, savedfile);
				int result = sr.insertSongdata(userlist);
				logger.info("saved record => " + savedfile);
			}
		}
		ArrayList<String> recordList = sr.selectSongdata(songnum, "record");
		ArrayList<String> sourceList = sr.selectSongdata(songnum, "source");
		ArrayList<String> recordList2 = sr.selectSongdata2(songnum, "record");
		ArrayList<String> sourceList2 = sr.selectSongdata2(songnum, "source");

		for (String string : recordList2) {
			try {
				filein = new FileInputStream(uploadPath3 + "/" + string);
				fileout = new FileOutputStream(
						request.getServletContext().getRealPath("resources/effect/example/audio/samples/" + string));
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
		}

		for (String string : sourceList2) {
			try {
				filein = new FileInputStream(uploadPath3 + "/" + string);
				fileout = new FileOutputStream(
						request.getServletContext().getRealPath("resources/effect/example/audio/samples/" + string));
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
		}
		model.addAttribute("songnum", songnum);
		model.addAttribute("recordList", recordList);
		model.addAttribute("sourceList", sourceList);

		return "compose/effect_ui";
	}

	@RequestMapping(value = "compose", method = RequestMethod.GET)
	   public String compose(int lev) {
	      session.setAttribute("lev", lev);
	      System.out.println(lev);
	      return "compose/compose";
	   }
	
	

	@RequestMapping(value = "mixing", method = RequestMethod.GET)
	public String mixing() {
		return "compose/mixing";
	}

	@RequestMapping(value = "done", method = RequestMethod.POST)
	public String done(MultipartFile upload, Model model, HttpServletRequest request, int songnum) {

		//for (int i = 0; i < upload.length; i++) {
			//MultipartFile multipartFile = upload[i];
			if (!upload.isEmpty()) {
				String originalFile = upload.getOriginalFilename();
				String savedfile = FileService2.saveFile(upload, uploadPath3);
				int result = sr.updateSongInfo2(songnum, originalFile, savedfile);
			}
		//}
		
		SongInfo song = sr.selectSong(songnum);
		logger.info("doneSonginfo >> "+song);
		model.addAttribute("song", song);
		return "compose/done";
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
		String savedfile = "";
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;

		File profileData = new File(uploadPath);
		if (!profileData.exists()) {
			profileData.mkdir();
		}

		if (type.equals("song")) {
			int songnum = Integer.parseInt(data);
			SongInfo song = sr.selectSong(songnum);
			originalfile = song.getSong_picture();
			savedfile = song.getSong_savedpic();
			fullpath = uploadPath3 + "/" + savedfile;
		} else if (type.equals("user")) {
			User user = ur.selectUser(data); // user_id;
			originalfile = user.getUser_picture();
			savedfile = user.getUser_savedpic();
			fullpath = uploadPath + "/" + savedfile;
		} else if (type.equals("music")) {
			int songnum = 0;
			try {
				songnum = Integer.parseInt(data);
			} catch (Exception e) {
				songnum = Integer.parseInt(data.split("\\?")[0]);
			}
			SongInfo song = sr.selectSong(songnum);
			originalfile = song.getSong_file();
			savedfile = song.getSong_savedfile();
			fullpath = uploadPath3 + "/" + savedfile;
			System.out.println(fullpath);
		} else if (type.equals("rec")) {
			savedfile = data;
			fullpath = uploadPath3 + "/" + savedfile;
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
		ArrayList<SongInfo> playlist = null;
		String userId = (String) session.getAttribute("loginId");
		if (userId == null) {
			return 3;
		}
		playlist = ur.playlist(userId);
		for (SongInfo songinfo : playlist) {
			if (songinfo.getSongnum() == songnum) {
				return 2;
			}
		}
		result = ur.addSongList(songnum, userId);
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
			System.out.println(playlist.get(0).getSongnum());
			model.addAttribute("playlist", playlist);
			return "user/songPopup";
		} else {
			playlist = ur.getPlayOne(songnum);
			model.addAttribute("playlist", playlist);
			return "user/songPopup";
		}
	}

	@RequestMapping(value = "deleteSongList", method = RequestMethod.GET)
	public @ResponseBody int deleteSongList(Model model, int songnum, String play_inputdate) {
		String user_id = (String) session.getAttribute("loginId");
		int result = ur.deleteSongList(user_id, songnum);
		return result;
	}

	@RequestMapping(value = "saveSong", method = RequestMethod.POST)
	public String saveSong() {
		return "home";
	}

	@RequestMapping(value = "piano", method = RequestMethod.GET)
	public String piano() {
		return "compose/piano";
	}

	@RequestMapping(value = "drum", method = RequestMethod.GET)
	public String drum() {
		return "compose/drum";
	}

	@RequestMapping(value = "mixerPage", method = RequestMethod.POST)
	public String test2(MultipartFile[] upload, Model model, HttpServletRequest request, int songnum) {
		logger.info("mixerPage songnum>> " + songnum);
		model.addAttribute("songnum", songnum);

		for (int i = 0; i < upload.length; i++) {
			MultipartFile multipartFile = upload[i];
			if (!multipartFile.isEmpty()) {
				String originalFile = multipartFile.getOriginalFilename();
				String savedfile = FileService2.saveFile(multipartFile, uploadPath3);
				Userlist userlist = new Userlist(0, songnum, "source", originalFile, savedfile);
				int result = sr.insertSongdata(userlist);
				logger.info("saved record => " + savedfile);
			}
		}

		return "compose/mixerPage";
	}

	@RequestMapping(value = "mixerWorks", method = RequestMethod.POST)
	public @ResponseBody void ajaxTest1(String data, HttpServletRequest request, HttpServletResponse response) {
		System.out.println("data: " + data);
		String originalfile = sr.selectSongdata4(data, (int) session.getAttribute("songnum"));
		// String otherpath =
		// request.getServletContext().getRealPath("src/sample/");
		File fileDirectory = new File(uploadPath3);
		String otherpath = fileDirectory.getAbsolutePath();
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		// 한개의 글을 가져옴

		fullpath = otherpath + "/" + originalfile;
		System.out.println("풀패스: " + fullpath);
		try {
			response.setHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode(originalfile, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		try {
			filein = new FileInputStream(fullpath);
			fileout = response.getOutputStream();
			fileout.flush();
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
		System.out.println("ajaxTest COunt>");
	}

	@RequestMapping(value = "mixerWorks2", method = RequestMethod.POST)
	public @ResponseBody void ajaxTest2(String data, HttpServletRequest request, HttpServletResponse response) {
		System.out.println("data: " + data);
		String path = "";
		
		int lev = (int) session.getAttribute("lev");
		System.out.println("lev: " + lev);
		if (lev == 0) {
			path = beatFolder1;
		} else if (lev == 1){
			path = beatFolder2;
		}
		
		File filePath = new File(path);
		
		String otherpath = filePath.getAbsolutePath();
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		// 한개의 글을 가져옴

		fullpath = otherpath + "/" + data;
		System.out.println("풀패스: " + fullpath);
		try {
			response.setHeader("Content-Disposition",
					"attachment;filename=" + URLEncoder.encode(data, "UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		try {
			filein = new FileInputStream(fullpath);
			fileout = response.getOutputStream();
			fileout.flush();
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
		System.out.println("ajaxTest2 COunt>");
	}
	
	
	
	
	
	@RequestMapping(value = "mixer", method = RequestMethod.GET)
	public String mixer(HttpServletRequest request, Model model, int songnum) {
		logger.info("믹서: " + songnum);
		ArrayList<String> sources = sr.selectSongdata3(songnum);
		ArrayList<String> newOne = new ArrayList<>();
		ArrayList<String> beatList= new ArrayList<>();
		String newString = "";
		session.setAttribute("songnum", songnum);

		for (String string : sources) {
			newString = "!" + string + "!";
			newOne.add(newString);
		}

		model.addAttribute("sList", newOne);

		
		int lev = (int) session.getAttribute("lev");
		
		if (lev == 0) { //전문가
			File beat1 = new File(beatFolder1);
			
			File[] bList = beat1.listFiles();
			for (File file : bList) {
				if (!file.isDirectory()) {
					beatList.add("!"+file.getName()+"!");
				}
			}
			
		} else if (lev == 1){ //초급자
			File beat2 = new File(beatFolder2);
			
			File[] bList = beat2.listFiles();
			for (File file : bList) {
				if (!file.isDirectory()) {
					beatList.add("!"+file.getName()+"!");
				}
			}
		}
		
		model.addAttribute("bList", beatList);
		
		return "compose/mixer";
	}

	@RequestMapping(value = "pitch", method = RequestMethod.GET)
	public String pitch() {
		return "compose/pitch";
	}

	@RequestMapping(value = "effect", method = RequestMethod.GET)
	public String effect() {
		return "compose/effect";
	}

	@RequestMapping(value = "test5", method = RequestMethod.GET)
	public String test5() { // 빈 믹서 페이지
		return "compose/test5";
	}

	@RequestMapping(value = "test6", method = RequestMethod.GET)
	public String test6() {
		return "compose/test6";
	}

	@RequestMapping(value = "test7", method = RequestMethod.GET)
	public String test7() {
		return "compose/test7";
	}
	
	@RequestMapping(value = "setting", method = RequestMethod.GET)
	public @ResponseBody void setting() {
		try {
			Runtime.getRuntime().exec("control mmsys.cpl sounds");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "saveSonginfo", method = RequestMethod.POST)
	public @ResponseBody int saveSonginfo(SongInfo songinfo) {
		int songnum = 0;
		int count = 0;
		String loginNickname = (String) session.getAttribute("loginNickname");
		count = sr.selectSongByName(loginNickname, songinfo.getSong_title()); // 닉네임과
																				// 제목이
																				// 일치하면
																				// 막는다
		if (count != 1) {
			songinfo.setSong_nickname(loginNickname);
			logger.info("입력할 곡정보 songinfo: " + songinfo);
			sr.insertSongInfo(songinfo);
			songnum = sr.getSongnum(loginNickname, songinfo.getSong_title());
		}
		return songnum;
	}

	@RequestMapping(value = "saveSongPic", method = RequestMethod.POST)
	public @ResponseBody String saveSongPic(MultipartHttpServletRequest request, int songnum) {
		// 파일이 여러개일경우 위와같이 사용 할 수 있다
		// Iterator<String> itr = req.getFileNames();
		// MultipartFile files = req.getFile(itr.next());

		// 단일 파일일 경우 html의 name에 설정된 이름으로 파일을 가져올 수 있다.
		// MultipartFile file = req.getFile("testFile");

		MultipartFile mpf = request.getFile("upload1");
		logger.info("미완성 songnum: " + songnum);
		if (!mpf.isEmpty()) {
			String originalFileName = mpf.getOriginalFilename();
			String savedfile = FileService2.saveFile(mpf, uploadPath3);
			sr.updateSongInfo(songnum, originalFileName, savedfile);
		}
		return "success";
	}

	@RequestMapping(value = "myfileinput", method = RequestMethod.POST)
	public @ResponseBody ArrayList<Object> myfileinput(MultipartHttpServletRequest request, MultipartFile upload1) {
		File recordingData = new File(uploadPath3);
		String savedfile = "";
		if (!recordingData.exists()) {
			recordingData.mkdir();
		}
		System.out.println("upload1: " + upload1.getOriginalFilename() + ", " + upload1.getSize());
		if (!upload1.isEmpty()) {
			savedfile = FileService2.saveFile(upload1, uploadPath3);
		}

		String fullpath = uploadPath3 + "/" + savedfile;
		File file = new File(fullpath);
		System.out.println("fullpath:  " + fullpath);
		System.out.println("getname:  " + file.getName() + ", " + file.getAbsolutePath());

		new PolyphonicPitchDetection(fullpath);

		try {
			Thread.sleep(5000);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}

		File f = new File(uploadPath3 + "/melodyLine.dat");
		try {
			ObjectInputStream ois = new ObjectInputStream(new BufferedInputStream(new FileInputStream(f)));
			ArrayList<Object> d = (ArrayList<Object>) ois.readObject();
			for (int i = 0; i < d.size(); i++) {
				Object[] mel = (Object[]) d.get(i);
				System.out.print(mel[0] + "/" + mel[1] + ", ");
			}
			return d;
		} catch (Exception e) {

		}
		return null;
	}

	@RequestMapping(value = "melody", method = RequestMethod.GET)
	public String melody() {
		session.setAttribute("level", 1);
		return "compose/melody";
	}

	@RequestMapping(value = "complete", method = RequestMethod.POST)
	public String complete(SongInfo songinfo) {
		session.removeAttribute("level");
		session.removeAttribute("songnum");
		logger.info("songinfo>> " + songinfo);

		sr.complete(songinfo);
		logger.info("작곡 success");
		return "home";
	}
	
   @RequestMapping(value = "conversion", method = RequestMethod.POST)
   public String conversion(MultipartFile[] upload2, Model model, int songnum) {
	   logger.info("conversion songnum: " + songnum);
		model.addAttribute("songnum", songnum);
		File recordingData = new File(uploadPath3);

		if (!recordingData.exists()) {
			recordingData.mkdir();
		}

		for (int i = 0; i < upload2.length; i++) {
			MultipartFile multipartFile = upload2[i];
			if (!multipartFile.isEmpty()) {
				String originalFile = multipartFile.getOriginalFilename();
				String savedfile = FileService2.saveFile(multipartFile, uploadPath3);
				Userlist userlist = new Userlist(0, songnum, "record", originalFile, savedfile);
				int result = sr.insertSongdata(userlist);
				logger.info("saved record => " + savedfile);
			}
		} 
	   
      return "compose/conversion";
   }
}
