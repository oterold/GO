package com.pseguros.pes.excel.util;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

import net.sf.jxls.transformer.XLSTransformer;

import org.apache.poi.ss.usermodel.Workbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pseguros.pes.controller.pub.busqueda.BusquedaPubController;


public class ExcelUtil {

	private static final Logger logger = LoggerFactory.getLogger(BusquedaPubController.class);

	
	public static void ejecutar(Map beans,String fileNameIn, String fileNameOut) throws Exception {
		try {
			
		XLSTransformer transformer = new XLSTransformer();
		
		InputStream stream = ExcelUtil.class.getClassLoader().getResourceAsStream(fileNameIn);
		Workbook workbook = transformer.transformXLS(stream, beans);

		OutputStream reportFile = new FileOutputStream(fileNameOut);
		workbook.write(reportFile);
		} catch (Exception e) {
			logger.error("Error al generar el excel", e);
			throw e;
		}
	}

}
