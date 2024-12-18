.PHONY: start stop restart

CONFIG_FILE=docker-compose.yml


start:
	docker compose -f $(CONFIG_FILE) up --build -d

stop:
	docker compose -f $(CONFIG_FILE) down

restart:
	docker compose -f $(CONFIG_FILE) down
	docker compose -f $(CONFIG_FILE) up --build -d