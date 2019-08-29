package com.pseguros.pes.email.util;



import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.URL;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMessage.RecipientType;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.lang.text.StrSubstitutor;
import org.apache.commons.mail.HtmlEmail;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pseguros.pes.email.adjunto.AdjuntoEmail;





/**
 * Se crea un nuevo sender para mandar Emails
 * La idea es mandar con un template e imagenes adjuntas
 * @author grisaym
 *
 */
public class EmailSender {

	private static final Logger logger = LoggerFactory.getLogger(EmailSender.class);

	
	/**
	 * Envia el email y si no lo puede enviar no arroja excepcion alguna
	 * @param emailIn
	 */
	public static void enviarMute(final EmailPS emailIn)  {
		try {
			enviar(emailIn);
		} catch (Exception e) {
			logger.error("Se ha producido un error al enviar el email" , e);
		}
	}
	
	public static void enviar(final EmailPS emailIn) throws Exception  {
		
		try {
			
		HtmlEmail	email	= new HtmlEmail();
		//email.setDebug(true);
		String		html	= null;
		StrSubstitutor strSub = null;
		
		Properties propiedadesUser = emailIn.getPropiedadesUser();

		if (propiedadesUser == null) {
			propiedadesUser = new Properties();
		}
		html   = EmailSender.fileToString(EmailSender.class.getResourceAsStream("/templateEmail/" + emailIn.getTemplate()), "utf-8");
		
		String[] images = emailIn.getImages();
		
		URL 	 url = null;
		String	 cid = null; 

		if (images!= null) {
			for (int i = 0; i < images.length; i++){
				url = EmailSender.class.getResource("/imgEmail/" + images[i]);
				cid = email.embed(url, images[i]);
				propiedadesUser.put(images[i],	cid );
			}
		}
		
		propiedadesUser.put("mensajeOk", "clausulasss");
		
		strSub = new StrSubstitutor(propiedadesUser);
		html   = strSub.replace(html);		
		
		email.setHostName("10.6.110.15");
		email.setCharset("UTF-8");
		email.setFrom("infonoreply@pseguros.com.ar","Provincia Seguros S.A.");
		email.addTo(emailIn.getEmailDestino());
		email.setSubject(emailIn.getSubject());		
		email.setHtmlMsg(html);

		email.send();

		logger.debug("Se ha enviado el email");
		
		} catch (Exception e) {
			logger.error("Se ha producido un error en en envio de Email " , e);
			throw e;
		}
	}

	
	
	
public static void enviar(final EmailPS emailIn , String[] emails) throws Exception  {
		
		try {
			
		HtmlEmail	email	= new HtmlEmail();
		//email.setDebug(true);
		String		html	= null;
		StrSubstitutor strSub = null;
		
		Properties propiedadesUser = emailIn.getPropiedadesUser();

		if (propiedadesUser == null) {
			propiedadesUser = new Properties();
		}
		html   = EmailSender.fileToString(EmailSender.class.getResourceAsStream("/templateEmail/" + emailIn.getTemplate()), "utf-8");
		
		String[] images = emailIn.getImages();
		
		URL 	 url = null;
		String	 cid = null; 

		if (images!= null) {
			for (int i = 0; i < images.length; i++){
				url = EmailSender.class.getResource("/imgEmail/" + images[i]);
				cid = email.embed(url, images[i]);
				propiedadesUser.put(images[i],	cid );
			}
		}
		
		propiedadesUser.put("mensajeOk", "clausulasss");
		
		strSub = new StrSubstitutor(propiedadesUser);
		html   = strSub.replace(html);		
		
		// Establecemos la configuracion del correo electronico
		email.setHostName("10.6.110.15");
		email.setCharset("UTF-8");
		email.setFrom("infonoreply@pseguros.com.ar","Provincia Seguros S.A.");
		email.addTo(emails);
		email.setSubject(emailIn.getSubject());		
		email.setHtmlMsg(html);

		// Enviamos el correo electronico
		email.send();

		logger.debug("Se ha enviado el email");
		
		} catch (Exception e) {
			logger.error("Se ha producido un error en en envio de Email " , e);
			throw e;
		}
	}

	


