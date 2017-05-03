package global.sesoc.jazart.controller;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
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

	@RequestMapping(value = "mySrc", method = RequestMethod.POST)
	public String mySrc(MultipartFile[] upload2, Model model, int songnum) {
		logger.info("mySrc songnum: "+songnum);
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
				logger.info("saved record => "+savedfile);
			}
		}
		return "compose/mySource";
	}
	
	@RequestMapping(value = "effect_ui", method = RequestMethod.POST)
	public String effect_ui(MultipartFile[] upload2, Model model, int songnum) {
		logger.info("effect songnum: "+songnum);
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
				Userlist userlist = new Userlist(0, songnum, "source", originalFile, savedfile);
				int result = sr.insertSongdata(userlist);
				logger.info("saved record => "+savedfile);
			}
		}
		ArrayList<String> recordList = sr.selectSongdata(songnum, "record");
		ArrayList<String> sourceList = sr.selectSongdata(songnum, "source");
		model.addAttribute("recordList", recordList);
		model.addAttribute("sourceList", sourceList);
		
		return "compose/effect_ui";
	}

	@RequestMapping(value = "compose", method = RequestMethod.GET)
	public String compose() {
		return "compose/compose";
	}

	@RequestMapping(value = "mixing", method = RequestMethod.GET)
	public String mixing() {
		return "compose/mixing";
	}

	@RequestMapping(value = "done", method = RequestMethod.GET)
	public String done() {
		return "compose/done";
	}

	@RequestMapping(value = "mixerPage", method = RequestMethod.GET)
	public String mixerPage() {
		return "compose/mixerPage";
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
			int songnum = Integer.parseInt(data);
			SongInfo song = sr.selectSong(songnum);
			originalfile = song.getSong_file();
			savedfile = song.getSong_savedfile();
			fullpath = uploadPath3 + "/" + savedfile;
			/*
			 * StringTokenizer token = new StringTokenizer(data, "?"); String
			 * data2 = token.nextToken(); originalfile = data2
			 */;
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

	/*
	 * @RequestMapping(value = "mixing", method = RequestMethod.POST) public
	 * String saveRecord(MultipartHttpServletRequest request, MultipartFile[]
	 * upload, Model model) { ArrayList<String> list = new ArrayList<>(); String
	 * type = "r_";
	 * 
	 * FileWriter fw; try { fw = new FileWriter(new
	 * File(request.getServletContext().getRealPath("/src/data/samples.txt")));
	 * BufferedWriter bw = new BufferedWriter(fw); PrintWriter pw = new
	 * PrintWriter(bw);
	 * 
	 * pw.println(
	 * "{\"projectInfo\":{\"tempo\":\"128\",\"tracks\":\"4\",\"effects\":[[],[],[],[]]},\"samples\": ["
	 * ); for (int i = 0; i < upload.length; i++) { MultipartFile multipartFile
	 * = upload[i]; if (!multipartFile.isEmpty()) { String savedfile =
	 * FileService2.saveFile(multipartFile, uploadPath3);
	 * 
	 * list.add(savedfile); logger.info("getSize : " + multipartFile.getSize());
	 * logger.info("getTime : " + multipartFile.getSize() * 8 / 52 / 1000);
	 * pw.print("{\"id\":\"" + (i + 1) + "\",\"url\":\"src/data/samples/" +
	 * savedfile + "\",\"track\":\"1\",\"startTime\":[],\"duration\":" +
	 * multipartFile.getSize() * 8 / 52 / 1000 + "}");
	 * 
	 * 
	 * (multipartFile.getBytes().length * ( 3.8399999141693115 / 338732) *
	 * 8)+"\"}"); logger.info("계산된 길이 : " + multipartFile.getBytes().length * (
	 * 3.8399999141693115 / 338732) * 8);
	 * 
	 * 
	 * File d = new File(uploadPath3 + "/" + savedfile); logger.info("1: " +
	 * uploadPath3 + "/" + savedfile); File e = new
	 * File(request.getServletContext().getRealPath
	 * 
	 * ("src/data/samples/") + savedfile); logger.info("2 " +
	 * request.getServletContext().getRealPath
	 * 
	 * ("src/data/samples/") + savedfile); FileInputStream fis = new
	 * FileInputStream(d); FileOutputStream fos = new FileOutputStream(e);
	 * FileCopyUtils.copy(fis, fos); fis.close(); fos.close(); }
	 * 
	 * if (i != upload.length - 1) { pw.println(","); } else { pw.println("]}");
	 * pw.flush(); } } pw.close(); bw.close(); model.addAttribute("srclist",
	 * list); } catch (IOException e) { e.printStackTrace(); } return
	 * "compose/mixing"; }
	 */

	@RequestMapping(value = "savePage", method = RequestMethod.GET)
	public String savePage() {
		return "compose/savePage";
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
	public String test2(Model model, HttpServletRequest request, int songnum) {
		model.addAttribute("songnum", songnum);
		//sr.selectUserlist(songnum);
		
		
		/*File webFolder = new File(request.getServletContext().getRealPath("src/sample/"));

		int flag = 0;
		FileWriter fw;
		BufferedWriter bw = null;
		PrintWriter pw = null;
		try {
			for (File file : webFolder.listFiles()) {
				if (!file.isDirectory()) {
					flag++;
					if (flag == 1) {
						fw = new FileWriter(request.getServletContext().getRealPath("src/mywork/myWork.txt"));
						bw = new BufferedWriter(fw);
						pw = new PrintWriter(bw);
					}
					pw.println("!" + file.getName() + "!");
				}
			}
			pw.flush();
			pw.close();
			bw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		return "compose/mixerPage";
	}

	@RequestMapping(value = "mixerWorks", method = RequestMethod.POST)
	public @ResponseBody void ajaxTest1(String data, HttpServletRequest request, HttpServletResponse response) {
		System.out.println("data: " + data);
		String originalfile = data;
		String otherpath = request.getServletContext().getRealPath("src/sample/");
		String fullpath = "";
		ServletOutputStream fileout = null;
		FileInputStream filein = null;
		// 한개의 글을 가져옴

		fullpath = otherpath + originalfile;
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

	@RequestMapping(value = "mixer", method = RequestMethod.GET)
	public String mixer(HttpServletRequest request, Model model) {
		try {
			////////////////////////////////////////////////////////////////
			FileReader fr = new FileReader(request.getServletContext().getRealPath("src/mywork/myWork.txt"));
			BufferedReader br = new BufferedReader(fr);
			String s;
			ArrayList<String> sList = new ArrayList<>();
			while ((s = br.readLine()) != null) {
				sList.add(s);
			}
			System.out.println("sList: " + sList);
			model.addAttribute("sList", sList);
			br.close();
			fr.close();
			////////////////////////////////////////////////////////////////
		} catch (IOException e) {
			e.printStackTrace();
		}
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
	
	@RequestMapping(value = "test66", method = RequestMethod.POST)
	public String saveSongPic(MultipartFile upload) {
		// 파일이 여러개일경우 위와같이 사용 할 수 있다
		//Iterator<String> itr =  req.getFileNames();
		//MultipartFile files = req.getFile(itr.next());
		
		//단일 파일일 경우 html의 name에 설정된 이름으로 파일을 가져올 수 있다.
		//MultipartFile file = req.getFile("testFile");
		if (!upload.isEmpty()) {
			String originalFileName = upload.getOriginalFilename();
			String savedfile = FileService2.saveFile(upload, uploadPath3);
		}
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "saveSonginfo", method = RequestMethod.POST)
	public @ResponseBody int saveSonginfo(SongInfo songinfo) {
		int songnum = 0;
		int count = 0;
		String loginNickname = (String)session.getAttribute("loginNickname");
		count = sr.selectSongByName(loginNickname, songinfo.getSong_title()); //닉네임과 제목이 일치하면 막는다
		if (count != 1) {
			songinfo.setSong_nickname(loginNickname);
			logger.info("입력할 곡정보 songinfo: "+songinfo);
			sr.insertSongInfo(songinfo);
			songnum = sr.getSongnum(loginNickname, songinfo.getSong_title());
		}
		return songnum;
	}
	
	@RequestMapping(value = "saveSongPic", method = RequestMethod.POST)
	public @ResponseBody String saveSongPic(MultipartHttpServletRequest request, int songnum) {
		// 파일이 여러개일경우 위와같이 사용 할 수 있다
		//Iterator<String> itr =  req.getFileNames();
		//MultipartFile files = req.getFile(itr.next());
		
		//단일 파일일 경우 html의 name에 설정된 이름으로 파일을 가져올 수 있다.
		//MultipartFile file = req.getFile("testFile");
		
		MultipartFile mpf = request.getFile("upload1");
		logger.info("미완성 songnum: "+songnum);
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
		// String objectpath = file.getAbsolutePath();

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
			//ArrayList<Object> d = new ArrayList<>();
			for (int i = 0; i < d.size(); i++) {
				Object[] mel = (Object[]) d.get(i);
				System.out.print(mel[0]+"/"+mel[1]+", ");
			}
			return d;
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return null;
	}
}
