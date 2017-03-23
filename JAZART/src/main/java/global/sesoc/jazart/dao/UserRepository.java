package global.sesoc.jazart.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.User;


@Repository
public class UserRepository {

	@Autowired
	SqlSession sqlSession;
	
	private static final Logger logger = LoggerFactory.getLogger(UserRepository.class);
	
	public int regist(User user){
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		int result = 0;
		try {
			result = mapper.insert(user);
			logger.info("등록 count=> "+result);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public User selectUser(String userid) {
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		User user = null;
		try {
			user = mapper.selectUser(userid);
			logger.info("로그인 user => "+ user.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}		
		return user;
	}
	
	public List<User> list(){
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		List<User> result = null;
		try {
			result = mapper.list();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public int delete(int num){
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		int result = 0;
		try {
			result = mapper.delete(num);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public int update(User comment){
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		int result = 0;
		try {
			result = mapper.update(comment);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	public String joinCheck(User user) {
		UserMapper mapper = sqlSession.getMapper(UserMapper.class);
		String result = "";
		try {
			int countId = mapper.countId(user.getUser_id());
			int countNickname = mapper.countNickname(user.getUser_nickname());
			int countEmail = mapper.countEmail(user.getUser_email());
			
			logger.info("countId=> "+countId+", countNickname=> "+countNickname+"countEmail=> "+countEmail);
			if (countId != 0) {
				result = "DupId";
			}
			
			if (countId != 0) {
				result = "DupNickname";
			}
			
			if (countId != 0) {
				result = "DupEmail";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	
}
