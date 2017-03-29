package global.sesoc.jazart.dao;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import global.sesoc.jazart.vo.SongInfo;

@Repository
public class ChartRepository {
	   @Autowired
	   SqlSession sqlSession;
	   
	   public static final Logger logger = LoggerFactory.getLogger(BoardRepository.class);

	   public ArrayList<SongInfo> chartList(){
		   ChartMapper mapper=sqlSession.getMapper(ChartMapper.class);
		   
		   ArrayList<SongInfo> cList=null;
		   try{
			   cList=mapper.chartList();
		   }catch (Exception e) {
			// TODO: handle exception
			   e.printStackTrace();
		}
		return cList;
	   }
}
