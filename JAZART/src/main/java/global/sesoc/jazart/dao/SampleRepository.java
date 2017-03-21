package global.sesoc.jazart.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.User;


@Repository
public class SampleRepository {

	@Autowired
	SqlSession sqlSession;
	
	private static final Logger logger = LoggerFactory.getLogger(SampleRepository.class);
	
	public int regist(User user){
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
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
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
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
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
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
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.delete(num);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public int update(User comment){
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.update(comment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}

	
}
