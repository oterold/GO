package com.pseguros.pes.service.entidades;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;


@Service
public class ReservaService {

	private static final Logger logger = LoggerFactory.getLogger(ReservaService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	
	//PANEL A
			@Async
			public Future<ArrayList> getSiniestroDatos(String siniestro,String ramo, String annio,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_LISTA_IMPR","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_NU_ANNIO","annio");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_NU_SINIESTRO","siniestro");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("annio", annio);
				parametrosIn.put("siniestro", siniestro);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("user", user);

				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_SINIESTROS,ConstantsProcedureDB.PUB_LISTA_SINIESTROS);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_SINIESTROS,new Date().getTime());
				
				if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
					throw new Exception(salida.get("mensaje").toString());
				}
				ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
				
				return new AsyncResult<ArrayList>(datoSalida);

			}

			
			//PANEL B
			@Async
			public Future<ArrayList> getReservaLista(String siniestro,String ramo, String annio,String subSiniestro,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_LISTA","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_ANNIO","annio");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_NU_SINIESTRO","siniestro");
				xx.put("P_NU_SUB_SIN","subSiniestro");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("annio", annio);
				parametrosIn.put("siniestro", siniestro);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("subSiniestro", subSiniestro);
				parametrosIn.put("user", user);

				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_RESERVAS,ConstantsProcedureDB.PUB_LISTA_RESERVAS);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_RESERVAS,new Date().getTime());
				
				if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
				
				return new AsyncResult<ArrayList>(datoSalida);

			}
			
			
			
			
			//PANEL C
			@Async
			public Future<ArrayList> getMovimientosDatos(String siniestro,String ramo, String annio,EnvironmentType environment, String user) throws Exception {
				EnvironmentContextHolder.setEnvironmentType(environment);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_LISTA","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_ANNIO","annio");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_NU_SINIESTRO","siniestro");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("annio", annio);
				parametrosIn.put("siniestro", siniestro);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("user", user);
				

				
				ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_RESERVAS,ConstantsProcedureDB.PUB_MOVIMIENTO_RESERVAS);
				Map<String, String> parametrosDeclarados = xx;
				
				Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_MOVIMIENTO_RESERVAS,new Date().getTime());
				
				if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
					return new AsyncResult<ArrayList>(new ArrayList());
				}
				ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
				
				return new AsyncResult<ArrayList>(datoSalida);

			}

	
			//modal panel C
			public Object getModalMovimiento(String siniestro,String ramo, String annio, EnvironmentType environmentType, String user) throws Exception {
				logger.debug("Inicio el modal de movimientos con el numero de siniestro : "+siniestro);
				EnvironmentContextHolder.setEnvironmentType(environmentType);

				Map<String, String> xx = new HashMap<String, String>();
				
				xx.put("P_TF_LISTA","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_ANNIO","annio");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_NU_SINIESTRO","siniestro");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("annio", annio);
				parametrosIn.put("siniestro", siniestro);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("user", user);


				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_RESERVAS,ConstantsProcedureDB.PUB_MOVIMIENTO_RESERVAS), parametrosIn, xx, ConstantsProcedureDB.PUB_MOVIMIENTO_RESERVAS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;
			}
			
			//PANEL D CON JSON
			public Object getDetalleReserva(String siniestro,String ramo , String annio, String tercero, String periodo,String adju,String tipo, EnvironmentType environmentType, String user) throws Exception {
				logger.debug("Inicio metetodo panel D juicio : " + siniestro +" con ramo"+ramo+"periodo : " +periodo+"tercero :"+tercero);
				EnvironmentContextHolder.setEnvironmentType(environmentType);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_LISTA", "datosSalida");
				xx.put("P_VC_MENS", "mensaje");
				xx.put("P_VC_ERRO", "error");
				xx.put("P_ANNIO", "annio");
				xx.put("P_CD_RAMO", "ramo");
				xx.put("P_NU_SINIESTRO", "siniestro");
				xx.put("P_NU_SUB_SIN", "tercero");
				xx.put("P_NU_PERIODO", "periodo");
				xx.put("P_MONEDA", "moneda");
				xx.put("P_ADJU", "adju");
				xx.put("P_TIPO_RESERVA", "reserva");
				xx.put("P_ORIGEN", "origen");
				xx.put("P_USUARIO", "user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("siniestro", siniestro);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("annio", annio);
				parametrosIn.put("tercero", tercero);
				parametrosIn.put("periodo", periodo);
				parametrosIn.put("adju", adju);
				parametrosIn.put("user", user);
				parametrosIn.put("reserva", tipo);
				


				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_RESERVAS, ConstantsProcedureDB.PUB_DETALLE_RESERVAS), parametrosIn, xx, ConstantsProcedureDB.PUB_DETALLE_RESERVAS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
}