package com.pseguros.pes.util.db;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SQLTools {

    private static Logger logger = LoggerFactory.getLogger(SQLTools.class);

    public static String buildProcedureCall(String packageName, String procedureName, int paramCount) {
	StringBuffer sb = new StringBuffer("{call " + packageName + "." + procedureName + "(");
	for (int n = 1; n <= paramCount; n++) {
	    sb.append("?");
	    if (n < paramCount)
		sb.append(",");
	}
	return sb.append(")}").toString();
    }

    public static String buildProcedureCall(String packageName, String procedureName, int paramCount, Map parameter) {
	StringBuffer sb = new StringBuffer("{call " + packageName + "." + procedureName + "(");
	for (int n = 1; n <= paramCount; n++) {
	    if (parameter.get(n) != null) {
		sb.append((String) parameter.get(n));
	    } else {
		sb.append("?");
	    }
	    if (n < paramCount)
		sb.append(",");
	}
	return sb.append(")}").toString();
    }

    public static void close(ResultSet rs, Statement s, Connection c) {
	logger.debug(" ********************** close connection");

	try {
	    if (rs != null)
		rs.close();
	} catch (Exception e) {
	    logger.error("Erro Close", e);
	}
	try {
	    if (s != null)
		s.close();
	} catch (Exception e) {
	    logger.error("Erro Close", e);
	}
	try {
	    if (c != null)
		c.close();
	} catch (Exception e) {
	    logger.error("Erro Close", e);
	}
    }
}
