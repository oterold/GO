package com.pseguros.pes.busqueda.experto;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.service.ExecuteService;
import com.pseguros.pes.service.entidades.busquedaExperto.BuscadorPromocionesService;

@Service
public class PromocionBusquedaExecutor extends AbstractBusquedaExecutor{


	@Autowired
	private BuscadorPromocionesService buscadorPromocionesService;

	
	@Override
	public ResultadoBusqueda executor(HttpServletRequest request, ExecuteService executeService, String datoPagina, String datoP1, String datoP2, String datoP3, String datoP4, String desde, String hasta) throws Exception {
		ResultadoBusqueda resultado = new BuscadorPromocionesService().getAllPromociones(getDato(request), getEntorno(request), getUser(request),datoPagina,executeService, desde, hasta);
		
		return resultado ;
	}
	

}
