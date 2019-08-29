package com.pseguros.pes.dao;

import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import oracle.sql.CLOB;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.pseguros.pes.bean.ParametroBean;
import com.pseguros.pes.bean.ProcedimientoDatoBean;
import com.pseguros.pes.dao.mapper.MapperGenericoMap;
import com.pseguros.pes.dao.mapper.MapperParametros;
import com.pseguros.pes.exception.SQLPSException;
import com.pseguros.pes.generic.EnvironmentContextHolder;

/**
 * Clase migrada del otro proyecto
 * @author grisaym
 *
 */
@Component
public class ExecuteDAO extends AbstractJDBCDAO {
	
	
//
//	  protected JdbcTemplate jdbcTemplate;
//
//	    protected JdbcTemplate jdbcTemplateIsla;
//
//	    @Autowired
//	    public void setDataSource(@Qualifier("dataSource") DataSource dataSource) {
//		this.jdbcTemplate = new JdbcTemplate(dataSource);
//	    }
//
//	    @Autowired
//	    public void setDataSourceIsla(@Qualifier("dataSourceIsla") DataSource dataSourceIsla) {
//		if (dataSourceIsla != null)
//		    this.jdbcTemplateIsla = new JdbcTemplate(dataSourceIsla);
//	    }
//	    
	    
    private static final Logger logger = LoggerFactory.getLogger(ExecuteDAO.class);
   
