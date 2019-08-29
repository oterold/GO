package com.pseguros.pes.dao;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import oracle.jdbc.driver.OracleTypes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Component;

import com.pseguros.pes.dao.mapper.MapperGenerico;
import com.pseguros.pes.dto.ClienteDTO;
import com.pseguros.pes.dto.PolizaDTO;
import com.pseguros.pes.util.db.SQLTools;

@Component
public class PolizaDAO  extends AbstractJDBCDAO {

	
    private static final Logger logger = LoggerFactory.getLogger(PolizaDAO.class);

    
    
	public List<PolizaDTO> getPolizas(String dato) throws Exception {

		Connection conn = null;
		CallableStatement callableStatement = null;
		ResultSet rs = null;
		try {
			conn =  jdbcTemplate.getDataSource().getConnection();
			callableStatement = conn.prepareCall("call PKG_EMI_PSERVICIOS.PDS_CONSULTA_POLIZAS (?,?,?,?,?,?)");
			callableStatement.registerOutParameter(1, -10);
			callableStatement.registerOutParameter(2, 12);
			callableStatement.setNull(3, OracleTypes.NULL);
			callableStatement.setString(4, dato);
			callableStatement.setNull(5, OracleTypes.NULL);
			callableStatement.setNull(6, OracleTypes.NULL);
			
			//callableStatement.setDate(6, new java.sql.Date(System.currentTimeMillis()-25000000));


			callableStatement.executeUpdate();
			String mensaje = callableStatement.getString(2);

			if (mensaje == null) {
				rs = (ResultSet) callableStatement.getObject(1);
				return this.getPolizasContinente(rs);
			}else {
				logger.debug("El mensaje es "  + mensaje);
			}
		} catch (Exception e) {
			logger.error("Error getDatosClientesByCodigo ", e);
			throw new Exception(e);
		} finally {
			SQLTools.close(rs, callableStatement, conn);
		}
		return new ArrayList<PolizaDTO>();
	}

	
	   private List<PolizaDTO> getPolizasContinente(ResultSet rs) throws Exception {
			List<PolizaDTO> list = new ArrayList<PolizaDTO>();
			while (rs.next()) {
			    list.add(new PolizaDTO(rs));
			}
			return list;
		    }




