package com.pseguros.pes.ftp;

import java.io.IOException;

import com.pseguros.pes.ftp.parametros.ParametrosSistema;
import com.pseguros.pes.ftp.parametros.ParametrosSistemaDelta;
import com.pseguros.pes.util.properties.PropertiesConstantes;
import com.pseguros.pes.util.properties.UtilProperties;

import cz.dhl.ftp.Ftp;
import cz.dhl.ftp.FtpConnect;
import cz.dhl.ftp.FtpFile;
import cz.dhl.io.CoFile;
import cz.dhl.io.CoLoad;
import cz.dhl.io.LocalFile;



public class FTPExecutor {


	private String url;
	private String usuario;
	private String password;

	private boolean logFile;
	
	
	

	
	public FTPExecutor(ParametrosSistema parametros) {

//		this.url = parametros.getUrlFTP();
//		this.password= parametros.getPasswordFTP();
//		this.usuario = parametros.getUserFTP();
		
		this.url = UtilProperties.getDato(PropertiesConstantes.FTP_URL);
		this.password= UtilProperties.getDato(PropertiesConstantes.FTP_PASSWORD);
		this.usuario = UtilProperties.getDato(PropertiesConstantes.FTP_USER);
		
		
	}
	
	
	
	public FTPExecutor(ParametrosSistemaDelta parametros) {

//		this.url = parametros.getUrlFTP();
//		this.password= parametros.getPasswordFTP();
//		this.usuario = parametros.getUserFTP();
		
		
		this.url = parametros.getUrlFTP();
		this.password= parametros.getPasswordFTP();
		this.usuario = parametros.getUserFTP();
		
		
	}
	
	
	
	public FTPExecutor() {
		System.out.println();
	}
	
	

	/**
	 * Conectar
	 * @return
	 * @throws IOException
	 */
	private Ftp conectar() throws IOException {

		// cn = FtpConnect.newConnect("ftp://ftp.ejemplo.com/public_html/tmp/");
		FtpConnect cn = FtpConnect.newConnect(url);

		cn.setUserName(usuario);
		cn.setPassWord(password);
		Ftp cl = new Ftp();
		
//		if (logFile) {
//			cl.getContext().setConsole( new ConsoleCustomFileFTP(logFileName));
//		}else {
//			cl.getContext().setConsole( new ConsoleCustomFTP());
//		}
//		
		
		
		cl.connect(cn);
		return cl;
	}

	/**
	 * Desconectar
	 * @param cl
	 */
	private void desconectar(Ftp cl) {
		cl.disconnect();
	}

	/**
	 * 
	 * @throws Exception
	 */
	public void imprimirDirectorioActual(String directorio) throws Exception {
		try {

			Ftp cl = conectar();
			
			CoFile dir ;
			if (directorio != null || !(directorio.equals("")) ) {
				dir = new FtpFile(cl.pwd() + directorio, cl);
			}else {
				dir = new FtpFile(cl.pwd(), cl);
			}

			CoFile fls[] = dir.listCoFiles();
			if (fls != null) {
				for (int n = 0; n < fls.length; n++) {
					System.out.println(fls[n].getName()
					// marcar los directorio con un slash "/"
							+ (fls[n].isDirectory() ? "/" : ""));
				}
			}

			desconectar(cl);

		} catch (Exception e) {
			throw e;
		}
	}

	
	public boolean existeArchivo(String path, String filename) throws Exception {
		try {
			boolean result = false;
			Ftp cl = conectar();
			
			CoFile dir = new FtpFile(path+filename, cl);
			
			result = dir.exists();;
			
			desconectar(cl);

			return result;
			
		} catch (Exception e) {
			throw e;
		}
		
	}

	
	
	
	
	/**
	 * Sube un archivo desde la pc al repositorio FTP
	 * @param path_servidor
	 * @param nombre_archivo
	 * @param ubicacion_nueva
	 * @throws Exception
	 */
	public void subirArchivo(String path_servidor, String nombre_archivo, String ubicacion_nueva) throws Exception {
		try {

			Ftp cl = conectar();
			
			CoFile archivoLocal = new LocalFile(ubicacion_nueva, nombre_archivo);
			System.out.println("Subiendo archivo en: " + ubicacion_nueva);
			CoFile archivoRemoto = new FtpFile(path_servidor + nombre_archivo, cl);
			CoLoad.copy(archivoRemoto, archivoLocal);
			
			desconectar(cl);

		} catch (Exception e) {
			throw e;
		}
	}

	
	/**
	 * subirArchivoPDF("/ruta/server/remoto/", "archivo_local.txt", "C:\\directorio\\local");
	 * @param carpetaFTP
	 * @param archivo
	 * @param ubicacionNueva
	 * @throws Exception
	 */
	public void subirArchivoPDF(String carpetaFTP, String archivoOrigen  , String ubicacionNueva,String archivoDestino) throws Exception {
		
		Ftp cl = null;
		try {

			cl = conectar();
			
			cl.mkdir(cl.pwd()+carpetaFTP);
			
			CoFile archivoLocal = new LocalFile(ubicacionNueva + archivoOrigen);
			CoFile archivoRemoto = new FtpFile(cl.pwd()+carpetaFTP + archivoDestino, cl);
			
			
			if (!CoLoad.copy(archivoRemoto, archivoLocal)) {
				throw new Exception(" No se pudo copiar al repositorio ");
			}
			

		} catch (Exception e) {
			throw e;
		}finally{
			try {
				desconectar(cl);
			} catch (Exception e2) {
			} 
			
		}
	}

	
	
	/**
	 * Baja Un archivo desde un ftp al disco 
	 * @param path_servidor
	 * @param nombre_archivo
	 * @param ubicacion_nueva
	 * @param nombre_archivo_nuevo 
	 * @throws Exception
	 */
	public void bajarArchivo(String path_servidor, String nombre_archivo, String ubicacion_nueva, String nombre_archivo_nuevo) throws Exception {
		try {
			Ftp cl = conectar();

			
			CoFile archivoLocal = new LocalFile(ubicacion_nueva, nombre_archivo_nuevo);
			CoFile archivoRemoto = new FtpFile(path_servidor + nombre_archivo, cl);
			CoLoad.copy(archivoLocal, archivoRemoto);
//			
			desconectar(cl);
		
		} catch (Exception e) {
			throw e;
		}
	}
	

	// imprimirDirectorioActual();

	// bajarArchivo("/ruta/server/remoto/", "archivo_remoto.txt", "C:\directorio\local");
	
	// subirArchivo("/ruta/server/remoto/", "archivo_local.txt", "C:\\directorio\\local");


	
	
	/**********************************************************************************
	 *     getters and setters
	 *********************************************************************************/

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	
	


	
	
}
