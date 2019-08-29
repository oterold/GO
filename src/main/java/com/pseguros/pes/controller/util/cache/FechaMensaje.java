package com.pseguros.pes.controller.util.cache;

import java.util.Date;

public class FechaMensaje {

	private Date diaDesde;
	private Date diaHasta;

	public Date getDiaDesde() {
		return diaDesde;
	}

	public Date getDiaHasta() {
		return diaHasta;
	}

	public void setDiaDesde(Date diaDesde) {
		this.diaDesde = diaDesde;
	}

	public void setDiaHasta(Date diaHasta) {
		this.diaHasta = diaHasta;
	}

}
