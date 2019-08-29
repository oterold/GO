<%@ page import = "java.util.*, java.io.*" %>
 <html>
 <!--
partially derived from snoop.jsp sample Java file distributed by Sun
 Copyright (c) 1999 Sun Microsystems, Inc. All Rights Reserved.
 -->

 <body bgcolor="white">

 <h2>Browser cookie string is:</h2>
 <script>document.writeln( document.cookie );</script>
 <h3>The cookies in the page are:</h3>
 <script>
 var cookiestring=""+document.cookie;
 var cookies = cookiestring.split(";")

 for( var i = 0; i < cookies.length; i++ )
 {
 document.writeln( unescape( cookies[i] ) + "<br>");
 }

 </script>

 <h2> Request Information </h2>
 <font size="4">
 JSP Request Method: <%= request.getMethod() %><br>
 Remote user: <%= request.getRemoteUser() %>
 <hr><br>

 Request URI: <%= request.getRequestURI() %><br>
 Request Protocol: <%= request.getProtocol() %><br>
 Servlet path: <%= request.getServletPath() %><br>
 Path info: <%= request.getPathInfo() %><br>
 Path translated: <%= request.getPathTranslated() %><br>
 Query string: <%= request.getQueryString() %><br>
 Content length: <%= request.getContentLength() %><br>
 Content type: <%= request.getContentType() %><br>
 Server name: <%= request.getServerName() %><br>
 Server port: <%= request.getServerPort() %><br>
 Remote user: <%= request.getRemoteUser() %><br>
 Remote address: <%= request.getRemoteAddr() %><br>
 Remote host: <%= request.getRemoteHost() %><br>
 Authorization scheme: <%= request.getAuthType() %><hr>

 The browser you are using is <%= request.getHeader("User-Agent") %>
 <hr>
 The Headers passed in the request are:
 <%
 Enumeration pepe;
 pepe = request.getHeaderNames();
 while( pepe.hasMoreElements() )
 {
 String header = (String) pepe.nextElement();
 out.println( "<br>" + header + " is: " + 
 request.getHeader( header ) ); 
 } 
 %>

 <hr>
 The cookies passed in this request are:
 <%
 Cookie cookies[] = request.getCookies();
 for (int i = 0; i < cookies.length; ++i)
 {
 out.println ( "<br>" + cookies[i].getName() + " = " 
 + cookies[i].getValue() );
 }
 %>
 <hr>
 </body>
 <html>