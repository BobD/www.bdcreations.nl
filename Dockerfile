# https://hub.docker.com/_/httpd/
FROM httpd:2.4
COPY /apache/httpd.conf /usr/local/apache2/conf/httpd.conf