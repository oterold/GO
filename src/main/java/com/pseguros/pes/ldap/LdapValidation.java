package com.pseguros.pes.ldap;


import java.net.InetAddress;
import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.pseguros.pes.util.properties.PropertiesConstantes;
import com.pseguros.pes.util.properties.UtilProperties;



public class LdapValidation {

	private static final Logger logger = Logger.getLogger(LdapValidation.class);
	private static String INITCTX = "com.sun.jndi.ldap.LdapCtxFactory";
	private static final String DOMINIO = "PSEGUROS.COM";
	private static final String SERVER_DESARROLLO = "SERVER_DESARROLLO";
	private static final String SERVER_PRODUCTIVO = "SERVER_PRODUCTIVO";

	/**
	 * Metodo Publico de validacion
	 * @param usuario
	 * @param clave
	 * @param request 
	 * @return
	 */
	public static boolean validar(String usuario, String clave, HttpServletRequest request) {
		
		//descomentar esto en produccion
		if (getServer(request).equals(SERVER_DESARROLLO)) {
			return true;
		}else {
			
		try {
			
			return Authenticate(DOMINIO,UtilProperties.getDato(PropertiesConstantes.LDAP_GRUPO), usuario, clave );

		} catch (Exception e) {
			logger.error("Errro al valida el usuario " , e);
		}

		return false;
		}
	}
	

	private static String getServer(HttpServletRequest request) {
		
			if (request.getServerName().equals("127.0.0.1")) {
				return SERVER_DESARROLLO;
			}
			return SERVER_PRODUCTIVO;
		
	}


	public static NamingEnumeration<? extends Attribute> getUsuario(String usuario, String clave, String userPC) throws Exception {
		
		
		try {
			if (InetAddress.getLocalHost().getHostName().toString().toUpperCase().trim().equals("SVRPES")) {
				return getDataUser(DOMINIO,UtilProperties.getDato(PropertiesConstantes.LDAP_GRUPO_PRODUCCION), usuario,clave, userPC );
			}else {
				return getDataUser(DOMINIO,UtilProperties.getDato(PropertiesConstantes.LDAP_GRUPO), usuario,clave, userPC );
			}
			
		} catch (Exception e) {
			return getDataUser(DOMINIO,UtilProperties.getDato(PropertiesConstantes.LDAP_GRUPO), usuario,clave, userPC );
		}

		
	}
	
	
	
	/**
	 * Metodo interno de validacion
	 * @param domain
	 * @param grupo
	 * @param user
	 * @param pass
	 * @return
	 */
	private static boolean Authenticate(String domain, String grupo, String user, String pass) {
		Hashtable env = new Hashtable();

		if (pass.compareTo("") == 0 || user.compareTo("") == 0)
			return false;

		env.put(Context.INITIAL_CONTEXT_FACTORY, INITCTX);
		env.put(Context.PROVIDER_URL, UtilProperties.getDato(PropertiesConstantes.LDAP_HOST));
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, new String(domain + "\\" + user));
		env.put(Context.SECURITY_CREDENTIALS, new String(pass));

