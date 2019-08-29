package com.pseguros.pes.busqueda.experto;

import javax.servlet.http.HttpServletRequest;

import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.generic.WebAplicatioonConst;
import com.pseguros.pes.interceptor.ConstantesDeSession;

public abstract class AbstractBusquedaExecutor implements IBusquedaExecutor{


	protected String getDato(HttpServletRequest request) {
		String dato = request.getParameter("dato");
		return dato;
	}
	

	protected String getUser(HttpServletRequest request) {
		return (String) request.getSession().getAttribute(ConstantesDeSession.USUARIO);
	}
	
	
	protected EnvironmentType getEntorno(HttpServletRequest request) {
		EnvironmentType entorno = (EnvironmentType) request.getSession().getAttribute("entorno");
		if (entorno == null) {
			request.getSession().setAttribute("entorno", WebAplicatioonConst.ENTORNO);
		}
		return entorno;
	}
	
	
}
