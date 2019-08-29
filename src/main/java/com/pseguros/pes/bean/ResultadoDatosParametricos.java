package com.pseguros.pes.bean;

import java.util.HashMap;

public class ResultadoDatosParametricos {
	
	String codDato;
	public ResultadoDatosParametricos(HashMap object){
		
		this.codDato = (String) object.get("VDPR_CRCD_CD_DATO");
		
	}
	
	public ResultadoDatosParametricos(){
		
	}

	public String getCodDato() {
		return codDato;
	}


	public void setCodDato(String codDato) {
		this.codDato = codDato;
	}
	

}
