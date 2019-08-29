package com.pseguros.pes.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pseguros.pes.dao.RectorDAO;
import com.pseguros.pes.exception.SQLPSException;




@Service
public class RectorService {

	@Autowired
	private RectorDAO rectorDAO;

	public String getValorControl(String userURL, String destino, String origen) throws SQLPSException {
		// TODO Auto-generated method stub
		return rectorDAO.getValorControl(userURL,destino,origen);
	}



}
