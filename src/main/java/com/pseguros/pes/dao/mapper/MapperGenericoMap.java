package com.pseguros.pes.dao.mapper;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;

import com.pseguros.pes.util.db.AttributeToDBStyle;

public class MapperGenericoMap   implements RowMapper{
	

	private static final Logger logger = Logger.getLogger(MapperGenerico.class);

	public MapperGenericoMap() {

	}

	

	public HashMap mapRow(ResultSet res, int rowNum) throws SQLException {
		
		HashMap ref = null;
		
		try {
			
			ref = new HashMap();

			int col = res.getMetaData().getColumnCount();
			
			String colName = null;
			
			for (int i = 1; i <= col; i++) {
				colName = res.getMetaData().getColumnName(i);
				try {
					java.lang.reflect.Field f = null;
					java.lang.reflect.Method m = null;
					
					String attributeName = AttributeToDBStyle.dbToAtribute(colName);
					
					logger.debug("Data ---  " +  colName.toUpperCase());
					
					
						if (res.getObject(colName) != null) {
							if (res.getMetaData().getColumnTypeName(i).equals("DATE")) {
								ref.put(colName.toUpperCase(), new Date(res.getTimestamp(colName).getTime()) );
							} else if (res.getMetaData().getColumnTypeName(i).equals("NUMBER")) {
								ref.put(colName.toUpperCase(), ""+res.getBigDecimal(colName)  );
							}else {
								ref.put(colName.toUpperCase(), res.getString(colName)  );
								
							}
						}

				} catch (Exception nfe) {
					logger.debug("Error Mapper generico " + nfe.getMessage());
					
				}

			}
		} catch (Throwable t) {
			logger.debug("Error Mapper generico " + t.getMessage());
			
		}
		return ref;

	}


	
}
