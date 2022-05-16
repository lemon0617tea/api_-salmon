.PHONY: up
up:
	docker-compose up

.PHONY: db
db:
	docker-compose -f docker-compose-db.yml up

.PHONY: app
app:
	docker-compose -f docker-compose-app.yml up

.PHONY: down
down:
	docker-compose down -v

.PHONY: init
init:
	cp docker-compose.override.yml.sample docker-compose.yml && cp .env.sample .env && cp .env.sample app/.env

.PHONY: migrate
migrate:
	cd app && yarn prisma migrate dev --name init
