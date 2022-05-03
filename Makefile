.PHONY: up
up:
	docker-compose up

.PHONY: down
down:
	docker-compose down -v

.PHONY: init
init:
	cp docker-compose.yml.sample docker-compose.yml && .env.sample .env

.PHONY: migrate
migrate:
	cd app && yarn prisma migrate --name init
