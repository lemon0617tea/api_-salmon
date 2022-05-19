.PHONY: dev
dev:
	NODE_ENV=development yarn start:dev

.PHONY: prod
prod:
	NODE_ENV=production yarn start:dev

.PHONY: init
init:
	cp .env.sample .env
