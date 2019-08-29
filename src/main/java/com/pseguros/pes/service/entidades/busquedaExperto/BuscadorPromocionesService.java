package com.pseguros.pes.service.entidades.busquedaExperto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.bean.ResultadoBusquedaEntidad;
import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.dto.PromocionDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class BuscadorPromocionesService {

	
	private static final Logger logger = LoggerFactory.getLogger(BuscadorPromocionesService.class);
	
	@Async
	public ResultadoBusqueda  getAllPromociones(String dato,EnvironmentType environmentType, String user,String datoPagina, ExecuteService executeService, String desde, String hasta) throws Exception {
		
			return  getAllPromociones(dato,environmentType, user,50,datoPagina,executeService, desde, hasta);
		}
	
	@Async
	public ResultadoBusqueda  getAllPromociones(String dato,EnvironmentType environmentType, String user, int tamanioPagina,String datoPagina,ExecuteService executeService, String desde, String hasta) throws Exception {

		EnvironmentContextHolder.setEnvironmentType(environmentType);
		
		Integer cantidadDeRegistros = new Integer("1");
		Integer fin = Integer.parseInt(datoPagina) * tamanioPagina;
		Integer inicio = fin.intValue() - (tamanioPagina-1);


		ArrayList<PromocionDTO> promociones = new ArrayList<PromocionDTO>();

		Map<String, String> xx = new HashMap<String, String>();

		xx.put("P_TF_PROMO", "promocion");
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
		parametrosIn.put("dato", dato);
		parametrosIn.put("desde", inicio.toString());
		parametrosIn.put("hasta", fin.toString());
		
		parametrosIn.put("fechaDesde", desde);
		parametrosIn.put("fechaHasta", hasta);
		
		parametrosIn.put("origen", "go");
		parametrosIn.put("user", user );
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_BUSQUEDA,ConstantsProcedureDB.PUB_BUSCA_PROMOCION);
		Map<String, String> parametrosDeclarados = xx;

		Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados,"PUB_BUSCA_PROMOCION", new Date().getTime());

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			return new ResultadoBusqueda(null, null, 0,"promocion",0);
			}
		ArrayList datoSalida = (ArrayList) salida.get("promocion");

		for (Object object : datoSalida) {

			PromocionDTO promocion = new PromocionDTO((HashMap) object);

			promociones.add(promocion);
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
		
		return new ResultadoBusqueda(promociones, null,cantidadDeRegistros,"PROMOCION",Integer.parseInt(datoPagina));

		}
	}
	

	
	
	
	

