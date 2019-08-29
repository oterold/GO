package com.pseguros.pes.controller.pub.login;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;

import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.Parametros;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.email.util.EmailPS;
import com.pseguros.pes.email.util.EmailSender;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.ldap.LdapValidation;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.login.KeyCloakValidation;
import com.pseguros.pes.util.EmailUtil;
import com.pseguros.pes.util.pantalla.UtilPantalla;
import com.pseguros.pes.util.properties.PropertiesConstantes;
import com.pseguros.pes.util.properties.UtilProperties;

@Controller
public class LoginPubController extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(LoginPubController.class);

	private static final String PANTALLA_LOGIN = "partials/pes/login/loginHomeTemplate";
	private static final String PANTALLA_LOGIN_AUTH = "partials/pes/login/loginAuthTemplate";
	private static final String PANTALLA_LOGIN_AUTH_ENVIADO = "partials/pes/login/loginAuthEnvioTemplate";


	private static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView buscadorHome(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			mapa.put("utilToolScreen", new UtilPantalla());
			mapa.put("userApp", "");
			mapa.put("funcionOnload", "");
			mapa.put("scriptGrilla", "");
			mapa.put("scriptCustom","<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script>");


			mapa.put("entornoApp", getEntorno(request));
			
			return new ModelAndView(PANTALLA_LOGIN, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar login", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	
	@RequestMapping(value = "/loginAuth", method = RequestMethod.GET)
	public ModelAndView loginAuth(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();
		try {
			mapa.put("utilToolScreen", new UtilPantalla());
			mapa.put("userApp", "");
			mapa.put("funcionOnload", "");
			mapa.put("scriptGrilla", "");
			mapa.put("entornoApp", getEntorno(request));
			
			mapa.put("scriptCustom", "<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script><script src=\"resources/js/pslogin.js\"></script>");


			return new ModelAndView(PANTALLA_LOGIN_AUTH, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar loginAuth", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

	@RequestMapping(value = "/salir", method = RequestMethod.GET)
	public ModelAndView salir(HttpServletRequest request) {
		

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla salir");
			request.getSession().removeAttribute(ConstantesDeSession.USUARIO);
			return new ModelAndView("redirect:" + "http://provinciaintranet/");

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al salir", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		}
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}

	/*
	 * ---------------------------------- PANTALLA LOGIN IN
	 * ------------------------
	 */
	@RequestMapping(value = "/loginIn", method = RequestMethod.GET)
	public ModelAndView homeLoginIn(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla login In");

			mapa.put("funciononload", "");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

			String usuario = request.getParameter("usuarioIn");
			//Se convierte el usuarioIn a formato UTF-8
			usuario = new String(request.getParameter("usuarioIn").getBytes("ISO-8859-1"),"UTF-8");
			
			String password = request.getParameter("passwordIn");
						
			List<Parametros> datosToken = new ArrayList<Parametros>();
			NamingEnumeration<? extends Attribute> datos =  null;
			
			//Validacion desde el servidor de LDAP
			datos = validar(usuario, password);			
			
			if (datos != null) {
				request.getSession().setAttribute(ConstantesDeSession.USUARIO, usuario);
				for (NamingEnumeration<? extends Attribute> attrs2 = datos; attrs2.hasMore();) {
					Attribute attr2 = (Attribute) attrs2.next();
					if (attr2.getID().equals("displayName")) {
						request.getSession().setAttribute(ConstantesDeSession.USUARIO_DISPLAY, attr2.get().toString());
					}
				}
				return new ModelAndView("redirect:" + "home");
			}else{
				//Validacion por keycloak
				datosToken = validarKeyCloak(usuario, password);
				if(datosToken != null && !datosToken.isEmpty()){
					for(Parametros parametro: datosToken){
						if(parametro.getParametro().equals("given_name")){
							request.getSession().setAttribute(ConstantesDeSession.USUARIO_DISPLAY, parametro.getContenido());
						}
					}
					return new ModelAndView("redirect:" + "home");
				}
			}
			
			mapa.put("errorMsg", "Usuario o password incorrectos");
			mapa.put("userApp", "");
			return new ModelAndView(PANTALLA_LOGIN, mapa);

		} catch (Exception e) {

			logger.error(getUserLog(request)+"Exploto al mostrar loginIn", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
	@RequestMapping(value = "/loginAuthIn", method = RequestMethod.GET)
	public ModelAndView solicitarLoginAuthIn(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			logger.debug("Mostrar Pantalla login Auth In");

			mapa.put("utilToolScreen", new UtilPantalla());
			mapa.put("userApp", "");
			mapa.put("funcionOnload", "");
			mapa.put("scriptGrilla", "");
			mapa.put("scriptCustom", "<script src=\"/PSPES/resources/js/bootstrap/bootstrap.min.js\"></script><script src=\"resources/js/pslogin.js\"></script>");


			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			
			String nomApe = request.getParameter("nomApe");
			String emailUsuario = request.getParameter("emailIn");
			String usuarioRed = request.getParameter("usuarioRedIn");
			String mensaje = request.getParameter("mensajeIn");

			if(nomApe.length()>10){
				
				Properties propiedadesUser = new Properties();
				
                Date date = new Date();
                DateFormat fechaFormato = new SimpleDateFormat("HH:mm:ss dd/MM/yyyy");
                propiedadesUser.setProperty("fechaProcesamiento", fechaFormato.format(date));
                propiedadesUser.setProperty("usuario", nomApe);
                propiedadesUser.setProperty("usuarioRed", usuarioRed);
                propiedadesUser.setProperty("mensaje", mensaje);
                propiedadesUser.setProperty("emailUsuario", emailUsuario);

                if (!EmailUtil.validar(emailUsuario)) {
                	mapa.put("errorMsg", "El email ingresado es inv&aacute;lido.");
    				mapa.put("userApp", "");
    				return new ModelAndView(PANTALLA_LOGIN_AUTH, mapa);
                }else{
                	
                	  EmailPS emailIn = new EmailPS();
                      emailIn.setEmailDestino(emailUsuario);
                      
                      emailIn.setSubject("Solicitud ingreso GO - Provincia Seguros S.A.");
                      emailIn.setTemplate("templateEmailAutorizacion.html");
                      emailIn.setPropiedadesUser(propiedadesUser);
                      EmailSender.enviar(emailIn );
                      
                      //Se agrega destinatarios para notificar la peticion de ingreso
                      emailIn.setEmailDestino("puentel@pseguros.com.ar");
                      emailIn.setTemplate("templateEmailAutorizacionRecibida.html");
                      emailIn.setPropiedadesUser(propiedadesUser);
                      EmailSender.enviar(emailIn );
                      
                      emailIn.setEmailDestino("grisaym@pseguros.com.ar");
                      emailIn.setTemplate("templateEmailAutorizacionRecibida.html");
                      emailIn.setPropiedadesUser(propiedadesUser);
                      EmailSender.enviar(emailIn );

                }
				
			}
			else{
				mapa.put("errorMsg", "Ingrese nombre y apellido");
				mapa.put("userApp", "");
				return new ModelAndView(PANTALLA_LOGIN_AUTH, mapa);
			}
		
			return new ModelAndView(PANTALLA_LOGIN_AUTH_ENVIADO, mapa);

			
		} catch (Exception e) {

			logger.error(getUserLog(request)+"Exploto al mostrar loginAuthIn", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());

		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}

	// valida el usuario
	private NamingEnumeration<? extends Attribute> validar(String usuario, String password) throws Exception {
		try {
			return new LdapValidation().getUsuario(usuario, password, usuario);			
			
		} catch (Exception e) {
			logger.error("No valido user ", e);
		}
		return null;
	}

	private List<Parametros> validarKeyCloak(String usuario, String password) throws Exception {
		try {
			
			return new KeyCloakValidation().getUsuario(usuario, password);
			
		} catch (Exception e) {
			logger.error("No valido user ", e);
		}
		return null;
	}
	
	@RequestMapping(value = "/encuesta", method = RequestMethod.GET)
	public ModelAndView encuesta(HttpServletRequest request) {
		

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			logger.debug("Mostrar Pantalla salir");
			request.getSession().removeAttribute(ConstantesDeSession.USUARIO);
			return new ModelAndView("redirect:" + "https://goo.gl/forms/m6Idsl8mlqmc39kJ3");

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar la encuesta", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());

		}
		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
	
}
