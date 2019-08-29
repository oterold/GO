package com.pseguros.pes.controller.busquedaExperto;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.busqueda.bean.ResultadoBusqueda;
import com.pseguros.pes.busqueda.experto.IBusquedaExecutor;
import com.pseguros.pes.busqueda.experto.PromocionBusquedaExecutor;
import com.pseguros.pes.busqueda.util.BusquedaMaker;
import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;

@Controller
public class BusquedaExpertoPubController  extends AbstractPubController {

private static final Logger logger = LoggerFactory.getLogger(BusquedaExpertoPubController.class);
	
	private static final String PANTALLA_BUSCADOR_EXPERTO = "partials/pes/buscadorExperto/buscadorHomeExpertoTemplate";

	@Autowired
	private ExecuteService executeService;
	
	@Autowired
	private BusquedaMaker busquedaMaker;
	
	
	
	@RequestMapping(value = "/goExperto", method = RequestMethod.GET)
	public ModelAndView homeGoExperto(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		Map<String, Object> mapa = new HashMap<String, Object>();

		try {

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			String datoP1 = request.getParameter("p1");
			String datoP2 = request.getParameter("p2");
			String datoP3 = request.getParameter("p3");
			String datoP4 = request.getParameter("p4");
			String dato = request.getParameter("dato");
			String datoPagina = request.getParameter("pp");
			
			String feDesde = request.getParameter("desde");
			String feHasta = request.getParameter("hasta");
			
			if (datoPagina == null || datoPagina.isEmpty()) {
				datoPagina = "1";
			}
			
			if( datoP2 == null || datoP2.isEmpty()){
				datoP2 = "00";
			}
			
			if( datoP3 == null || datoP3.isEmpty()){
				datoP3="0";
			}
			
			if( datoP4 == null || datoP4.isEmpty()){
				datoP4="";
			}
			
			if((feDesde == null && feHasta ==null) || (feDesde.isEmpty() && feHasta.isEmpty())){
				feDesde = "";
				feHasta="";
			}
			
			mapa.put("valorSelectorEntidad", "00");
			mapa.put("valorSelectorRamo", "0");
			mapa.put("valorSelectorPor", "00");
			mapa.put("valorSelectorEstado", "T");
			mapa.put("valorSelectorFechaDesde", "");
			mapa.put("valorSelectorFechaHasta", "");


			mapa.put("funcionOnload", "inicioGoExperto();");
			mapa.put("scriptCustom", "");
			mapa.put("scriptGrilla", "");
			mapa.put("resultadoEntidad",0);
			mapa.put("dato", "");
			if(dato !=null && dato.length()>0){
				mapa.put("tieneResultado", "NO");
				mapa.put("dato", dato);
			}
			
			if(datoP1 !=null){
				mapa.put("valorSelectorEntidad", datoP1);
			}
			
			mapa.put("datoRetornoP1", datoP1);
						
			if(dato !=null && dato.length()>0 && !datoP1.equals("00") ){
				
				agregarBreadcrumb(request, "Busqueda #" + dato);

				
				IBusquedaExecutor buscador = busquedaMaker.getBuscador(datoP1);
				ResultadoBusqueda resultado = buscador.executor(request,executeService, datoPagina, datoP1, datoP2, datoP3, datoP4, feDesde, feHasta);
				mapa.put("resultadoCard", resultado.getResultado());
				mapa.put("ramosSegunBusqueda", resultado.getRamos());
				mapa.put("cantidadDeResultadosTotales", resultado.getCantidadTotalDeRegistros());
				mapa.put("resultadoEntidad", resultado.getEntidad());
				mapa.put("indicePaginaActual",resultado.getPaginaActual());
				mapa.put("valorSelectorEntidad", datoP1);
				
				
				mapa.put("valorSelectorRamo", datoP3);
				mapa.put("valorSelectorPor", datoP2);
				mapa.put("valorSelectorEstado", datoP4);
				mapa.put("valorSelectorFechaDesde", feDesde);
				mapa.put("valorSelectorFechaHasta", feHasta);

				
				mapa.put("tieneResultado", "NO");
				
				mapa.put("dato", dato);
				mapa.put("datoRetornoP3", datoP3);
				mapa.put("datoRetornoP4", datoP4);

				
				if(datoP1.equals("02")){
					mapa.put("estadoCheckExpertoCertificadosHome", "checked");
				}
				if(datoP1.equals("03"))
					mapa.put("estadoCheckExpertoInspeccionesHome", "checked");

				
				if(resultado.getCantidadTotalDeRegistros()>0)
					mapa.put("tieneResultado", "SI");
				
			}
			mapa.put("tipoBuscador", "Experto");
			mapa.putAll(getDatosComunes(request, "Buscador Experto"));
			
			return new ModelAndView(PANTALLA_BUSCADOR_EXPERTO, mapa);

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto al mostrar GO Experto", e);
			mapa.putAll(getDatosComunes(request, "Buscador Experto"));
			mapa.put("errorMsg", "" + e.getMessage());
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);
	}
	
	
}

