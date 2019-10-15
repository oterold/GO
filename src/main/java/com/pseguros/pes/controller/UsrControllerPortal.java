package com.pseguros.pes.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pseguros.pes.bean.ResultAddUser;
import com.pseguros.pes.bean.ReturnExecuteData;
import com.pseguros.pes.bean.UserNewKeycloak;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.keycloack.AddUserKeycloackService;

@Controller
public class UsrControllerPortal extends AbstractPubController{
	
	
	private static final Logger logger = LoggerFactory.getLogger(UsrControllerPortal.class);

	
	@Autowired
	private AddUserKeycloackService addUserService;
	
	
	@RequestMapping(value = "/addUser/{entorno}/{user}/{nombre}/{apellido}/{email}/{productor}/{rol}/{password}", method = RequestMethod.GET)
	public @ResponseBody ReturnExecuteData cotizadorGO(
			@PathVariable String user,
			@PathVariable String entorno,
			@PathVariable String nombre,
			@PathVariable String apellido,
			@PathVariable String email,
			@PathVariable String productor,
			@PathVariable String rol,
			@PathVariable String password,
			
			HttpSession session, HttpServletRequest request, Locale locale) throws Exception {

	
		ReturnExecuteData rtnOut = new ReturnExecuteData();
		rtnOut.setId(new Date().getTime()+"");
		rtnOut.setEnvironment(entorno.toUpperCase());
		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
		
		HashMap salida = new HashMap();

		try {
			
			//validardatos de entrada
			ResultAddUser datoResponse = addUserService.crearUsuario(new UserNewKeycloak(user, nombre, apellido, email, productor, rol ,password));
			rtnOut.setCode("20");
			//armo la salida
			if (datoResponse.getCode().equals("201")) {
				rtnOut.setCode("10");
			}
			
			salida.put("result", datoResponse);
	        


		} catch (Exception e) {
			logger.error(getUserLog(request) + "Exploto goCotizador", e);
			rtnOut.setCode("99");
			salida.put("result", "ERROR" + e.getMessage());
			
		}
		rtnOut.setData(salida);
		return rtnOut;

	}


	
}
