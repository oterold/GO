package com.pseguros.pes.dto;

import java.util.List;

public class RamoTarifaDTO {
	private RamoDTO ramoDTO;
	private List tarifas;
	public RamoDTO getRamoDTO() {
		return ramoDTO;
	}
	public void setRamoDTO(RamoDTO ramoDTO) {
		this.ramoDTO = ramoDTO;
	}
	public List getTarifas() {
		return tarifas;
	}
	public void setTarifas(List tarifas) {
		this.tarifas = tarifas;
	}
	
	
}
