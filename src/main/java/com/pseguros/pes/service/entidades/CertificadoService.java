package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.dao.CertificadoDAO;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Service
public class CertificadoService {

	@Autowired
	private CertificadoDAO certificadoDAO;
	
	private static final Logger logger = LoggerFactory.getLogger(CertificadoService.class);

	@Autowired
	private ExecuteService executeService;
	
	
	public Future<ArrayList> getCertificadoEndosos(String ramo, String poliza, String nroCertificado, String sucursal, String user, EnvironmentType environment) throws Exception {
		
		logger.debug("Inicio get getCertificadoEndosos :" + " ramo: "+ ramo  + " poliza : " + poliza + " nroCertificado: " + nroCertificado);

		EnvironmentContextHolder.setEnvironmentType(environment);
		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_LISTA_END","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","nuPoliza");
		xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("nroCertificado", nroCertificado);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_LISTA_ENDOSOS);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_LISTA_ENDOSOS,new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);
	}
	
//datos extra
	
public Future<ArrayList> getCertificadoCabeceraExtra(String ramo, String poliza, String nroCertificado, String sucursal,String endoso, String user, EnvironmentType environment) throws Exception {
		
		logger.debug("Inicio get certificado poliza cabecera :" + " ramo: "+ ramo  + " poliza : " + poliza + " nroCertificado: " + nroCertificado);

		EnvironmentContextHolder.setEnvironmentType(environment);

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_DATOS","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","nuPoliza");
		xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
		xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("nroCertificado", nroCertificado);
		parametrosIn.put("endoso", endoso);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);
		
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_DATOS_EXTRA);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_DATOS_EXTRA,new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);
	}
		
	
		public Future<ArrayList> getCertificadoCabecera(String ramo, String poliza, String nroCertificado, String sucursal, String user, EnvironmentType environment) throws Exception {
		
		logger.debug("Inicio get certificado poliza cabecera :" + " ramo: "+ ramo  + " poliza : " + poliza + " nroCertificado: " + nroCertificado);

		EnvironmentContextHolder.setEnvironmentType(environment);

		
		Map<String, String> xx = new HashMap<String, String>();
		
		xx.put("P_TF_CERT","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","nuPoliza");
		xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("nuPoliza", poliza);
		parametrosIn.put("nroCertificado", nroCertificado);
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("origen", "GO");
		parametrosIn.put("user", user);
		
		
		ProcedimientoDatoBean procedimientoDato = new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CABECERA_CERTIFICADO);
		Map<String, String> parametrosDeclarados = xx;
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(procedimientoDato,parametrosIn,parametrosDeclarados,ConstantsProcedureDB.PUB_CABECERA_CERTIFICADO,new Date().getTime(),"_");
		
		if (salida.get("error") != null && salida.get("error").toString().length()> 1 ) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length()> 1 ) {
			return new AsyncResult<ArrayList>(new ArrayList());
		}
		
		ArrayList datoSalida = (ArrayList) salida.get("datosSalida");
		
		return new AsyncResult<ArrayList>(datoSalida);
	}
		
		
	//Modal prima
	public Object getDatosPrima(String poliza,String ramo,String sucursal,String certificado,String endoso, String user) throws Exception {
		logger.debug("Inicio metetodo modal prima con poliza : " + poliza + " certificado :"+certificado + "endoso : "+endoso);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PRIMA","datosSalida");
		xx.put("P_TF_PRIMA_TOTAL","datoSalidaDos");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","poliza");
		xx.put("P_NU_CERTIFICADO","certificado");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal", sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("poliza", poliza);
		parametrosIn.put("certificado", certificado);
		parametrosIn.put("endoso", endoso);
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_FACTURACION,ConstantsProcedureDB.PUB_PRIMA), parametrosIn, xx, ConstantsProcedureDB.PUB_PRIMA, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		List<String> listaFinal = new ArrayList(); 

		ArrayList lista = (ArrayList) salida.get("datosSalida");
		ArrayList listaDos = (ArrayList) salida.get("datoSalidaDos");

		listaFinal.addAll(lista);
		listaFinal.addAll(listaDos);
		
		return listaFinal;

	}

	
	//Modal componentes
	public Object getDatosComponentes(String poliza,String ramo,String sucursal,String  certificado,String endoso,String user) throws Exception {
		logger.debug("Inicio metetodo modal componentes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_COMP","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","poliza");
		xx.put("P_NU_CERTIFICADO","certificado");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal",sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("poliza", poliza);
		parametrosIn.put("certificado", certificado);
		parametrosIn.put("endoso", endoso);
		parametrosIn.put("user", user);
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_FACTURACION,ConstantsProcedureDB.PUB_COMPONENTES), parametrosIn, xx, ConstantsProcedureDB.PUB_COMPONENTES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//Modal IIBB
	public Object getDatosIiBb(String poliza,String ramo,String sucursal,String  certificado,String endoso,String user) throws Exception {
		logger.debug("Inicio metetodo modal componentes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_COMP","datosSalida");
		xx.put("P_TF_CABECERA","datoSalidaDos");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","poliza");
		xx.put("P_NU_CERTIFICADO","certificado");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal",sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("poliza", poliza);
		parametrosIn.put("certificado", certificado);
		parametrosIn.put("endoso", endoso);
		parametrosIn.put("user", user);
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_FACTURACION,ConstantsProcedureDB.PUB_COMP_IIBB), parametrosIn, xx, ConstantsProcedureDB.PUB_COMP_IIBB, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		List<String> listaFinal = new ArrayList(); 

		ArrayList lista = (ArrayList) salida.get("datosSalida");
		ArrayList listaDos = (ArrayList) salida.get("datoSalidaDos");

		listaFinal.addAll(lista);
		listaFinal.addAll(listaDos);
		
		return listaFinal;
	}
	
	
	// BIENES
	public Object getBienes(String  ramo,String producto,EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PARAM","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CD_PRODUCTO","producto");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("producto", producto);
		parametrosIn.put("user", user);
		parametrosIn.put("origen","go");
		
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_BIENES), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_BIENES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//lista parametricos
	public Object getCertificadoDatosParametricos(String ramo,String poliza,String certificado,String  sucursal,String endoso,String bien,EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PARAM","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","poliza");
		xx.put("P_CACE_NU_CERTIFICADO","certificado");
		xx.put("P_CACW_NU_ENDOSO","endoso");
		xx.put("P_CD_BIEN_ASEG","bien");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal",sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("poliza", poliza);
		parametrosIn.put("certificado", certificado);
		parametrosIn.put("endoso", endoso);
		parametrosIn.put("bien", bien);
		parametrosIn.put("user", user);
		parametrosIn.put("origen","go");
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_PARAMETRICOS), parametrosIn, xx, ConstantsProcedureDB.PUB_PARAMETRICOS, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	//lista acredores
	public Object getAcredores(String sucursal,String ramo,String poliza,String  certificado,String endoso,String bien,EnvironmentType environment, String user) throws Exception {
		logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_PARAM","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_CD_SUCURSAL","sucursal");
		xx.put("P_CD_RAMO","ramo");
		xx.put("P_CAPO_NU_POLIZA","poliza");
		xx.put("P_CACE_NU_CERTIFICADO","certificado");
		xx.put("P_NU_ENDOSO","endoso");
		xx.put("P_CD_BIEN_ASEG","bien");
		xx.put("P_ORIGEN","origen");
		xx.put("P_USUARIO","user");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("sucursal",sucursal);
		parametrosIn.put("ramo", ramo);
		parametrosIn.put("poliza", poliza);
		parametrosIn.put("certificado", certificado);
		parametrosIn.put("endoso", endoso);
		parametrosIn.put("bien", bien);
		parametrosIn.put("user", user);
		parametrosIn.put("origen","go");
		

		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_ACREEDORES), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_ACREEDORES, new Date().getTime(), "_");

		if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
			throw new Exception(salida.get("error").toString());
		}
		if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
			throw new Exception(salida.get("mensaje").toString());
		}
		
		ArrayList lista = (ArrayList) salida.get("datosSalida");

		return lista;

	}
	
	
	
	//  LISTA BIENES
		public Object getListaBienes(String sucursal,String ramo,String poliza,String  certificado,String endoso,String bien,EnvironmentType environment, String user) throws Exception {
			logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

			Map<String, String> xx = new HashMap<String, String>();
			xx.put("P_TF_PARAM","datosSalida");
			xx.put("P_VC_MENS","mensaje");
			xx.put("P_VC_ERRO","error");
			xx.put("P_CD_SUCURSAL","sucursal");
			xx.put("P_CD_RAMO","ramo");
			xx.put("P_CAPO_NU_POLIZA","poliza");
			xx.put("P_CACE_NU_CERTIFICADO","certificado");
			xx.put("P_NU_ENDOSO","endoso");
			xx.put("P_CD_BIEN_ASEG","bienAseg");
			xx.put("P_ORIGEN","origen");
			xx.put("P_USUARIO","user");
			
			Map<String, Object> parametrosIn = new HashMap<String, Object>();
			parametrosIn.put("sucursal",sucursal);
			parametrosIn.put("ramo", ramo);
			parametrosIn.put("poliza", poliza);
			parametrosIn.put("certificado", certificado);
			parametrosIn.put("endoso", endoso);
			parametrosIn.put("bienAseg", bien);
			parametrosIn.put("user", user);
			parametrosIn.put("origen","go");
			
			

			Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_L_BIENES), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_L_BIENES, new Date().getTime(), "_");

			if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
				throw new Exception(salida.get("error").toString());
			}
			if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
				throw new Exception(salida.get("mensaje").toString());
			}
			
			ArrayList lista = (ArrayList) salida.get("datosSalida");

			return lista;

		}
		
		
	//  LISTA ANEXOS
			public Object geAnexosBienes(String sucursal,String ramo,String poliza,String  certificado,String endoso,EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("endoso", endoso);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_ANEXOS), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_ANEXOS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
	
	
			public Object geAnexosLinea(String sucursal,String ramo,String poliza,String  certificado,String endoso,EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("endoso", endoso);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_ANEXOS_LINEA), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_ANEXOS_LINEA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
	
			public Object geAnexosClausula(String sucursal,String ramo,String poliza,String  certificado,String endoso,String linea,EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_CD_LINEA","linea");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("endoso", endoso);
				parametrosIn.put("linea", linea);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_ANEXOS_CLAUSULA), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_ANEXOS_CLAUSULA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
	
			

			public Object geTextoCertificado(String sucursal,String ramo,String poliza,String  certificado,String endoso,EnvironmentType environment, String user) throws Exception {
				logger.debug("Inicio metetodo lista bienes con poliza : " + poliza +"raom : "+ramo +"certificado : "+certificado + "endoso :" +endoso);

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("endoso", endoso);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_TEXTO), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_TEXTO, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
	
			

			public Object geBeneficiariosCertificado(String sucursal,String ramo,String poliza,String  certificado,String bien,EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_CD_BIEN_ASEG","bien");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("bien", bien);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_BENEFICIARIOS), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_BENEFICIARIOS, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			

			
			
			public Object geUbicacionCertificado(String sucursal,String ramo,String poliza,String  certificado,String bien,EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","poliza");
				xx.put("P_CACE_NU_CERTIFICADO","certificado");
				xx.put("P_CD_BIEN_ASEG","bien");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal",sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza", poliza);
				parametrosIn.put("certificado", certificado);
				parametrosIn.put("bien", bien);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_UBICACION), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_UBICACION, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			
			public Object getDispSatelitalCertificado(String prestador,String identificador,EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_IDENTIFICADOR","identificador");
				xx.put("P_CD_PRESTADOR","prestador");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("prestador",prestador);
				parametrosIn.put("identificador", identificador);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_DISP_SATELITAL), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_DISP_SATELITAL, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			public Object getAlarmaCertificado(String identificador,EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_PARAM","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_IDENTIFICADOR","identificador");
				xx.put("P_ORIGEN","origen");
				xx.put("P_USUARIO","user");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("identificador", identificador);
				parametrosIn.put("user", user);
				parametrosIn.put("origen","go");
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_CERT_ALARMA), parametrosIn, xx, ConstantsProcedureDB.PUB_CERT_ALARMA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				
				ArrayList lista = (ArrayList) salida.get("datosSalida");

				return lista;

			}
			
			
			
			
			public Object getLibreDeudaCertificado(String poliza,String ramo,String certificado,String sucursal,String email,EnvironmentType environment, String user) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_NU_SUCU","sucursal");
				xx.put("P_NU_RAMO","ramo");
				xx.put("P_NU_POLI","poliza");
				xx.put("P_VC_CERT","certificado");
				xx.put("P_VC_MAIL","email");
				
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("sucursal", sucursal);
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("poliza",poliza);
				parametrosIn.put("certificado",certificado+"*#");
				parametrosIn.put("email",email);
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_OFICINA_VIRTUAL,ConstantsProcedureDB.COMPR_PAGO_EJECUCION_BATCH), parametrosIn, xx, ConstantsProcedureDB.COMPR_PAGO_EJECUCION_BATCH, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				

				return null;

			}
			
			
			public Object datosExtraPanelA(String ramo, String poliza, String nroCertificado, String sucursal,String endoso, String user, EnvironmentType environment) throws Exception {

				Map<String, String> xx = new HashMap<String, String>();
				xx.put("P_TF_DATOS","datosSalida");
				xx.put("P_VC_MENS","mensaje");
				xx.put("P_VC_ERRO","error");
				xx.put("P_CD_SUCURSAL","sucursal");
				xx.put("P_CD_RAMO","ramo");
				xx.put("P_CAPO_NU_POLIZA","nuPoliza");
				xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
				xx.put("P_CACE_NU_CERTIFICADO", "nroCertificado");
				xx.put("P_NU_ENDOSO","endoso");
				xx.put("P_USUARIO","user");
				Map<String, Object> parametrosIn = new HashMap<String, Object>();
				parametrosIn.put("ramo", ramo);
				parametrosIn.put("nuPoliza", poliza);
				parametrosIn.put("nroCertificado", nroCertificado);
				parametrosIn.put("endoso", endoso);
				parametrosIn.put("sucursal", sucursal);
				parametrosIn.put("origen", "GO");
				parametrosIn.put("user", user);
				
				

				Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_PUB_CERTIFICADO,ConstantsProcedureDB.PUB_DATOS_EXTRA), parametrosIn, xx, ConstantsProcedureDB.PUB_DATOS_EXTRA, new Date().getTime(), "_");

				if (salida.get("error") != null && salida.get("error").toString().length() > 1) {
					throw new Exception(salida.get("error").toString());
				}
				if (salida.get("mensaje") != null && salida.get("mensaje").toString().length() > 1) {
					throw new Exception(salida.get("mensaje").toString());
				}
				

				return null;

			}
			
			
}
