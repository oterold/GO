package com.pseguros.pes.service.entidades;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.controller.pub.entidades.CobranzaPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.util.auxiliar.AuxiliarUtil;
import com.pseguros.pes.util.db.ConstantsProcedureDB;

@Controller
public class AfiliadoGrupoProvincia extends AbstractPubController{


	private static final Logger logger = LoggerFactory.getLogger(CobranzaPubController.class);
	
	private static final String PANTALLA_AFILIADO = "partials/pes/afiliado/afiliadoHomeTemplate";
	@Autowired
	private ExecuteService executeService;

	@RequestMapping(value = "/homeAfiliado", method = RequestMethod.GET)
	public ModelAndView homeAfiliado(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla homeSiniestro");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			mapa.put("funcionOnload","");
			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_AFILIADO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto homeFacturacion", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
	@RequestMapping(value = "/datosAfiliado", method = RequestMethod.GET)
	public @ResponseBody Object getDatosAfiliado(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String dato = request.getParameter("dato");
			
			return datosAfiliado(dato,getEntorno(request), getUser(request));
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto el fin de datos parametricos", e);
			return "Error al cargar los datos generales";
		}
	}

	
	public Object datosAfiliado(String dato,EnvironmentType environment, String user) throws Exception {

		Map<String, String> xx = new HashMap<String, String>();
		xx.put("P_TF_CEPG","datosSalida");
		xx.put("P_VC_MENS","mensaje");
		xx.put("P_VC_ERRO","error");
		xx.put("P_VC_ORIG","origen");
		xx.put("P_VC_AUXI","aux");
		xx.put("P_VC_BUSQ","busq");
		
		Map<String, Object> parametrosIn = new HashMap<String, Object>();
		parametrosIn.put("aux","go");
		parametrosIn.put("origen","go");
		parametrosIn.put("busq",dato);
		
		
		Map<String, Object> salida = executeService.ejecutarProcedimientoConSeparador(new ProcedimientoDatoBean(ConstantsProcedureDB.PKG_EMI_INT,ConstantsProcedureDB.B_PERSONAS_GRUPO), parametrosIn, xx, ConstantsProcedureDB.B_PERSONAS_GRUPO, new Date().getTime(), "_");

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
