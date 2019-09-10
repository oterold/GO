package com.pseguros.pes.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;

import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.controller.pub.entidades.PolizaPubController;
import com.pseguros.pes.cotizador.GoCotizador;

public class ReportePDFUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(ReportePDFUtil.class);
	
	public static String generarReporteBoletaDePago(List boletas){
			
			String destinoBoleta="";
			Map parameters = new HashMap();
			
			//Genero reporte de boleta de pago
						
			try {
			
				InputStream stream = PolizaPubController.class.getClassLoader().getResourceAsStream("reportePdf/boletaDePago.jasper");
				
				JasperReport jasperReport;
				jasperReport = (JasperReport) JRLoader.loadObject(stream);
				
				JasperPrint jasperPrint  = JasperFillManager.fillReport(jasperReport, parameters, new JRBeanCollectionDataSource(boletas));
				destinoBoleta = "/tmp/reporteBoletaDePago"+ new Date().getTime()+".pdf";
				JasperExportManager.exportReportToPdfFile(jasperPrint, destinoBoleta);
				
			} catch (Exception e) {
				logger.error("Exploto al generarse el reporte de la boleta de pago", e);
			}
			
			return destinoBoleta;
		}
	
	
}
