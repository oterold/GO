package com.pseguros.pes.dao;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.pseguros.pes.exception.SQLPSException;
import com.pseguros.pes.util.db.SQLTools;

@Component
public class RectorDAO  extends AbstractJDBCDAO {

	
    private static final Logger logger = LoggerFactory.getLogger(RectorDAO.class);

    



	public String getValorControl(String userURL, String origen, String destino) throws SQLPSException {
		Connection conn = null;
		CallableStatement callableStatement = null;
		ResultSet rs = null;
		try {
		    conn = jdbcTemplate.getDataSource().getConnection();
		    callableStatement = conn.prepareCall("{ call PKG_ALL_CONECCION.CONTROL_INGRESO(?,?,?,?,?) }");
		    callableStatement.registerOutParameter(4, 12);
		    callableStatement.registerOutParameter(5, 12);
		    
		    callableStatement.setObject(1, origen);
		    callableStatement.setObject(2, userURL);
		    callableStatement.setInt(3, Integer.parseInt(destino));
		   
		    callableStatement.executeUpdate();

		    Object mensajeError = callableStatement.getObject(4);
		    if (mensajeError != null && mensajeError.toString().length()>0) {
				throw new Exception(mensajeError.toString());
			}
		    String mensaje = callableStatement.getObject(5).toString();
		    
		  
		    return mensaje;
		} catch (Exception e) {
		    logger.error("Error getCertificados ", e);
		    throw new SQLPSException(e);
		} finally {
		    SQLTools.close(rs, callableStatement, conn);
		}
	}
}
