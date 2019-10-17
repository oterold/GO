package com.pseguros.pes.controller.pub;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.mail.Session;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.pseguros.pes.bean.Breadcrumb;
import com.pseguros.pes.generic.EnvironmentType;
import com.pseguros.pes.generic.WebAplicatioonConst;
import com.pseguros.pes.interceptor.ConstantesDeSession;
import com.pseguros.pes.util.pantalla.UtilPantalla;

public abstract class AbstractPubController {

	protected static final String PANTALLA_ERROR = "partials/error/errorGeneralTemplate";

	private static final Logger loggerUser = LoggerFactory.getLogger("LOGGER_USER");

	private static final String VERSION_JS = "201910171032";

	protected void logearUser(String metodo, String pathInfo, String user) {
		loggerUser.debug("User Accede a metodo : " + metodo + " **** User: " + user + " **** Path Info : " + pathInfo);

	}

	protected String getUser(HttpServletRequest request) {
		return (String) request.getSession().getAttribute(ConstantesDeSession.USUARIO);
	}

	protected String getUserLog(HttpServletRequest request) {
		try {
			return "Usuario : " + (String) request.getSession().getAttribute(ConstantesDeSession.USUARIO) + " ";

		} catch (Exception e) {
			loggerUser.error("", e);
		}

		return "";
	}

	protected EnvironmentType getEntorno(HttpServletRequest request) {
		EnvironmentType entorno = (EnvironmentType) request.getSession().getAttribute("entorno");
		if (entorno == null) {
			request.getSession().setAttribute("entorno", WebAplicatioonConst.ENTORNO);
		}
		return entorno;
	}

	protected void agregarBreadcrumb(HttpServletRequest request, String name) {
		List<Breadcrumb> breadcrumb = (List<Breadcrumb>) request.getSession().getAttribute(ConstantesDeSession.BREADCRUMB);
		if (breadcrumb == null || breadcrumb.size() == 0) {
			breadcrumb = new ArrayList<Breadcrumb>();
			breadcrumb.add(new Breadcrumb(request.getRequestURL().toString() + "?" + request.getQueryString(), name, name, name, name, request.getQueryString()));
			request.getSession().putValue(ConstantesDeSession.BREADCRUMB, breadcrumb);

		} else {
			Breadcrumb b = breadcrumb.get(breadcrumb.size() - 1);
			if (b.getName().equals(name) && b.getQueryString().equals(request.getQueryString())) {
				// si es igual no lo agrego
			} else {
				breadcrumb.add(new Breadcrumb(request.getRequestURL().toString() + "?" + request.getQueryString(), name, name, name, name, request.getQueryString()));
				request.getSession().putValue(ConstantesDeSession.BREADCRUMB, breadcrumb);
			}
		}
	}

	protected void eliminarBreadcrumb(HttpServletRequest request) {
		request.getSession().removeAttribute(ConstantesDeSession.BREADCRUMB);

	}

	protected Breadcrumb getBreadcrumb(HttpServletRequest request, int id) {

		List<Breadcrumb> breadcrumb = (List<Breadcrumb>) request.getSession().getAttribute(ConstantesDeSession.BREADCRUMB);

		List<Breadcrumb> breadcrumbTMP = new ArrayList<Breadcrumb>();

		int i = 0;
		for (Iterator iterator = breadcrumb.iterator(); iterator.hasNext();) {
			Breadcrumb breadcrumbT = (Breadcrumb) iterator.next();
			if (i == id) {
				return breadcrumbT;
			}
			i++;

		}

		return null;
	}

	protected void eliminarBreadcrumb(HttpServletRequest request, int nro) {

		List<Breadcrumb> breadcrumb = (List<Breadcrumb>) request.getSession().getAttribute(ConstantesDeSession.BREADCRUMB);

		List<Breadcrumb> breadcrumbTMP = new ArrayList<Breadcrumb>();

		int i = 0;
		for (Iterator iterator = breadcrumb.iterator(); iterator.hasNext();) {
			Breadcrumb breadcrumbT = (Breadcrumb) iterator.next();
			if (i < nro) {
				breadcrumbTMP.add(breadcrumbT);
			}
			i++;

		}

		request.getSession().putValue(ConstantesDeSession.BREADCRUMB, breadcrumbTMP);
	}

