package com.pseguros.pes.builder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.pseguros.pes.bean.Breadcrumb;

@Component
public class PUBBreadcrumbsBuilder {

	final List<Breadcrumb> breadcrumbs = new ArrayList<Breadcrumb>();

	public List<Breadcrumb> getBreadcrumbs() throws IllegalArgumentException {
        
        Collections.reverse(breadcrumbs);
        return breadcrumbs;
    }

 
}
