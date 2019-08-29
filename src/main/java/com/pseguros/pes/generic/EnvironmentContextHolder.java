package com.pseguros.pes.generic;


public class EnvironmentContextHolder {

    private static final ThreadLocal<EnvironmentType> contextHolder = new ThreadLocal<EnvironmentType>();

    public static void setEnvironmentType(EnvironmentType customerType) {
	contextHolder.set(customerType);
    }

    public static EnvironmentType getEnvironmentType() {
	return (EnvironmentType) contextHolder.get();
    }

    public static void clearEnvironmentType() {
	contextHolder.remove();
    }
}
