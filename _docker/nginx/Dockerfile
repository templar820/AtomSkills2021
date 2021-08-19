FROM nginx:latest

COPY ./_docker/nginx/template_nginx.conf /template_nginx.conf
COPY ./_docker/nginx/run_nginx.sh /run_nginx.sh

RUN ["chmod", "+x", "/run_nginx.sh"]

CMD ["./run_nginx.sh"]