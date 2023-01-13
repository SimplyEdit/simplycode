FROM php:7.4-apache
RUN apt-get update && \
    apt-get install -y \
        git ssl-cert

WORKDIR /opt/simplycode/
COPY . /opt/simplycode/
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN htpasswd -cb /opt/simplycode/www/data/.htpasswd demo demo
RUN a2enmod rewrite ssl headers
RUN chown -R www-data:www-data /opt/simplycode/www/data
RUN chown -R www-data:www-data /opt/simplycode/www/api/data

EXPOSE 80
EXPOSE 443
CMD ["apache2-foreground"]