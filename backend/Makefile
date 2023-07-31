.PHONY: help node-version install migrate dev deploy

NPM := npm
PROJECT := fullstack-challenge__backend
SRC = src/

help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Available commands:"
	@echo "  node-version     Show active node and npm versions"
	@echo "  install          Install dependencies"
	@echo "  migrate          Run database migrations"
	@echo "  dev              Run the development server"
	@echo "  help             Show this help message"
	@echo "  deploy           Deploy projet on prod"

node-version:
	@echo "Versão do Node.js:"
	@node -v
	@echo "Versão do npm:"
	@$(NPM) -v

build:
	@$(NPM) run build

deploy:
	make install
	make build
	make migrate

install:
	@$(NPM) install

migrate:
	@$(NPM) run typeorm migration:run -- -d ./src/data-source

dev:
	@$(NPM) run dev