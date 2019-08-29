package com.pseguros.pes.controller.pub;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pseguros.pes.generic.EnvironmentContextHolder;
import com.pseguros.pes.service.ExecuteService;
@Controller
public class LanPubController extends AbstractPubController {

	private static final Logger logger = LoggerFactory.getLogger(LanPubController.class);
	@Autowired
	private ExecuteService executeService;
	@RequestMapping(value = "/lang", method = RequestMethod.GET)
	public @ResponseBody Object homeCotizacionPorPoliza(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {
		
		Map<String, Object> mapa = new HashMap<String, Object>() ;
		try {

			logger.debug("Entro LANG");

			EnvironmentContextHolder.setEnvironmentType(getEntorno(request));
			Locale loc = Locale.getDefault();
			String lang = loc.getDisplayLanguage();
			String country = loc.getDisplayCountry();

			mapa.put("lang", lang);
			mapa.put("country", country);
			
			mapa.put("file.encoding", System.getProperty("file.encoding"));
			mapa.put("Default Charset", Charset.defaultCharset());
			mapa.put("Default Charset in Use", getDefaultCharSet());
			


			return mapa;

		} catch (Exception e) {
			logger.error(getUserLog(request)+"Exploto LAN", e);
			return e.getMessage();
		}

	}
	
	private static String getDefaultCharSet() {
        OutputStreamWriter writer = new OutputStreamWriter(new ByteArrayOutputStream());
        String enc = writer.getEncoding();
        return enc;
    }
}
