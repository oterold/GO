package com.pseguros.pes.interceptor;



import java.io.UnsupportedEncodingException;

import javax.mail.Session;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.pseguros.pes.ldap.LdapValidation;

public class LoginInterceptor extends HandlerInterceptorAdapter{

	private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);

	private static final Logger loggerUser = LoggerFactory.getLogger("LOGGER_USER");

	
	
	protected void logearUser(String uri, String pathInfo, String user) {
		loggerUser.debug("Log Uri : " + uri + " **** User: " + user + " **** Path all : " + pathInfo);
		
	}
	
	

	protected String getUser(HttpServletRequest request) {
		try {
			return (String) request.getSession().getAttribute(ConstantesDeSession.USUARIO);
		} catch (Exception e) {
			return "";
		}
	}
	
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)    throws Exception {
 
		try {
			logger.debug("entro en el metodo");
//			verificar que no tenga el usuario en session
//			si lo tiene todo ok
//			sino lo tiene verificar que este ok
//			guardar el usaurio en session
			
			String uri = request.getRequestURI();
			
			if (uri.indexOf("resources")>0){
				return true;
			}
				
			logearUser(uri, request.getRequestURL().toString() + "?" +request.getQueryString() , getUser(request));

			
			
			if (uri.endsWith("/PSPES/") || uri.endsWith("login")){
				return true;
			}
			if (uri.endsWith("/PSPES/") || uri.endsWith("loginIn")){
				return true;
			}
			
			if (uri.endsWith("/PSPES/") || uri.endsWith("loginAuth")){
				return true;
			}
			
			if (uri.endsWith("/PSPES/") || uri.endsWith("loginAuthIn")){
				return true;
			}
			
				//agregar pantalla error
			if (request.getSession().getAttribute(ConstantesDeSession.USUARIO) != null) {
				return true;
			}else {
				//validacion.getUsuario("tomcatusr", "tomcatpass", request.getRemoteUser());
				NamingEnumeration<? extends Attribute> datos = validar(request); 
				if (datos != null) {
					request.getSession().setAttribute(ConstantesDeSession.USUARIO,getNombreUsuario(request) );
					for (NamingEnumeration<? extends Attribute> attrs2 = datos; attrs2.hasMore();) {
						Attribute attr2 = (Attribute) attrs2.next();
						System.out.println(attr2.getID());
						if (attr2.getID().equals("displayName")) {
							request.getSession().setAttribute(ConstantesDeSession.USUARIO_DISPLAY, attr2.get().toString());
						}
					}
					return true;

				}else {
					response.sendRedirect("login");
					return false;
				}
			}
			
	 
		} catch (Exception e) {
			logger.error("Error Intercepor" , e);
			throw e;
		} 
	}


	private NamingEnumeration<? extends Attribute> validar(HttpServletRequest request) throws Exception {
		try {
			return new LdapValidation().getUsuario("tomcatusr", "tomcatpass", getNombreUsuario(request));
		} catch (Exception e) {
			logger.error("No valido user " , e);
		}
		return null;
	}


	private String getNombreUsuario(HttpServletRequest request) throws Exception {
		
		if (request.getServerName().equals("127.0.0.1")) {
			return "puentel";
			//return null;
		}else {
			//probamos el login para todos los usuarios con caracteres especiales
			//return request.getRemoteUser();
			
			return new String(request.getRemoteUser().getBytes("ISO-8859-1"),"UTF-8");
		}
	}


	
	
}