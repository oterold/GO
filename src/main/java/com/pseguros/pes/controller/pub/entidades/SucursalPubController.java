package com.pseguros.pes.controller.pub.entidades;

import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.SucursalService;

@Controller
public class SucursalPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(SucursalPubController.class);
	

	@Autowired
	private ExecuteService executeService;
	
	@Autowired 
	private SucursalService sucursalService;

//  Datos que devuelve
//	CASU_ID_CRM
//	CASU_CD_SIGLAS
//	CASU_CAEM_CD_CENTRO_EMISOR
//	CASU_CAGI_CD_REGION
//	CASU_DI_SUCURSAL1
//	CASU_DI_SUCURSAL2
//	CASU_CAES_CD_ESTADO
//	CASU_CACI_CD_CIUDAD
//	CASU_NU_TELEFONO1
//	CASU_NU_TELEFONO2
//	CASU_NU_TELEX
//	CASU_NU_FAX
//	CASU_ZN_POSTAL
//	CASU_NU_APARTADO
//	CASU_MT_MINIMO_VO_BO
//	CASU_IN_SUC_COBRO
//	CASU_CD_NACIONALIDAD
//	CASU_NU_CEDULA_RIF
//	CASU_NM_AUTORIZADO
//	CASU_NM_APODERADO
//	CASU_NM_CARGO_APODERADO
//	CASU_DATOS_REG_1
//	CASU_FE_JUNTA
//	CASU_NU_INPREABOGADO
//	CASU_CD_APODERADO
//	CASU_DI_NUMERO
//	CASU_NM_BENEF_CHEQUE
//	CASU_DIAS_DIFERIDO
//	CASU_IN_CAJA
//	CASU_CAUS_CD_USUARIO
//	CASU_GECP_NU_POSTAL
//	CASU_DE_CALLE
//	CASU_DE_NUMERO
//	CASU_DE_PISO
//	CASU_DE_DEPARTAMENTO
//	CASU_DE_TELEFONO
//	CASU_DE_FAX
//	CASU_DE_EMAIL
//	CASU_CD_SUCURSALS
//	CASU_FE_ACTUALIZACION
//	CASU_CD_SUC_ORG
//	CASU_IN_CAPITAL
//	CASU_CASU_CD_SUCURSAL_I
//	CASU_CD_SUCURSAL_IMPRESION
//	CASU_FE_CIERRE
//	CASU_IN_INTERNET
//	CASU_NU_TELEFONO3
//	CASU_NU_LATITUD
//	CASU_NU_LONGITUD
//	CASU_NM_RESPONSABLE
//	CASU_IN_MOVIL
//	CASU_DE_HORARIO
//	CASU_FE_BAJA
//	CASU_IN_WEB
//	CASU_CD_SUCURSAL
//	CASU_DE_SUCURSAL
	@RequestMapping(value = "/detalleSucursal", method = RequestMethod.GET)
	public @ResponseBody Object detalleSucursal(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		try {
			logger.debug("inicio el metodo detalleSucursal");
			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String sucursal = request.getParameter("sucursal");
			return getDatosSucursal(sucursal, request);
		} catch (Exception e) {
			logger.error(getUserLog(request)+"detalleSucursal exploto", e);
			return "No se encontraron sucursales " + e.getLocalizedMessage();
		}
	}


	
	/**
	 * Todo esto debe cambiar por procedimientos
	 * @param sucursal
	 * @return
	 * @throws Exception
	 */
	private List getDatosSucursal(String sucursal, HttpServletRequest request) throws Exception {
		return sucursalService.getDatosSucursal(sucursal, getEntorno(request), getUser(request));
	}
	
}
