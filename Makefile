start:
	docker-compose up -d  --scale db_init=0 --scale db_clean=0 --scale nginx=0 --scale frontend=0
stop:
	docker-compose down
production:
	docker-compose up -d --scale db_init=0 --scale db_clean=0
build:
	docker-compose build

db:
	docker-compose up db_init
db-clean:
	docker-compose up db_clean

delete-all:
	docker-compose down
	docker system prune
