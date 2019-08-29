package com.pseguros.pes.exception;


public class SQLPSException extends Exception {

    /**
     * 
     */
    private static final long serialVersionUID = -5528779650624939244L;

    public SQLPSException(Exception e) {
	super(e);
    }

    public SQLPSException(String dato, Exception e) {
	super(dato, e);
    }

    public SQLPSException(String dato) {
	super(dato);
    }

}
