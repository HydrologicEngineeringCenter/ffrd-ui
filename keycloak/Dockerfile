FROM jboss/keycloak:16.1.1
COPY standalone-ha.xml /opt/jboss/keycloak/standalone/configuration/standalone-ha.xml
# COPY server.keystore /opt/jboss/keycloak/standalone/configuration/server.keystore
# COPY trust.keystore /opt/jboss/keycloak/standalone/configuration/trust.keystore
# COPY dls-keycloak.jar /opt/jboss/keycloak/standalone/deployments/dls-keycloak.jar

EXPOSE 8080
EXPOSE 8443

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]