		DirContext ctx = null;
		try {
			InitialDirContext iniDir =null;
			try {
				iniDir = new InitialDirContext(env);
			} catch (Exception e) {
				logger.error("*****************//////////************ Error Login : Usuario o Password invalido - User = " + user +"  *****************//////////************");
				throw e;
			}
			
			try {
				return getUsuarioGrupo(user, getGruposOID(grupo), iniDir);
			} catch (Exception e) {
				logger.error("*****************//////////************ Error Login : El usuario ingresado no pertene al grupo (tableroWebPsRRHH) - User " + user +"  *****************//////////************");
				throw e;
			}
		
		} catch (Exception e) {
			logger.error("Log ldap", e);

		} finally {
			try {
				ctx.close();
			} catch (Exception e2) {
			}
		}
		return false;
	}


	private static NamingEnumeration<? extends Attribute> getDataUser(String domain, String grupo, String user,String pass, String userPC) throws Exception {
		Hashtable env = new Hashtable();

		

		env.put(Context.INITIAL_CONTEXT_FACTORY, INITCTX);
		env.put(Context.PROVIDER_URL, UtilProperties.getDato(PropertiesConstantes.LDAP_HOST));
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, new String(domain + "\\" + user));
		env.put(Context.SECURITY_CREDENTIALS, new String(pass));

		DirContext ctx = null;
		try {
			
			if (grupo == null || userPC == null || domain ==  null) {
				throw new Exception("Dato nulo en la pre verificacion de user " + userPC + " : "  + grupo + " : " + domain);
			}
			NamingEnumeration<? extends Attribute> datos = getDataUsuarioSimple(userPC, getGruposOID(grupo), new InitialDirContext(env)); 
			if (datos != null) {
				return datos;
			}
		
		} catch (Exception e) {
			logger.error("Log ldap", e);

		} finally {
			try {
				ctx.close();
			} catch (Exception e2) {
			}
		}
		throw new Exception("No puedo validar Usuario " + userPC + " : "  + grupo);
	}

	
	/**
	 * Este metodo verifica que se encuentre en el grupo especifico
	 * @param usuario
	 * @param grupos
	 * @param dirContext
	 * @return
	 * @throws Exception
	 */
	private static boolean getUsuarioGrupo(String usuario, String[] grupos,final DirContext dirContext) throws Exception {


		try {
			for (int i = 0; grupos != null && i < grupos.length; i++) {

				Attributes attributes = dirContext.getAttributes("cn=" + grupos[i] + "," + UtilProperties.getDato(PropertiesConstantes.LDAP_BASE));

				for (NamingEnumeration<? extends Attribute> attrs = attributes.getAll(); attrs.hasMore();) {
					Attribute attr = (Attribute) attrs.next();

					if ("member".equals(attr.getID())) {
						
						for (NamingEnumeration<?> sub = attr.getAll(); sub.hasMore();) {

							Attributes attributes1 = dirContext.getAttributes((String) sub.next());
							
							System.out.println(" -- ");

							for (NamingEnumeration<? extends Attribute> attrs2 = attributes1.getAll(); attrs2.hasMore();) {

								Attribute attr2 = (Attribute) attrs2.next();

								String email ="";
								
								if (attr2.getID().equals("mail")) {
									email = attr2.get().toString();
								}else {
									System.out.println(attr2.getID()  + " : " + attr2.get().toString());
								}
								
								
								if (attr2.getID().equals("sAMAccountName")) {

									if (attr2.get().toString().toUpperCase().equals(usuario.toUpperCase())) {
										System.out.println(email);
										return true;

									}
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error("Error Ldap", e);
			throw e;
		}

		return false;
	}

	
	private static NamingEnumeration<? extends Attribute> getDataUsuarioSimple(String usuario, String[] grupos,final DirContext dirContext) throws Exception {

		

		try {
			for (int i = 0; grupos != null && i < grupos.length; i++) {

				Attributes attributes = dirContext.getAttributes("cn=" + grupos[i] + "," + UtilProperties.getDato(PropertiesConstantes.LDAP_BASE));

				for (NamingEnumeration<? extends Attribute> attrs = attributes.getAll(); attrs.hasMore();) {
					Attribute attr = (Attribute) attrs.next();

					if ("member".equals(attr.getID())) {
						
						for (NamingEnumeration<?> sub = attr.getAll(); sub.hasMore();) {

							Attributes attributes1 = dirContext.getAttributes((String) sub.next());
							
							for (NamingEnumeration<? extends Attribute> attrs2 = attributes1.getAll(); attrs2.hasMore();) {

								
								Attribute attr2 = (Attribute) attrs2.next();

								
								if (attr2.getID().equals("sAMAccountName")) {

									//logger.debug("LDAP ::: User : " + attr2.get().toString() + " Grupo : " + grupos[i] );
									//logger.debug(attr2.get().toString()); descomentar esto para ver todos los usuarios delgrupo
									
									if (attr2.get().toString().toUpperCase().equals(usuario.toUpperCase())) {
									
										return attributes1.getAll();

									}
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error("Error Ldap", e);
			throw e;
		}

		return null;
	}
	
	
	/**
	 * Metodo Auxiliar  
	 * @param gru
	 * @return
	 */
	private static String[] getGruposOID(String gru) {
		String[] ss = new String[1];
		ss[0] = gru;
		return ss;

	}

	
}