package com.pseguros.pes.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailUtil {
	
	public static boolean validar(String emailUsuario) {
		// Patron para validar el email
        Pattern pattern = Pattern
                .compile("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
                        + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
        
        Matcher mather = pattern.matcher(emailUsuario);
        return mather.find();
	}
}
