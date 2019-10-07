package com.pseguros.pes.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bea.xml.stream.samples.Parse;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.cotizador.GoCotizador;
import com.pseguros.pes.email.util.EmailPS;
import com.pseguros.pes.email.util.EmailSender;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.util.Dateutils;
@Controller
public class AcreditarMillasController extends AbstractPubController{
	private static final Logger logger = LoggerFactory.getLogger(GoCotizador.class);
	private static final String PANTALLA_ACREDITAR_MILLAS = "partials/pes/acreditarMillas/millasTemplate";

	@RequestMapping(value = "/acreditarMillas", method = RequestMethod.GET)
	public ModelAndView cotizadorGO(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		try {

			logger.debug("entro a Acreditar Millas");
			
			mapa.put("fecha",new SimpleDateFormat("dd/MM/yyyy").format(new Date()));
			mapa.put("funcionOnload","");
			mapa.put("nombreUsuario", request.getSession().getAttribute(ConstantesDeSession.USUARIO_DISPLAY).toString());
			mapa.putAll(getDatosComunes(request));

			return new ModelAndView(PANTALLA_ACREDITAR_MILLAS, mapa);
			
		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			mapa.putAll(getDatosComunes(request));
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}	
	
	
	
	@RequestMapping(value = "/validarCode", method = RequestMethod.GET)
	public @ResponseBody Object getDatosExtraPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("Validar code para aerolineas");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			int dato = getCodeAA(request);
			
			loggearParametros(request);
			
			if(request.getParameter("code").trim().equals(""+dato) && validarMillas(request))
				return true;
		
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso",e);
		}
	
		return false;
	}

	
	
	
	private boolean validarMillas(HttpServletRequest request) {
		if(Integer.parseInt(request.getParameter("Millas").toString()) > 4000){
			return false;
		}else{
			return true;
		}
	}



	@RequestMapping(value = "/registracionCall", method = RequestMethod.GET)
	public @ResponseBody Object registracionCall(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("registracionCall code para aerolineas");
			
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			loggearParametros(request);

			Properties propiedadesUser = new Properties();
			
			Date date = new Date();
			DateFormat fechaFormato = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
			propiedadesUser.setProperty("fechaProcesamiento", fechaFormato.format(date));
			propiedadesUser.setProperty("usuario", request.getSession().getAttribute(ConstantesDeSession.USUARIO_DISPLAY).toString());
			
			
			StringBuffer msj =  new StringBuffer();
			Enumeration<String> params = request.getParameterNames(); 
			while(params.hasMoreElements()){
				String paramName = params.nextElement();
				msj.append("Parametro registrado : "+paramName+", Valor : "+request.getParameter(paramName));
				msj.append("<br>");
			}
			
			propiedadesUser.setProperty("msj", msj.toString());
			
			
			enviarEmail(request, propiedadesUser);	
			
			
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar los datos dle endoso",e);
		}
	
		return true;
	}



	private void enviarEmail(HttpServletRequest request, Properties propiedadesUser) throws Exception {
		//Configuro email 
		EmailPS emailIn = new EmailPS();
		
		emailIn.setEmailDestino(getUser(request)+"@pseguros.com.ar");
		
		emailIn.setSubject("Envio Millas AA");
		emailIn.setTemplate("templateEmailBase.html");
		emailIn.setPropiedadesUser(propiedadesUser);
		String[] emailCC= new String[2];
		emailCC[0]="grisaym@pseguros.com.ar";
		emailCC[1]="pozzie@pseguros.com.ar";
		emailIn.setEmailCC(emailCC);
		 EmailSender.enviar(emailIn);
	}

	
	


	private int getCodeAA(HttpServletRequest request) {
		
		String[] fecha = Dateutils.toBasicFormat(Dateutils.getNow()).split("/");
		int dato = Integer.parseInt(fecha[0]) + Integer.parseInt(fecha[1]) + Integer.parseInt(fecha[2]) + getUser(request).length() ;
		logger.debug("Code para Aerolineas Argentinas : " + dato);
		return dato;
		
	}



	private void loggearParametros(HttpServletRequest request) {
		try {
			Enumeration<String> params = request.getParameterNames(); 
			while(params.hasMoreElements()){
				String paramName = params.nextElement();
				logger.debug("User - " +getUser(request) + " Parameter Name - "+paramName+", Value - "+request.getParameter(paramName));
			}
			
		} catch (Exception e) {
		}
	}
	
	
	
	
	
}



