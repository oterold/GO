git pull
call mvn install
cd target
pscp -p PSPES.war tomcat@svrpest:/opt/tomcat
cd..