	protected Map<? extends String, ? extends Object> getDatosComunes(HttpServletRequest request, String tipoBuscador) throws UnsupportedEncodingException {
		return getDatosComunesGeneral(request, tipoBuscador);
	}

	protected Map<? extends String, ? extends Object> getDatosComunes(HttpServletRequest request) throws UnsupportedEncodingException {
		try {
			return getDatosComunesGeneral(request, "Buscador");
		} catch (Exception e) {
			loggerUser.error("",e);
			return null;
		}
	}

	protected Map<? extends String, ? extends Object> getDatosComunesGeneral(HttpServletRequest request, String tipoBuscador) throws UnsupportedEncodingException {

		Map<String, Object> mapa = new HashMap<String, Object>();

		mapa.put("utilToolScreen", new UtilPantalla());
		mapa.put("paramId", "" + VERSION_JS);
		mapa.put("compartirUrl", "" + URLEncoder.encode(request.getRequestURL().toString() + "?" + request.getQueryString(), "UTF-8"));

		mapa.put("userApp", getUser(request));
		mapa.put("entornoApp", getEntorno(request));
		mapa.put("scriptGrilla", "");
		mapa.put("scriptCustom", "");
		mapa.put("nombreUsuario", request.getSession().getAttribute(ConstantesDeSession.USUARIO_DISPLAY));

		// ---------------------------------------------------------------------------------------------------------------------------
		// -------------------------------------------------- breadcrumb
		// ------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------

		List<Breadcrumb> breadcrumb = (List<Breadcrumb>) request.getSession().getAttribute(ConstantesDeSession.BREADCRUMB);

		if (breadcrumb == null) {

			mapa.put("indicadorNivel1", tipoBuscador);
			mapa.put("indicadorNivel1URL", "0");

			mapa.put("indicadorNivel2", null);
			mapa.put("indicadorNivel2URL", null);

			mapa.put("indicadorNivel3", null);
			mapa.put("indicadorNivel3URL", null);

		} else {
			if (breadcrumb.size() > 2) {

				mapa.put("indicadorNivel1", breadcrumb.get(breadcrumb.size() - 3).getName());
				mapa.put("indicadorNivel1URL", "" + (breadcrumb.size() - 3));

				mapa.put("indicadorNivel2", breadcrumb.get(breadcrumb.size() - 2).getName());
				mapa.put("indicadorNivel2URL", +(breadcrumb.size() - 2));

				mapa.put("indicadorNivel3", breadcrumb.get(breadcrumb.size() - 1).getName());
				mapa.put("indicadorNivel3URL", +(breadcrumb.size() - 1));

			} else {

				if (breadcrumb.size() == 1) {

					mapa.put("indicadorNivel1", breadcrumb.get(0).getName());
					mapa.put("indicadorNivel1URL", "0");

					mapa.put("indicadorNivel2", null);
					mapa.put("indicadorNivel2URL", null);

					mapa.put("indicadorNivel3", null);
					mapa.put("indicadorNivel3URL", null);
				}

				if (breadcrumb.size() == 2) {

					mapa.put("indicadorNivel1", breadcrumb.get(0).getName());
					mapa.put("indicadorNivel1URL", "0");

					mapa.put("indicadorNivel2", breadcrumb.get(1).getName());
					mapa.put("indicadorNivel2URL", "1");

					mapa.put("indicadorNivel3", null);
					mapa.put("indicadorNivel3URL", null);

				}

			}

		}
		// ---------------------------------------------------------------------------------------------------------------------------
		// -----------------------------------------------FIN breadcrumb
		// -------------------------------------------------------------
		// ---------------------------------------------------------------------------------------------------------------------------

		return mapa;
	}

}
