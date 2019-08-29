package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.dao.CotizacionDAO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class SucursalService {
	@Autowired
	private CotizacionDAO cotizacionDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(CotizacionService.class);

	@Autowired
	private ExecuteService executeService;
	
	public List getDatosSucursal(String sucursal, EnvironmentType environment, String user) throws Exception {
		EnvironmentContextHolder.setEnvironmentType(environment);
		logger.debug("Inicio el popup getDatosSucursal con sucursal: " + sucursal	);

		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("user", user);
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SUCURSAL,ConstantsProcedureDB.PUB_DATOS_POPUP);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_POPUP,new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			throw new Exception(salida.get("mensaje").toString());
		}
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return datoSalida;

	}
	
}
