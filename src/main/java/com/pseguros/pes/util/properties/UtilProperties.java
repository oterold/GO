package com.pseguros.pes.util.properties;

import java.util.Properties;

public class UtilProperties {

	public static Properties properties;

	// Cheating spring to set a static property.
	public static Properties setInstance(Properties propertiesArgs) {
		properties = propertiesArgs;
		return properties;
	}

	public static String getDato(String key) {
		return properties.getProperty(key);
	}

	public static Properties getAll() {
		return properties;
	}

}
