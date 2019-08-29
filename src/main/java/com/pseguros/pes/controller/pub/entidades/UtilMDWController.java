package com.pseguros.pes.controller.pub.entidades;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pseguros.pes.bean.ParametroBean;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.InspeccionesService;

@Controller
public class UtilMDWController {

	
	private static final Logger logger = LoggerFactory.getLogger(UtilMDWController.class);
	
	private static final String PANTALLA_DIRECCIONES_INSPECCIONES = "partials/pes/entidades/poliza/inspecciones/inspeccionesHomeTemplate";


	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private InspeccionesService inspeccioneService;
	
	
	@RequestMapping("/wikipl")
	public @ResponseBody Object getDocumentacion(HttpServletRequest request, HttpServletResponse response) throws Exception {

		try {
			logger.debug("wikipl -- wikipl  -- wikipl-- wikipl  -- wikipl-- wikipl  -- wikipl");
			
			String pkg = request.getParameter("pkg");
			String name = request.getParameter("name");
			
			String nameFile = new Date().getTime() + ".md";
			
			File file = generarFile(pkg, name, nameFile);
	        
	        
	        
			response.setContentType("text/plain");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\""+pkg + "_" + name+"."+"md" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			return null;
			
			
			
		} catch (Exception e) {
			logger.error("Se ha producido un errror", e);
		}
		return null;
	}


	@RequestMapping("/wikipkg")
	public @ResponseBody Object wikiPkg(HttpServletRequest request, HttpServletResponse response) throws Exception {

		try {
			logger.debug("wikipl -- wikipl  -- wikipl-- wikipl  -- wikipl-- wikipl  -- wikipl");
			
			String pkg = request.getParameter("pkg");
			String name = request.getParameter("name");
			String nameFile = new Date().getTime() + ".md";
			
			File file = generarFilePkg(pkg, nameFile);
	        
	        
	        
			response.setContentType("text/plain");
			
			response.setContentLength((int) file.length());
			
			response.setHeader("Content-Disposition", "attachment; filename=\""+pkg + "_" + name+"."+"md" + "\"");

			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			
			FileCopyUtils.copy(new FileInputStream(file), response.getOutputStream());
			
			return null;
			
			
			
		} catch (Exception e) {
			logger.error("Se ha producido un errror", e);
		}
		return null;
	}

	
	
	private File generarFile(String pkg, String name, String nameFile) throws Exception {
		List parametros = executeService.buscarParametrosByProcedimiento(pkg.toUpperCase(), name.toUpperCase(),"GIOSEG");
		
		
		
		
		File file = new File("/tmp/"+nameFile);
		
		FileWriter fichero = null;
		PrintWriter pw = null;
		try
		{
		    fichero = new FileWriter(file);
		    pw = new PrintWriter(fichero);
		    pw.println("### Esta es la documentacion del procedimiento : **" + pkg+"**.**" + name+"**");
		    pw.println(" ");
		    pw.println("* Los Parametros son  :");
		    pw.println("");
		    pw.println("| -        | Nombre           | Tipo | In/Out |  Descripcion |");
		    pw.println("| ------------- | ---------------- | ----- | ----- | ------ | ---- |");
		    for (Iterator iterator = parametros.iterator(); iterator.hasNext();) {
				ParametroBean parametro = (ParametroBean) iterator.next();
					pw.println("| "+parametro.getPosicion()+" | "+parametro.getNombre()+" | "+parametro.getTipoDato() +" | "+parametro.getInOut()+" | <!-- agregue su descripcion aca --> |");

			}
		    pw.println("");
		    pw.println("- Contenido :");
		    pw.println("<!-- agregue su contenido aca --> ");
		    

		    
		    

		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		   try {
		   if (null != fichero)
		      fichero.close();
		   } catch (Exception e2) {
		      e2.printStackTrace();
		   }
		}
		return file;
	}
	
	
	
	private File generarFilePkg(String pkg,String nameFile) throws Exception {
		List parametros = executeService.buscarProcedimientoEnPkg(pkg.toUpperCase(),"GIOSEG");
		
		
		
		
		File file = new File("/tmp/"+nameFile);
		
		FileWriter fichero = null;
		PrintWriter pw = null;
		try
		{
		    fichero = new FileWriter(file);
		    pw = new PrintWriter(fichero);

		    pw.println("### Esta es la documentacion del Procedimineto :");
		    pw.println(" ");
		    pw.println("Paquete = **" + pkg+"** ");
		    pw.println(" ");
		    pw.println("#### Los Parametros de entrada son  :");
		    pw.println(" ");

		    for (Iterator iterator = parametros.iterator(); iterator.hasNext();) {
				ParametroBean parametro = (ParametroBean) iterator.next();
				if (parametro.getInOut().equals("IN")) {
					
					pw.println("- " + parametro.getNombre() + " | " + parametro.getTipoDato() );
				}

			}
		    pw.println(" ");
		    pw.println("#### Los parametros de salida son  :");
		    pw.println(" ");

		    for (Iterator iterator = parametros.iterator(); iterator.hasNext();) {
				ParametroBean parametro = (ParametroBean) iterator.next();
				if (!parametro.getInOut().equals("IN")) {
					
					pw.println("- " + parametro.getNombre() + " | " + parametro.getTipoDato() );
				
				}

			}
		    pw.println(" ");

		    
		    

		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		   try {
		   if (null != fichero)
		      fichero.close();
		   } catch (Exception e2) {
		      e2.printStackTrace();
		   }
		}
		return file;
	}
	
	
	
}
