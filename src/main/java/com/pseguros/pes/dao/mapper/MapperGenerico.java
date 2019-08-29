package com.pseguros.pes.dao.mapper;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.log4j.Logger;
import org.springframework.jdbc.core.RowMapper;

import com.pseguros.pes.util.db.AttributeToDBStyle;
import com.pseguros.pes.util.db.CustomType;


public class MapperGenerico  implements RowMapper{
	
	private Object ref1;

	private static final Logger logger = Logger.getLogger(MapperGenerico.class);

	public MapperGenerico() {

	}

	public MapperGenerico(Object obj) {
		this.ref1 = obj;

	}

	public Object mapRow(ResultSet res, int rowNum) throws SQLException {
		Object ref = null;
		try {
			 ref = ref1.getClass().newInstance();
			
			int col = res.getMetaData().getColumnCount();
			String colName = null;
			for (int i = 1; i <= col; i++) {
				colName = res.getMetaData().getColumnName(i);
				try {
					java.lang.reflect.Field f = null;
					java.lang.reflect.Method m = null;
					String attributeName = AttributeToDBStyle.dbToAtribute(colName);

					try {
						f = ref .getClass().getDeclaredField(attributeName);
					} catch (NoSuchFieldException e) {
					}
					if (f != null) {
						if (res.getObject(colName) != null) {
							if (f.getType() == Date.class) {
								m = ref.getClass().getMethod(generarNombreSetter(attributeName), new Class[] { Date.class });
								
								m.invoke(ref, new Object[] { new Date(res.getTimestamp(colName).getTime()) });
								
							} else if (f.getType() == Integer.class) {
								m = ref.getClass().getMethod(generarNombreSetter(attributeName),new Class[] { Integer.class });
								m.invoke(ref, new Object[] { res.getInt(colName) });
	
							} else if (f.getType() == CustomType.class) {
								m = ref.getClass().getMethod(generarNombreSetter(attributeName),new Class[] { CustomType.class });
								m.invoke(ref, new Object[] { new CustomType(res.getString(colName)) });
	
							} else {
								m = ref.getClass().getMethod(generarNombreSetter(attributeName),new Class[] { String.class });
								m.invoke(ref, new Object[] { res.getString(colName) });
							}
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

	private String generarNombreSetter(String attributeName) {
		return "set" + attributeName.substring(0, 1).toUpperCase() + attributeName.substring(1, attributeName.length());
	}

	
}
