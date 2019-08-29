package com.pseguros.pes.busqueda.experto;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.busquedaExperto.BuscadorCertificadosService;
import com.pseguros.pes.service.entidades.busquedaExperto.BuscadorPromocionesService;

public class CertificadoBusquedaExecutor extends AbstractBusquedaExecutor{

	@Autowired
	private BuscadorCertificadosService buscadorPromocionesService;
	
	


	@Override
	public ResultadoBusqueda executor(HttpServletRequest request, ExecuteService executeService, String datoPagina, String datoP1, String datoP2, String datoP3, String datoP4, String desde, String hasta) throws Exception {
		ResultadoBusqueda resultado = new BuscadorCertificadosService().getAllCertificados(getDato(request), getEntorno(request), getUser(request),datoPagina, datoP2, datoP3, datoP4,executeService, desde, hasta);
		
		return resultado ;
	}
	

}