	/**
	 * Lee el contenido textual desde un stream de entrada
	 * @param  input Stream de entrada
	 * @param  encoding Codificacion
	 * @return El contenido del stream de entrada
	 * @throws IOException Cualquier excepcion de Entrada/Salida
	 */
	private static String fileToString(InputStream input, String encoding) throws IOException {
		StringWriter	  sw = new StringWriter();
		InputStreamReader in = new InputStreamReader(input, encoding);

		char[]	buffer = new char[1024 * 2];
		int		n	   = 0;
		while (-1 != (n = in.read(buffer))) {
			sw.write(buffer, 0, n);
		}    		
		return sw.toString();
	}	
	
	//----------------------------------------------------------------------------------------------------------------------------
	
	/**
	 * Hay q trabajar sobre este metodo que envia mails cons adjuntos
	 * @param emailIn
	 * @param adjuntos
	 * @param url 
	 * @return
	 */
	
	public static boolean enviar(final EmailPS emailIn , final List adjuntos, URL urlPath) {

		boolean isSent = true;
		

			try {
				Properties properties = cargarPropiedades();
	
				Authenticator mailAuthenticator = new MailAuthenticator();

				Session mailSession = Session.getInstance(properties,mailAuthenticator);
	
				Message message = new MimeMessage(mailSession);
				
				InternetAddress fromAddress = new InternetAddress("infonoreply@pseguros.com.ar", "Provincia Seguros S.A.");
				
				String to[] = emailIn.getEmailDestino().split(";"); // Mail id you want to send;
				
				InternetAddress[] address = new InternetAddress[to.length];
				for (int i = 0; i < to.length; i++) {
					address[i] = new InternetAddress(to[i]);
				}
	
				message.setFrom(fromAddress);
				
				message.setRecipients(RecipientType.TO, address);
	
				message.setSubject(emailIn.getSubject());
			
				Properties propiedadesUser = emailIn.getPropiedadesUser();
				String htmlBody   = EmailSender.fileToString(EmailSender.class.getResourceAsStream("/templateEmail/" + emailIn.getTemplate()), "utf-8");
				StrSubstitutor strSub = null;
				
				String[] images = emailIn.getImages();
				
				strSub = new StrSubstitutor(propiedadesUser);
				htmlBody   = strSub.replace(htmlBody);		
				
				message.setText(htmlBody);
				
				MimeBodyPart html = new MimeBodyPart();
				html.setContent(htmlBody, "text/html; charset=utf-8");
				
				MimeMultipart multiParte = new MimeMultipart();
				
				//AGREGO LOS ADJUNTOS
				if (adjuntos != null && adjuntos.size() > 0) {
	
					for (Iterator iterator = adjuntos.iterator(); iterator.hasNext();) {
	
						AdjuntoEmail adjuntoFile = (AdjuntoEmail) iterator.next();
						BodyPart adjunto = new MimeBodyPart();
						adjunto.setDataHandler(new DataHandler(new FileDataSource(adjuntoFile.getLocationFile())));
						adjunto.setFileName(adjuntoFile.getNameFile());
						multiParte.addBodyPart(adjunto);
					}
				}
				
				
				//Esto no anda en el servidor ver por que el path esta mal y luego si se puede agregar
//				try {
//					//Ver si esto no se tiene que ampliar
//					 MimeBodyPart messageBodyPart = new MimeBodyPart();
//				    // DataSource fds = new FileDataSource(ClienteConLoginController.class.getClass().getClassLoader().getResource("/imgEmail" + "/")   +  images[0] );
//					 DataSource fds = new FileDataSource(new File(urlPath + images[0]));
//				     messageBodyPart.setDataHandler(new DataHandler(fds));
//				     messageBodyPart.setHeader("Content-ID","<image>");
//				     multiParte.addBodyPart(messageBodyPart);
//
//				} catch (Exception e) {		logger.error(e.getMessage() , e);		}
//
//				

				multiParte.addBodyPart(html);
				message.setContent(multiParte);
				
				Transport.send(message);
	
				logger.info("--------------  Se ha enviado el email OK -----------");
				
			} catch (Exception e) {
				logger.error("Error al enviar email ", e);
				isSent = false;
			}
	
		return isSent;
	}

	
	public static boolean enviarConAdjunto(final EmailPS emailIn, final String rutaArchivo) {
	
		boolean isSent = true;
		
			try {
				Properties properties = cargarPropiedades();
				
				HtmlEmail	email	= new HtmlEmail();
	
				Authenticator mailAuthenticator = new MailAuthenticator();

				Session mailSession = Session.getInstance(properties,mailAuthenticator);
	
				Message message = new MimeMessage(mailSession);
				
				InternetAddress fromAddress = new InternetAddress("infonoreply@pseguros.com.ar", "Provincia Seguros S.A.");
				
				String to[] = emailIn.getEmailDestino().split(";"); // Mail id you want to send;
				
				InternetAddress[] address = new InternetAddress[to.length];
				for (int i = 0; i < to.length; i++) {
					address[i] = new InternetAddress(to[i]);
				}
	
				message.setFrom(fromAddress);
				
				message.setRecipients(RecipientType.TO, address);
	
				message.setSubject(emailIn.getSubject());
			
				Properties propiedadesUser = emailIn.getPropiedadesUser();
				String htmlBody   = EmailSender.fileToString(EmailSender.class.getResourceAsStream("/templateEmail/" + emailIn.getTemplate()), "utf-8");
				StrSubstitutor strSub = null;
				
				String[] images = emailIn.getImages();
				
				URL 	 url = null;
				String	 cid = null; 

				if (images!= null) {
					for (int i = 0; i < images.length; i++){
						url = EmailSender.class.getResource("/imgEmail/" + images[i]);
						cid = email.embed(url, images[i]);
						propiedadesUser.put(images[i],	cid );
					}
				}
				
				strSub = new StrSubstitutor(propiedadesUser);
				htmlBody   = strSub.replace(htmlBody);		
				
				message.setText(htmlBody);
				
				BodyPart html = new MimeBodyPart();
				html.setContent(htmlBody, "text/html; charset=utf-8");
				
				BodyPart adjunto = new MimeBodyPart();
				adjunto.setDataHandler(new DataHandler(new FileDataSource(rutaArchivo)));
				adjunto.setFileName("boletaDePago.pdf");
				
				MimeMultipart multiParte = new MimeMultipart();

				multiParte.addBodyPart(html);
				multiParte.addBodyPart(adjunto);
				
				message.setContent(multiParte);
				
				Transport.send(message);
	
				logger.info("--------------  Se ha enviado el email OK -----------");
				
			} catch (Exception e) {
				logger.error("Error al enviar email ", e);
				isSent = false;
			}
	
		return isSent;
	
	
	}
	
	
	private static Properties cargarPropiedades() throws Exception {
		Properties props = new Properties();
		props.setProperty("mail.smtp.submitter", "infonoreply@pseguros.com.ar");
		props.setProperty("mail.smtp.auth", "false");
		props.setProperty("mail.smtp.host", "10.6.110.15" );
		//props.put("mail.smtp.socketFactory.port", UtilProperties.getDato(PropertiesConstantes.MAIL_PORT));
		props.put("mail.smtp.starttls.enable", "false");

		props.put("mail.mime.decodetext.strict", "false");
		props.setProperty("mail.imaps.auth.ntlm.disable", "true");
		
		return props;
	}
		
	}
	
