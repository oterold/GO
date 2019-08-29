package com.pseguros.pes.controller.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.pseguros.pes.controller.pub.AbstractPubController;
import com.pseguros.pes.generic.EnvironmentContextHolder;

@Controller
public class UtilLogController extends AbstractPubController {

	private static final String PANTALLA_LOG = "partials/util/log/logHomeTemplate";
	private static final Logger logger = LoggerFactory.getLogger(UtilLogController.class);

	@RequestMapping(value = "/log", method = RequestMethod.GET)
	public ModelAndView mostrarDetallelog(HttpSession session, HttpServletRequest request, Locale locale, Model model) throws Exception {

		logger.debug("Inicio UtilLogController");

		EnvironmentContextHolder.setEnvironmentType(getEntorno(request));

		Map<String, Object> mapa = new HashMap<String, Object>();
		mapa.put("userApp", getUser(request));
		mapa.put("funcionOnload", "");

		String cantLineasLog = request.getParameter("lineasLog");

		if (cantLineasLog == null || cantLineasLog.isEmpty() || cantLineasLog.equals("")) {
			cantLineasLog = "1000";
		}

		File archivoLog = null;
		FileReader fr = null;
		BufferedReader br = null;

		try {

			archivoLog = new File("/home/logApp/PSPES.log");
			fr = new FileReader(archivoLog);
			br = new BufferedReader(fr);

			List<String> lineasLog = new ArrayList<String>();
			String linea;
			String logPSPES = "";
			while ((linea = br.readLine()) != null)
				lineasLog.add(linea);

			for (int i = lineasLog.size() - Integer.parseInt(cantLineasLog); i < lineasLog.size(); i++) {
				logPSPES += lineasLog.get(i - 1) + "<br>";
			}

			mapa.put("logPSPES", logPSPES);

			logger.debug("Fin UtilLogController");

			mapa.put("paramId", "" + new Date().getTime());

			return new ModelAndView(PANTALLA_LOG, mapa);

		} catch (Exception e) {
			logger.error("Exploto al mostrar el log PSPES", e);
			mapa.put("errorMsg", "" + e.getCause().getMessage());
		} finally {

			try {
				if (fr != null) {
					fr.close();
				}
			} catch (Exception e1) {
				logger.error("Exploto al cerrar el archivo de log PSPES", e1);
				mapa.put("errorMsg", "" + e1.getCause().getMessage());
			}
		}

		return new ModelAndView(PANTALLA_ERROR, mapa);

	}
}
