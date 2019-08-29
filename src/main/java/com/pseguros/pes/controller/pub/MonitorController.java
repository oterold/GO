package com.pseguros.pes.controller.pub;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.bean.URLLog;
import com.pseguros.pes.bean.UsuarioLog;
import com.pseguros.pes.excel.util.ExcelUtil;
import com.pseguros.pes.util.Dateutils;

@Controller
public class MonitorController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(MensajesController.class);
	
	private static final String PANTALLA_MONITOR = "partials/pes/Monitor/monitorHomeTemplate";


	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/monitor", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getMensajes(HttpSession session, HttpServletRequest request) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		List<UsuarioLog> usuarios = new ArrayList<UsuarioLog>();
		
		int cantidadAll = 0;

		String	dia = request.getParameter("p1");
		String	mes =  request.getParameter("p2");
		String	annio= request.getParameter("p3");
		
		try {
			logger.debug("Mostrar Pantalla Cliente Home");
			
				if (
						getUser(request).toUpperCase().equals("GRISAYM") ||  
						getUser(request).toUpperCase().equals("LLACCUAJ") ||  
						getUser(request).toUpperCase().equals("PUENTEL") ||
						getUser(request).toUpperCase().equals("FIANDESIOA")
					) {
					
				mapa.put("funcionOnload", "inicioMonitorHome();");
				mapa.putAll(getDatosComunes(request));
				java.util.Date fecha = new Date();
	
				if( dia == null || dia.equals("")){
					dia = Dateutils.getNow().getDate()+"";
					if(dia.length() == 1)
						dia="0"+dia;
					mes = Dateutils.getNow().getMonth()+1+"";
					mes = mes.length() <2 ? "0"+mes : mes;
					annio = Dateutils.getNow().getYear()+1900+"";
						
				}
				if(dia.length() ==1){
					dia="0"+dia;
				}
				
				usuarios = getUsuarios(dia,mes,annio);
				
				
				for (Iterator iterator = usuarios.iterator(); iterator.hasNext();) {
					UsuarioLog usuarioLog = (UsuarioLog) iterator.next();
					cantidadAll = cantidadAll + usuarioLog.getAccesos().size();
				}
				
				Collections.sort(usuarios, new Comparator() {
					@Override
					public int compare(Object o1, Object o2) {
						return new Integer(((UsuarioLog)o2).getCantidad()).compareTo(new Integer(((UsuarioLog)o1).getCantidad()));
					}
				});
				
			
			}

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al PANTALLA_MONITOR", e);
			
			mapa.put("errorMsg", "" + e.getMessage());
		}
		mapa.put("usuarios",usuarios.size()>0? usuarios:0);
		mapa.put("usuariosCantidad",usuarios.size()>0? usuarios.size():0);
		mapa.put("requestCantidad", cantidadAll);
		
		mapa.put("diasPorMes", getTotalDiasPorMes(Integer.parseInt(mes), Integer.parseInt(annio)));
		
		mapa.put("dia",Integer.parseInt(dia,10));
		mapa.put("mes",mes);
		mapa.put("annio",annio);

		return new ModelAndView(PANTALLA_MONITOR, mapa);

	}

	@RequestMapping(value = "/datosMonitorUser", method = RequestMethod.GET)
	public @ResponseBody List<URLLog> getDatosMonitorUser(HttpSession session, HttpServletRequest request) throws Exception {

		try {
			logger.debug("mustra panel C del monitor");
			List<URLLog> datos=new ArrayList<URLLog>();
			String usuario=request.getParameter("user");
			usuario = new String(request.getParameter("user").getBytes("ISO-8859-1"),"UTF-8");
			
			String	dia = request.getParameter("dia");
			String	mes = request.getParameter("mes");
			String	annio=request.getParameter("annio");
			
			if(dia.length()==1){
				dia="0"+dia;
			}
			
			List<UsuarioLog> usuarios = getUsuarios(dia,mes,annio);
			for (Iterator iterator = usuarios.iterator(); iterator.hasNext();) {
				UsuarioLog usuarioLog = (UsuarioLog) iterator.next();
				if(usuarioLog.getNombre().equals(usuario)){
					return usuarioLog.getAccesos();
				}
			}
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar datos monitor", e);
		}

		return null;

	}

	@RequestMapping(value = "/exportarUsuariosMonitor", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getExportarUsuariosMonitor(HttpSession session, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			
			logger.debug("Exportar usuarios monitor");
			
			String	dia = request.getParameter("p1");
			String	mes =  request.getParameter("p2");
			String	anio= request.getParameter("p3");
			java.util.Date fecha = new Date();

			if( dia == null || dia.equals("")){
				dia = Dateutils.getNow().getDate()+"";
				if(dia.length() == 1)
					dia="0"+dia;
				mes = Dateutils.getNow().getMonth()+1+"";
				anio = Dateutils.getNow().getYear()+1900+"";
					
			}
			
			List<UsuarioLog> usuarios = getUsuarios(dia,mes,anio);
			
			int cantidadAll = 0;
			
			Collections.sort(usuarios, new Comparator() {
				@Override
				public int compare(Object o1, Object o2) {
					return new Integer(((UsuarioLog)o2).getCantidad()).compareTo(new Integer(((UsuarioLog)o1).getCantidad()));
				}
			});
			
			for (Iterator iterator = usuarios.iterator(); iterator.hasNext();) {
				UsuarioLog usuarioLog = (UsuarioLog) iterator.next();
				cantidadAll = cantidadAll + usuarioLog.getAccesos().size();
			}
			
			
			ExcelUtil eu = new ExcelUtil();
			Map beans=new HashMap();
			Date date = new Date();
			DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			beans.put("fechaConsulta", dia+"/"+mes+"/"+anio);
			beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
			
			String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";

			String tipoArchivo ="";
			beans.put("detalle", usuarios);
			beans.put("total", usuarios.size());
			
			eu.ejecutar(beans, "templateUsuariosMonitor.xls", archivoXLS);
		
		File file = new File( archivoXLS);
		
		response.setContentType("application/xls");
		
		response.setContentLength((int) file.length());
		
		response.setHeader("Content-Disposition", "attachment; filename=\"" + "usuariosMonitor_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

		response.setHeader("Set-Cookie", "fileDownload=true; path=/");
		
		FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
		
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Se ha producido un error al querer descargar el archivo de usuarios monitor", e);
			mapa.put("funcionOnload","");
			mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de usuarios monitor");
			return new ModelAndView(PANTALLA_ERROR, mapa);
		}

		return null;

	}
	
	
	@RequestMapping(value = "/exportarUsuariosAccesoTotal", method = RequestMethod.GET)
	public @ResponseBody ModelAndView getExportarUsuariosAccesoTotal(HttpSession session, HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> mapa = new HashMap<String, Object>();

		try {
			
			logger.debug("Exportar Accesos Total Usuarios Monitor");
			
			String	mes =  request.getParameter("p1");
			String	anio= request.getParameter("p2");
			java.util.Date fecha = new Date();

			if( mes == null || mes.equals("")){
				mes = Dateutils.getNow().getMonth()+1+"";
				
				anio = Dateutils.getNow().getYear()+1900+"";
					
			}
			
			List<UsuarioLog> usuarios = getUsuariosAll(mes,anio);
			
			int cantidadAll = 0;
			
			Collections.sort(usuarios, new Comparator() {
				@Override
				public int compare(Object o1, Object o2) {
					return new Integer(((UsuarioLog)o2).getCantidad()).compareTo(new Integer(((UsuarioLog)o1).getCantidad()));
				}
			});
			
			for (Iterator iterator = usuarios.iterator(); iterator.hasNext();) {
				UsuarioLog usuarioLog = (UsuarioLog) iterator.next();
				cantidadAll = cantidadAll + usuarioLog.getAccesos().size();
			}
			
			
			ExcelUtil eu = new ExcelUtil();
			Map beans=new HashMap();
			Date date = new Date();
			DateFormat hourFormat = new SimpleDateFormat("HH:mm:ss");
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			beans.put("fechaConsulta", mes+"/"+anio);
			beans.put("fechaActual",dateFormat.format(date) +" - "+hourFormat.format(date)); 
			
			String archivoXLS = "/tmp/"+new Date().getTime() + ".xls";
			
			String tipoArchivo ="";
			beans.put("detalle", usuarios);
			beans.put("total", usuarios.size());
			
			eu.ejecutar(beans, "templateUsuariosTotalMonitor.xls", archivoXLS);
		
		File file = new File( archivoXLS);
		
		response.setContentType("application/xls");
		
		response.setContentLength((int) file.length());
		
		response.setHeader("Content-Disposition", "attachment; filename=\"" + "usuariosTotalMonitor_"+Dateutils.toCustomFormat(Dateutils.getNow())+".xls" + "\"");

		response.setHeader("Set-Cookie", "fileDownload=true; path=/");
		
		FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
		
		
		} catch (Exception e) {
			logger.error(getUserLog(request)+"Se ha producido un error al querer descargar el archivo de accesos de usuario total monitor", e);
			mapa.put("funcionOnload","");
			mapa.put("errorMsg", "Se ha producido un error al querer descargar el archivo de accesos de usuario total monitor");
			return new ModelAndView(PANTALLA_ERROR, mapa);
		}

		return null;

	}
	

	private List<UsuarioLog> getUsuarios(String dia, String mes, String anio) throws IOException {
		
		HashMap<String, List<URLLog>> datosAll = new HashMap<String, List<URLLog>>();
		
		List<UsuarioLog> datos = new ArrayList<UsuarioLog>();
		
			String cadena;
			FileReader f = new FileReader(getNombreArchivo(mes,anio));
	        
	        BufferedReader b = new BufferedReader(f);
	        while((cadena = b.readLine())!=null) {
	        	
	        	String[] fec = cadena.split("Log Uri")[0].split("-");
	        	
	        	String fecha = fec[1] + "-"+fec[2] + "-"+fec[3].replaceAll(":DEBUG : LOGGER_USER:21", "").trim();
	        	String pantalla = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[0].replaceAll(":", "").trim();
	        	String user = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[1].replaceAll("User:", "").trim();
	        	String url = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[2].replaceAll("Path all :", "").trim();

	        	String fecha2 =fec[1] + "-"+fec[2] + "-"+fec[3].replaceAll(":DEBUG : LOGGER_USER:21", "").toString().trim().split(" ")[0].trim();
	        	
	        	    if (fecha2 != null && fecha2.trim().equals(anio+"-"+mes+"-"+dia)) {
			        	
			        	URLLog urlLog = new URLLog(fecha,pantalla,url);
			        	
			    	    if (datosAll.containsKey(user.toUpperCase())) {
							List<URLLog> lista = datosAll.get(user.toUpperCase());
							lista.add(urlLog);
							datosAll.put(user.toUpperCase(),lista );
						}else {
							
							List<URLLog> lista = new ArrayList<URLLog>();
							lista.add(urlLog);
							datosAll.put(user.toUpperCase(),lista );
						}
	        	}
	        	
	            
	        }
	        b.close();
	        
	        for (Entry<String, List<URLLog>> entry : datosAll.entrySet()){
	        
	        	UsuarioLog userTmp = new UsuarioLog();
	        	userTmp.setNombre(entry.getKey());
	        	userTmp.setAccesos(entry.getValue());
	        	userTmp.setCantidad(""+entry.getValue().size());
	        	datos.add(userTmp);
	        }
	        
	        
		return datos;
	}


	
private List<UsuarioLog> getUsuariosAll(String mes, String anio) throws IOException {
		
		HashMap<String, List<URLLog>> datosAll = new HashMap<String, List<URLLog>>();
		
		List<UsuarioLog> datos = new ArrayList<UsuarioLog>();
		
			String cadena;
			FileReader f = new FileReader(getNombreArchivo(mes,anio));
	        
	        BufferedReader b = new BufferedReader(f);
	        while((cadena = b.readLine())!=null) {
	        	
	        	String[] fec = cadena.split("Log Uri")[0].split("-");
	        	
	        	String fecha = fec[1] + "-"+fec[2] + "-"+fec[3].replaceAll(":DEBUG : LOGGER_USER:21", "").trim();
	        	String pantalla = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[0].replaceAll(":", "").trim();
	        	String user = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[1].replaceAll("User:", "").trim();
	        	String url = cadena.split("Log Uri")[1].toString().split("\\*\\*\\*\\*")[2].replaceAll("Path all :", "").trim();

	        	String fecha2 =fec[1] + "-"+fec[2] + "-"+fec[3].replaceAll(":DEBUG : LOGGER_USER:21", "").toString().trim().split(" ")[0].trim();
	        	
	        	    
			        	
			        	URLLog urlLog = new URLLog(fecha,pantalla,url);
			        	
			    	    if (datosAll.containsKey(user.toUpperCase())) {
							List<URLLog> lista = datosAll.get(user.toUpperCase());
							lista.add(urlLog);
							datosAll.put(user.toUpperCase(),lista );
						}else {
							
							List<URLLog> lista = new ArrayList<URLLog>();
							lista.add(urlLog);
							datosAll.put(user.toUpperCase(),lista );
						}
	        	
	        	
	            
	        }
	        b.close();
	        
	        for (Entry<String, List<URLLog>> entry : datosAll.entrySet()){
	        
	        	UsuarioLog userTmp = new UsuarioLog();
	        	userTmp.setNombre(entry.getKey());
	        	userTmp.setAccesos(entry.getValue());
	        	userTmp.setCantidad(""+entry.getValue().size());
	        	datos.add(userTmp);
	        }
	        
	        
		return datos;
	}


	private String getNombreArchivo(String mes, String anio) {
		String mesactual = Dateutils.getNow().getMonth()+1+"";
		mesactual = mesactual.length() < 2 ? "0"+mesactual : mesactual; 
		if (mes.equals(mesactual)) {
			return "/home/logApp/PSPES_Users.log";
		}else {
			return "/home/logApp/PSPES_Users.log."+anio+"-"+mes;
		}
	}
	
	private int getTotalDiasPorMes(int mes, int anio){
		
		int numDias=0;
		
		switch (mes) {
	        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
	            numDias = 31;
	            break;
	        case 4: case 6: case 9: case 11:
	            numDias = 30;
	            break;
	        case 2:
	            if((anio%4==0 && anio%100!=0) || anio%400==0){
	                numDias = 29;
	            }
	            else{
	                numDias = 28;
	            }
	            break;
	        default:
	            break;
		}
		
		return numDias;
		
	}
	
}
