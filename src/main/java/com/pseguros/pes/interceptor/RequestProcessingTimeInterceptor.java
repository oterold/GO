package com.pseguros.pes.interceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class RequestProcessingTimeInterceptor extends HandlerInterceptorAdapter{

	private static final Logger logger = LoggerFactory.getLogger(RequestProcessingTimeInterceptor.class);
	

	@Override
	public boolean preHandle(HttpServletRequest request,	HttpServletResponse response, Object handler) throws Exception {
		
		long startTime = System.currentTimeMillis();
		request.setAttribute("startTime", startTime);
		
		logger.debug("Time ID = " + startTime );
		
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,	HttpServletResponse response, Object handler,	ModelAndView modelAndView) throws Exception {
		
		String tiempoTotalOut= "0";
		long startTime = (Long) request.getAttribute("startTime");
		long tiempoTotal = ((System.currentTimeMillis() - startTime) ) ;

		if (tiempoTotal>999) {
			String dato = tiempoTotal + "";
			tiempoTotalOut = dato.substring(0, dato.length()-3) + "."+ dato.substring(dato.length()-3, dato.length())  ;
		}else {
			tiempoTotalOut = "0."+tiempoTotal  ;
		}

		request.getSession().setAttribute("tiempoTotal", tiempoTotalOut  );
		logger.debug("Time ID = " + startTime + " :: Time TotaL = " + tiempoTotalOut + " segundos :: Request URL = " + request.getRequestURL().toString()+"?"+request.getQueryString()	 );
		
	}
	
	@Override
	public void afterCompletion(HttpServletRequest request, 	HttpServletResponse response, Object handler, Exception ex)	throws Exception {
		
	}

}