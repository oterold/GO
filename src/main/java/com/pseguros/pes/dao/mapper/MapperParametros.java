package com.pseguros.pes.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;

import com.pseguros.pes.bean.ParametroBean;



public class MapperParametros implements ResultSetExtractor {

	@Override
	public Object extractData(ResultSet rs) throws SQLException,	DataAccessException {

		
		List<ParametroBean> parametros = new ArrayList<ParametroBean>();
		
		
		while(rs.next()) {

			ParametroBean p = new ParametroBean();
			p.setInOut(rs.getString("IN_OUT"));
			p.setPosicion(rs.getString("POSITION"));
			p.setNombre(rs.getString("ARGUMENT_NAME"));
			p.setNombrePaquete(rs.getString("PACKAGE_NAME"));
			
			p.setNombreProcedimiento(rs.getString("OBJECT_NAME"));
			
			p.setTipoDato(rs.getString("DATA_TYPE"));
			p.setInOut(rs.getString("IN_OUT"));
			p.setLenght(rs.getString("CHAR_LENGTH"));
			
			parametros.add(p);
			
		}
				
		return parametros;
		
	}
}


