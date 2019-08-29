package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.CantidadEsquema;
import com.pseguros.pes.bean.EsquemaBean;
import com.pseguros.pes.bean.OrigenesParam;
import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.bean.ProductoBean;
import com.pseguros.pes.bean.RamoBean;
import com.pseguros.pes.bean.ResultadoDatosParametricos;
import com.pseguros.pes.bean.ValorDato;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class ConfiguracionVisualizacionService {

	private static final Logger logger = LoggerFactory.getLogger(NidService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	

	
	//busca origen
		@Async
		public Future<ArrayList> selectorOrigenConfig(EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
		
			xx.put("P_TF_CRIV","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen", "go");
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_ORIGENES);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_ORIGENES,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}

	
	
	
	//busca Ramos
		@Async
		public Future<ArrayList> selectorRamosConfig(EnvironmentType environment, String user) throws Exception {
			EnvironmentContextHolder.setEnvironmentType(environment);

			Map<String, String> xx = new HashMap<String, String>();
			
			xx.put("P_TF_CARP","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","cotizacion");
			xx.put("P_VC_AUXI","origen");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen", "go");
			
			ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_RAMOS);
			Map<String, String> parametrosDeclarados = xx;
			
			Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_RAMOS,new Date().getTime());
			
			if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
				throw new Exception(salida.get("mensaje").toString());
			}
			ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
			
			return new AsyncResult<ArrayList>(datoSalida);

		}
		
		//busca datosEsquemaGenerlaes
				@Async
				public Future<ArrayList> selectEsquemasGenerales(EnvironmentType environment, String user) throws Exception {
					EnvironmentContextHolder.setEnvironmentType(environment);

					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CREK","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","cotizacion");
					xx.put("P_VC_AUXI","origen");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", "go");
					
					ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_VISUALIZACION_CAB);
					Map<String, String> parametrosDeclarados = xx;
					
					Map<String, Object> salida = executeService.ejecutarProcedimiento(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.L_VISUALIZACION_CAB,new Date().getTime());
					
					if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
						throw new Exception(salida.get("mensaje").toString());
					}
					ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
					
					return new AsyncResult<ArrayList>(datoSalida);

				}
		
		
				
				//busca valores default
						public Object panelBValoresDefaultConfig(String origen, String ramo, String producto, String formulario, String auxiliar, EnvironmentType environment, String user) throws Exception {
							EnvironmentContextHolder.setEnvironmentType(environment);

							Map<String, String> xx = new HashMap<String, String>();
							
							xx.put("P_TF_GANA","datosSalida");
							xx.put("P_VC_MENS","mensaje");
							xx.put("P_VC_ERRO","error");
							xx.put("P_VC_ORIG","origen");
							xx.put("P_VC_AUXI","aux");
							xx.put("P_VC_DRIG","dorigen");
							xx.put("P_NU_RAMO","ramo");
							xx.put("P_VC_PROD","prod");
							xx.put("P_VC_FORM","form");
							
							Map<String, Object> parametrosIn = new HashMap<String, Object>();
							parametrosIn.put("origen", "WEBPRO");
							parametrosIn.put("dorigen", origen);
							parametrosIn.put("ramo", ramo);
							parametrosIn.put("prod", producto);
							parametrosIn.put("form", formulario);
							parametrosIn.put("aux", auxiliar);
							
							Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_VALORES_DEFAULT), parametrosIn, xx, ConstantsProcedureDB.L_VALORES_DEFAULT, new Date().getTime(), "_");
							
							if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
								throw new Exception(salida.get("error").toString());
							}
							if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
								throw new Exception(salida.get("mensaje").toString());
							}
							ArrayList lista = (ArrayList) salida.get("datosSalida");

							return lista;

						}
				
				
				
				
				//ramos
				
				public Object selectorRamosConfigJson(EnvironmentType environment, String user) throws Exception {
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CARP","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","cotizacion");
					xx.put("P_VC_AUXI","origen");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", "go");
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_RAMOS), parametrosIn, xx, ConstantsProcedureDB.L_RAMOS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;
				}
				

				public Object datosTablaConfigJson(String esquema,EnvironmentType environment, String user) throws Exception {
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CREW","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","org");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_VISU","esquema");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", "WEBPRO");
					parametrosIn.put("esquema", esquema);
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_VISUALIZACION_TAB), parametrosIn, xx, ConstantsProcedureDB.L_VISUALIZACION_TAB, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;
				}
				

				
				public Object selectorProductosRolesConfig(String origen,String roles,String ramos,EnvironmentType environment, String user) throws Exception {
					Map<String, String> xx = new HashMap<String, String>();
					
					xx.put("P_TF_CAPU","datosSalida");
					xx.put("P_VC_MENS","mensaje");
					xx.put("P_VC_ERRO","error");
					xx.put("P_VC_ORIG","origen");
					xx.put("P_VC_AUXI","aux");
					xx.put("P_NU_RAMO","ramo");
					xx.put("P_VC_PROD","prod");
					
					Map<String, Object> parametrosIn = new HashMap<String, Object>();
					parametrosIn.put("origen", origen);
					parametrosIn.put("aux", "1;1;1;1;"+roles+";");
					parametrosIn.put("ramo", ramos);
					
					Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW,ConstantsProcedureDB.L_GRILLA_PRODUCTOS), parametrosIn, xx, ConstantsProcedureDB.L_GRILLA_PRODUCTOS, new Date().getTime(), "_");

					if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
						throw new Exception(salida.get("error").toString());
					}
					if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
						throw new Exception(salida.get("mensaje").toString());
					}
					
					ArrayList lista = (ArrayList) salida.get("datosSalida");

					return lista;
				}
				
				
				
				
		//selector producto
		public Object selectorProductoConfig(String ramo, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CAPU","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_VC_RAMO","ramo");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_PRODUCTOS), parametrosIn, xx, ConstantsProcedureDB.L_PRODUCTOS, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
	
		//selector OrigenConfig
		
		
		
		
	
		//selector esquema
			public Object selectorEsquemaConfig(String ramo,String producto, EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_CPP","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_VC_ORIG","origen");
				xx.put("P_VC_AUXI","aux");
				xx.put("P_VC_RAMO","ramo");
				xx.put("P_VC_PROD","producto");
				
				 
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("producto", producto);
				parametrosIn.put("origen", "1");
				parametrosIn.put("aux", "1");
				
				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_ESQUEMA_VIS), parametrosIn, xx, ConstantsProcedureDB.L_ESQUEMA_VIS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
					
		
		//panel b
		public Object busquedaPanelB(String ramo,String producto, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_WVD","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_VC_RAMO","ramo");
			xx.put("P_VC_PROD","producto");
			
			 
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("producto", producto);
			parametrosIn.put("origen", "1");
			parametrosIn.put("aux", "1");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_WEB_VALORES_DPR_RP), parametrosIn, xx, ConstantsProcedureDB.L_WEB_VALORES_DPR_RP, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		public Object datosPromociones(EnvironmentType environment, String user) throws Exception {
			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CROT","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			 
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen", "go");
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_PROMOCIONES_CONTENIDO), parametrosIn, xx, ConstantsProcedureDB.L_PROMOCIONES_CONTENIDO, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;
		}
		
		//planes
		public Object planesModalConfig(String ramo,EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_PRP","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_VC_RAMO","ramo");
			 
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen", "go");
			parametrosIn.put("ramo", ramo);
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_WEB_PRODPLANES), parametrosIn, xx, ConstantsProcedureDB.L_WEB_PRODPLANES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
		//datos generals panel b
		public Object datosGenerlaesPanelB(String tabla, String dominio, String esquema, EnvironmentType environment, String user) throws Exception {

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_CREW","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_VC_ORIG","origen");
			xx.put("P_VC_AUXI","aux");
			xx.put("P_NU_VISU","esquema");
			xx.put("P_VC_TABL","tabla");
			xx.put("P_VC_DOMI","dominio");
			
			 
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("origen", "WEBPRO");
			parametrosIn.put("esquema", esquema);
			parametrosIn.put("tabla", tabla);
			parametrosIn.put("dominio", dominio);
			
			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_MDW_I,ConstantsProcedureDB.L_VISUALIZACION_WEB), parametrosIn, xx, ConstantsProcedureDB.L_VISUALIZACION_WEB, new Date().getTime(), "_");

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
