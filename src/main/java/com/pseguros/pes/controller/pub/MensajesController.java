package com.pseguros.pes.controller.pub;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.pseguros.pes.controller.util.cache.CacheMensajes;
import com.pseguros.pes.controller.util.cache.FechaMensaje;
import com.pseguros.pes.controller.util.cache.LogMensajes;
import com.pseguros.pes.controller.util.cache.Mensaje;
import com.pseguros.pes.generic.EnvironmentContextHolder;

@Controller
public class MensajesController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(MensajesController.class);
	private static CacheMensajes cache = null;
	private static Map<String,List<LogMensajes>> logMensajes = new HashMap<String, List<LogMensajes>>();
	

	@RequestMapping(value = "/mensajes", method = RequestMethod.GET)
	public @ResponseBody
	ArrayList getMensajes(HttpSession session, HttpServletRequest request) throws Exception {
		ArrayList<Mensaje> mensajes = new ArrayList();
		try {
			logger.debug("mensajes");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			if(cache == null){
				
				cargarCache();
			}
			mensajes = cache.getMensajes();
			mensajes = procesarMensajes(mensajes,request);
			
		} catch (Exception e) {
			logger.error("Exploto al mostrar las polizas rechazadas", e);
		}

		return mensajes;
	}
	
	private ArrayList procesarMensajes(ArrayList<Mensaje> mensajes, HttpServletRequest request) {
		ArrayList out = new ArrayList<Mensaje>();
		ArrayList tmp = new ArrayList<Mensaje>();
		ArrayList tmpDos = new ArrayList<Mensaje>();
		
		for (Iterator iterator = mensajes.iterator(); iterator.hasNext();) {
			Mensaje object = (Mensaje) iterator.next();
			if(validarFechas(object)){
				tmp.add(object);
			}
			
		}
		for (Iterator iterator = tmp.iterator(); iterator.hasNext();) {
			Mensaje object = (Mensaje) iterator.next();
			if(validarUsuario(object,request)){
				tmpDos.add(object);
			}
			
		}	
		for (Iterator iterator = tmpDos.iterator(); iterator.hasNext();) {
			Mensaje object = (Mensaje) iterator.next();
			if(validarMensajeEnCacheUsuario(object,request)){
				out.add(object);
				
			}
			
		}
		
		return out;
	}

	private boolean validarMensajeEnCacheUsuario(Mensaje object, HttpServletRequest request) {
		String usuarioEnSession = getUser(request);

		List<LogMensajes> mensajesLogUsuario = logMensajes.get(usuarioEnSession);
		if (mensajesLogUsuario != null && mensajesLogUsuario.size()>0) {
			
		for (Iterator iterator = mensajesLogUsuario.iterator(); iterator.hasNext();) {
			LogMensajes logMensaje = (LogMensajes) iterator.next();
			if (object.getId().equals(logMensaje.getMensaje().getId())) {
				int x = object.getVecesDisplayaPorUsuario();
				int y = logMensaje.getMensajeMostrado();
				if (y<=x) {
					LogMensajes e = new LogMensajes();
					e.setMensaje(object);
					y=y+1;
					e.setMensajeMostrado(y);
					
					List<LogMensajes> mensajesLogUsuarioNew  = new ArrayList<LogMensajes>(); 
					
					for (Iterator iterator2 = mensajesLogUsuario.iterator(); iterator2.hasNext();) {
						LogMensajes tmp1 = (LogMensajes) iterator2.next();
						if (tmp1.getMensaje().getId().equals(object.getId())) {
							mensajesLogUsuarioNew.add(e);
						}else {
							mensajesLogUsuarioNew.add(tmp1);
						}
						
					}
					
					logMensajes.put(usuarioEnSession, mensajesLogUsuarioNew);
					
					return true;
					
				}else {
					return false;
				}
				
			}
		}
		}else {
			mensajesLogUsuario = new ArrayList<LogMensajes>();
		}
		
		//Si no esta en la lista lo creo y lo agrego
		LogMensajes e = new LogMensajes();
		e.setMensaje(object);
		e.setMensajeMostrado(1);
		mensajesLogUsuario.add(e);
		
		logMensajes.put(usuarioEnSession, mensajesLogUsuario);

		return true;
	}

	private boolean validarUsuario(Mensaje object, HttpServletRequest request) {
		String usuarioEnSession = getUser(request);
		if (object.getUsuarios() == null || object.getUsuarios().size() < 1) {
			return true;
		}
		for (Iterator iterator = object.getUsuarios().iterator(); iterator.hasNext();) {
			String usuario = (String) iterator.next();
			if (usuario.equals(usuarioEnSession)) {
				return true;
			}
		}

	return false;
	}

	private boolean validarFechas(Mensaje object) {
		long ahora = new Date().getTime();
			if (object.getFechas() == null || object.getFechas().size()<1){
			return true;
		}
		for (Iterator iterator = object.getFechas().iterator(); iterator.hasNext();) {
			FechaMensaje fecha = (FechaMensaje) iterator.next();
			if (fecha.getDiaDesde().getTime()< ahora && fecha.getDiaHasta().getTime()>ahora) {
				return true;
			}
		}
	
		return false;
	}

	@RequestMapping(value = "/actualizar", method = RequestMethod.GET)
	public @ResponseBody  String getActualizar(HttpSession session, HttpServletRequest request) throws Exception {
		try {
			logger.debug("actualizar");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
				
			cargarCache();
			
			logMensajes = new HashMap<String, List<LogMensajes>>();
			
			
		} catch (Exception e) {
			logger.error("Exploto al mostrar las polizas rechazadas", e);
			return "bad";
		}

		return "ok";
	}

	private void cargarCache() throws Exception {
		//byte[] encoded = com.pseguros.pes.util.archivo.FileUtils.fileToArray("/home/conf/mensajes.json");

		byte[] encoded = com.pseguros.pes.util.archivo.FileUtils.fileToArray("/opt/tomcat/conf/mensajes.json");
		
		Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();

		cache = gson.fromJson(new String(encoded, Charset.defaultCharset()), CacheMensajes.class);		
	}

}
