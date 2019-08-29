package com.pseguros.pes.util.archivo;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.mail.internet.InternetAddress;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class FileUtils {

	public static final String PATH_TMP = "/tmp/";

	private static final Logger logger = LoggerFactory.getLogger(FileUtils.class);
	
	private static FileUtils instance;

	private FileUtils() {
	}

	public static FileUtils getInstance() {
		if (null == instance) {
			instance = new FileUtils();
		}
		return instance;
	}

	public void guardarExcel(HSSFWorkbook libro, long s) throws Exception {

		try {
			
		FileOutputStream elFichero = new FileOutputStream( FileUtils.PATH_TMP + s + "plantilla.xls");
	    libro.write(elFichero);
		elFichero.close();
		
		} catch (Exception e) {
			throw e;
		}
		
	}

	public void guardarFiltro(String filtro, String name, String code) throws IOException {
		FileWriter fw = null;
		BufferedWriter bw = null;
		PrintWriter out = null;
		try {
			
		    fw = new FileWriter("/tmp/filtrosFile.txt", true);
		    bw = new BufferedWriter(fw);
		    out = new PrintWriter(bw);
		    out.println(code+"---"+name+"---"+filtro);
		    out.close();
		
		
		} catch (IOException e) {
			throw e;
		}
		finally {
		    if(out != null)
			    out.close();
		    try {
		        if(bw != null)
		            bw.close();
		    } catch (IOException e) {
		      
		    }
		    try {
		        if(fw != null)
		            fw.close();
		    } catch (IOException e) {
		      
		    }
		}
		
	}

	
	
	
	public static synchronized byte[] fileToArray(final String name) throws Exception {

		try {

			FileInputStream fileInputStream = null;

			File file = new File(name);

			byte[] bFile = new byte[(int) file.length()];

			fileInputStream = new FileInputStream(file);
			fileInputStream.read(bFile);
			fileInputStream.close();

			return bFile;

		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			e.printStackTrace();
			throw e;
		}

	}

	public static synchronized void fileMove(final String sourceFile, final String destinationFile) throws IOException {
		// System.out.println("Desde: " + sourceFile);
		// System.out.println("Hacia: " + destinationFile);

		try {
			File inFile = new File(sourceFile);
			File outFile = new File(destinationFile);

			FileInputStream in = new FileInputStream(inFile);
			FileOutputStream out = new FileOutputStream(outFile);

			int c;
			while ((c = in.read()) != -1)
				out.write(c);

			in.close();
			out.close();

			File file = new File(sourceFile);
			if (file.exists()) {
				file.delete();
			}

		} catch (IOException e) {
			throw e;
		}
	}

	public static synchronized void copyFile(File s, File t) throws Exception {
		try {
			FileChannel in = (new FileInputStream(s)).getChannel();
			FileChannel out = (new FileOutputStream(t)).getChannel();
			in.transferTo(0, s.length(), out);
			in.close();
			out.close();
		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			throw e;

		}
	}

	public static synchronized void InputStreamAFile(InputStream entrada, String fileName) throws Exception {
		try {
			File f = new File(fileName);
			OutputStream salida = new FileOutputStream(f);
			byte[] buf = new byte[1024];// Actualizado me olvide del 1024
			int len;
			while ((len = entrada.read(buf)) > 0) {
				salida.write(buf, 0, len);
			}
			salida.close();
			entrada.close();
			System.out.println("Se realizo la conversion con exito");
		} catch (Exception e) {
			logger.error("No se pudo guardar el archivo en el disco",e);
			throw new Exception("No se pudo guardar el archivo en el disco" , e);
		}
	}

	public static synchronized void createDir(final String path, final String name) throws Exception {
		try {
			File directorio = new File(path + name);
			directorio.mkdirs();
		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			throw e;
		}

	}

	public static synchronized void fileDelete(final String fileName) throws IOException {
		File file = new File(fileName);

		if (file.delete()) {
			// System.out.println(file.getName() + " is deleted!");
		} else {
			throw new IOException("can not delete");
		}

	}

	/**
	 * Devuelve el tamaño en MB
	 * 
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public static synchronized long fileSizeMB(final String fileName) throws IOException {
		File file;
		try {
			file = new File(fileName);
			return file.length() / (1024 * 1024);
		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			return 0;
		}
	}

	/**
	 * Devuelve el valor en KB
	 * 
	 * @param fileName
	 * @return
	 * @throws IOException
	 */
	public static synchronized long fileSizeKB(final String fileName) throws IOException {
		try {
			File file = new File(fileName);
			return file.length() / (1024);
		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			return 0;
		}
	}

	public static synchronized boolean existsFile(final String filename) {
		File f = new File(filename);
		return f.exists();
	}

	public static synchronized boolean guardarEnArchivo(final String filename,final StringBuffer data) throws Exception {
		FileWriter fichero = null;
        PrintWriter pw = null;
        try
        {
            fichero = new FileWriter(filename);
            pw = new PrintWriter(fichero);
 
            String[] xx = data.toString().split("\n");
            
            for (int i = 0; i < xx.length; i++) {
				pw.println(xx[i]);
			}

            
            return true;
            
        } catch (Exception e) {
        	
        	logger.error(" Problemas para guardar en archivo" , e);
        	throw e;
        	
        } finally {
           try {
           if (null != fichero)
              fichero.close();
           } catch (Exception e2) {
              e2.printStackTrace();
           }
        }
        
	}
	
	
	
	public static synchronized void createFile(final String fileNameKey, final String fechaActualCompleta) throws IOException {
		File fichero = new File(fileNameKey);
		try {
			if (fichero.createNewFile())
				;

		} catch (IOException ioe) {
			throw ioe;
		}

	}


//	public static synchronized Object createFileWithData(Map datos, List parsers, ParametrosSistema parametros, String filename) {
//		FileWriter fileWritter = null;
//		try {
//			File file = new File(parametros.getDirectorioSalidaArchivos() + filename);
//
//			if (!file.exists()) {
//				file.createNewFile();
//			}
//
//			fileWritter = new FileWriter(file, true);
//			BufferedWriter bufferWritter = new BufferedWriter(fileWritter);
//
//			//este desfasaje de lineas se debe a que el campo 1 es el id
//			int y = 2;
//			int zz = 1;
//			for (int i = 0; i < parsers.size() - 1; i++) {
//				bufferWritter.write(obtenerDato(parsers, datos, y,zz));
//						bufferWritter.newLine();
//				y++;
//				zz++;
//				
//			}
//			bufferWritter.close();
//
//		} catch (Exception e) {
//			logger.error("Error al procesar " , e);
//			e.printStackTrace();
//		} finally {
//
//			try {
//				fileWritter.close();
//			} catch (Exception e2) {
//				logger.error("Error al procesar " , e2);
//				e2.printStackTrace();
//			}
//		}
//
//		return true;
//	}

	
	/**
	 * Igual que el anterior pero le paso el directorio
	 * @param datos
	 * @param parsers
	 * @param parametros
	 * @param filename
	 * @param dir
	 * @param internetAddress 
	 * @return
	 */
	public static synchronized Object createFileWithData(Map datos, List parsers, String filename,String dir, InternetAddress internetAddress) {

		FileWriter fileWritter = null;
		
		boolean retorno = verificarDatos(datos);

		try {
			File file = new File(dir + filename);

			if (!file.exists()) {
				file.createNewFile();
			}

			fileWritter = new FileWriter(file, true);
			BufferedWriter bufferWritter = new BufferedWriter(fileWritter);

			//este desfasaje de lineas se debe a que el campo 1 es el id
			int y = 2;
			int zz = 1;
			for (int i = 0; i < parsers.size() - 1; i++) {
				String datoAAgregar = obtenerDato(parsers, datos, y,zz); 
				bufferWritter.write(datoAAgregar);
				bufferWritter.newLine();
				y++;
				zz++;
			}
			
			//Agrego el email
			if (internetAddress != null && internetAddress.getAddress() != null) {
				bufferWritter.write(internetAddress.getAddress());
			}else {
				bufferWritter.write("noposeeemail@email.com");
			}
			bufferWritter.newLine();
			
			bufferWritter.close();

			
			
			
		} catch (Exception e) {
			logger.error("Error al procesar " , e);
			e.printStackTrace();
			
			try {
				File file = new File(dir + filename);
				file.delete();
			} catch (Exception e2) {}
			
			retorno = false;
			
		} finally {

			try {
				fileWritter.close();
			} catch (Exception e2) {
				logger.error("Error al procesar " , e2);
				e2.printStackTrace();
			}
		}

		return new Boolean(retorno);
	}

	
	
	private static boolean verificarDatos(Map datos) {
		if (datos.size() == 0) {
			return false;
		}else {
			return true;
		}
	}

	/**
	 * Verifica que el dato no sea basura
	 * @param datoAAgregar
	 * @param retorno
	 * @return
	 */
	private static boolean verificarDato(String datoAAgregar, boolean retorno) {
		if (!retorno) {
			if (datoAAgregar == null) {
				return false;
			}
			
			if (datoAAgregar.length() < 1) {
				return false;
			}
			
			return true;

		}else {
			return retorno;
		}
	}

	/**
	 * Obtiene el dato segun corresponda
	 * @param parsers
	 * @param datos
	 * @param y
	 * @param z
	 * @return
	 * @throws Exception 
	 */
	private static String obtenerDato(final List parsers, final Map datos, final int y, int z) throws Exception {
		return null;
//		try {
//
//			for (Iterator iterator = parsers.iterator(); iterator.hasNext();) {
//				DatoBase datoBase = (DatoBase) iterator.next();
//				if (datoBase.getUbicacion() == y) {
//				
//					String dato = datoBase.getNombreCampoFormulario();
//					//Descomentar para ver las lineas del archivo
//					//System.out.println("Linea Archivo : " + z + "  - Campo formulario PDF  : " + datoBase.getNombreCampoFormulario());
//					
//					//es un campo concatenado
//					if (datoBase.isCampoConcatenado()) {
//						
//						
//						
//						String datoFinal = "";
//						String[] campos = dato.split(";");
//						for (int i = 0; i < campos.length; i++) {
//							datoFinal = datoFinal + datos.get(campos[i]);
//							if (datoBase.isAgregaEspacio()) {
//								datoFinal  = datoFinal + " ";
//							}
//						}
//						return datoFinal.trim();
//						
//						
//					//es un campo simple
//					} else {
//
//						//FIXME
//						//Esto deberia desaparecer pero por las dudas lo dejamos
//						if (datoBase.getParser() instanceof CadenaSectionDataParser) {
//
//							Object dato1 = datoBase.getParser().obtenerValor((String) datos.get(dato));
//							if (dato1 == null) {
//								return "";
//							} else {
//								return dato1.toString();
//							}
//
//						}else if (datoBase.getParser() instanceof CadenaDataParserWithDefaultCero) {
//							
//							Object dato1 = datoBase.getParser().obtenerValor((String) datos.get(dato));
//							if (dato1 == null) {
//								return "";
//							} else {
//								return dato1.toString();
//							}
//							
//						
//						}else if (datoBase.getParser() instanceof FechaValidacionDataParser) {
//							
//							Object dato1 = datoBase.getParser().obtenerValor((String) datos.get(dato));
//							return dato1.toString();
//							
//								
//						}else {
//							
//							Object dato1 = datos.get(dato);
//							if (dato1 == null) {
//								return "";
//							} else {
//								return dato1.toString();
//							}
//						}
//						
//						
//						
//					}
//				}
//			}
//			
//			return "Error";
//
//		} catch (Exception e) {
//			logger.error("Error al procesar " , e);
//			//return "Error al obtener la propiedad " + e.getMessage();
//			throw new Exception("Error de datos");
//		}
	}

	public static void copyFile(String f1, String f2) throws Exception {
		copyFile(new File(f1), new File(f2));
	}

	public Map<String, String> getMapaDatos(String file) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	
	

}
