package com.pseguros.pes.busqueda.util;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.pseguros.pes.busqueda.experto.CertificadoBusquedaExecutor;
import com.pseguros.pes.busqueda.experto.IBusquedaExecutor;
import com.pseguros.pes.busqueda.experto.InspeccionesBusquedaExecutor;
import com.pseguros.pes.busqueda.experto.PromocionBusquedaExecutor;

@Component
public class BusquedaMaker {

	/**
	 * static Singleton instance 
	 */
	private static BusquedaMaker instance;
	private static Map<String, IBusquedaExecutor> busquedas =   new HashMap<String, IBusquedaExecutor>();
	

		
	
	/**
	 * Private constructor for singleton
	 */
	private BusquedaMaker() {
		init();
	}

	private void init() {
		cargarBusquedas();
		
	}

	
	private void cargarBusquedas() {
		busquedas.put("01", new PromocionBusquedaExecutor());
		busquedas.put("02", new CertificadoBusquedaExecutor());
		busquedas.put("03", new InspeccionesBusquedaExecutor());

	}

	/**
	 * Static getter method for retrieving the singleton instance
	 */
	public static BusquedaMaker getInstance() {
		if (instance == null) {
			instance = new BusquedaMaker();
		}

		return instance;
	}
	
	

	public IBusquedaExecutor getBuscador(String code) {
		return busquedas.get(code);	
	}
	
}
