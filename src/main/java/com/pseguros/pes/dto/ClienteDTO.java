package com.pseguros.pes.dto;

import java.util.HashMap;

import com.pseguros.pes.util.Dateutils;


public class ClienteDTO {

	// atributos del cliente
	
	private Integer codigo;
	private Integer nroPersona;
	private String tipoDocumento;
	private String descDocumento;
	private String nroDocumento;
	private String nroCuit;
	private String apellidoYNombre;
	private String email;
	private String entidad;
	private String atributo;
	private String personaR;
	private String telefono;
	private String fechaAlta;
	private String resultadoEntidad;

	public ClienteDTO() {
		// TODO Auto-generated constructor stub
	}
	
	//constructor
	public ClienteDTO(HashMap object) { 
		this.codigo = Integer.valueOf(object.get("P_TF_CLIE.CACN_CD_CLIENTE").toString());
		this.nroPersona = Integer.valueOf(object.get("P_TF_CLIE.CABU_NU_PERSONA").toString());
		this.tipoDocumento = object.get("P_TF_CLIE.CABU_CATU_TP_DOCUMENTO").toString();
		this.descDocumento = object.get("P_TF_CLIE.INB_DSP_TP_DOCUMENTO").toString();
		this.nroDocumento = object.get("P_TF_CLIE.CABU_NU_DOCUMENTO").toString();
		this.nroCuit = object.get("P_TF_CLIE.CABU_NU_CUIT").toString();
		this.apellidoYNombre = object.get("P_TF_CLIE.CABU_NM_APELLIDO").toString();
		this.email = object.get("P_TF_CLIE.CACF_DE_EMAIL").toString();
		this.entidad = object.get("P_TF_CLIE.INB_ENTIDAD").toString();
		this.atributo = object.get("P_TF_CLIE.INB_ATRIBUTO").toString();
		this.personaR = object.get("P_TF_CLIE.CABU_NU_PERSONA_R").toString();
		this.telefono = object.get("P_TF_CLIE.CACF_DE_TELEFONO").toString();
		this.fechaAlta = object.get("P_TF_CLIE.CACN_FE_ALTA").toString()  != null	? Dateutils.formatearFecha(object.get("P_TF_CLIE.CACN_FE_ALTA").toString() ): ""; 
		this.resultadoEntidad = object.get("P_TF_CLIE.INB_IN_DATO_ENTIDAD").toString() ; 
		
	}
	
	
	
	public String getResultadoEntidad() {
		return resultadoEntidad;
	}

	public void setResultadoEntidad(String resultadoEntidad) {
		this.resultadoEntidad = resultadoEntidad;
	}

	public String getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(String fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	//get y set
	public Integer getCodigo() {
		return codigo;
	}


	public void setCodigo(Integer codigo) {
		this.codigo = codigo;
	}


	public Integer getNroPersona() {
		return nroPersona;
	}


	public void setNroPersona(Integer nroPersona) {
		this.nroPersona = nroPersona;
	}




	public String getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(String tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}

	public String getDescDocumento() {
		return descDocumento;
	}


	public void setDescDocumento(String descDocumento) {
		this.descDocumento = descDocumento;
	}




	public String getNroDocumento() {
		return nroDocumento;
	}

	public void setNroDocumento(String nroDocumento) {
		this.nroDocumento = nroDocumento;
	}

	public String getNroCuit() {
		return nroCuit;
	}

	public void setNroCuit(String nroCuit) {
		this.nroCuit = nroCuit;
	}

	public String getApellidoYNombre() {
		return apellidoYNombre;
	}


	public void setApellidoYNombre(String apellidoYNombre) {
		this.apellidoYNombre = apellidoYNombre;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getEntidad() {
		return entidad;
	}


	public void setEntidad(String entidad) {
		this.entidad = entidad;
	}


	public String getAtributo() {
		return atributo;
	}


	public void setAtributo(String atributo) {
		this.atributo = atributo;
	}

	public String getPersonaR() {
		return personaR;
	}
	
	public void setPersonaR(String personaR) {
		this.personaR = personaR;
	}
	
	public String getTelefono() {
		return telefono;
	}
	
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
	
	

	 
	 
}

		
