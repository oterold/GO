package com.pseguros.pes.util.pantalla;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.support.AbstractMultipartHttpServletRequest;

import com.pseguros.pes.bean.ReturnExecuteData;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.cotizador.GoCotizador;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.interceptor.ConstantesDeSession;



public class UtilGuardarImagenInspeccion extends AbstractPubController{

	private static final Logger logger = LoggerFactory.getLogger(UtilGuardarImagenInspeccion.class);

	public static ReturnExecuteData guardarImagenInsepccion(HttpServletRequest request, EnvironmentType environmentType) {
		String fileNameOriginal = ((org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest) request).getFileMap().get("files[]").getOriginalFilename();
		String extension = fileNameOriginal.substring(fileNameOriginal.lastIndexOf(".") + 1, fileNameOriginal.length());

		logger.debug("####  File Name  ... " + fileNameOriginal);
		logger.debug("####  File Size  ... "
				+ ((org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest) request).getFileMap()
						.get("files[]").getSize());
		logger.debug("####  File Content   ... "
				+ ((org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest) request).getFileMap()
						.get("files[]").getContentType());

		EnvironmentContextHolder.setEnvironmentType(environmentType);
		Map<String, Object> mapa = new HashMap<String, Object>();
		ReturnExecuteData data = new ReturnExecuteData();

		try {
			long id = new Date().getTime();

			data.setCode("10");
			data.setId("" + id);
			Map<String, Object> datos = new HashMap<String, Object>();

			if (!extension.toLowerCase().equals("jpg") && !extension.toLowerCase().equals("pdf")
					&& !extension.toLowerCase().equals("png") && !extension.toLowerCase().equals("jpeg")) {
				throw new Exception("Las imagenes deben ser .jpg, .png, .pdf .jpeg");
			}

			datos.put("name", fileNameOriginal);
			datos.put("extension", extension);
			datos.put("secuencia", id);

			data.setData(datos);

			FileOutputStream outputStream = new FileOutputStream(
					new File("/tmp/" + id + "." + extension));

			int read = 0;

			byte[] bytes = new byte[1024];

			InputStream inputStream = ((org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest) request)
					.getFileMap().get("files[]").getInputStream();

			int x = 0;
			while ((read = inputStream.read(bytes)) != -1) {
				outputStream.write(bytes, 0, read);
				x++;
			}
			outputStream.flush();
			outputStream.close();
			// se pone esto para que los archivos que se suban no sea mayor a 5 megas
			if (x > 5000) {
				throw new Exception("El tama\u00f1o es muy grande");
			}

		} catch (Exception e) {

			data.setCode("0");
			logger.error("Error ", e);
			mapa.put("errorMsg", e.getMessage());
			data.setData(mapa);

		}
		logger.debug("fin ... ");

		return data;
	}
	
	
	
	
}