	public List<ClienteDTO> getClientes(String productor, boolean esJerarquico, String cuit, String numeroDocumento, String numeroCliente, String nombreCliente) throws Exception {
			logger.info("getClientes - inicio");
			
			List<ClienteDTO> clientes = new ArrayList<ClienteDTO>();
				
				try {
					logger.debug("getClientes - parametros - productor      :" + productor);
					logger.debug("getClientes - parametros - jerarquico     :" + esJerarquico);
					logger.debug("getClientes - parametros - cuit           :" + cuit);
					logger.debug("getClientes - parametros - numeroDocumento:" + numeroDocumento);
					logger.debug("getClientes - parametros - numeroCliente  :" + numeroCliente);
					logger.debug("getClientes - parametros - nombreCliente  :" + nombreCliente);


						
					logger.debug("getClientes - parametros - SQL query - inicio");
					
					// obtiene la cabecera del cliente + detalle
					String select = " SELECT ROWNUM RECORD_ID, P.CABU_NU_PERSONA PERSONA_ID, P.CABU_NU_PERSONA_R PERSONA_ID_R,"
							+ " P.CABU_CATU_TP_DOCUMENTO TIPO_DOCUMENTO, P.CABU_NU_DOCUMENTO NUMERO_DOCUMENTO, P.CABU_NU_CUIT CUIT,"
							+ " P.CABU_NM_APELLIDO_RAZON APELLIDO_CLIENTE,  P.CABU_NM_PERSONA NOMBRE_CLIENTE,  CC.CACN_NU_CEDULA_RIF NUMERO_CLIENTE,"
							+ " REPLACE(R.CATZ_DE_RAZON_SOCIAL,'PERSONA ') TIPO_PERSONA, TIPO_DOC.CATU_DE_DOCUMENTO TIPO_DOCUMENTO,"
							+ " P.CABU_NU_DOCUMENTO NUMERO_DOCUMENTO, P.CABU_NU_CUIT CUIT, P.CABU_NM_APELLIDO_RAZON APELLIDO_CLIENTE,"
							+ " P.CABU_NM_PERSONA NOMBRE_CLIENTE, P.CABU_ST_SEXO SEXO, TO_CHAR(P.CABU_FE_NACIMIENTO,'DD/MM/YYYY') FECHA_NACIMIENTO,"
							+ " ECIVIL.RV_MEANING ESTADO_CIVIL, NAC.CAPA_DE_NACIONALIDAD NACIONALIDAD, PCIA.CAES_DE_ESTADO PROVINCIA_NACIMIENTO,"
							+ " PROF.CAPW_DE_PROFESION PROFESION, PEP.RV_MEANING EXPUESTA_POLITICAMENTE, RES230.RV_MEANING SUJETO_OBLIGADO";
					
					String from = " FROM  CART_MAE_PERSONAS P, CART_TIPOS_RAZON R, CART_CLIENTES CC, CART_TIPOS_DOCUMENTOS TIPO_DOC,"
							+ " (SELECT RV_LOW_VALUE, RV_MEANING FROM CG_REF_CODES ECI WHERE ECI.RV_DOMAIN = 'EDO CIVIL') ECIVIL,"
							+ " (SELECT CAPA_CD_PAIS, CAPA_DE_NACIONALIDAD FROM CART_PAISES) NAC,"
							+ " (SELECT CAES_CD_ESTADO, CAES_DE_ESTADO FROM CART_ESTADOS) PCIA,"
							+ " (SELECT CAPW_CD_PROFESION, CAPW_DE_PROFESION FROM CART_PROFESIONES) PROF,"
							+ " (SELECT RV_LOW_VALUE, RV_MEANING FROM CG_REF_CODES ECI WHERE ECI.RV_DOMAIN = 'PERSONAS_PEP') PEP,"
							+ " (SELECT RV_LOW_VALUE, RV_MEANING FROM CG_REF_CODES WHERE RV_DOMAIN = 'PERSONAS.RESOLUCION_230') RES230 ";
					
					String where = " WHERE P.CABU_NU_PERSONA_R IS NOT NULL"
							+ " AND CC.CACN_NU_CEDULA_RIF IS NOT NULL"
							+ " AND P.CABU_CATZ_CD_RAZON_SOCIAL = R.CATZ_CD_RAZON_SOCIAL(+)"
							+ " AND P.CABU_NU_PERSONA_R = P.CABU_NU_PERSONA"
							+ " AND CC.CACN_CABU_NU_PERSONA = P.CABU_NU_PERSONA"
							+ " AND (P.CABU_CATU_TP_DOCUMENTO IS NULL OR P.CABU_CATU_TP_DOCUMENTO <> 'G') AND (CABU_NU_DOCUMENTO IS NULL OR (TO_NUMBER(DECODE(CABU_NU_DOCUMENTO,'DNI',0,'LC',0,'LE',0,DECODE(replace(translate(CABU_NU_DOCUMENTO,'1234567890','...........'),'.'),NULL,CABU_NU_DOCUMENTO,'0')))>999999 AND CABU_NU_DOCUMENTO<>'11111111' AND CABU_NU_DOCUMENTO<>'1111111'))"
							+ " AND TIPO_DOC.CATU_TP_DOCUMENTO(+) = P.CABU_CATU_TP_DOCUMENTO"
							+ " AND ECIVIL.RV_LOW_VALUE(+) = P.CABU_ESTADO_CIVIL"
							+ " AND NAC.CAPA_CD_PAIS(+) =  P.CABU_CAPA_CD_NACIONALIDAD"
							+ " AND PCIA.CAES_CD_ESTADO (+) = P.CABU_CD_ESTADO_NACIMIENTO"
							+ " AND PROF.CAPW_CD_PROFESION (+) = P.CABU_CAPW_CD_PROFESION"
							+ " AND PEP.RV_LOW_VALUE (+) = P.CABU_PEP"
							+ " AND RES230.RV_LOW_VALUE(+) = P.CABU_IN_RES_230";
					
					// setea parametros a la consulta
					//final String oraParamProductor = productor;
					//final boolean oraEsJerarquico = esJerarquico;
					final String oraParamCuit = cuit;
					final String oraParamNroDoc = numeroDocumento;
					final String oraParamNroCte = numeroCliente;
					final String oraParamNombCte = nombreCliente;

						if (productor != null && productor.length() > 0 && !esJerarquico){
							select += ", PRCC.CABX_CAPD_CD_PRODUCTOR PRODUCTOR_ASOCIADO ";
							from += ", CART_PRODUCTORES_CLIENTES PRCC, (SELECT CABX_CACN_CD_CLIENTE, MAX(CABX_FE_ACTUALIZACION) CABX_FE_ACTUALIZACION FROM CART_PRODUCTORES_CLIENTES GROUP BY CABX_CACN_CD_CLIENTE) PRCC_MAX";
							where += " AND PRCC.CABX_CACN_CD_CLIENTE = PRCC_MAX.CABX_CACN_CD_CLIENTE"
									+ " AND PRCC.CABX_FE_ACTUALIZACION = PRCC_MAX.CABX_FE_ACTUALIZACION"
									+ " AND PRCC.CABX_CACN_CD_CLIENTE = CC.CACN_NU_CEDULA_RIF"
									+ " AND PRCC.CABX_CABU_NU_PERSONA = P.CABU_NU_PERSONA";
									//+ " AND PRCC.CABX_CAPD_CD_PRODUCTOR = ?";
						}

						if (cuit != null && cuit.length() > 0)
							where += " AND P.CABU_NU_CUIT = ? ";
						
						if (numeroDocumento != null && numeroDocumento.length() > 0)
							where += " AND P.CABU_NU_DOCUMENTO = ? ";
						
						if (numeroCliente != null && numeroCliente.length() > 0)
							where += " AND CC.CACN_NU_CEDULA_RIF = ? ";
						
						if (nombreCliente != null && nombreCliente.length() > 0)
							where += " AND P.CABU_INDEX_APEL LIKE ? ";
						
					PreparedStatementSetter pss = new PreparedStatementSetter() {
						public void setValues(PreparedStatement preparedStatement) throws SQLException {
			            	int orden = 1; // productor + alguno de los param opcionales
			            	
			            		//if (oraParamProductor != null && oraParamProductor.length() > 0 && !oraEsJerarquico)
			            			//preparedStatement.setString(orden++, oraParamProductor);
			            		
			            		if (oraParamCuit != null && oraParamCuit.length() > 0)		            			
			            			preparedStatement.setString(orden++, oraParamCuit);
			            		
			            		if (oraParamNroDoc != null && oraParamNroDoc.length() > 0)		            			
			            			preparedStatement.setString(orden++, oraParamNroDoc);
			            		
			            		if (oraParamNroCte != null && oraParamNroCte.length() > 0)		            			
			            			preparedStatement.setString(orden++, oraParamNroCte);
			            		
			            		if (oraParamNombCte != null && oraParamNombCte.length() > 0)		            			
			            			preparedStatement.setString(orden++, oraParamNombCte.toUpperCase() + "%");
						}
					};
									
					String stmt = select + from + where;
					
					logger.debug("getClientes - parametros - SQL query - query: " + stmt);
					logger.debug("getClientes - parametros - SQL query - ejecutar - inicio");
					
					clientes = this.jdbcTemplate.query(stmt, pss, new MapperGenerico(new ClienteDTO()));
					
					logger.debug("getClientes - parametros - SQL query - ejecutar - obtenidos: " + (clientes!=null?clientes.size():"null"));
					logger.debug("getClientes - parametros - SQL query - ejecutar - fin");
					logger.debug("getClientes - parametros - SQL query - fin");
				} 
				catch (Exception e) {
					logger.error("getClientes - ERROR: ", e);
					
					ClienteDTO cte = new ClienteDTO();
					
					clientes.add(cte);
				}
				
			logger.info("getClientes - fin");
			
			return clientes;
		}
}
