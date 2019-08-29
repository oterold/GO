package com.pseguros.pes.service;



import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.dao.ExecuteDAO;



@Service
public class ExecuteService {

	
	 @Autowired
	 private ExecuteDAO executeDAO;

	 
	public Map<String, Object> ejecutarProcedimiento(ProcedimientoDatoBean procedimientoDato, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados, String userWs,long seq) throws Exception {
			return executeDAO.ejecutarProcedimientoFinal(procedimientoDato, parametrosIn, parametrosDeclarados, userWs, seq,".",0,50000);
	}

	public Map<String, Object> ejecutarProcedimiento(ProcedimientoDatoBean procedimientoDato, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados, String userWs,long seq, int desde, int hasta) throws Exception {
			return executeDAO.ejecutarProcedimientoFinal(procedimientoDato, parametrosIn, parametrosDeclarados, userWs, seq,".",desde,hasta);
	}


	public Map<String, Object> ejecutarProcedimiento(String paquete, String procedimiento, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados) throws Exception {
		return executeDAO.ejecutarProcedimientoFinal(new ProcedimientoDatoBean(paquete, procedimiento), parametrosIn, parametrosDeclarados, "DEFAULT", new Date().getTime(),".",0,50000);
	}
	
	
	public Map<String, Object> ejecutarProcedimientoConSeparador(ProcedimientoDatoBean procedimientoDato, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados, String userWs,long seq, String separador) throws Exception {
		return executeDAO.ejecutarProcedimientoFinal(procedimientoDato, parametrosIn, parametrosDeclarados, userWs, seq,separador,0,50000);
	}

	public Map<String, Object> ejecutarProcedimientoConSeparador(ProcedimientoDatoBean procedimientoDato, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados, String userWs,long seq, String separador,int desde,int hasta) throws Exception {
		return executeDAO.ejecutarProcedimientoFinal(procedimientoDato, parametrosIn, parametrosDeclarados, userWs, seq,".",desde,hasta);
	}

	public Map<String, Object> ejecutarProcedimientoConSeparador(String paquete, String procedimiento, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados, String separador) throws Exception {
		return executeDAO.ejecutarProcedimientoFinal(new ProcedimientoDatoBean(paquete, procedimiento), parametrosIn, parametrosDeclarados, "DEFAULT", new Date().getTime(),separador,0,50000);
	}
	
	public List executeGenericSQL(String sql) throws Exception {
		return executeDAO.executeGenericSQL(sql);
	}	
	
	public List buscarParametrosByProcedimiento(String pkg,String name,String owner) throws Exception {
		return executeDAO.buscarParametrosByProcedimiento(pkg,name,owner);
	}
	
	public List buscarProcedimientoEnPkg(String pkg,String owner) throws Exception {
		return executeDAO.buscarProcedimientoEnPkg(pkg,owner);
	}
	
	

}
