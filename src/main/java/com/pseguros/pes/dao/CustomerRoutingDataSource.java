package com.pseguros.pes.dao;


import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import com.pseguros.pes.generic.EnvironmentContextHolder;

public class CustomerRoutingDataSource extends AbstractRoutingDataSource {

    @Override
    protected Object determineCurrentLookupKey() {
	return EnvironmentContextHolder.getEnvironmentType();
    }

}
