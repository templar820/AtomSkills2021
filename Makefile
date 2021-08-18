start:
	docker-compose up -d  --scale db_init=0 --scale db_clean=0 --scale nginx=0 --scale frontend=0
stop:
	docker-compose down
production:
# 	cat ./_docker/nginx-conf/nginx.conf > ./nginx/nginx.conf
	docker-compose up -d --scale db_init=0 --scale db_clean=0
build:
	docker-compose up -d verdaccio
	docker-compose build --scale frontend=0
	docker image prune -f
	docker-compose down

db:
	docker-compose up db_init
db-clean:
	docker-compose up db_clean

delete-all:
	docker-compose down
	docker system prune
