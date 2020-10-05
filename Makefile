dev: dev-env dev-migrations dev-backend

dev-env:
	docker-compose -f docker-compose-dev.yaml up -d db cache

dev-migrations:
	docker-compose -f docker-compose-dev.yaml up --build migrations

dev-backend:
	docker-compose -f docker-compose-dev.yaml up --build backend

dev-clear:
	docker-compose -f docker-compose-dev.yaml down
