package com.pseguros.pes.busqueda.experto;

import javax.servlet.http.HttpServletRequest;

import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.service.ExecuteService;

public interface IBusquedaExecutor {
		
	public abstract ResultadoBusqueda executor(HttpServletRequest request, ExecuteService executeService, String datoPagina, String datoP1, String datoP2, String datoP3, String p4, String desde, String hasta) throws Exception;


}
