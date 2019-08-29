package com.pseguros.pes.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;


public class AbstractJDBCDAO {

	  protected JdbcTemplate jdbcTemplate;

	    protected JdbcTemplate jdbcTemplateIsla;

	    @Autowired
	    public void setDataSource(@Qualifier("dataSource") DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	    }

	   
	    
}
