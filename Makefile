DEV_ENV_VARS := DB_HOST=localhost \
 DB_PORT=5432 \
 DB_USER=postgres \
 DB_NAME=postgres \
 DB_PASSWORD=password \
 CACHE_HOST=localhost \
 CACHE_PORT=6379

dev: yarn dev-env dev-migrations dev-backend

yarn:
	yarn

dev-migrations: yarn
	$(DEV_ENV_VARS) yarn run typeorm migration:run

dev-backend: yarn
	$(DEV_ENV_VARS) yarn run start:dev

dev-docker: dev-env dev-migrations-docker dev-backend-docker

dev-env:
	docker-compose -f docker-compose-dev.yaml up -d db cache

dev-migrations-docker:
	docker-compose -f docker-compose-dev.yaml up --build migrations

dev-backend-docker:
	docker-compose -f docker-compose-dev.yaml up --build backend

dev-clear:
	docker-compose -f docker-compose-dev.yaml down
