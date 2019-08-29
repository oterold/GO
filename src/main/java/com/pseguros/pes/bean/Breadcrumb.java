package com.pseguros.pes.bean;

public class Breadcrumb {

	private String url;
    private String name;
    private String p1;
    private String p2;
    private String p3;
    private String queryString;
    
    

    public String getQueryString() {
		return queryString;
	}

	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}

	public Breadcrumb(final String url, final String name, final String p1 ,final String p2,final String p3, String q)
    {
        this.url = url;
        this.name = name;
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.queryString = q;
    }

	public String getP1() {
		return p1;
	}

	public String getP2() {
		return p2;
	}

	public String getP3() {
		return p3;
	}

	public void setP1(String p1) {
		this.p1 = p1;
	}

	public void setP2(String p2) {
		this.p2 = p2;
	}

	public void setP3(String p3) {
		this.p3 = p3;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
    
    
    
}
