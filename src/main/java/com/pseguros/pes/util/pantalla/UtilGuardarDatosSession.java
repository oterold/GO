package com.pseguros.pes.util.pantalla;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pseguros.pes.bean.DatosCotizacionGO;
import com.pseguros.pes.bean.DatosGrillaProducto;
import com.pseguros.pes.cotizador.GoCotizador;

public class UtilGuardarDatosSession {
	private static final Logger logger = LoggerFactory.getLogger(GoCotizador.class);

	public static void guardarDatosPromocion(DatosCotizacionGO datosCoti, HttpServletRequest request) {
	
		try{
			datosCoti.setPromocionA(request.getParameter("promoA"));
			datosCoti.setPromocionB(request.getParameter("promoB"));
			datosCoti.setPromocionC(request.getParameter("promoC"));
			
		} catch (Exception e) {
		logger.error("Error al guardar las promociones en session",e);		
		}
	}

	public static void guardarDatosCertificado(ArrayList arrayList, DatosCotizacionGO datosCoti) {
		for (Iterator iterator = arrayList.iterator(); iterator.hasNext();) {
			Object object = (Object) iterator.next();
			datosCoti.setBien(((HashMap)object).get("P_TF_CAZB.INB_DSP_IDENTIFICACION").toString());
			datosCoti.setSumaAseg(((HashMap)object).get("P_TF_CAZB.INB_MT_SUMA_ASEGURADA").toString());
		}
	}

	public static void guardarDatosGrillaProd(ArrayList arrayList, DatosCotizacionGO datosCoti) {
		DatosGrillaProducto datos = new DatosGrillaProducto();
		for (Iterator iterator = arrayList.iterator(); iterator.hasNext();) {
			HashMap object = (HashMap) iterator.next();
			datos.setDireccion(object.get("P_TF_CAPU.CRPB_IN_DIRECCION").toString());
			datos.setBeneficiario(object.get("P_TF_CAPU.CRPB_IN_BENEFICIARIOS").toString());
			datos.setCerrado(object.get("P_TF_CAPU.CRPB_IN_COBERTURAS").toString());
			datos.setListaBienes(object.get("P_TF_CAPU.CRPB_IN_LISTAS_BIENES").toString());
			datos.setNomina(object.get("P_TF_CAPU.CRPB_IN_NOMINA").toString());
		}
		datosCoti.setDireccion(datos);
		
	}

	public static void guardarDatosCotizacion(HttpServletRequest request,DatosCotizacionGO datosCoti) {
		
		datosCoti.setPromocion(request.getParameter("promo"));
		datosCoti.setPlan(request.getParameter("plan"));
		datosCoti.setFechaEmision(request.getParameter("fecha"));
		datosCoti.setValorPromo(request.getParameter("valor"));
	}		


}
