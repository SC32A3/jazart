package global.sesoc.jazart.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.Sample;


@Repository
public class SampleRepository {

	@Autowired
	SqlSession sqlSession;
	
	private static final Logger logger = LoggerFactory.getLogger(SampleRepository.class);
	
	public int regist(Sample comment){
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		int result = 0;
		try {
			result = mapper.insert(comment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}
	
	public List<Sample> list(){
		SampleMapper mapper = sqlSession.getMapper(SampleMapper.class);
		List<Sample> result = null;
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
	
	public int update(Sample comment){
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
