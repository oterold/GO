package com.pseguros.pes.service.entidades.busquedaExperto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.dto.InspeccionDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

public class BuscadorInspeccionesService {


	
	private static final Logger logger = LoggerFactory.getLogger(BuscadorPromocionesService.class);
	
	@Async
	public ResultadoBusqueda  getAllInspecciones(String dato,EnvironmentType environmentType, String user,String datoPagina, String datoP1, String datoP2, String datoP3, String datoP4, ExecuteService executeService, String desde, String hasta) throws Exception {
		
			return  getAllInspecciones(dato,environmentType, user,50,datoPagina, datoP1, datoP2, datoP3, datoP4,executeService, desde, hasta);
		}
	
	@Async
	public ResultadoBusqueda  getAllInspecciones(String dato,EnvironmentType environmentType, String user, int tamanioPagina,String datoPagina, String datoP1, String datoP2, String datoP3, String datoP4,ExecuteService executeService, String desde, String hasta) throws Exception {

		EnvironmentContextHolder.setEnvironmentType(environmentType);
		
		Integer cantidadDeRegistros = new Integer("1");
		Integer fin = Integer.parseInt(datoPagina) * tamanioPagina;
		Integer inicio = fin.intValue() - (tamanioPagina-1);


		List<InspeccionDTO> inspecciones = new ArrayList<InspeccionDTO>();

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_INSP", "inspecciones");
		xx.put("P_TF_RAMOS", "ramos");
		xx.put("P_VC_MENS", "mensaje");
		xx.put("P_VC_ERRO", "error");
		xx.put("P_REG_TOTAL", "P_REG_TOTAL");
		xx.put("P_DATO", "dato");
		xx.put("P_CD_RAMO", "ramo");
		xx.put("P_CONDICION_E", "condicionE");
		xx.put("P_FECHA_DESDE", "fechaDesde");
		xx.put("P_FECHA_HASTA", "fechaHasta");
		xx.put("P_REG_DESDE", "desde");
		xx.put("P_REG_HASTA", "hasta");
		xx.put("P_ORIGEN", "origen");
		xx.put("P_USUARIO", "user");

		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		
		if(datoP2.equals("05"))
			parametrosIn.put("condicionE", datoP2);
		
		if(!datoP3.equals("0"))
			parametrosIn.put("ramo", datoP3);
		
		parametrosIn.put("fechaDesde", desde);
		parametrosIn.put("fechaHasta", hasta);
		
		parametrosIn.put("dato", dato);
		parametrosIn.put("desde", inicio.toString());
		parametrosIn.put("hasta", fin.toString());
		
		parametrosIn.put("origen", "go");
		parametrosIn.put("user", user );
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_BUSQUEDA,ConstantsProcedureDB.PUB_BUSCA_INSPECCIONES);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados,"PUB_BUSCA_INSPECCIONES", new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new ResultadoBusqueda(null, null, 0,"inspecciones",0);
			}
		List datoSalida = (ArrayList) salida.get("inspecciones");

		for (Object object : datoSalida) {

			InspeccionDTO inspeccion = new InspeccionDTO((HashMap) object);

			inspecciones.add(inspeccion);
		}

		try {
			cantidadDeRegistros = new Integer(salida.get("P_REG_TOTAL").toString());
		} catch (Exception e) {
			try {
				cantidadDeRegistros = datoSalida.size();
			} catch (Exception e2) {
				cantidadDeRegistros = new Integer("0");
			}
		}		
		
		return new ResultadoBusqueda(inspecciones, (List)salida.get("ramos"),cantidadDeRegistros,"INSPECCION",Integer.parseInt(datoPagina));

		}
	
}
