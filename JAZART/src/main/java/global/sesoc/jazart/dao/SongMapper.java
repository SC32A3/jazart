package global.sesoc.jazart.dao;

import global.sesoc.jazart.vo.Songinfo;

public interface SongMapper {

   Songinfo selectSong(int songnum) throws Exception;

}