    //dato que se usa para hacer un debug de los datos que muestra por pantalla.
    private static final boolean DEBUG_DATOS = false;

	
	
public Map<String, Object> ejecutarProcedimientoFinal(ProcedimientoDatoBean nombreProcedimiento, Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados,	String userWs, long seq, String separador, int desde, int hasta) throws Exception {

		
		Map<String, String> parametrosIngresados = procesarParametrosIngresados(parametrosIn,parametrosDeclarados);
		
		
		//Busco los parametros con 
		List<ParametroBean> parametrosProcedimiento = buscarParametrosByProcedimiento(nombreProcedimiento.getPaquete(), nombreProcedimiento.getNombre(),"GIOSEG");
		if (parametrosProcedimiento == null || parametrosProcedimiento.size() <1) {
			
			parametrosProcedimiento = buscarParametrosByProcedimiento(nombreProcedimiento.getPaquete(), nombreProcedimiento.getNombre(),"VNG");
			if (parametrosProcedimiento == null || parametrosProcedimiento.size() <1) {	
				throw new Exception("No se encontraron parametros declarados en la base para el procedimiento  : " + nombreProcedimiento.getPaquete()+"." + nombreProcedimiento.getNombre() );
			}
		}
		
		return ejecutarProcedimiento(nombreProcedimiento.getPaquete(),nombreProcedimiento.getNombre(),parametrosIngresados,parametrosProcedimiento,seq,parametrosDeclarados,separador,desde,hasta);
	}






public  List<ParametroBean> buscarParametrosByProcedimiento(	String paqueteSeleccionado, String procedimientoSeleccionado, String owner) throws SQLPSException {

	try {
		
		
		List<ParametroBean> data;
		StringBuffer sql1 = new StringBuffer();
		sql1.append(" SELECT POSITION, OBJECT_NAME, PACKAGE_NAME, ARGUMENT_NAME, DATA_TYPE, CHAR_LENGTH, IN_OUT FROM SYS.ALL_ARGUMENTS  WHERE  PACKAGE_NAME = '"+paqueteSeleccionado.toUpperCase()+"' AND         OBJECT_NAME = '"+procedimientoSeleccionado.toUpperCase()+"'  and owner = '"+owner+"'   and data_level = '0'     ORDER BY POSITION " );
		
		logger.debug(sql1.toString());

		data = jdbcTemplate.query(sql1.toString(), new MapperParametros());
		
		return data;

	} catch (Exception e) {
		logger.error(e.getMessage());
		throw new SQLPSException(e);
	}

}

public  List<ParametroBean> buscarProcedimientoEnPkg(	String paqueteSeleccionado, String owner) throws SQLPSException {

	try {
		
		
		List<ParametroBean> data;
		StringBuffer sql1 = new StringBuffer();
		sql1.append(" SELECT DISTINCT(POSITION, OBJECT_NAME, PACKAGE_NAME, ARGUMENT_NAME, DATA_TYPE, CHAR_LENGTH, IN_OUT) FROM SYS.ALL_ARGUMENTS  WHERE  PACKAGE_NAME = '"+paqueteSeleccionado.toUpperCase()+"'  and owner = '"+owner+"'   and data_level = '0'     ORDER BY object_name " );
		
		logger.debug(sql1.toString());

		data = jdbcTemplate.query(sql1.toString(), new MapperParametros());
		
		return data;

	} catch (Exception e) {
		logger.error(e.getMessage());
		throw new SQLPSException(e);
	}

}





/**
 * Los parametros In son los que vienen en el json y los declarados los que devuelve la funcion
 * @param parametrosIn
 * @param parametrosDeclarados
 * @return
 */
private Map<String, String> procesarParametrosIngresados(Map<String, Object> parametrosIn, Map<String, String> parametrosDeclarados) {
	
	Map<String, String> dato = new HashMap<String, String>();

	for (Map.Entry<String, String> entry : parametrosDeclarados.entrySet()) {
		String parametroBase = entry.getKey();
		String parametroJson = entry.getValue();
		
		String value = (String) parametrosIn.get(parametroJson);
		if (value != null && value.length() > 0) {
			dato.put(parametroBase, value);
		}
	}
	
	return dato;
}


private int getNumeroTipoParametro(ParametroBean parametroBean) throws Exception {
	
//	public static final int	ARRAY	2003
//	public static final int	BIGINT	-5
//	public static final int	BINARY	-2
//	public static final int	BIT	-7
//	public static final int	BLOB	2004
//	public static final int	BOOLEAN	16
//	public static final int	CHAR	1
//	public static final int	CLOB	2005
//	public static final int	DATALINK	70
//	public static final int	DATE	91
//	public static final int	DECIMAL	3
//	public static final int	DISTINCT	2001
//	public static final int	DOUBLE	8
//	public static final int	FLOAT	6
//	public static final int	INTEGER	4
//	public static final int	JAVA_OBJECT	2000
//	public static final int	LONGNVARCHAR	-16
//	public static final int	LONGVARBINARY	-4
//	public static final int	LONGVARCHAR	-1
//	public static final int	NCHAR	-15
//	public static final int	NCLOB	2011
//	public static final int	NULL	0
//	public static final int	NUMERIC	2
//	public static final int	NVARCHAR	-9
//	public static final int	OTHER	1111
//	public static final int	REAL	7
//	public static final int	REF	2006
//	public static final int	ROWID	-8
//	public static final int	SMALLINT	5
//	public static final int	SQLXML	2009
//	public static final int	STRUCT	2002
//	public static final int	TIME	92
//	public static final int	TIMESTAMP	93
//	public static final int	TINYINT	-6
//	public static final int	VARBINARY	-3
//	public static final int	VARCHAR	12

	
	if (parametroBean.getTipoDato().indexOf("REF CURSOR")>-1) {
		return -10 ;
		
	}else if (parametroBean.getTipoDato().indexOf("VARCHAR")>-1) {
		return 12;
		
	}else if (parametroBean.getTipoDato().indexOf("NUMBER")>-1) {
		return 2;
		
	}else if (parametroBean.getTipoDato().indexOf("DATE")>-1) {
		return 91;
		
	}else if (parametroBean.getTipoDato().indexOf("TABLE")>-1) {
		return 2003;
		
		
	}else {
		logger.debug("El tipo de dato no es soportado y se pone uno generico " ) ;
		throw new Exception("El tipo de dato no es soportado y se pone uno generico ");
		//return 2002;
		
	}
	
	//throw new SQLPSException("No se encontro numero para el tipo de dato : " + parametroBean.getTipoDato());
}



private String getValorNumber(String dato, String nombreParametro) throws Exception {

	try {
		new BigDecimal(dato);
	} catch (Exception e) {
		throw new Exception("El parametro :" + nombreParametro + " debe ser numerico. El valor : " + dato + " es incorrecto" );
	}
	
	return dato;
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

private String getSignosPreguntaParametros(	List<ParametroBean> parametrosDelProcedimiento) {
	
	String data = "";
	for (Iterator iterator = parametrosDelProcedimiento.iterator(); iterator.hasNext();) {
		ParametroBean parametroBean = (ParametroBean) iterator.next();
		data = data + "?,";
	}
	return data.substring(0,data.length()-1);
}







private Map<String, Object> ejecutarProcedimiento(String paqueteSeleccionado, String procedimientoSeleccionado,	Map<String, String> parametrosIngresados, List<ParametroBean> parametrosDelProcedimiento, long seq, Map<String, String> parametrosDeclarados, String separador, int desde, int hasta) throws SQLPSException {

	CallableStatement callableStatement = null;
	Connection conn = null;
	
	Map<String, Object> resultado = new HashMap<String,Object>();
	
	String callDato ="";
	long inicio = new java.util.Date().getTime();
	
	
	try {
		 callDato = "call "+paqueteSeleccionado+"."+procedimientoSeleccionado+"("+getSignosPreguntaParametros(parametrosDelProcedimiento)+")";
		
		logger.info("***-*** Ejecutando en la base de : "+EnvironmentContextHolder.getEnvironmentType().toString()+" El llamado al procedimientos es : " + callDato );

		conn =  jdbcTemplate.getDataSource().getConnection();

		conn.setAutoCommit(true);
		
		callableStatement = conn.prepareCall( callDato);


		for (Iterator iterator = parametrosDelProcedimiento.iterator(); iterator.hasNext();) {
			ParametroBean parametroBean = (ParametroBean) iterator.next();
			int posicion = Integer.parseInt(parametroBean.getPosicion());
			
			// primero me fijo si es de salida que es lo mas facil, luego me fijo que sea de entrada y sino es entrada y salida
			if (parametroBean.getInOut().toUpperCase().equals("OUT")) {
				callableStatement.registerOutParameter(posicion, getNumeroTipoParametro(parametroBean));
				logger.info("***-*** Agrego el parametro Out nro  : " + posicion +  " Comm parametro de salida con el codigo : " + getNumeroTipoParametro(parametroBean));
			
			}else if (parametroBean.getInOut().toUpperCase().equals("IN")) {

				String dato = parametrosIngresados.get(parametroBean.getNombre());
				
				if (parametrosIngresados.get(parametroBean.getNombre()) == null || parametrosIngresados.get(parametroBean.getNombre()).length()==0) {
						callableStatement.setNull(posicion, getNumeroTipoParametro(parametroBean));
						logger.info("***-*** Agrego el parametro In nro  : " + posicion +" - "+parametroBean.getNombre() +" Como parametro de entrada nulo con el codigo : " + getNumeroTipoParametro(parametroBean));
				}else {
					if (parametroBean.getTipoDato().indexOf("DATE") > -1) {
						callableStatement.setDate(posicion, getValorDate(dato,parametroBean.getNombre()));
						logger.info("***-*** Agrego el parametro In nro  : " + posicion + " - "  + parametroBean.getNombre() +"DATE Comm parametro de entrada no nulo - Valor : " + getValorDate(dato,parametroBean.getNombre()));	
						
					}else if (parametroBean.getTipoDato().indexOf("NUMBER") > -1) {
						callableStatement.setObject(posicion, getValorNumber(dato,parametroBean.getNombre()));
						logger.info("***-*** Agrego el parametro In nro  : " + posicion + " - "  + parametroBean.getNombre() +" NUMBER Comm parametro de entrada no nulo - Valor : " + getValorNumber(dato,parametroBean.getNombre()));
						
					}else if (parametroBean.getTipoDato().indexOf("VARCHAR") > -1) {
						
						callableStatement.setString(posicion, validarDato(dato) );
//						
//						byte ptex[]  = dato.getBytes();
//						callableStatement.setString(posicion, new String(ptex,"UTF-8") );
						
						
						logger.info("***-*** Agrego el parametro In nro  : " + posicion + " - "  + parametroBean.getNombre() +" VARCHAR2 Comm parametro de entrada no nulo - Valor : " + dato);

					}					
					
				}
				
			}else {
					String dato = parametrosIngresados.get(parametroBean.getNombre());
				//Son pararamtros in out asi que hay q hacer las dos cosas 
				
					//Primero lo registro como parametros de salida
					callableStatement.registerOutParameter(posicion, getNumeroTipoParametro(parametroBean));
					
					//Si un parametro es in/out y es un tabla no le registro entrada
					if (!(parametroBean.getTipoDato().indexOf("TABLE")>-1)) {

						//Despues le ingreso el dato o nulo
						if (parametrosIngresados.get(parametroBean.getPosicion()) == null || parametrosIngresados.get(parametroBean.getPosicion()).length()==0) {
						
							callableStatement.setNull(posicion, getNumeroTipoParametro(parametroBean));
							logger.info("***-*** Agrego el parametro In/Out como Out nro  : " + posicion + " Comm parametro de entrada nulo con el codigo : " + getNumeroTipoParametro(parametroBean));
						
						}else {
						
							if (parametroBean.getTipoDato().indexOf("DATE") > -1) {
								callableStatement.setDate(posicion, getValorDate(dato,parametroBean.getNombre()));
								logger.info("***-*** Agrego el parametro In/Out como In date nro  : " + posicion + " Date Comm parametro de entrada no nulo - Valor : " + getValorDate(dato,parametroBean.getNombre()));	
							
							}else if (parametroBean.getTipoDato().indexOf("NUMBER") > -1) {
								callableStatement.setObject(posicion, dato);
								logger.info("***-*** Agrego el parametro In/Out como In number nro  : " + posicion + " number Comm parametro de entrada no nulo - Valor : " + dato);
							
							}else if (parametroBean.getTipoDato().indexOf("VARCHAR") > -1) {
								callableStatement.setString(posicion, dato );
								logger.info("***-*** Agrego el parametro  In/Out como In nro  : " + posicion + " varchar2 Comm parametro de entrada no nulo - Valor : " + dato);
							}					
						}
					
					}
				}
			}
		
		
		// ***************** EJECUTO ************************************************
		logger.debug("***-*** INICIO EJECUCION LINE : 326 EXECUTE DAO ****" );

		callableStatement.execute();
		
		logger.info("***-*** FIN EJECUCION LINE : 330 EXECUTE DAO ****" );
		
		for (Iterator iterator = parametrosDelProcedimiento.iterator(); iterator.hasNext();) {
			ParametroBean parametroBean = (ParametroBean) iterator.next();
			if (parametroBean.getInOut().indexOf("OUT")>-1) {
				
				
				int paramtro = Integer.parseInt(parametroBean.getPosicion()); 
				
				Object valueOut = null;
				if (parametroBean.getTipoDato().indexOf("DATE") > -1) {
					try {
						valueOut =  callableStatement.getObject(paramtro).toString();
					}catch (Exception e) {
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
//						logger.error("Error out03 - sobre parametros : " + paramtro);
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
					};
					
				}else if (parametroBean.getTipoDato().indexOf("NUMBER") > -1) {
					try {
						valueOut = callableStatement.getObject(paramtro).toString();
					}catch (Exception e) {
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
//						logger.error("Error out03 - sobre parametros : " + paramtro);
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
	
					};
					
				}else if (parametroBean.getTipoDato().indexOf("VARCHAR") > -1) {
					try {
						valueOut =  callableStatement.getObject(paramtro).toString();		
					} 
					catch (Exception e) {
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
//						logger.error("Error out03 - sobre parametros : " + paramtro);
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
					};
					
				//TODO:hacerrrr bien
				}else if (parametroBean.getTipoDato().indexOf("CLOB") > -1) {
					try {
						CLOB obj = (CLOB) callableStatement.getClob(paramtro);
						valueOut =  obj.getSubString(1, (int) obj.getLength());
					} 
					catch (Exception e) {
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
//						logger.error("Error out03 - sobre parametros : " + paramtro);
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
					};
					

				}else if (parametroBean.getTipoDato().indexOf("REF CURSOR") > -1) {
					try {
						valueOut = cursorToMap( (ResultSet) callableStatement.getObject(paramtro),parametrosDeclarados,parametroBean.getNombre(),separador,desde,hasta);
					}catch (Exception e) {
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
//						logger.error("Error out03 - sobre parametros : " + paramtro);
//						logger.error("/// **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR **** ERROR  //// ");
					};
				}
				
				try {
					if (valueOut != null ) {
						resultado.put(getNombreParametro(parametrosDeclarados, parametroBean.getNombre(),null,separador), valueOut);
					}
				} catch (Exception e) {
					logger.error("Error out05",e);
				}
			}
			
		}
		

		
		return resultado;
		
	} catch (Exception e) {
	
		logger.error("Error getDatosGenerales",e);
		throw new SQLPSException(e);

	}finally{
		try {		callableStatement.close();			} catch (SQLException e){				e.printStackTrace();			}
		try {		conn.close();	} catch (Exception e2) {		}
		try {
			long fin = new java.util.Date().getTime();
			logger.debug("Tiempo de ejecucion de :" + callDato + " tiempo :" + (fin-inicio) + " milisegundos " );
		} catch (Exception e2) {
			// TODO: handle exception
		}
	}
}





private String validarDato(final String dato) {
	
	try {
		if (dato == null || dato.isEmpty() || dato.length()<7) {
			return dato;
		}
		
		if (dato.toUpperCase().indexOf("SELECT") >-1 || dato.toUpperCase().indexOf("UPDATE") >-1 || dato.toUpperCase().indexOf("DELETE") >-1 || dato.toUpperCase().indexOf("DROP") >-1) {
			return "";
		}

	} catch (Exception e) {
		logger.error("Error de validacion de dato" , e);
	}
	
	return dato;
}






private String getNombreParametro(final Map<String, String> parametrosDeclarados,final String dato,final String parametroCursor, String separador) throws SQLException {
	String datoIn="";
	if (parametroCursor != null)
		datoIn = parametroCursor+separador+dato;
	else
		datoIn = dato;
	
	String parametro = parametrosDeclarados.get(datoIn);
	
	if (parametro == null){
		parametro = datoIn;
		//logger.debug("Falta Agregar xx.put(\""+parametro+"\",\"\");");
	}
	
	return parametro;
}


/**
 * Convierte un cursor de oracle en una lista de mapas
 * @param rs
 * @param parametrosDeclarados 
 * @param parametroCursor 
 * @param separador 
 * @param hasta 
 * @param desde 
 * @return
 * @throws Exception
 */
	private List cursorToMap(ResultSet rs, Map<String, String> parametrosDeclarados, String parametroCursor, String separador, int desde, int hasta) throws Exception {

		logger.debug("Entre a tomar los datos del cursor desde "  + desde + " hasta : " + hasta);
		List salidaLista = new ArrayList();

		try {

			int f = 0;
			
			while (rs.next() && f < hasta) {
				
				
				if (f>=desde) {
					HashMap<String, String> salida = new HashMap<String, String>();
					int x = rs.getMetaData().getColumnCount();
					x++;
					for (int i = 1; i < x; i++) {
						Object data1 = rs.getObject(i);
						String tipoDato =rs.getMetaData().getColumnTypeName(i);
						if(tipoDato != null && tipoDato.equals("CLOB")){
							CLOB obj = (CLOB) rs.getClob(i);
							salida.put(getNombreParametro(parametrosDeclarados, rs.getMetaData().getColumnLabel(i), parametroCursor, separador), data1 != null ? obj.getSubString(1, (int) 10000000): "");	
						}
						else{
						salida.put(getNombreParametro(parametrosDeclarados, rs.getMetaData().getColumnLabel(i), parametroCursor, separador), data1 != null ? data1.toString() : "");
						}
					}
					salidaLista.add(salida);
				}
				f++;
				
			}
			
		logger.debug("Salgo con la cantidad "  + salidaLista.size());

			
			
			if (salidaLista.size() > 0) {
				return debug(salidaLista);
			} else {
				return null;
			}

			
		} catch (Exception e) {

			throw new Exception("No se pudo recuperar datos del cursor de salida");

		}
	}


		
		
		
		private List debug(final List salidaLista) {

			if (DEBUG_DATOS) {
				for (Iterator iterator = salidaLista.iterator(); iterator.hasNext();) {
				
					HashMap object = (HashMap) iterator.next();
					
					Iterator it = object.entrySet().iterator();
					
					while (it.hasNext()) {
						Map.Entry e = (Map.Entry)it.next();
						logger.debug("***+*** : " + e.getKey() + "  Valor:" + e.getValue());
					}
				}
			}
				
			
			return salidaLista;
		}






private Date getValorDate(String dato, String nombreCampo) throws Exception {
	
	try {
	
		if (dato.indexOf(".")>0) {

			String[] fechaSeparada = dato.split("\\.")[0].split("/");
			int anio = Integer.parseInt(fechaSeparada[2])-1900;
			int mes = Integer.parseInt(fechaSeparada[1])-1;
			int dia = Integer.parseInt(fechaSeparada[0]);

			String[] hora = dato.split("\\.")[1].split(":");
			
			Date dateOut = new Date(anio,mes,dia);
			
			
			
//			dateOut.setHours(Integer.parseInt(hora[0]));
//			dateOut.setMinutes(Integer.parseInt(hora[1]));
			
			Timestamp dateFinal = new Timestamp(anio, mes, dia, Integer.parseInt(hora[0]), Integer.parseInt(hora[1]), 0, 0);
			
			
			Date out = new Date(dateFinal.getTime());
			
			return out;

			
		}else {
			
		String[] fechaSeparada = dato.split("/");
		int anio = Integer.parseInt(fechaSeparada[2])-1900;
		int mes = Integer.parseInt(fechaSeparada[1])-1;
		int dia = Integer.parseInt(fechaSeparada[0]);

		return  new Date(anio,mes,dia);
		
		}


	} catch (Exception e) {
		logger.error("Problemas al armar la fecha para llamar al procedimiento dato : "  + dato + " el formato de la fecha debe ser dd/mm/yyyy");
		e.printStackTrace();
		throw e;
	}
}

	/**
	 * Ejecuta una query y devuelve un lista con un mapa
	 * 
	 * @param sql
	 * @return
	 * @throws SQLPSException
	 */
	public List executeGenericSQL(String sql) throws SQLPSException {

		List registros;
		try {

			logger.debug("SQL a ejecutar en buscadorGenericoSQL : " + sql);
			registros = jdbcTemplate.query(sql, new MapperGenericoMap());
			logger.debug("Fin ejecucion " + sql);

		} catch (Exception e) {
			logger.error("Error al ejecutar  : " + sql + " - " + e.getMessage());
			throw new SQLPSException(e);
		}
		return registros;
	}






}
