package com.pseguros.pes.service.entidades.busqueda;

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
import com.pseguros.pes.dto.SiniestroDTO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;

@Service
public class BuscadorSiniestroService {
	@Autowired
	private ExecuteService executeService;
	
	private static final Logger logger = LoggerFactory.getLogger(BuscadorSiniestroService.class);
	
	@Async
	public Future<ResultadoBusquedaEntidad> getAllSiniestros(String dato, Object[] entidadesFiltro, String datoP1, String datoP2, String datoP3, String datoPagina, EnvironmentType environmentType, String user) throws Exception {
	
		return getAllSiniestros(dato, entidadesFiltro, datoP1, datoP2, datoP3, datoPagina, environmentType, user,50);
 
	}
	
	@Async
	public Future<ResultadoBusquedaEntidad> getAllSiniestros(String dato, Object[] entidadesFiltro, String datoP1, String datoP2, String datoP3, String datoPagina, EnvironmentType environmentType, String user,int tamanioPagina) throws Exception {

		EnvironmentContextHolder.setEnvironmentType(environmentType);

		Integer cantidadDeRegistros = new Integer("1");
		Integer fin = Integer.parseInt(datoPagina) * tamanioPagina;
		Integer inicio = fin.intValue() - (tamanioPagina-1);
		Integer ramosEncontrados;



		
		if (!(entidadesFiltro[3].equals("1"))) {
			
			return new AsyncResult<ResultadoBusquedaEntidad>(new ResultadoBusquedaEntidad());
			
		}else 
		{
			
			ArrayList<SiniestroDTO> siniestros = new ArrayList<SiniestroDTO>();

			Map<String, String> xx = new HashMap<String, String>();

			xx.put("P_TF_SINI", "siniestros");
			xx.put("P_VC_MENS", "mensaje");
			xx.put("P_VC_ERRO", "error");
			xx.put("P_DATO", "dato");
			xx.put("P_CD_RAMO", "ramo");
			xx.put("P_CONDICION_E", "condicionE");
			xx.put("P_CONDICION_F", "condicionF");
			xx.put("P_REG_DESDE", "desde");
			xx.put("P_REG_HASTA", "hasta");
			xx.put("P_ORIGEN", "origen");
			xx.put("P_USUARIO", "user");

			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("dato", dato);
			parametrosIn.put("desde", inicio.toString());
			parametrosIn.put("hasta", fin.toString());
			parametrosIn.put("user", user);
			parametrosIn.put("origen", "go");

			
			
			if (datoP1 != null && !datoP1.equals("0")) 
				parametrosIn.put("ramo", datoP1);
			
			if (datoP2 != null && !datoP2.equals("0")) 
				parametrosIn.put("condicionE", datoP2.substring(2,4));
			
			if (datoP3 != null && !datoP3.equals("0")) 
				parametrosIn.put("condicionF", datoP3);
			
			

			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean("PKG_PUB_BUSQUEDA", "PUB_BUSCA_SINIESTROS");
			Map<String, String> parametrosDeclarados = xx;

			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato, parametrosIn, parametrosDeclarados, "PUB_BUSCA_SINIESTROS", new Date().getTime());

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				return new AsyncResult<ResultadoBusquedaEntidad>(new ResultadoBusquedaEntidad());
			}
			ArrayList datoSalida = (ArrayList) salida.get("siniestros");

			for (Object object : datoSalida) {

				SiniestroDTO siniestro = new SiniestroDTO((HashMap) object);

				siniestros.add(siniestro);
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
			return new AsyncResult<ResultadoBusquedaEntidad>(new ResultadoBusquedaEntidad(siniestros,cantidadDeRegistros ,inicio,fin,Integer.parseInt(datoPagina),(List) salida.get("P_TF_RAMOS")) );

			
			
			
			
			
		}
	}

}
